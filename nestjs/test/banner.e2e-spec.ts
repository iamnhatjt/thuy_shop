import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp, getDataSource } from './helpers/test-app.helper';
import { loginUser, AuthTokens } from './helpers/auth.helper';

describe('Banner Workflow (e2e)', () => {
  let app: INestApplication;
  let adminTokens: AuthTokens;

  beforeAll(async () => {
    app = await createTestApp();
    // Wait for admin seeding
    await new Promise((resolve) => setTimeout(resolve, 12000));
    adminTokens = await loginUser(app, 'admin1@gmail.com', 'admin');
  }, 30000);

  afterAll(async () => {
    // Cleanup test banners
    const dataSource = getDataSource(app);
    await dataSource.query(
      `DELETE FROM banner_entity WHERE fileName LIKE 'test-banner%'`,
    );
    await app.close();
  });

  describe('List Banners', () => {
    beforeAll(async () => {
      // Seed test banners directly in DB (DB write for test setup is allowed)
      const dataSource = getDataSource(app);
      await dataSource.query(`
        INSERT INTO banner_entity (fileName, isDisable, url)
        VALUES
          ('test-banner-1', false, 'https://example.com/banner1.jpg'),
          ('test-banner-2', false, 'https://example.com/banner2.jpg'),
          ('test-banner-3', true, 'https://example.com/banner3.jpg')
      `);
    });

    it('should return paginated list of banners', async () => {
      const response = await request(app.getHttpServer())
        .get('/banner')
        .query({ pageNum: 1, pageSize: 10 })
        .expect(200);

      expect(response.body.code).toBe('OK');
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data.length).toBeGreaterThanOrEqual(1);
      expect(response.body.pagination).toBeDefined();
      expect(response.body.pagination.totalCount).toBeGreaterThanOrEqual(3);
    });

    it('should respect pagination parameters', async () => {
      const response = await request(app.getHttpServer())
        .get('/banner')
        .query({ pageNum: 1, pageSize: 2 })
        .expect(200);

      expect(response.body.data.length).toBeLessThanOrEqual(2);
      expect(Number(response.body.pagination.pageSize)).toBe(2);
    });

    it('should return banners with expected fields', async () => {
      const response = await request(app.getHttpServer())
        .get('/banner')
        .query({ pageNum: 1, pageSize: 10 })
        .expect(200);

      const banner = response.body.data[0];
      expect(banner).toHaveProperty('id');
      expect(banner).toHaveProperty('url');
    });
  });

  describe('Delete Banner', () => {
    let bannerIdToDelete: number;

    beforeAll(async () => {
      // Insert a banner specifically for deletion testing
      const dataSource = getDataSource(app);
      const result = await dataSource.query(`
        INSERT INTO banner_entity (fileName, isDisable, url)
        VALUES ('test-banner-delete', false, 'https://example.com/delete-me.jpg')
      `);
      bannerIdToDelete = result.insertId;
    });

    it('should successfully delete a banner by id', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/banner/${bannerIdToDelete}`)
        .expect(200);

      expect(response.body.code).toBe('OK');

      // Verify banner is gone by listing
      const listResponse = await request(app.getHttpServer())
        .get('/banner')
        .query({ pageNum: 1, pageSize: 100 })
        .expect(200);

      const deletedBanner = listResponse.body.data.find(
        (b: any) => b.id === bannerIdToDelete,
      );
      expect(deletedBanner).toBeUndefined();
    });

    it('should return error when deleting non-existent banner', async () => {
      const response = await request(app.getHttpServer()).delete(
        '/banner/999999',
      );

      expect(response.status).toBeGreaterThanOrEqual(400);
    });
  });
});
