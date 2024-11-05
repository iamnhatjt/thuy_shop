import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { KEY_GUARD } from '../guards/key.guard';
import { RolesGuard } from '../guards/role.guard';

export const RoleAccess = (roles: string[]) =>
  applyDecorators(SetMetadata(KEY_GUARD.roles, roles), UseGuards(RolesGuard));
