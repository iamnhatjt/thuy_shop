import { Module } from '@nestjs/common';
import { FtpsService } from './ftps.service';
import { FtpsController } from './ftps.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [FtpsController],
  providers: [FtpsService],
})
export class FtpsModule {}
