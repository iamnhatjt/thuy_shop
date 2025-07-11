import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ISecurityConfig, SecurityConfig } from '../app.config';
import { Repository } from 'typeorm';
import { UserEntity } from '../../modules/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserStatus } from 'src/modules/user/user.contants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(SecurityConfig.KEY) securityConfig: ISecurityConfig,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: securityConfig.jwtSecret,
    });
  }

  async validate(payload: any): Promise<UserEntity> {
    const { userId, role } = payload;
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
        status: UserStatus.Enabled,
      },
    });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
