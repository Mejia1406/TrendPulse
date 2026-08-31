// Athina Cappelletti
// external imports
import { defineStore } from 'pinia';
import { ref } from 'vue';

// internal imports
import type { UserInterface } from '@/interfaces/UserInterface';

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref<UserInterface | null>(null);

  const login = (user: UserInterface) => {
    currentUser.value = user;
  };

  const logout = () => {
    currentUser.value = null;
  };

  const isAuthenticated = () => {
    return currentUser.value !== null;
  };

  return {
    currentUser,
    login,
    logout,
    isAuthenticated,
  };
});