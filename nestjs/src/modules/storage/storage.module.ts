import { Module } from '@nestjs/common';
import { MinioModule } from 'nestjs-minio-client';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IMinIoConfig, minIoToken } from '../../config/app.config';
import { StorageService } from './storage.service';

@Module({
  imports: [
    MinioModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { endPoint, port, useSSL, accessKey, secretKey } =
          configService.get<IMinIoConfig>(minIoToken);
        return {
          endPoint,
          port,
          useSSL,
          accessKey,
          secretKey,
        };
      },
    }),
  ],
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}
