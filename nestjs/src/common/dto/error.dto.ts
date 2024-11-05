import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponse {
  @ApiProperty({
    example: 'OK',
    description: 'Code of the error',
  })
  readonly code: string;

  @ApiProperty({
    example: '',
    description: 'The detail message of the error',
  })
  readonly message: string;

  @ApiProperty({
    example: '2023-11-13T07:11:59.558Z',
    description: 'The timestamp of the error',
  })
  readonly timestamp: string;

  @ApiProperty({
    example: '/v1/auth/login',
    description: 'The path of the request',
  })
  readonly path: string;
}
