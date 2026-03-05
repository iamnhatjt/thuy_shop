import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CategoryEntity } from '../category/entities/category.entity';
import { FileEntity } from '../file/entities/file.entity';
import { FileService } from '../file/file.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo: Repository<CategoryEntity>,
    @InjectRepository(FileEntity)
    private readonly fileRepo: Repository<FileEntity>,
    private readonly fileService: FileService,
  ) {}

  async create(dto: CreateProductDto): Promise<any> {
    const { categoryIds, imageIds, ...productData } = dto;

    const product = this.productRepo.create({
      ...productData,
      isActive: dto.isActive ?? true,
      amount: dto.amount ?? 0,
      view: 0,
    });

    if (categoryIds?.length) {
      product.categories = await this.categoryRepo.findBy({
        id: In(categoryIds),
      });
    }

    if (imageIds?.length) {
      product.images = await this.fileRepo.findBy({ id: In(imageIds) });
    }

    const saved = await this.productRepo.save(product);
    return this.toPlainWithImageUrls(saved);
  }

  async findAll(pagination: PaginationDto) {
    const { pageNum, pageSize } = pagination;
    const skip = (pageNum - 1) * pageSize;

    const [data, totalCount] = await this.productRepo.findAndCount({
      relations: ['images', 'categories'],
      order: { createdAt: 'DESC' },
      skip,
      take: pageSize,
    });

    const plainData = await Promise.all(
      data.map((p) => this.toPlainWithImageUrls(p)),
    );

    return { data: plainData, totalCount };
  }

  async findAllActive(pagination: PaginationDto) {
    const { pageNum, pageSize } = pagination;
    const skip = (pageNum - 1) * pageSize;

    const [data, totalCount] = await this.productRepo.findAndCount({
      where: { isActive: true },
      relations: ['images', 'categories'],
      order: { createdAt: 'DESC' },
      skip,
      take: pageSize,
    });

    const plainData = await Promise.all(
      data.map((p) => this.toPlainWithImageUrls(p)),
    );

    return { data: plainData, totalCount };
  }

  async findOne(id: number): Promise<ProductEntity> {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['images', 'categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async findOneDetail(id: number) {
    const product = await this.findOne(id);

    // Increment view count
    await this.productRepo.update(id, { view: () => 'view + 1' });

    return this.toPlainWithImageUrls(product);
  }

  async update(id: number, dto: UpdateProductDto): Promise<any> {
    const product = await this.findOne(id);
    const { categoryIds, imageIds, ...updateData } = dto;

    Object.assign(product, updateData);

    if (categoryIds !== undefined) {
      product.categories = categoryIds.length
        ? await this.categoryRepo.findBy({ id: In(categoryIds) })
        : [];
    }

    if (imageIds !== undefined) {
      product.images = imageIds.length
        ? await this.fileRepo.findBy({ id: In(imageIds) })
        : [];
    }

    const saved = await this.productRepo.save(product);
    return this.toPlainWithImageUrls(saved);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepo.remove(product);
  }

  /**
   * Converts product to plain object with presigned image URLs.
   */
  private async toPlainWithImageUrls(product: ProductEntity) {
    const images = await Promise.all(
      (product.images ?? []).map((img) => this.fileService.toFileWithUrl(img)),
    );

    return {
      ...product,
      images,
      categories: product.categories?.map((cat) => ({ ...cat })) ?? [],
    };
  }
}
