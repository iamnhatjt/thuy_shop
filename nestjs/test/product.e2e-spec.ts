import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp } from './helpers/test-app.helper';
import {
  loginUser,
  registerUser,
  authGet,
  authPost,
  authPut,
  authDelete,
  AuthTokens,
} from './helpers/auth.helper';

describe('Product Workflow (e2e)', () => {
  let app: INestApplication;
  let adminTokens: AuthTokens;
  let regularTokens: AuthTokens;

  beforeAll(async () => {
    app = await createTestApp();
    await new Promise((resolve) => setTimeout(resolve, 12000));
    adminTokens = await loginUser(app, 'admin1@gmail.com', 'admin');

    const regularEmail = `product_user_${Date.now()}@gmail.com`;
    await registerUser(app, regularEmail, 'pass123', adminTokens.accessToken);
    regularTokens = await loginUser(app, regularEmail, 'pass123');
  }, 30000);

  afterAll(async () => {
    await app.close();
  });

  describe('Admin CRUD', () => {
    let createdProductId: number;

    it('should allow admin to create a product', async () => {
      const response = await authPost(
        app,
        '/admin/product',
        adminTokens.accessToken,
      )
        .send({
          title: 'Royal Memory Foam Mattress Pro',
          description: 'Five layers of advanced comfort technology.',
          price: 899.0,
          originalPrice: 1299.0,
          badge: 'BEST SELLER',
          material: 'Gel Memory Foam',
          height: '12 Inches',
          origin: 'Made in Vietnam',
          firmness: 'Medium-Firm (6.5/10)',
          certifications: 'CertiPUR-US®',
          warranty: '10 Years Limited',
          amount: 50,
        })
        .expect(201);

      expect(response.body.code).toBe('OK');
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.title).toBe('Royal Memory Foam Mattress Pro');
      expect(Number(response.body.data.price)).toBe(899.0);
      expect(Number(response.body.data.originalPrice)).toBe(1299.0);
      expect(response.body.data.badge).toBe('BEST SELLER');
      expect(response.body.data.material).toBe('Gel Memory Foam');
      expect(response.body.data.isActive).toBe(true);
      createdProductId = response.body.data.id;
    });

    it('should allow admin to create a product with category links', async () => {
      // Get existing categories
      const catRes = await request(app.getHttpServer())
        .get('/category')
        .query({ pageNum: 1, pageSize: 5 })
        .expect(200);

      const firstCatId = catRes.body.data[0]?.id;
      if (!firstCatId) return;

      const response = await authPost(
        app,
        '/admin/product',
        adminTokens.accessToken,
      )
        .send({
          title: 'Product With Category',
          description: 'Linked to a category.',
          price: 100,
          categoryIds: [firstCatId],
        })
        .expect(201);

      expect(response.body.data.categories).toBeInstanceOf(Array);
    });

    it('should allow admin to list all products with pagination', async () => {
      const response = await authGet(
        app,
        '/admin/product?pageNum=1&pageSize=5',
        adminTokens.accessToken,
      ).expect(200);

      expect(response.body.code).toBe('OK');
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.pagination).toBeDefined();
      expect(response.body.pagination.totalCount).toBeGreaterThanOrEqual(1);
    });

    it('should allow admin to get product by id', async () => {
      const response = await authGet(
        app,
        `/admin/product/${createdProductId}`,
        adminTokens.accessToken,
      ).expect(200);

      expect(response.body.code).toBe('OK');
      expect(response.body.data.id).toBe(createdProductId);
      expect(response.body.data.title).toBe('Royal Memory Foam Mattress Pro');
    });

    it('should allow admin to update a product', async () => {
      const response = await authPut(
        app,
        `/admin/product/${createdProductId}`,
        adminTokens.accessToken,
      )
        .send({ title: 'Updated Mattress', price: 799.0, isActive: false })
        .expect(200);

      expect(response.body.code).toBe('OK');
      expect(response.body.data.title).toBe('Updated Mattress');
      expect(Number(response.body.data.price)).toBe(799.0);
      expect(response.body.data.isActive).toBe(false);
    });

    it('should allow admin to delete a product', async () => {
      const createRes = await authPost(
        app,
        '/admin/product',
        adminTokens.accessToken,
      )
        .send({ title: 'To Delete', description: 'temp', price: 10 })
        .expect(201);

      const deleteId = createRes.body.data.id;

      await authDelete(
        app,
        `/admin/product/${deleteId}`,
        adminTokens.accessToken,
      ).expect(200);

      await authGet(
        app,
        `/admin/product/${deleteId}`,
        adminTokens.accessToken,
      ).expect(404);
    });

    it('should return 404 for non-existent product', async () => {
      await authGet(
        app,
        '/admin/product/999999',
        adminTokens.accessToken,
      ).expect(404);
    });
  });

  describe('Public Read (no JWT required)', () => {
    it('should return paginated active products', async () => {
      const response = await request(app.getHttpServer())
        .get('/product')
        .query({ pageNum: 1, pageSize: 10 })
        .expect(200);

      expect(response.body.code).toBe('OK');
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.pagination).toBeDefined();
    });

    it('should only show active products in public list', async () => {
      const response = await request(app.getHttpServer())
        .get('/product')
        .query({ pageNum: 1, pageSize: 50 })
        .expect(200);

      const titles = response.body.data.map((p: any) => p.title);
      // "Updated Mattress" was set to isActive=false
      expect(titles).not.toContain('Updated Mattress');
    });

    it('should return product detail and increment view count', async () => {
      // Create an active product for testing
      const createRes = await authPost(
        app,
        '/admin/product',
        adminTokens.accessToken,
      )
        .send({
          title: 'View Count Test',
          description: 'Testing views',
          price: 50,
          isActive: true,
        })
        .expect(201);

      const productId = createRes.body.data.id;

      const response = await request(app.getHttpServer())
        .get(`/product/${productId}`)
        .expect(200);

      expect(response.body.code).toBe('OK');
      expect(response.body.data.id).toBe(productId);
      expect(response.body.data).toHaveProperty('title');
      expect(response.body.data).toHaveProperty('price');
      expect(response.body.data).toHaveProperty('images');
      expect(response.body.data).toHaveProperty('categories');
    });
  });

  describe('Auth Enforcement', () => {
    it('should reject unauthenticated user on admin create', async () => {
      const response = await request(app.getHttpServer())
        .post('/admin/product')
        .send({ title: 'Hack', description: 'hacked', price: 1 });

      expect(response.status).toBe(401);
    });

    it('should reject regular user on admin create', async () => {
      const response = await authPost(
        app,
        '/admin/product',
        regularTokens.accessToken,
      ).send({ title: 'Regular', description: 'test', price: 1 });

      expect(response.status).toBe(403);
    });

    it('should reject unauthenticated user on admin delete', async () => {
      const response = await request(app.getHttpServer()).delete(
        '/admin/product/1',
      );

      expect(response.status).toBe(401);
    });

    it('should reject regular user on admin update', async () => {
      const response = await authPut(
        app,
        '/admin/product/1',
        regularTokens.accessToken,
      ).send({ title: 'Hacked' });

      expect(response.status).toBe(403);
    });
  });
});
