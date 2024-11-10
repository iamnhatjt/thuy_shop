import { CommonEntity } from '../../../common/entity/common.entity';
import { Entity, OneToMany, OneToOne } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { AmountProductEntity } from './amount-product.entity';

@Entity()
export class ShoppingCardEntity extends CommonEntity {
  @OneToOne(() => UserEntity, (user) => user.shoppingCard)
  user: UserEntity;

  @OneToMany(
    () => AmountProductEntity,
    (amountProduct) => amountProduct.shoppingCard,
    {
      onDelete: 'CASCADE',
      eager: true,
    },
  )
  listAmountProducts: AmountProductEntity[];
}
