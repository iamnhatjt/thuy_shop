import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../../../common/entity/common.entity';

@Entity()
export class FeedbackEntity extends CommonEntity {
  @Column()
  email: string;
  @Column()
  phone: string;
  @Column()
  content: string;
}
