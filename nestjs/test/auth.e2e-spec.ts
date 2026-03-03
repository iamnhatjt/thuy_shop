import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp, cleanDatabase } from './helpers/test-app.helper';
import {
  loginUser,
  registerUser,
  authGet,
  AuthTokens,
} from './helpers/auth.helper';

describe('Auth Workflow (e2e)', () => {
  let app: INestApplication;
  let adminTokens: AuthTokens;

  beforeAll(async () => {
    app = await createTestApp();
    // Wait for the admin seeding to complete (AuthModule seeds admin1@gmail.com after 10s)
    // We use a shorter wait since in test the seed runs on module init
    await new Promise((resolve) => setTimeout(resolve, 12000));
    adminTokens = await loginUser(app, 'admin1@gmail.com', 'admin');
  }, 30000);

  afterAll(async () => {
    await app.close();
  });

  describe('Login', () => {
    it('should login with valid admin credentials and return tokens', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'admin1@gmail.com', password: 'admin' })
        .expect(201);

      expect(response.body.code).toBe('OK');
      expect(response.body.data).toHaveProperty('accessToken');
      expect(response.body.data).toHaveProperty('refreshToken');
      expect(typeof response.body.data.accessToken).toBe('string');
      expect(typeof response.body.data.refreshToken).toBe('string');
    });

    it('should reject login with wrong password', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'admin1@gmail.com', password: 'wrong-password' });

      expect(response.status).toBeGreaterThanOrEqual(400);
    });

    it('should reject login with non-existent user', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'nobody@gmail.com', password: 'test' });

      expect(response.status).toBeGreaterThanOrEqual(400);
    });

    it('should reject login with missing email', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ password: 'admin' });

      expect(response.status).toBe(400);
    });

    it('should reject login with missing password', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'admin1@gmail.com' });

      expect(response.status).toBe(400);
    });
  });

  describe('Register', () => {
    const testUserEmail = `testuser_${Date.now()}@gmail.com`;

    it('should allow admin to register a new user', async () => {
      await registerUser(
        app,
        testUserEmail,
        'password123',
        adminTokens.accessToken,
      );

      // Verify the new user can login
      const tokens = await loginUser(app, testUserEmail, 'password123');
      expect(tokens.accessToken).toBeDefined();
      expect(tokens.refreshToken).toBeDefined();
    });

    it('should reject duplicate registration', async () => {
      const duplicateEmail = `duplicate_${Date.now()}@gmail.com`;
      // Register once
      await registerUser(app, duplicateEmail, 'pass1', adminTokens.accessToken);

      // Attempt duplicate
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .set('Authorization', `Bearer ${adminTokens.accessToken}`)
        .send({ email: duplicateEmail, password: 'pass2' });

      expect(response.status).toBeGreaterThanOrEqual(400);
    });

    it('should reject registration without admin token', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send({ email: 'noauth@gmail.com', password: 'test' });

      expect(response.status).toBe(401);
    });

    it('should reject registration with regular user token', async () => {
      const regularEmail = `regular_${Date.now()}@gmail.com`;
      await registerUser(app, regularEmail, 'pass123', adminTokens.accessToken);
      const regularTokens = await loginUser(app, regularEmail, 'pass123');

      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .set('Authorization', `Bearer ${regularTokens.accessToken}`)
        .send({ email: 'another@gmail.com', password: 'test' });

      expect(response.status).toBe(403);
    });
  });

  describe('Get Current User', () => {
    it('should return OK status when hitting /auth/me with valid token', async () => {
      // Note: GET /auth/me does NOT have JwtAuthGuard applied.
      // The @GetUser() decorator just reads request.user which is set by Passport.
      // Without UseGuards(JwtAuthGuard), Passport doesn't run, so user is undefined.
      // This test documents the current (likely buggy) behavior.
      const response = await authGet(
        app,
        '/auth/me',
        adminTokens.accessToken,
      ).expect(200);

      expect(response.body.code).toBe('OK');
    });

    it('should also return OK without token (no guard on /auth/me)', async () => {
      const response = await request(app.getHttpServer())
        .get('/auth/me')
        .expect(200);

      expect(response.body.code).toBe('OK');
    });
  });
});
