import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { __PUBLIC_API__ } from '../auth.contants';

@Injectable()
export class ResourceGuard implements CanActivate {
  constructor(private reflect: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflect.get<boolean>(
      __PUBLIC_API__,
      context.getHandler(),
    );
    if (isPublic) return true;
  }
}
