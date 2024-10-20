import { ApiProperty } from '@nestjs/swagger';

export class refreshToken {
  @ApiProperty({
    description: 'refresh token',
  })
  refreshToken: string;

  @ApiProperty({
    description: 'refresh token',
  })
  accessToken: string;
}
