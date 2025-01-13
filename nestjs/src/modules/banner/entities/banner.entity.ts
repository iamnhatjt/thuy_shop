import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../../../common/entity/common.entity';

@Entity()
export class BannerEntity extends CommonEntity {
  @Column()
  fileName: string;

  @Column({
    default: false,
  })
  isDisable: boolean;

  @Column()
  url?: string;

  constructor(partial?: Partial<BannerEntity>) {
    super();
    if (partial) Object.assign(this, partial);
  }
}
