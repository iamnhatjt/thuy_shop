import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { KEY_GUARD } from './key.guard';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      KEY_GUARD.roles,
      [context.getHandler(), context.getClass()],
    );

    const { user } = context.switchToHttp().getRequest();
    const userRole = user?.role;

    return requiredRoles.includes(userRole);
  }
}
