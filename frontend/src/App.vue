<!-- Athina Cappelletti -->
<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import AppHeader from '@/components/layout/AppHeader.vue';

const route = useRoute();
const showHeader = computed(() => route.name !== 'login');
</script>

<template>
  <div class="min-h-screen bg-slate-950 text-white">
    <AppHeader v-if="showHeader" />
    <RouterView />
  </div>
</template>
