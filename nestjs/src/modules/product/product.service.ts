import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
  ) {}

  async getPaginationProduct(
    pagination: PaginationDto,
  ): Promise<[ProductEntity[], number]> {
    const queryBuilder = this.productRepo
      .createQueryBuilder('product')
      .orderBy('product.createdAt', 'DESC');

    return queryBuilder
      .skip(pagination.pageSize * (pagination.pageNum - 1))
      .take(pagination.pageSize)
      .getManyAndCount();
  }

  async getDetailProduct(id: number): Promise<ProductEntity> {
    return this.productRepo.findOne({
      where: {
        id: id,
      },
    });
  }
}
