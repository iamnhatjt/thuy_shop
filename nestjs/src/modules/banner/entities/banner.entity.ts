import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../../../common/entity/common.entity';

@Entity()
export class BannerEntity extends CommonEntity {
  @Column()
  image: string;
  @Column({
    default: true,
  })
  isDisable: boolean;
}
