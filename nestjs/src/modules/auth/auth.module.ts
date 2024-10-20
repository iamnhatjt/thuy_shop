import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { ResourceGuard } from './guards/resource.guard';
import { TokenServices } from './services/token.services';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ISecurityConfig, securityToken } from '../../config/app.config';
import { RefreshTokenEntity } from './entities/refresh-token.entity';
import { AccessTokenEntity } from './entities/access-token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshTokenEntity, AccessTokenEntity]),
    UserModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const { jwtSecret, jwtExprire } =
          configService.get<ISecurityConfig>(securityToken);
        return {
          secret: jwtSecret,
          signOptions: {
            expiresIn: `${jwtExprire}s`,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    TokenServices,
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
  ],
  exports: [JwtModule, TypeOrmModule],
})
export class AuthModule {}
