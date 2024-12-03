import { Expose } from 'class-transformer';

export class CommonDto {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
