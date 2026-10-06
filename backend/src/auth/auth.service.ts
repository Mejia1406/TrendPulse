// Athina Cappelletti, Samuel Moncada, Sara Hurtado
// external imports
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

// internal imports
import { UsersService } from '../users/users.service.js';
import type { JwtPayload } from './interfaces/jwt-payload.interface.js';
import type { User } from '../users/entities/user.entity.js';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<Partial<User> | null> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    const { password: _password, ...result } = user;

    return result;
  }

  async login(user: {
    id: number;
    email: string;
    name: string;
    role: string;
  }): Promise<{
    access_token: string;
    user: {
      id: number;
      email: string;
      name: string;
      role: string;
    };
  }> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }
}
