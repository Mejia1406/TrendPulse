// Athina Cappelleti, Samuel Moncada, Sara Hurtado

import { createRouter, createWebHistory } from 'vue-router';

import { configureRouterGuards } from './guards';
import { adminRoutes } from './admin/adminRoutes';

import HomeView from '../views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import TrendView from '@/views/TrendView.vue';
import CompareView from '@/views/CompareView.vue';


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
      meta: {
        guestOnly: true,
      },
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
      path: '/tendencias',
      name: 'tendencias',
      component: TrendView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/comparar',
      name: 'comparar',
      component: CompareView,
      meta: {
        requiresAuth: true,
      },
    },

    ...adminRoutes,
  ],
});

configureRouterGuards(router);

export default router;
