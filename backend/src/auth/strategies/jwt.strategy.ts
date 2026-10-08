// Athina Cappelletti, Samuel Moncada, Sara Hurtado
// external imports
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// internal imports
import type { JwtPayload } from '../interfaces/jwt-payload.interface.js';
import { UsersService } from '../../users/users.service.js';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET!,
    });
  }

  async validate(payload: JwtPayload): Promise<{
    id: number;
    email: string;
    name: string;
    role: string;
  }> {
    const user = await this.usersService.findOne(payload.sub);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }
}
