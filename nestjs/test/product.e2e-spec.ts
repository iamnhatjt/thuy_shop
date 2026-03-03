import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp, getDataSource } from './helpers/test-app.helper';
import { loginUser, AuthTokens } from './helpers/auth.helper';

describe('Product Workflow (e2e)', () => {
  let app: INestApplication;
  let adminTokens: AuthTokens;

  beforeAll(async () => {
    app = await createTestApp();
    // Wait for admin seeding
    await new Promise((resolve) => setTimeout(resolve, 12000));
    adminTokens = await loginUser(app, 'admin1@gmail.com', 'admin');

    // Seed some products directly in DB for testing (DB write for test setup is allowed)
    const dataSource = getDataSource(app);
    await dataSource.query(`
      INSERT INTO product_entity (title, subtitle, view, amount, description)
      VALUES
        ('Test Book Alpha', 'A great alpha book', 100, 50000, 'Description for alpha book'),
        ('Test Book Beta', 'A great beta book', 200, 75000, 'Description for beta book'),
        ('Test Book Gamma', 'A great gamma book', 50, 30000, 'Description for gamma book')
      ON DUPLICATE KEY UPDATE title = VALUES(title)
    `);
  }, 30000);

  afterAll(async () => {
    // Cleanup seeded test products
    const dataSource = getDataSource(app);
    await dataSource.query(
      `DELETE FROM product_entity WHERE title LIKE 'Test Book%'`,
    );
    await app.close();
  });

  describe('List Products', () => {
    it('should return paginated list of products', async () => {
      const response = await request(app.getHttpServer())
        .get('/product/all')
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
        .get('/product/all')
        .query({ pageNum: 1, pageSize: 2 })
        .expect(200);

      expect(response.body.data.length).toBeLessThanOrEqual(2);
      expect(Number(response.body.pagination.pageSize)).toBe(2);
      expect(Number(response.body.pagination.pageNum)).toBe(1);
    });

    it('should return products with expected fields', async () => {
      const response = await request(app.getHttpServer())
        .get('/product/all')
        .query({ pageNum: 1, pageSize: 10 })
        .expect(200);

      const product = response.body.data[0];
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('title');
      expect(product).toHaveProperty('subtitle');
      expect(product).toHaveProperty('amount');
      expect(product).toHaveProperty('description');
    });

    it('should return empty array for page beyond total', async () => {
      const response = await request(app.getHttpServer())
        .get('/product/all')
        .query({ pageNum: 9999, pageSize: 10 })
        .expect(200);

      expect(response.body.data).toEqual([]);
    });
  });

  describe('Product Detail', () => {
    it('should return product detail by id', async () => {
      // First get a product id from the list
      const listResponse = await request(app.getHttpServer())
        .get('/product/all')
        .query({ pageNum: 1, pageSize: 1 })
        .expect(200);

      const productId = listResponse.body.data[0].id;

      const response = await request(app.getHttpServer())
        .get('/product/detail')
        .query({ id: productId })
        .expect(200);

      expect(response.body.code).toBe('OK');
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('title');
    });
  });
});
