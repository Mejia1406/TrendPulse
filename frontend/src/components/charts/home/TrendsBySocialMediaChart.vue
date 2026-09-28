<!-- Sara Hurtado -->
<script setup lang="ts">
// external imports
import { computed } from 'vue';
import type { ChartData } from 'chart.js';

// internal imports
import BaseBarChart from '@/components/charts/BaseBarChart.vue';

// props
const props = defineProps<{
  stats: {
    name: string;
    likesCount: number;
    viewsCount: number;
  }[];
}>();

// chart data configuration
const chartData = computed<ChartData<'bar'>>(() => ({
  labels: props.stats.map(
    (trendSocialMediaStats) => trendSocialMediaStats.name,
  ),

  datasets: [
    {
      label: 'Likes',
      data: props.stats.map(
        (trendSocialMediaStats) =>
          trendSocialMediaStats.likesCount,
      ),
      backgroundColor: '#14b8a6',
      borderRadius: 5,
    },

    {
      label: 'Vistas',
      data: props.stats.map(
        (trendSocialMediaStats) =>
          trendSocialMediaStats.viewsCount,
      ),
      backgroundColor: '#f97316',
      borderRadius: 5,
    },
  ],
}));
</script>

<template>
  <BaseBarChart
    title="Tendencias por red social"
    :chart-data="chartData"
    height-class="h-87.5"
    card-class="lg:col-span-2"
  />
</template>