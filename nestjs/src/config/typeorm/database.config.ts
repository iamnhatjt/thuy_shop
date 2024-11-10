import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { TypeORMLogger } from './typeorm-logger';
import * as process from 'node:process';
import * as mysql2 from 'mysql2/promise';
import { DataSource } from 'typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    const connection = await mysql2.createConnection({
      host: process.env['MYSQL_HOSTNAME'],
      port: parseInt(process.env['MYSQL_PORT']),
      user: process.env['MYSQL_USERNAME'],
      password: process.env['MYSQL_PASSWORD'],
    });
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQL_DATABASE}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;;`,
    );
    return {
      type: 'mysql',
      host: process.env['MYSQL_HOSTNAME'],
      port: parseInt(process.env['MYSQL_PORT']),
      username: process.env['MYSQL_USERNAME'],
      password: process.env['MYSQL_PASSWORD'],
      database: process.env['MYSQL_DATABASE'],
      entities: [__dirname + '../../../**/entities/*.entity{.ts,.js}'],
      migrations: [__dirname + '../../migrations/*{.ts,.js}'],
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
      logging: process.env.DB_LOGGING === 'true',
      migrationsTransactionMode: 'each',
      logger:
        process.env['DB_LOGGING'] === 'true' ? new TypeORMLogger('all') : null,
    };
  }
}

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456a@',
  database: 'BookSharing',
  entities: [__dirname + '../../../**/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '../../migrations/*{.ts,.js}'],
  synchronize: false,
  migrationsTransactionMode: 'each',
});
