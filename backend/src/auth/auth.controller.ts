// Athina Cappelletti, Samuel Moncada, Sara Hurtado
// external imports
import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

// internal imports
import { AuthService } from './auth.service.js';
import { LocalAuthGuard } from './guards/local-auth.guard.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: {
    user: {
      id: number;
      email: string;
      name: string;
      role: string;
    };
  }): Promise<{
    access_token: string;
    user: {
      id: number;
      email: string;
      name: string;
      role: string;
    };
  }> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: {
    user: {
      id: number;
      email: string;
      name: string;
      role: string;
    };
  }): {
    id: number;
    email: string;
    name: string;
    role: string;
  } {
    return req.user;
  }
}
