import { Column, Entity, ManyToOne } from 'typeorm';
import { ShoppingCardEntity } from './shoping-card.entity';
import { CommonEntity } from '../../../common/entity/common.entity';
import { ProductEntity } from '../../product/entities/product.entity';

@Entity()
export class AmountProductEntity extends CommonEntity {
  @ManyToOne(() => ProductEntity, (product) => product.amountShopCard)
  product: ProductEntity;

  @ManyToOne(
    () => ShoppingCardEntity,
    (shopCard) => shopCard.listAmountProducts,
    {
      onDelete: 'CASCADE',
    },
  )
  shoppingCard: ShoppingCardEntity;

  @Column()
  amount: number;
}
