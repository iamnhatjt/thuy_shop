import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthDto } from './dto/auth.dto';
import { TokenServices } from './services/token.services';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokenService: TokenServices,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async seedAdminAccount() {
    await this.userService.register({
      email: 'admin1@gmail.com',
      password: 'admin',
      isAdmin: true,
    });
  }

  async login(dto: AuthDto): Promise<RefreshTokenDto> {
    const user = await this.userService.findAccount(dto);
    const tokens = await this.tokenService.generateAccessToken(
      user.id,
      user.role,
    );
    return tokens;
  }

  async register(dto: AuthDto) {
    await this.userService.register({
      email: dto.email,
      password: dto.password,
    });
  }
}
