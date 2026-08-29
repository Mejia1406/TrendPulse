// Athina Cappelletti
import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { TrendInterface } from '@/interfaces/TrendInterface';

export const useTrendStore = defineStore('trend', () => {
  const trends = ref<TrendInterface[]>([]);

  return { trends };
});