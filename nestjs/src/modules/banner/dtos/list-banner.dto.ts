import { Expose } from 'class-transformer';
import { CommonDto } from '../../../common/dto/common.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ListBannerDto extends CommonDto {
  @ApiProperty({ description: '' })
  @Expose()
  fileName: string;

  @ApiProperty({ description: '' })
  @Expose({})
  url: string;
}
