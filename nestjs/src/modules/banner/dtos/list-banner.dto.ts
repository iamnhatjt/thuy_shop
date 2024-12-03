import { Expose } from 'class-transformer';
import { CommonDto } from '../../../common/dto/common.dto';

export class ListBannerDto extends CommonDto {
  @Expose()
  url: string;
}
