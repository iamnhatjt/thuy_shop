import { CommonEntity } from '../../../common/entity/common.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { AmountProductEntity } from '../../shopping-card/entites/amount-product.entity';

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

  @OneToMany(() => AmountProductEntity, (card) => card.product, {
    onDelete: 'CASCADE',
  })
  amountShopCard: AmountProductEntity[];
}
