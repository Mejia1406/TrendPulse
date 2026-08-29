// Athina Cappelletti
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { TrendInterface } from '@/interfaces/TrendInterface';
import { trendSeeder } from '@/seeders/TrendSeeder';

export const useTrendStore = defineStore('trend', () => {
  const trends = ref<TrendInterface[]>([...trendSeeder]);

  return { trends };
});