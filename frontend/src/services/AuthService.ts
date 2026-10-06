// Athina Cappelletti
// internal imports
import api from '@/services/apiClient';

import type { LoginDTO } from '@/dtos/LoginDTO';
import type { UserInterface } from '@/interfaces/UserInterface';
import { useAuthStore } from '@/stores/AuthStore';

export interface LoginResponse {
  access_token: string;
  user: UserInterface;
}

export class AuthService {
  static async login(credentials: LoginDTO): Promise<UserInterface | null> {
    try {
      const { data } = await api.post<LoginResponse>('/auth/login', credentials);
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
      const { data } = await api.get<UserInterface>('/auth/profile');
      return data;
    } catch {
      return null;
    }
  }
}
