import type { Router } from 'vue-router';
import { useAuthStore } from '@/stores/AuthStore';

export const configureRouterGuards = (router: Router) => {
  router.beforeEach((to) => {
    const authStore = useAuthStore();

    if (to.meta.guestOnly && authStore.isAuthenticated()) {
      if (authStore.currentUser?.role === 'admin') {
        return { name: 'admin-usuarios' };
      }

      return { name: 'home' };
    }

    if (to.meta.requiresAuth && !authStore.isAuthenticated()) {
      return { name: 'login' };
    }

    if (
      to.meta.requiresAdmin &&
      authStore.currentUser?.role !== 'admin'
    ) {
      return { name: 'home' };
    }

    return true;
  });
};