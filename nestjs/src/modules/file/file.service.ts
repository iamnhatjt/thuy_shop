import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { FileEntity } from './entities/file.entity';
import { StorageService } from '../storage/storage.service';
import { generateUUID } from '../../utils/tool.util';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepo: Repository<FileEntity>,
    private readonly storageService: StorageService,
  ) {}

  async uploadMultiple(files: Express.Multer.File[]): Promise<any[]> {
    const results = await Promise.all(
      files.map(async (file) => {
        const objectName = `uploads/${generateUUID(14)}-${file.originalname}`;
        await this.storageService.uploadFile(
          file.buffer,
          objectName,
          file.mimetype,
        );

        const entity = this.fileRepo.create({
          url: objectName,
          originalName: file.originalname,
          mimetype: file.mimetype,
        });

        const saved = await this.fileRepo.save(entity);
        const imageUrl = await this.storageService
          .getPresignedUrl(saved.url)
          .catch(() => null);

        return {
          id: saved.id,
          url: saved.url,
          originalName: saved.originalName,
          mimetype: saved.mimetype,
          imageUrl,
        };
      }),
    );

    return results;
  }

  async deleteMultiple(ids: number[]): Promise<void> {
    const files = await this.fileRepo.findBy({ id: In(ids) });
    if (files.length === 0) {
      throw new NotFoundException('No files found for the given IDs');
    }
    await this.fileRepo.remove(files);
  }

  async findByIds(ids: number[]): Promise<FileEntity[]> {
    return this.fileRepo.findBy({ id: In(ids) });
  }

  async toFileWithUrl(file: FileEntity) {
    const imageUrl = await this.storageService
      .getPresignedUrl(file.url)
      .catch(() => null);

    return {
      id: file.id,
      url: file.url,
      originalName: file.originalName,
      mimetype: file.mimetype,
      imageUrl,
    };
  }
}
