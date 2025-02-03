import { CommonEntity } from '../../../common/entity/common.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity()
export class ProductImageEntity extends CommonEntity {
  @Column()
  url: string;

  @ManyToOne(() => ProductEntity, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  product: ProductEntity;
}
