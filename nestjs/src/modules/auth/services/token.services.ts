import { Inject, Injectable } from '@nestjs/common';
import { AccessTokenEntity } from '../entities/access-token.entity';
import dayjs from 'dayjs';
import { JwtService } from '@nestjs/jwt';

import { RefreshTokenEntity } from '../entities/refresh-token.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { ISecurityConfig, SecurityConfig } from '../../../config/app.config';
import { generateUUID } from '../../../utils';

@Injectable()
export class TokenServices {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(SecurityConfig.KEY)
    private readonly securityConfig: ISecurityConfig,
  ) {}

  generateSign(payload: any) {
    return this.jwtService.sign(payload);
  }

  async generateAccessToken(userId: number, role: string): Promise<any> {
    const accessTokenPayload = {
      userId,
      role,
    };
    const accessTokenSign = await this.jwtService.signAsync(
      accessTokenPayload,
      {
        secret: this.securityConfig.jwtSecret,
      },
    );

    const accessTokenEntity = new AccessTokenEntity();
    accessTokenEntity.value = accessTokenSign;
    accessTokenEntity.user = { id: userId } as UserEntity;
    accessTokenEntity.expired_at = dayjs()
      .add(this.securityConfig.jwtExprire, 'second')
      .toDate();

    await accessTokenEntity.save();
    const refreshToken = await this.generateRefreshToken(
      accessTokenEntity,
      dayjs(),
    );

    return {
      accessToken: accessTokenSign,
      refreshToken,
    };
  }

  async generateRefreshToken(
    accessToken: AccessTokenEntity,
    now: dayjs.Dayjs,
  ): Promise<string> {
    const refreshTokenPayload = {
      uuid: generateUUID(),
    };

    const refreshTokenSign = await this.jwtService.signAsync(
      refreshTokenPayload,
      {
        privateKey: this.securityConfig.jwtSecret,
      },
    );

    const refreshTokenEntity = new RefreshTokenEntity();
    refreshTokenEntity.value = refreshTokenSign;
    refreshTokenEntity.accessToken = accessToken;
    refreshTokenEntity.expired_at = now
      .add(this.securityConfig.jwtExprire, 'second')
      .toDate();

    await refreshTokenEntity.save();
    return refreshTokenSign;
  }
}
