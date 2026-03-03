import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { DataSource } from 'typeorm';

/**
 * Creates a real NestJS application instance for E2E testing.
 * Uses the same AppModule, real DB, real auth — full black-box testing.
 */
export async function createTestApp(): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.init();

  return app;
}

/**
 * Cleans up specific tables between tests to ensure isolation.
 * Only cleans test-created data, preserving the seeded admin account.
 */
export async function cleanDatabase(
  app: INestApplication,
  tables: string[],
): Promise<void> {
  const dataSource = app.get(DataSource);
  // Disable FK checks temporarily for clean truncation
  await dataSource.query('SET FOREIGN_KEY_CHECKS = 0');
  for (const table of tables) {
    await dataSource.query(`TRUNCATE TABLE \`${table}\``);
  }
  await dataSource.query('SET FOREIGN_KEY_CHECKS = 1');
}

/**
 * Gets the DataSource from the app for direct DB queries (setup only).
 */
export function getDataSource(app: INestApplication): DataSource {
  return app.get(DataSource);
}
