// Athina Cappelletti

// internal imports
import { BaseService } from '@/services/BaseService';

import type { LoginDTO } from '@/dtos/LoginDTO';
import type { UserInterface } from '@/interfaces/UserInterface';

import { useAuthStore } from '@/stores/AuthStore';

export interface LoginResponse {
  access_token: string;
  user: UserInterface;
}

export class AuthService extends BaseService {
  static async login(credentials: LoginDTO): Promise<UserInterface | null> {
    try {
      const data = await this.httpPost<LoginResponse>('/auth/login', credentials);

      const authStore = useAuthStore();

      authStore.login(data.access_token, data.user);

      return data.user;
    } catch {
      return null;
    }
  }

  static logout(): void {
    const authStore = useAuthStore();

    authStore.logout();
  }

  static async getProfile(): Promise<UserInterface | null> {
    try {
      return await this.httpGet<UserInterface>('/auth/profile');
    } catch {
      return null;
    }
  }
}
