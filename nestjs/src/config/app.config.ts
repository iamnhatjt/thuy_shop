import { ConfigType, registerAs } from '@nestjs/config';
import * as process from 'node:process';

export const appToken = 'AppToken';
export const AppConfig = registerAs(appToken, () => ({
  swaggerEnable: process.env['SWAGGER_ENABLE'] === 'true',
  port: process.env['APP_PORT'],
  path: 'api',
  title: process.env['APP_NAME'],
  saltRounds: parseInt(process.env['SALT_ROUNDS']) || 10,
}));

export const securityToken = 'SecurityToken';
export const SecurityConfig = registerAs(securityToken, () => ({
  jwtSecret: process.env['JWT_SECRET'],
  jwtExprire: Number(process.env['JWT_EXPRIRE'] ?? 300000),
}));

export type ISecurityConfig = ConfigType<typeof SecurityConfig>;
