import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { AuthDto } from '../auth/dto/auth.dto';
import { isEmpty } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { appToken } from '../../config/app.config';
import { UserStatus } from './user.contants';
import { AppException } from '../../common/exceptions/app.exception';
import { ErrorCodes } from '../../common/errors/error-code.constant';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private configService: ConfigService,
  ) {}

  async findAccount(dto: AuthDto) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (!user) throw new AppException(ErrorCodes.USER_NOT_FOUND);
    const isSamePass = await bcrypt.compare(dto.password, user.password);
    if (!isSamePass) throw new AppException(ErrorCodes.INFO_NOT_MATCH);
    return user;
  }

  async register({ email, password }) {
    const exits = await this.userRepository.findOneBy({
      email,
    });
    if (!isEmpty(exits)) throw new AppException(ErrorCodes.USER_EXISTS);

    const saltHash = this.configService.get(appToken).saltRounds;

    const hashPassword = await bcrypt.hash(password, saltHash);

    const user = this.userRepository.create({
      email,
      password: hashPassword,
      status: UserStatus.Enabled,
    });
    await this.userRepository.save(user);
    return user;
  }
}
