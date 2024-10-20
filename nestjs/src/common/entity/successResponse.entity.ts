import { ErrorCodes } from '../errors/error-code.constant';
import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponse<T> {
  @ApiProperty({
    example: ErrorCodes.OK.code,
    description: 'Response code',
  })
  readonly code: string;

  readonly data: T;
}
