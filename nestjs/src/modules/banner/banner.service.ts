import { Injectable } from '@nestjs/common';
import { BannerEntity } from './entities/banner.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { generateUUID } from '../../utils';
import { StorageService } from '../storage/storage.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { plainToInstance } from 'class-transformer';
import { ListBannerDto } from './dtos/list-banner.dto';
import { AppException } from '../../common/exceptions/app.exception';
import { ErrorCodes } from '../../common/errors/error-code.constant';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(BannerEntity)
    private readonly bannerRepo: Repository<BannerEntity>,
    private storageService: StorageService,
  ) {}

  async uploadBanner(file: Express.Multer.File) {
    const url = `banner/${generateUUID(14)}`;

    await this.storageService.uploadFile(file.buffer, url, 'image/jpeg');
    const newBanner = BannerEntity.create({
      fileName: url,
      isDisable: false,
      url: await this.storageService.getPresignedUrl(url),
    });
    await newBanner.save();
  }

  async getListBanners(
    pagination: PaginationDto,
  ): Promise<[ListBannerDto[], number]> {
    const [listBanner, total] = await this.bannerRepo
      .createQueryBuilder('banner')
      .skip(pagination.pageSize * (pagination.pageNum - 1))
      .take(pagination.pageSize)
      .getManyAndCount();
    return [plainToInstance(ListBannerDto, listBanner), total];
  }

  async deleteBanner(id: number): Promise<void> {
    const banner: BannerEntity | undefined = await this.bannerRepo.findOne({
      where: {
        id: id,
      },
    });

    if (!banner) {
      throw new AppException(ErrorCodes.FORBIDDEN);
    }

    await banner.remove();
  }
}
