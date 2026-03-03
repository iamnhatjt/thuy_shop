import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp, getDataSource } from './helpers/test-app.helper';
import {
  loginUser,
  registerUser,
  authGet,
  authPost,
  authPut,
  authDelete,
  AuthTokens,
} from './helpers/auth.helper';

describe('Category Workflow (e2e)', () => {
  let app: INestApplication;
  let adminTokens: AuthTokens;
  let regularTokens: AuthTokens;

  beforeAll(async () => {
    app = await createTestApp();
    // Wait for admin seeding + category seeding
    await new Promise((resolve) => setTimeout(resolve, 12000));
    adminTokens = await loginUser(app, 'admin1@gmail.com', 'admin');

    // Create a regular user for auth enforcement tests
    const regularEmail = `category_user_${Date.now()}@gmail.com`;
    await registerUser(app, regularEmail, 'pass123', adminTokens.accessToken);
    regularTokens = await loginUser(app, regularEmail, 'pass123');
  }, 30000);

  afterAll(async () => {
    await app.close();
  });

  describe('Seeded Categories', () => {
    it('should have seeded parent categories', async () => {
      const response = await request(app.getHttpServer())
        .get('/category')
        .query({ pageNum: 1, pageSize: 20 })
        .expect(200);

      expect(response.body.code).toBe('OK');
      expect(response.body.data.length).toBeGreaterThanOrEqual(6);

      const titles = response.body.data.map((c: any) => c.title);
      expect(titles).toContain('Chăn Ga Gối đệm');
      expect(titles).toContain('Thực phẩm chay');
      expect(titles).toContain('Đồ nhựa, đồ gia dụng');
      expect(titles).toContain('Đồ thủy tinh');
    });

    it('should have seeded child categories', async () => {
      const response = await request(app.getHttpServer())
        .get('/category')
        .query({ pageNum: 1, pageSize: 20 })
        .expect(200);

      const parent = response.body.data.find(
        (c: any) => c.title === 'Chăn Ga Gối đệm',
      );
      expect(parent).toBeDefined();
      expect(parent.children).toBeInstanceOf(Array);
      expect(parent.children.length).toBe(4);

      const childTitles = parent.children.map((c: any) => c.title);
      expect(childTitles).toContain('Chăn');
      expect(childTitles).toContain('Ga');
    });
  });

  describe('Admin CRUD', () => {
    let createdCategoryId: number;

    it('should allow admin to create a category', async () => {
      const response = await authPost(
        app,
        '/admin/category',
        adminTokens.accessToken,
      )
        .send({
          title: 'E2E Test Category',
          isActive: true,
        })
        .expect(201);

      expect(response.body.code).toBe('OK');
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.title).toBe('E2E Test Category');
      expect(response.body.data.url).toBe('/e2e-test-category');
      expect(response.body.data.isActive).toBe(true);
      createdCategoryId = response.body.data.id;
    });

    it('should allow admin to create a child category', async () => {
      const response = await authPost(
        app,
        '/admin/category',
        adminTokens.accessToken,
      )
        .send({
          title: 'E2E Child Category',
          isActive: true,
          parentId: createdCategoryId,
        })
        .expect(201);

      expect(response.body.data.parentId).toBe(createdCategoryId);
      expect(response.body.data.url).toBe(
        '/e2e-test-category/e2e-child-category',
      );
    });

    it('should allow admin to list all categories with pagination', async () => {
      const response = await authGet(
        app,
        '/admin/category?pageNum=1&pageSize=5',
        adminTokens.accessToken,
      ).expect(200);

      expect(response.body.code).toBe('OK');
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.pagination).toBeDefined();
      expect(response.body.pagination.totalCount).toBeGreaterThanOrEqual(1);
    });

    it('should allow admin to get category by id', async () => {
      const response = await authGet(
        app,
        `/admin/category/${createdCategoryId}`,
        adminTokens.accessToken,
      ).expect(200);

      expect(response.body.code).toBe('OK');
      expect(response.body.data.id).toBe(createdCategoryId);
      expect(response.body.data.title).toBe('E2E Test Category');
      expect(response.body.data.children).toBeInstanceOf(Array);
      expect(response.body.data.children.length).toBe(1);
    });

    it('should allow admin to update a category', async () => {
      const response = await authPut(
        app,
        `/admin/category/${createdCategoryId}`,
        adminTokens.accessToken,
      )
        .send({ title: 'Updated E2E Category', isActive: false })
        .expect(200);

      expect(response.body.code).toBe('OK');
      expect(response.body.data.title).toBe('Updated E2E Category');
      expect(response.body.data.isActive).toBe(false);
    });

    it('should allow admin to delete a category', async () => {
      // Create a throwaway category for deletion
      const createRes = await authPost(
        app,
        '/admin/category',
        adminTokens.accessToken,
      )
        .send({ title: 'To Delete' })
        .expect(201);

      const deleteId = createRes.body.data.id;

      await authDelete(
        app,
        `/admin/category/${deleteId}`,
        adminTokens.accessToken,
      ).expect(200);

      // Verify it's gone
      await authGet(
        app,
        `/admin/category/${deleteId}`,
        adminTokens.accessToken,
      ).expect(404);
    });

    it('should return 404 for non-existent category', async () => {
      await authGet(
        app,
        '/admin/category/999999',
        adminTokens.accessToken,
      ).expect(404);
    });
  });

  describe('Public Read (no JWT required)', () => {
    it('should return paginated active categories without authentication', async () => {
      const response = await request(app.getHttpServer())
        .get('/category')
        .query({ pageNum: 1, pageSize: 10 })
        .expect(200);

      expect(response.body.code).toBe('OK');
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.pagination).toBeDefined();
      expect(response.body.pagination.totalCount).toBeGreaterThanOrEqual(1);
    });

    it('should only show active categories in public list', async () => {
      const response = await request(app.getHttpServer())
        .get('/category')
        .query({ pageNum: 1, pageSize: 50 })
        .expect(200);

      // The "Updated E2E Category" was set to isActive=false in admin test
      const titles = response.body.data.map((c: any) => c.title);
      expect(titles).not.toContain('Updated E2E Category');
    });

    it('should return category detail by id', async () => {
      // Get any category from public list first
      const listRes = await request(app.getHttpServer())
        .get('/category')
        .query({ pageNum: 1, pageSize: 1 })
        .expect(200);

      const firstCategory = listRes.body.data[0];

      const response = await request(app.getHttpServer())
        .get(`/category/${firstCategory.id}`)
        .expect(200);

      expect(response.body.code).toBe('OK');
      expect(response.body.data.id).toBe(firstCategory.id);
      expect(response.body.data).toHaveProperty('title');
      expect(response.body.data).toHaveProperty('url');
    });
  });

  describe('Auth Enforcement', () => {
    it('should reject unauthenticated user on admin create', async () => {
      const response = await request(app.getHttpServer())
        .post('/admin/category')
        .send({ title: 'Hack' });

      expect(response.status).toBe(401);
    });

    it('should reject regular user on admin create', async () => {
      const response = await authPost(
        app,
        '/admin/category',
        regularTokens.accessToken,
      ).send({ title: 'Regular User' });

      expect(response.status).toBe(403);
    });

    it('should reject unauthenticated user on admin delete', async () => {
      const response = await request(app.getHttpServer()).delete(
        '/admin/category/1',
      );

      expect(response.status).toBe(401);
    });

    it('should reject regular user on admin update', async () => {
      const response = await authPut(
        app,
        '/admin/category/1',
        regularTokens.accessToken,
      ).send({ title: 'Hacked' });

      expect(response.status).toBe(403);
    });
  });
});
