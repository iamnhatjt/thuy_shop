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
      .leftJoinAndSelect('product.images', 'images')
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
      relations: ['images'],
    });
  }

  async createProduct(dto: ProductDto, listImage: Express.Multer.File[]) {
    const newProduct = ProductEntity.create({
      ...dto,
    });
    const uploadPromises = listImage.map(async (image) => {
      const url = `product/${generateUUID(14)}`;
      await this.storageService.uploadFile(image.buffer, url, image.mimetype);
      const newImage = ProductImageEntity.create({
        url,
      });
      return newImage;
    });
    const newImages = await Promise.all(uploadPromises);
    if (!newProduct.images) {
      newProduct.images = [];
    }
    newProduct.images.push(...newImages);
    await newProduct.save();
    return newProduct;
  }
}
