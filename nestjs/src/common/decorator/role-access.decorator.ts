import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { KEY_GUARD } from '../guards/key.guard';
import { RolesGuard } from '../guards/role.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/config/jwt/guards/jwt-auth.guard';
import { UserRoleEnum } from 'src/modules/user/enums/user-role.enum';

export const RoleAccess = (roles: UserRoleEnum[]) =>
  applyDecorators(
    ApiBearerAuth(),
    SetMetadata(KEY_GUARD.roles, roles),
    UseGuards(JwtAuthGuard, RolesGuard),
  );
