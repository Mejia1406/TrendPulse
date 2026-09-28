<!-- Athina Cappelletti -->
<script setup lang="ts">
// external imports
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';

// internal imports
import AppHeader from '@/components/layout/AppHeader.vue';

//variables
const route = useRoute();

// computed variables
const showHeader = computed(() => route.name !== 'login');
</script>

<template>
  <div class="min-h-screen bg-slate-950 text-white">
    <AppHeader v-if="showHeader" />
    <RouterView />
  </div>
</template>
