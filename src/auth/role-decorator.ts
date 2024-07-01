// src/auth/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const AuthorizedRole = (...roles: string[]) =>
  SetMetadata(ROLES_KEY, roles);
