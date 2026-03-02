import { CommonEntity } from '../../../common/entity/common.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { AmountProductEntity } from '../../shopping-card/entities/amount-product.entity';
import { ProductImageEntity } from './product-image.entity';

@Entity()
export class ProductEntity extends CommonEntity {
  @Column()
  title: string;
  @Column()
  subtitle: string;
  @Column()
  view: number;
  @Column({
    default: 8386,
  })
  amount: number;
  @Column({
    type: 'longtext',
  })
  description: string;

  @OneToMany(() => AmountProductEntity, (card) => card.product, {
    onDelete: 'CASCADE',
  })
  amountShopCard: AmountProductEntity[];

  @OneToMany(() => ProductImageEntity, (image) => image.product, {
    onDelete: 'CASCADE',
  })
  images: ProductImageEntity[];
}
