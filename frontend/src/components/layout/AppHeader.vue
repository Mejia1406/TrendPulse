<!-- Athina Cappelletti -->
<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/AuthStore';

const route = useRoute();
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
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="rounded-lg px-4 py-2 text-sm font-medium transition"
          :class="
            route.path === item.to
              ? 'bg-slate-800 text-white'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          "
        >
          {{ item.label }}
        </RouterLink>

        <RouterLink
          v-if="isAdmin"
          v-for="item in adminItems"
          :key="item.to"
          :to="item.to"
          class="rounded-lg px-4 py-2 text-sm font-medium transition"
          :class="
            route.path === item.to
              ? 'bg-teal-500/20 text-teal-300'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          "
        >
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

        <button
          v-if="currentUser"
          type="button"
          class="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800"
        >
          Salir
        </button>
      </div>
    </div>
  </header>
</template>