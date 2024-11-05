import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import logger from 'src/config/logs/log';
import { AppException } from '../exceptions/app.exception';
import { ErrorCodes } from '../errors/error-code.constant';
import { ErrorResponse } from '../dto/error.dto';
import { Response, Request } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  constructor() {}

  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    logger.error(
      `${request['requestId']} ${request.method} ${request.url}`,
      exception,
    );
    logger.error(exception);
    if (exception instanceof AppException) {
      const errorCode = exception.getResponse() as string;
      const errorResponse: ErrorResponse = {
        code: ErrorCodes[errorCode].code,
        message: ErrorCodes[errorCode].msg,
        timestamp: new Date().toISOString(),
        path: request.url,
      };
      response.status(status).json(errorResponse);
    } else if (exception instanceof HttpException) {
      let code = ErrorCodes.INTERNAL_SERVER_ERROR.code;
      switch (exception.constructor) {
        case BadRequestException:
          code = ErrorCodes.BAD_REQUEST.code;
          break;
        case UnauthorizedException:
          code = ErrorCodes.UNAUTHORIZED.code;
          break;
        case ForbiddenException:
          code = ErrorCodes.FORBIDDEN.code;
          break;
        default:
          code = ErrorCodes.INTERNAL_SERVER_ERROR.code;
      }
      const errorResponse: ErrorResponse = {
        code: code,
        message: exception.message,
        timestamp: new Date().toISOString(),
        path: request.url,
      };
      response.status(status).json(errorResponse);
    } else {
      const errorResponse: ErrorResponse = {
        code: ErrorCodes.INTERNAL_SERVER_ERROR.code,
        message: exception.message,
        timestamp: new Date().toISOString(),
        path: request.url,
      };
      response.status(status).json(errorResponse);
    }
  }
}
