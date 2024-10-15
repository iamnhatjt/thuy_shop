import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthDto } from './dto/auth.dto';
import { TokenServices } from './services/token.services';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokenService: TokenServices,
  ) {}

  async login(dto: AuthDto) {
    const user = await this.userService.findAccount(dto);
    const tokens = await this.tokenService.generateAccessToken(
      user.id,
      'admin',
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
