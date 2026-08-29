// Athina Cappelletti
import type { Router } from 'vue-router';
import { useAuthStore } from '@/stores/AuthStore';

const redirectByRole = (authStore: ReturnType<typeof useAuthStore>) => {
  if (authStore.currentUser?.role === 'admin') {
    return { name: 'admin-usuarios' as const };
  }
  return { name: 'home' as const };
};

export const configureRouterGuards = (router: Router) => {
  router.beforeEach((to) => {
    const authStore = useAuthStore();

    if (to.meta.guestOnly && authStore.isAuthenticated()) {
      return redirectByRole(authStore);
    }

    if (to.meta.requiresAuth && !authStore.isAuthenticated()) {
      return { name: 'login' };
    }

    if (to.meta.requiresAdmin && authStore.currentUser?.role !== 'admin') {
      // Si está autenticado pero no es admin → mandarlo a su home
      if (authStore.isAuthenticated()) {
        return redirectByRole(authStore);
      }
      return { name: 'login' };
    }

    if (to.name === 'home' && authStore.currentUser?.role === 'admin') {
      return { name: 'admin-usuarios' };
    }

    return true;
  });
};