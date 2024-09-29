import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Public } from './decorators/public.decorator';
import { UserService } from '../user/user.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/login')
  @Public()
  async login(data: AuthDto) {
    await this.authService.login(data);
    return '123';
  }

  @Post('/register')
  @Public()
  @ApiBody({ type: AuthDto })
  async register(@Body() data: AuthDto): Promise<void> {
    await this.userService.register(data);
  }
}
