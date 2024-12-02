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

  async uploadFile(
    dataBuffer: Buffer,
    objectName: string,
    mimeType: string,
  ): Promise<void> {
    const bucketName = this.minioConfig.bucketName;
    await this.minioService.client.putObject(
      bucketName,
      objectName,
      dataBuffer,
      {
        'Content-Type': mimeType,
      },
    );
  }

  async getPresignedUrl(objectName: string) {
    const { bucketName, presignedTimeOut } = this.minioConfig;

    return await this.minioService.client.presignedGetObject(
      bucketName,
      objectName,
      parseInt(presignedTimeOut ?? '3600'),
    );
  }
}
