import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../../../common/entity/common.entity';

@Entity()
export class ArticleEntity extends CommonEntity {
  @Column()
  title: string;
  @Column()
  content: string;
  @Column({
    default: true,
  })
  isDisable: boolean;
}
