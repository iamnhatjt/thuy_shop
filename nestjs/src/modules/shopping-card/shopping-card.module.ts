import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { ShoppingCardController } from './shopping-card.controller';
import { ShoppingCardService } from './shopping-card.service';
import { ShoppingCardEntity } from './entities/shoping-card.entity';
import { AmountProductEntity } from './entities/amount-product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      ShoppingCardEntity,
      AmountProductEntity,
    ]),
  ],
  controllers: [ShoppingCardController],
  providers: [ShoppingCardService],
})
export class ShoppingCardModule {}
