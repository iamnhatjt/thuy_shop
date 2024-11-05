import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ISecurityConfig, securityToken } from '../app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../modules/user/entities/user.entity';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
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
  providers: [JwtStrategy],
  exports: [JwtModule],
})
export class JwtConfigModule {}
