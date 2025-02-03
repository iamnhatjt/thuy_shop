import { Exclude } from 'class-transformer';
import { ExposeDisplay } from 'src/common/decorator/expose-display.decorator';
import { CommonDto } from 'src/common/dto/common.dto';

@Exclude()
export class ProductDto extends CommonDto {
  @ExposeDisplay()
  title: string;

  @ExposeDisplay()
  subtitle: string;

  @ExposeDisplay()
  amount: number;

  @ExposeDisplay()
  description: string;
}
