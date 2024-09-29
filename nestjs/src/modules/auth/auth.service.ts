import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(dto: AuthDto) {
    await this.userService.findAccount(dto);
  }

  async register(dto: AuthDto) {
    await this.userService.createAccount();
  }
}
