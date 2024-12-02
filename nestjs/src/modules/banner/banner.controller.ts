import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BannerService } from './banner.service';
import { StorageService } from '../storage/storage.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { generateUUID } from '../../utils';
import { BaseController } from '../../common/bases/controller.base';
import { FileUploadDto } from '../../common/dto/upload-file.dto';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('banner')
@Controller('banner')
export class BannerController extends BaseController {
  constructor(
    private readonly bannerService: BannerService,
    private readonly storageService: StorageService,
  ) {
    super();
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
  })
  @Post('')
  @Public()
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const url = `banner/${generateUUID(14)}`;
    await this.storageService.uploadFile(file.buffer, url, file.mimetype);
    const res = await this.storageService.getPresignedUrl(url);
    return super.successResponse({ res });
  }
}
