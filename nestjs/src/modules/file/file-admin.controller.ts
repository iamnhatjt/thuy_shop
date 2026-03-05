import {
  Controller,
  Post,
  Delete,
  Body,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { RoleAccess } from '../../common/decorator/role-access.decorator';
import { BaseController } from '../../common/bases/controller.base';
import { UserRoleEnum } from '../user/enums/user-role.enum';
import { FileService } from './file.service';

@ApiTags('File Admin')
@Controller('admin/file')
@RoleAccess([UserRoleEnum.ADMIN])
export class FileAdminController extends BaseController {
  constructor(private readonly fileService: FileService) {
    super();
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 10))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
        },
      },
    },
  })
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    const res = await this.fileService.uploadMultiple(files);
    return this.successResponse(res);
  }

  @Delete()
  async deleteFiles(@Body() body: { ids: number[] }) {
    await this.fileService.deleteMultiple(body.ids);
    return this.successResponse({});
  }
}
