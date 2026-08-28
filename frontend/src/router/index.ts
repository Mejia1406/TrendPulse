import { createRouter, createWebHistory } from 'vue-router';

import { configureRouterGuards } from './guards';
import { adminRoutes } from './admin/adminRoutes';

import HomeView from '../views/HomeView.vue';
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
    
    ...adminRoutes,
  ],
});

configureRouterGuards(router);

export default router;
