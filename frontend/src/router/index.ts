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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },

    { path: '/admin/redes', name: 'admin-redes', component: AdminSocialView, meta: { requiresAuth: true, requiresAdmin: true } },
    { path: '/admin/usuarios', name: 'admin-usuarios', component: AdminUsersView, meta: { requiresAuth: true, requiresAdmin: true } },
    { path: '/login', name: 'login', component: LoginView },
    {path: '/home', name: 'home', component: HomeView, meta: { requiresAuth: true } },
  ],
});

configureRouterGuards(router);

export default router;
