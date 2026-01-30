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
  // Simple in-memory cache: Map<userId, { user, expiry }>
  // Map preserves insertion order, so we can use it as a simple LRU/FIFO cache.
  private readonly userCache = new Map<
    number,
    { user: UserEntity; expiry: number }
  >();
  private readonly CACHE_TTL = 60 * 1000; // 60 seconds
  private readonly CACHE_LIMIT = 1000;

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
    const { userId } = payload;

    // Check cache
    const cached = this.userCache.get(userId);
    if (cached) {
      if (Date.now() < cached.expiry) {
        // Refresh LRU position (delete and re-add to move to end)
        this.userCache.delete(userId);
        this.userCache.set(userId, cached);
        return cached.user;
      }
      // Expired
      this.userCache.delete(userId);
    }

    const user = await this.userRepository.findOne({
      where: {
        id: userId,
        status: UserStatus.Enabled,
      },
    });
    if (!user) throw new UnauthorizedException();

    // Update cache
    if (this.userCache.size >= this.CACHE_LIMIT) {
      // Remove oldest entry (first inserted)
      const firstKey = this.userCache.keys().next().value;
      this.userCache.delete(firstKey);
    }

    this.userCache.set(userId, {
      user,
      expiry: Date.now() + this.CACHE_TTL,
    });

    return user;
  }
}
