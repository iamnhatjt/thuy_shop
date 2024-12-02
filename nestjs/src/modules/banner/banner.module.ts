import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerEntity } from './entities/banner.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerController } from './banner.controller';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [TypeOrmModule.forFeature([BannerEntity]), StorageModule],
  controllers: [BannerController],
  providers: [BannerService],
})
export class BannerModule {}
