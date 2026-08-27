<!-- Athina Cappelletti -->
<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/AuthStore';
import { AuthService } from '@/services/AuthService';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const currentUser = computed(() => authStore.currentUser);
const isAdmin = computed(() => currentUser.value?.role === 'admin');

const navItems = [
  { label: 'Home', to: '/home' },
  { label: 'Tendencias', to: '/tendencias' },
  { label: 'Comparar', to: '/comparar' },
];

const adminItems = [
  { label: 'Redes', to: '/admin/redes' },
  { label: 'Usuarios', to: '/admin/usuarios' },
];

const handleLogout = () => {
  AuthService.logout();
  router.push('/login');
};
</script>

<template>
  <header class="border-b border-slate-800 bg-slate-950/90 backdrop-blur">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
      <RouterLink to="/home" class="flex items-center gap-3">
        <div class="grid h-10 w-10 place-items-center rounded-xl bg-teal-400 font-bold text-slate-950">
          TP
        </div>
        <span class="text-xl font-bold">
          Trend<span class="text-teal-400">Pulse</span>
        </span>
      </RouterLink>

      <nav class="hidden items-center gap-2 md:flex">
        <RouterLink v-for="item in navItems" :key="item.to" :to="item.to"
          class="rounded-lg px-4 py-2 text-sm font-medium transition" :class="route.path === item.to
              ? 'bg-slate-800 text-white'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            ">
          {{ item.label }}
        </RouterLink>

        <RouterLink v-if="isAdmin" v-for="item in adminItems" :key="item.to" :to="item.to"
          class="rounded-lg px-4 py-2 text-sm font-medium transition" :class="route.path === item.to
              ? 'bg-teal-500/20 text-teal-300'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            ">
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="flex items-center gap-3">
        <div v-if="currentUser" class="text-right">
          <p class="text-sm font-semibold">{{ currentUser.name }}</p>
          <p class="text-xs text-slate-400">
            {{ currentUser.role === 'admin' ? 'Administrador' : 'Usuario' }}
          </p>
        </div>

        <button v-if="currentUser" type="button" aria-label="Salir"
          class="inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 disabled:pointer-events-none disabled:opacity-50"
          @click="handleLogout">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"
            aria-hidden="true">
            <path d="m16 17 5-5-5-5"></path>
            <path d="M21 12H9"></path>
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>