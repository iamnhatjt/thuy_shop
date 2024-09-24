import { DataSource, DataSourceOptions } from 'typeorm';
import * as process from 'node:process';
import { join } from 'path';

const DataSourseOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env['MYSQL_HOSTNAME '] || 'localhost',
  username: process.env['MYSQL_USERNAME'],
  password: process.env['MYSQL_PASSWORD'],
  database: process.env['MYSQL_DATABASE'],
  synchronize: Boolean(process.env['DB_SYNCHRONIZE']),
  entities: [join(__dirname, '../entities/*.entity{.ts,.js}')],
};

const dataSource = new DataSource(DataSourseOptions);

export default dataSource;
