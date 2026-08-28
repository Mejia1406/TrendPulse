// Samuel Moncada Mejía

import AdminSocialView from '@/views/admin/AdminSocialView.vue';
import AdminUsersView from '@/views/admin/AdminUsersView.vue';

export const adminRoutes = [
  {
    path: '/admin/redes',
    name: 'admin-redes',
    component: AdminSocialView,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/admin/usuarios',
    name: 'admin-usuarios',
    component: AdminUsersView,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
];
