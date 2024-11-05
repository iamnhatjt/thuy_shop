import { Injectable, OnModuleInit } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { ConfigService } from '@nestjs/config';
import { IMinIoConfig, minIoToken } from '../../config/app.config';
import logger from '../../config/logs/log';

@Injectable()
export class StorageService implements OnModuleInit {
  constructor(
    private readonly minioService: MinioService,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    const bucketName =
      this.configService.get<IMinIoConfig>(minIoToken).bucketName;
    try {
      const bucketExists =
        await this.minioService.client.bucketExists(bucketName);
      if (!bucketExists) {
        await this.minioService.client.makeBucket(bucketName);
      }
    } catch (error) {
      logger.error(error);
    }
  }
}
