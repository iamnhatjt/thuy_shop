import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { TypeORMLogger } from './typeorm-logger';
import * as process from 'node:process';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return {
      type: 'mysql',
      host: process.env['MYSQL_HOSTNAME'],
      port: parseInt(process.env['MYSQL_PORT']),
      username: process.env['MYSQL_USERNAME'],
      password: process.env['MYSQL_PASSWORD'],
      database: process.env['MYSQL_DATABASE'],
      entities: [__dirname + '../../../**/entities/*.entity{.ts,.js}'],
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
      logging: process.env.DB_LOGGING === 'true',
      logger: new TypeORMLogger('all'),
      insecureAuth: true,
    };
  }
}
