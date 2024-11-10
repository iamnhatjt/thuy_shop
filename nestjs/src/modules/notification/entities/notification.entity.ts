import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../../../common/entity/common.entity';

@Entity()
export class NotificationEntity extends CommonEntity {
  @Column()
  title: string;
  @Column()
  content: string;
  @Column({
    default: false,
  })
  isRead: boolean;
}
