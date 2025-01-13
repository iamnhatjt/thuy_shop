import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { TokenServices } from './services/token.services';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokenEntity } from './entities/refresh-token.entity';
import { AccessTokenEntity } from './entities/access-token.entity';
import { UserEntity } from '../user/entities/user.entity';
import { ISecurityConfig, securityToken } from 'src/config/app.config';
import { JwtStrategy } from 'src/config/jwt/jwt.strategy';
import logger from 'src/config/logs/log';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RefreshTokenEntity,
      AccessTokenEntity,
      UserEntity,
    ]),
    UserModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([UserEntity])],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<ISecurityConfig>(securityToken).jwtSecret,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],

  providers: [AuthService, UserService, TokenServices, JwtStrategy],
  exports: [JwtModule, TypeOrmModule],
})
export class AuthModule {
  constructor(private authService: AuthService) {
    this.seedAdminAccount();
  }

  async seedAdminAccount() {
    setTimeout(() => {
      logger.info('seedAdminAccount');
      this.authService.seedAdminAccount();
    }, 10000);
  }
}
