import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BannerService } from './banner.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { BaseController } from '../../common/bases/controller.base';
import { FileUploadDto } from '../../common/dto/upload-file.dto';
import { Public } from '../auth/decorators/public.decorator';
import { ListBannerDto } from './dtos/list-banner.dto';
import { PaginationResponse } from '../../common/decorator/pagination-response.decoration';
import { ApiResult } from '../../common/decorator/api-result.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { RoleAccess } from '../../common/decorator/role-access.decorator';
import { UserRoleEnum } from '../user/enums/user-role.enum';

@ApiTags('banner')
@Controller('banner')
export class BannerController extends BaseController {
  constructor(private readonly bannerService: BannerService) {
    super();
  }

  @ApiResult(Object)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
  })
  @Post('')
  @RoleAccess([UserRoleEnum.ADMIN])
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    await this.bannerService.uploadBanner(file);
    return this.successResponse({});
  }

  @PaginationResponse(ListBannerDto)
  @Get('')
  @Public()
  async getListBanner(@Query() pagination: PaginationDto) {
    const [data, totalCount] =
      await this.bannerService.getListBanners(pagination);
    return this.paginationResponse(data, pagination, totalCount);
  }
}
