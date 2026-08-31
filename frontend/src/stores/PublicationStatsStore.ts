// Samuel Moncada Mejía
// external imports
import { defineStore } from 'pinia';
import { ref } from 'vue';

// internal imports
import type { PublicationStatsInterface } from '@/interfaces/PublicationStatsInterface';

export const usePublicationStatsStore = defineStore('publicationStats', () => {
  const publicationStats = ref<PublicationStatsInterface[]>([]);

  return {
    publicationStats,
  };
});
