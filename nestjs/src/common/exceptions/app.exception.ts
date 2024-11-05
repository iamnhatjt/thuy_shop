import { HttpException } from '@nestjs/common';
import { ErrorCode } from '../errors/error-code.constant';

export class AppException extends HttpException {
  constructor(errorCode: ErrorCode) {
    super(errorCode.code, errorCode.status, {});
  }
}
