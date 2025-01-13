import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Public } from './decorators/public.decorator';
import { UserService } from '../user/user.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ApiResult } from '../../common/decorator/api-result.decorator';
import { BaseController } from '../../common/bases/controller.base';
import { GetUser } from '../../common/decorator/get-user.decorator';
import { UserEntity } from '../user/entities/user.entity';

@Controller('auth')
@ApiTags('auth')
export class AuthController extends BaseController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {
    super();
  }

  @ApiResult(RefreshTokenDto)
  @Post('/login')
  @Public()
  async login(@Body() data: AuthDto) {
    const res: RefreshTokenDto = await this.authService.login(data);
    return this.successResponse(res);
  }

  @Post('/register')
  @Public()
  async register(@Body() data: AuthDto): Promise<void> {
    await this.userService.register(data);
    this.successResponse({});
  }

  @Get('/me')
  @Public()
  async getMe(@GetUser() user: UserEntity) {
    return this.successResponse(user);
  }
}
