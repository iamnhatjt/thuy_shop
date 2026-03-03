import { INestApplication } from '@nestjs/common';
import request from 'supertest';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

/**
 * Logs in via the real /auth/login endpoint and returns JWT tokens.
 * Per the E2E skill: "Always obtain tokens through real login endpoints"
 */
export async function loginUser(
  app: INestApplication,
  email: string,
  password: string,
): Promise<AuthTokens> {
  const response = await request(app.getHttpServer())
    .post('/auth/login')
    .send({ email, password })
    .expect(201);

  return response.body.data;
}

/**
 * Registers a new user via the real /auth/register endpoint.
 * Requires admin authentication (RoleAccess decorator).
 */
export async function registerUser(
  app: INestApplication,
  email: string,
  password: string,
  adminToken: string,
): Promise<void> {
  await request(app.getHttpServer())
    .post('/auth/register')
    .set('Authorization', `Bearer ${adminToken}`)
    .send({ email, password })
    .expect(201);
}

/**
 * Helper to create an authenticated request with Bearer token.
 */
export function authGet(
  app: INestApplication,
  url: string,
  token: string,
): request.Test {
  return request(app.getHttpServer())
    .get(url)
    .set('Authorization', `Bearer ${token}`);
}

export function authPost(
  app: INestApplication,
  url: string,
  token: string,
): request.Test {
  return request(app.getHttpServer())
    .post(url)
    .set('Authorization', `Bearer ${token}`);
}

export function authDelete(
  app: INestApplication,
  url: string,
  token: string,
): request.Test {
  return request(app.getHttpServer())
    .delete(url)
    .set('Authorization', `Bearer ${token}`);
}

export function authPut(
  app: INestApplication,
  url: string,
  token: string,
): request.Test {
  return request(app.getHttpServer())
    .put(url)
    .set('Authorization', `Bearer ${token}`);
}
