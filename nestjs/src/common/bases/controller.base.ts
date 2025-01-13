import { Injectable } from '@nestjs/common';
import { SuccessResponse } from '../dto/success-repsonse.dto';
import { ErrorCodes } from '../errors/error-code.constant';
import { PaginationDto } from '../dto/pagination.dto';

@Injectable()
export class BaseController {
  protected successResponse<T>(data: T) {
    const response: SuccessResponse<T> = {
      data,
      code: ErrorCodes.OK.code,
    };
    return response;
  }

  protected paginationResponse<T>(
    data: T,
    pagination: PaginationDto,
    totalCount: number,
  ) {
    return {
      data,
      pagination: {
        ...pagination,
        totalCount,
      },
      code: ErrorCodes.OK.code,
    };
  }
}
