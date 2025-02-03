import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { AmountProductEntity } from '../shopping-card/entities/amount-product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { StorageService } from '../storage/storage.service';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, AmountProductEntity]),
    StorageModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
