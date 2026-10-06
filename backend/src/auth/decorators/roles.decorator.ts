// Athina Cappelletti, Samuel Moncada, Sara Hurtado
// external imports
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
