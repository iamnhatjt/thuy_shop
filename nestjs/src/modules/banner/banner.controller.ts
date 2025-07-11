import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../common/bases/controller.base';
import { PaginationResponse } from '../../common/decorator/pagination-response.decoration';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { FileUploadDto } from '../../common/dto/upload-file.dto';
import { BannerService } from './banner.service';
import { ListBannerDto } from './dtos/list-banner.dto';

@ApiTags('banner')
@Controller('banner')
export class BannerController extends BaseController {
  constructor(private readonly bannerService: BannerService) {
    super();
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
  })
  // @RoleAccess([UserRoleEnum.ADMIN])
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    await this.bannerService.uploadBanner(file);
    return this.successResponse({});
  }

  @PaginationResponse(ListBannerDto)
  @Get('')
  async getListBanner(
    @Query()
    pagination: PaginationDto,
  ) {
    const [data, totalCount] =
      await this.bannerService.getListBanners(pagination);
    return this.paginationResponse(data, pagination, totalCount);
  }

  // @RoleAccess([UserRoleEnum.ADMIN])
  @Delete(':id')
  async deleteBanner(@Param('id') id: string) {
    await this.bannerService.deleteBanner(+id);
    return this.successResponse({});
  }
}
