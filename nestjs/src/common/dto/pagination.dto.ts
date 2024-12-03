import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { ErrorCodes } from '../errors/error-code.constant';
import { Transform } from 'class-transformer';

export class PaginationDto {
  @ApiProperty({ description: '', default: 1 })
  @Transform(({ value }) => Number(value))
  @IsNumber({})
  pageNum: number = 1;

  @ApiProperty({ description: '', default: 10 })
  @Transform(({ value }) => Number(value))
  @IsNumber({})
  pageSize: number = 10;
}

export class PaginationResponse {
  @ApiProperty({
    example: 200,
    description: 'Total number of the data',
  })
  totalCount: number;
  @ApiProperty({
    example: 0,
    description: 'Number of page, start with 0',
  })
  pageNum: number;
  @ApiProperty({
    example: 100,
    description: 'Max number of items each page',
  })
  pageSize: number;
}

export class PaginatedResponse<T> {
  @ApiProperty({
    example: ErrorCodes.OK.code,
    description: 'Response code',
  })
  readonly code: string;

  @ApiProperty({
    description: '',
  })
  readonly isDisclosed?: boolean;

  data: T[];

  @ApiProperty({
    type: PaginationResponse,
    description: 'Total number of the data',
  })
  pagination: PaginationResponse;
}
