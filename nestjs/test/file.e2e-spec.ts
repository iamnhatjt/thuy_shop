import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp } from './helpers/test-app.helper';
import {
  loginUser,
  registerUser,
  authPost,
  authDelete,
  AuthTokens,
} from './helpers/auth.helper';

describe('File Module (e2e)', () => {
  let app: INestApplication;
  let adminTokens: AuthTokens;
  let regularTokens: AuthTokens;

  beforeAll(async () => {
    app = await createTestApp();
    await new Promise((resolve) => setTimeout(resolve, 12000));
    adminTokens = await loginUser(app, 'admin1@gmail.com', 'admin');

    const regularEmail = `file_user_${Date.now()}@gmail.com`;
    await registerUser(app, regularEmail, 'pass123', adminTokens.accessToken);
    regularTokens = await loginUser(app, regularEmail, 'pass123');
  }, 30000);

  afterAll(async () => {
    await app.close();
  });

  describe('Admin Upload', () => {
    let uploadedFileIds: number[] = [];

    it('should allow admin to upload multiple files', async () => {
      const response = await request(app.getHttpServer())
        .post('/admin/file/upload')
        .set('Authorization', `Bearer ${adminTokens.accessToken}`)
        .attach('files', Buffer.from('fake-image-data-1'), 'image1.jpg')
        .attach('files', Buffer.from('fake-image-data-2'), 'image2.png')
        .expect(201);

      expect(response.body.code).toBe('OK');
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data).toHaveLength(2);

      response.body.data.forEach((file: any) => {
        expect(file).toHaveProperty('id');
        expect(file).toHaveProperty('url');
        expect(file).toHaveProperty('originalName');
        expect(file).toHaveProperty('mimetype');
        expect(file).toHaveProperty('imageUrl');
      });

      expect(response.body.data[0].originalName).toBe('image1.jpg');
      expect(response.body.data[1].originalName).toBe('image2.png');

      uploadedFileIds = response.body.data.map((f: any) => f.id);
    });

    it('should allow admin to create product with uploaded file IDs', async () => {
      const response = await authPost(
        app,
        '/admin/product',
        adminTokens.accessToken,
      )
        .send({
          title: 'Product With Images',
          description: 'Has uploaded images',
          price: 100,
          imageIds: uploadedFileIds,
        })
        .expect(201);

      expect(response.body.code).toBe('OK');
      expect(response.body.data.images).toBeInstanceOf(Array);
      expect(response.body.data.images.length).toBe(2);
      expect(response.body.data.images[0]).toHaveProperty('imageUrl');
    });

    it('should allow admin to delete multiple files', async () => {
      // Upload files to delete
      const uploadRes = await request(app.getHttpServer())
        .post('/admin/file/upload')
        .set('Authorization', `Bearer ${adminTokens.accessToken}`)
        .attach('files', Buffer.from('to-delete-1'), 'delete1.jpg')
        .attach('files', Buffer.from('to-delete-2'), 'delete2.jpg')
        .expect(201);

      const idsToDelete = uploadRes.body.data.map((f: any) => f.id);

      await request(app.getHttpServer())
        .delete('/admin/file')
        .set('Authorization', `Bearer ${adminTokens.accessToken}`)
        .send({ ids: idsToDelete })
        .expect(200);
    });

    it('should return 404 when deleting non-existent file IDs', async () => {
      const response = await request(app.getHttpServer())
        .delete('/admin/file')
        .set('Authorization', `Bearer ${adminTokens.accessToken}`)
        .send({ ids: [999999, 999998] });

      expect(response.status).toBe(404);
    });
  });

  describe('Auth Enforcement', () => {
    it('should reject unauthenticated upload', async () => {
      const response = await request(app.getHttpServer())
        .post('/admin/file/upload')
        .attach('files', Buffer.from('hack'), 'hack.jpg');

      expect(response.status).toBe(401);
    });

    it('should reject regular user upload', async () => {
      const response = await request(app.getHttpServer())
        .post('/admin/file/upload')
        .set('Authorization', `Bearer ${regularTokens.accessToken}`)
        .attach('files', Buffer.from('hack'), 'hack.jpg');

      expect(response.status).toBe(403);
    });

    it('should reject unauthenticated delete', async () => {
      const response = await request(app.getHttpServer())
        .delete('/admin/file')
        .send({ ids: [1] });

      expect(response.status).toBe(401);
    });

    it('should reject regular user delete', async () => {
      const response = await request(app.getHttpServer())
        .delete('/admin/file')
        .set('Authorization', `Bearer ${regularTokens.accessToken}`)
        .send({ ids: [1] });

      expect(response.status).toBe(403);
    });
  });
});
