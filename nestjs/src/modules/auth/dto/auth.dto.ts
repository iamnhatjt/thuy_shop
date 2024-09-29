import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ example: 'admin.com', description: 'Email' })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'admin', description: 'Password' })
  @IsString({
    message: 'Password must be a string',
  })
  @IsNotEmpty()
  password: string;
}
