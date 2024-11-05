import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ISecurityConfig, securityToken } from '../app.config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule.forRoot()],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<ISecurityConfig>(securityToken).jwtSecret,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class JwtConfigModule {}
