import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'refresh token',
  })
  refreshToken: string;

  @ApiProperty({
    description: 'refresh token',
  })
  accessToken: string;
}
