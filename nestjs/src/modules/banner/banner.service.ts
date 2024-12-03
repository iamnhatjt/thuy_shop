import { Injectable } from '@nestjs/common';
import { BannerEntity } from './entities/banner.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { generateUUID } from '../../utils';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(BannerEntity)
    private readonly bannerRepo: Repository<BannerEntity>,
    private storageService: StorageService,
  ) {}

  async uploadBanner(file: Express.Multer.File) {
    const url = `banner/${generateUUID(14)}`;

    const newBanner = BannerEntity.create({
      fileName: url,
      isDisable: false,
    });
    await this.storageService.uploadFile(file.buffer, url, file.mimetype);
    await newBanner.save();
  }
}
