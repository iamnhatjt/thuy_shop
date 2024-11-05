import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { IMinIoConfig, MinIoConfig } from '../../config/app.config';
import logger from '../../config/logs/log';

@Injectable()
export class StorageService implements OnModuleInit {
  constructor(
    @Inject(MinIoConfig.KEY)
    private readonly minioConfig: IMinIoConfig,
    private readonly minioService: MinioService,
  ) {}

  async onModuleInit() {
    const bucketName = this.minioConfig.bucketName;
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
