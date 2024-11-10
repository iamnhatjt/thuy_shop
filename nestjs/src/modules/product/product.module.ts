import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { AmountProductEntity } from '../shopping-card/entites/amount-product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, AmountProductEntity])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
