import {
  Injectable,
  InternalServerErrorException,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, FileInfo, FTPResponse, UploadOptions } from 'basic-ftp';
import { ftpsToken } from 'src/config/app.config';
import * as fs from 'node:fs';

@Injectable()
export class FtpsService implements OnModuleInit, OnModuleDestroy {
  private _ftpsClient: Client;

  onModuleInit() {
    console.log('onInit module');
    this._ftpsClient = new Client();
    this._ftpsClient.ftp.verbose = true;
    this._ftpsClient.trackProgress((info) =>
      console.log('logger progerss', info),
    );
  }

  onModuleDestroy() {
    console.log('on module distroy');
    this._ftpsClient.close();
  }

  constructor(private configService: ConfigService) {
    console.log('ftp service constructor');
  }

  async access() {
    const a = await this._ftpsClient.access({
      ...this.configService.get(ftpsToken),
      secureOptions: {
        ca: [fs.readFileSync('pure-ftpd.pem')],
      },
    });
  }

  async list(path?: string): Promise<FileInfo[]> {
    try {
      console.log('start');
      await this.access();
      return await this._ftpsClient.list(path);
    } catch (err) {
      this._ftpsClient.close();
      console.log(err);
      throw new InternalServerErrorException(err);
    } finally {
      this._ftpsClient.close();
    }
  }
  async downloadTo(
    destination: string,
    fromRemotePath: string,
    startAt?: number,
  ): Promise<FTPResponse> {
    try {
      await this.access();
      return await this._ftpsClient.downloadTo(
        destination,
        fromRemotePath,
        startAt,
      );
    } catch (err) {
      this._ftpsClient.close();
      throw err;
    } finally {
      this._ftpsClient.close();
    }
  }

  async upload(
    source: string,
    toRemotePath: string,
    options?: UploadOptions,
  ): Promise<FTPResponse> {
    try {
      await this.access();
      return await this._ftpsClient.uploadFrom(source, toRemotePath, options);
    } catch (err) {
      this._ftpsClient.close();
      throw new InternalServerErrorException(err);
    } finally {
      this._ftpsClient.close();
    }
  }

  async delete(fileRemotePath: string): Promise<FTPResponse> {
    try {
      await this.access();
      return await this._ftpsClient.remove(fileRemotePath);
    } catch (err) {
      this._ftpsClient.close();
      throw err;
    } finally {
      this._ftpsClient.close();
    }
  }
  async size(fileRemotePath: string): Promise<number> {
    try {
      await this.access();
      return await this._ftpsClient.size(fileRemotePath);
    } catch (err) {
      this._ftpsClient.close();
      throw err;
    } finally {
      this._ftpsClient.close();
    }
  }
}
