<script setup lang="ts">
// external imports
import { onMounted, ref } from 'vue';

// internal imports
import SocialMediaStatsCards from '@/components/features/home/SocialMediaStatsCards.vue';
import TrendsBySocialMediaChart from '@/components/charts/home/TrendsBySocialMediaChart.vue';
import TopTrendsList from '@/components/features/home/TopTrendsList.vue';
import { TrendService } from '@/services/TrendService';
import type { TrendStatsBySocialMediaDTO } from '@/dtos/TrendStatsBySocialMediaDTO';
// reactive variables
const topTrendsByViews = ref([]);
const trendStatsBySocialMedia = ref<TrendStatsBySocialMediaDTO[]>([]);
// methods
const getHomeData = async () => {
  topTrendsByViews.value = await TrendService.getTopByViews(5);

  trendStatsBySocialMedia.value =
    await TrendService.getStatsBySocialMedia();
};

// lifecycle
onMounted(() => {
  getHomeData();
});
</script>

<template>
  <main class="min-h-screen bg-slate-950 text-white">
    <div class="mx-auto max-w-7xl px-6 py-8">
      <div class="mb-8">
        <p class="mb-2 text-sm font-semibold text-teal-400">En vivo</p>

        <h1 class="text-4xl font-bold">Pulso de tendencias</h1>

        <p class="mt-2 text-slate-400">
          Lo que está moviéndose ahora mismo en tus redes.
        </p>
      </div>

      <SocialMediaStatsCards :stats="trendStatsBySocialMedia" />

      <section class="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <TrendsBySocialMediaChart :stats="trendStatsBySocialMedia" />

        <TopTrendsList :trends="topTrendsByViews" />
      </section>
    </div>
  </main>
</template>