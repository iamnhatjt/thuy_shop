import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ExposeDisplay } from '../decorator/expose-display.decorator';

@Exclude()
export class CommonDto {
  @ExposeDisplay()
  id: number;

  @ExposeDisplay()
  createdAt: Date;

  @ExposeDisplay()
  updatedAt: Date;
}
