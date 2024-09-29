import { registerAs } from '@nestjs/config';
import * as process from 'node:process';

export const appToken = 'AppToken';
export const AppConfig = registerAs(appToken, () => ({
  swaggerEnable: process.env['SWAGGER_ENABLE'] === 'true',
  port: process.env['APP_PORT'],
  path: 'api',
  title: process.env['APP_NAME'],
  saltRounds: parseInt(process.env['SALT_ROUNDS']) || 10,
}));
