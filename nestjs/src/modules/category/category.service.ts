import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { slugify } from '../../utils/tool.util';
import logger from '../../config/logs/log';

@Injectable()
export class CategoryService implements OnModuleInit {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo: Repository<CategoryEntity>,
  ) {}

  async onModuleInit() {
    await this.seedCategories();
  }

  async create(dto: CreateCategoryDto): Promise<CategoryEntity> {
    let parentUrl = '';
    if (dto.parentId) {
      const parent = await this.categoryRepo.findOne({
        where: { id: dto.parentId },
      });
      if (!parent) {
        throw new NotFoundException(
          `Parent category #${dto.parentId} not found`,
        );
      }
      parentUrl = parent.url;
    }

    const slug = slugify(dto.title);
    const url = parentUrl ? `${parentUrl}/${slug}` : `/${slug}`;

    const category = this.categoryRepo.create({
      title: dto.title,
      url,
      isActive: dto.isActive ?? true,
      parentId: dto.parentId ?? null,
    });

    return this.categoryRepo.save(category);
  }

  async findAll(pagination: PaginationDto) {
    const { pageNum, pageSize } = pagination;
    const skip = (pageNum - 1) * pageSize;

    const [data, totalCount] = await this.categoryRepo.findAndCount({
      where: { parentId: IsNull() },
      relations: ['children'],
      order: { id: 'ASC' },
      skip,
      take: pageSize,
    });

    // Convert to plain objects so ClassSerializerInterceptor doesn't strip nested children
    const plainData = data.map((cat) => ({
      ...cat,
      children: cat.children?.map((child) => ({ ...child })) ?? [],
    }));

    return { data: plainData, totalCount };
  }

  async findAllActive(pagination: PaginationDto) {
    const { pageNum, pageSize } = pagination;
    const skip = (pageNum - 1) * pageSize;

    const [data, totalCount] = await this.categoryRepo.findAndCount({
      where: { isActive: true, parentId: IsNull() },
      relations: ['children'],
      order: { id: 'ASC' },
      skip,
      take: pageSize,
    });

    // Filter out inactive children and convert to plain objects
    const filtered = data.map((cat) => ({
      ...cat,
      children:
        cat.children
          ?.filter((child) => child.isActive)
          .map((child) => ({ ...child })) ?? [],
    }));

    return { data: filtered, totalCount };
  }

  async findOne(id: number): Promise<CategoryEntity> {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: ['children'],
    });

    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    return category;
  }

  async update(id: number, dto: UpdateCategoryDto): Promise<CategoryEntity> {
    const category = await this.findOne(id);

    if (dto.parentId !== undefined && dto.parentId !== null) {
      const parent = await this.categoryRepo.findOne({
        where: { id: dto.parentId },
      });
      if (!parent) {
        throw new NotFoundException(
          `Parent category #${dto.parentId} not found`,
        );
      }
    }

    // Re-generate url if title changes
    if (dto.title) {
      const slug = slugify(dto.title);
      const parentUrl = category.parentId
        ? ((
            await this.categoryRepo.findOne({
              where: { id: category.parentId },
            })
          )?.url ?? '')
        : '';
      dto['url'] = parentUrl ? `${parentUrl}/${slug}` : `/${slug}`;
    }

    Object.assign(category, dto);
    return this.categoryRepo.save(category);
  }

  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);
    await this.categoryRepo.remove(category);
  }

  private async seedCategories(): Promise<void> {
    const count = await this.categoryRepo.count();
    if (count > 0) {
      logger.info('Categories already seeded, skipping');
      return;
    }

    logger.info('Seeding default categories...');

    const seedData = [
      {
        title: 'Chăn Ga Gối đệm',
        url: '/chan-ga-goi-dem',
        children: [
          { title: 'Chăn', url: '/chan-ga-goi-dem/chan' },
          { title: 'Ga', url: '/chan-ga-goi-dem/ga' },
          { title: 'Gối', url: '/chan-ga-goi-dem/goi' },
          { title: 'Đệm', url: '/chan-ga-goi-dem/dem' },
        ],
      },
      {
        title: 'Thực phẩm chay',
        url: '/thuc-pham-chay',
        children: [
          { title: 'Nấm', url: '/thuc-pham-chay/nam' },
          { title: 'Giò chay', url: '/thuc-pham-chay/gio-chay' },
          { title: 'Chả ngộ chay', url: '/thuc-pham-chay/cha-ngo-chay' },
          { title: 'Miến', url: '/thuc-pham-chay/mien' },
        ],
      },
      {
        title: 'Đồ nhựa, đồ gia dụng',
        url: '/do-nhua-do-gia-dung',
        children: [
          { title: 'Chậu', url: '/do-nhua-do-gia-dung/chau' },
          { title: 'Thau', url: '/do-nhua-do-gia-dung/thau' },
          { title: 'Gáo', url: '/do-nhua-do-gia-dung/gao' },
        ],
      },
      {
        title: 'Đồ thủy tinh',
        url: '/do-thuy-tinh',
        children: [
          { title: 'Ấm chén', url: '/do-thuy-tinh/am-chen' },
          { title: 'Bình', url: '/do-thuy-tinh/binh' },
        ],
      },
      { title: 'Thông tin khuyến mãi', url: '/thong-tin-khuyen-mai' },
      { title: 'Bài viết chia sẻ', url: '/bai-viet' },
    ];

    for (const item of seedData) {
      const parent = this.categoryRepo.create({
        title: item.title,
        url: item.url,
        isActive: true,
      });
      const savedParent = await this.categoryRepo.save(parent);

      if (item.children) {
        for (const child of item.children) {
          const childEntity = this.categoryRepo.create({
            title: child.title,
            url: child.url,
            isActive: true,
            parentId: savedParent.id,
          });
          await this.categoryRepo.save(childEntity);
        }
      }
    }

    logger.info('Default categories seeded successfully');
  }
}
