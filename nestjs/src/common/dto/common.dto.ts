import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CommonDto {
  @ApiProperty({ description: '' })
  @Expose()
  id: number;

  @ApiProperty({ description: '' })
  @Expose()
  createdAt: Date;

  @ApiProperty({ description: '' })
  @Expose()
  updatedAt: Date;
}
