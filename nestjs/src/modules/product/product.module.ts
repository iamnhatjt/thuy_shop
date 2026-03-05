import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { CategoryEntity } from '../category/entities/category.entity';
import { AmountProductEntity } from '../shopping-card/entities/amount-product.entity';
import { FileEntity } from '../file/entities/file.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductAdminController } from './product-admin.controller';
import { FileModule } from '../file/file.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      CategoryEntity,
      AmountProductEntity,
      FileEntity,
    ]),
    FileModule,
  ],
  controllers: [ProductController, ProductAdminController],
  providers: [ProductService],
})
export class ProductModule {}
