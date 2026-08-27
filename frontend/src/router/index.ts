import { createRouter, createWebHistory } from 'vue-router';
import { configureRouterGuards } from './guards';

import HomeView from '../views/HomeView.vue';
import AdminSocialView from '@/views/admin/AdminSocialView.vue';
import AdminUsersView from '@/views/admin/AdminUsersView.vue';
import LoginView from '@/views/LoginView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      // sin meta
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/redes',
      name: 'admin-redes',
      component: AdminSocialView,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/admin/usuarios',
      name: 'admin-usuarios',
      component: AdminUsersView,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
  ],
});

configureRouterGuards(router);

export default router;
