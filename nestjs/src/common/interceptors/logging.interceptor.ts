import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger(LoggingInterceptor.name, { timestamp: false });

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const call$ = next.handle();
    const request = context.switchToHttp().getRequest();
    const content = `${request.method} -> ${request.url}`;
    const isSse = request.headers.accept === 'text/event-stream';
    this.logger.debug(`+++Incoming request：${content}`);
    const now = Date.now();

    return call$.pipe(
      tap(() => {
        if (isSse) return;
        this.logger.debug(
          `---OutGoing Response：${content}${` +${Date.now() - now}ms`}`,
        );
      }),
      catchError((err) => {
        this.logger.error(
          `Error occurred during ${content} after ${Date.now() - now}ms`,
          err.message,
        );
        return throwError(() => err);
      }),
    );
  }
}
