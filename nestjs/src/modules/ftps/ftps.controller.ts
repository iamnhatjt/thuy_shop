import {
  Controller,
  Get,
  OnModuleDestroy,
  OnModuleInit,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FtpsService } from './ftps.service';
import { Client } from 'basic-ftp';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('FTP')
@Controller('ftps')
export class FtpsController {
  constructor(private ftpsService: FtpsService) {}

  // @Post('updateload')
  // @ApiOperation({summary: 'Upload file to Fpts server'})
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       file: {
  //         type: 'string',
  //         format: 'binary',
  //       },
  //     },
  //   },
  // })
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadFile(@UploadedFile() file){
  //   this.ftpsService.upload('/', toRemotePath)
  // }

  @Get('')
  @Public()
  async getList() {
    return await this.ftpsService.list();
  }
}
