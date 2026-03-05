import { CommonEntity } from '../../../common/entity/common.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class FileEntity extends CommonEntity {
  @Column()
  url: string;

  @Column({ name: 'original_name' })
  originalName: string;

  @Column()
  mimetype: string;
}
