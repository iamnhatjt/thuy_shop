import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductDto } from './dtos/product.dto';
import { generateUUID } from 'src/utils';
import { StorageService } from '../storage/storage.service';
import { ProductImageEntity } from './entities/product-image.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
    private storageService: StorageService,
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

  async createProduct(dto: ProductDto, listImage: Express.Multer.File[]) {
    const newProduct = ProductEntity.create({
      ...dto,
    });
    for (const image of listImage) {
      const url = `product/${generateUUID(14)}`;
      await this.storageService.uploadFile(image.buffer, url, image.mimetype);
      const newImage = ProductImageEntity.create({
        url,
      });
      newProduct.images.push(newImage);
    }
    await newProduct.save();
    return newProduct;
  }
}
