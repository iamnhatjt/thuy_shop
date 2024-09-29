import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { ResourceGuard } from './guards/resource.guard';
import { TokenServices } from './services/token.services';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UserModule, ConfigModule],
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
})
export class AuthModule {}
