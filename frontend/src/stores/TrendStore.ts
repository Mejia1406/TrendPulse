// Athina Cappelletti

// external imports
import { defineStore } from 'pinia';
import { ref } from 'vue';

// internal imports
import type { TrendInterface } from '@/interfaces/TrendInterface';

export const useTrendStore = defineStore('trend', () => {
  const trends = ref<TrendInterface[]>([]);

  return { trends };
});
