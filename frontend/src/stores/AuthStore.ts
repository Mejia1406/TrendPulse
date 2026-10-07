// Athina Cappelletti
// external imports
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

// internal imports
import type { UserInterface } from '@/interfaces/UserInterface';

const TOKEN_KEY = 'trendpulse_token';
const USER_KEY = 'trendpulse_user';

export const useAuthStore = defineStore('auth', () => {
  const storedToken = localStorage.getItem(TOKEN_KEY);
  const storedUser = localStorage.getItem(USER_KEY);

  const token = ref<string | null>(storedToken);
  const currentUser = ref<UserInterface | null>(
    storedUser ? (JSON.parse(storedUser) as UserInterface) : null,
  );

  const login = (newToken: string, user: UserInterface): void => {
    token.value = newToken;
    currentUser.value = user;

    localStorage.setItem(TOKEN_KEY, newToken);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  };

  const logout = (): void => {
    token.value = null;
    currentUser.value = null;

    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  const isAuthenticated = computed(() => token.value !== null && currentUser.value !== null);

  return {
    token,
    currentUser,
    login,
    logout,
    isAuthenticated,
  };
});
