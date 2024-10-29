import { Injectable } from '@nestjs/common';
import { SuccessResponse } from '../dto/success-repsonse.dto';
import { ErrorCodes } from '../errors/error-code.constant';

@Injectable()
export class BaseController {
  protected successResponse<T>(data: T) {
    const response: SuccessResponse<T> = {
      data,
      code: ErrorCodes.OK.code,
    };
    return response;
  }
}
