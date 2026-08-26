// Athina Cappelletti
import type { LoginDTO } from '@/dtos/LoginDTO';
import type { UserInterface } from '@/interfaces/UserInterface';
import { useUserStore } from '@/stores/UserStore';
import { useAuthStore } from '@/stores/AuthStore';

export class AuthService {
  static login(credentials: LoginDTO): UserInterface | null {
    const userStore = useUserStore();

    const user = userStore.users.find(
      (existingUser) =>
        existingUser.email === credentials.email &&
        existingUser.password === credentials.password,
    );

    if (!user) {
      return null;
    }

    useAuthStore().login(user);

    return user;
  }

  static logout(): void {
    useAuthStore().logout();
  }
}