import { Exclude, Expose } from 'class-transformer';
import { CommonDto } from '../../../common/dto/common.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ExposeDisplay } from 'src/common/decorator/expose-display.decorator';

@Exclude()
export class ListBannerDto extends CommonDto {
  @ExposeDisplay()
  fileName: string;

  @ExposeDisplay()
  url: string;
}
