// Athina Cappelletti, Samuel Moncada, Sara Hurtado
// external imports
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
