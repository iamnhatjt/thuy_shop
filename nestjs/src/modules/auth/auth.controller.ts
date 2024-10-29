import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Public } from './decorators/public.decorator';
import { UserService } from '../user/user.service';
import { refreshToken } from './dto/refresh-token.dto';
import { ApiResult } from '../../common/decorator/api-result.decorator';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @ApiResult(refreshToken)
  @Post('/login')
  @Public()
  @ApiBody({ type: AuthDto })
  async login(@Body() data: AuthDto) {
    await this.authService.login(data);
  }

  @Post('/register')
  @Public()
  @ApiBody({ type: AuthDto })
  async register(@Body() data: AuthDto): Promise<void> {
    await this.userService.register(data);
  }
}
