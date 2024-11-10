import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { TypeORMLogger } from './typeorm-logger';
import * as process from 'node:process';
import { DataSource } from 'typeorm';

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
      migrations: [__dirname + '../../migrations/*{.ts,.js}'],
      synchronize: true || process.env.DB_SYNCHRONIZE === 'true',
      logging: process.env.DB_LOGGING === 'true',
      logger: new TypeORMLogger('all'),
      autoLoadEntities: true,
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
});
