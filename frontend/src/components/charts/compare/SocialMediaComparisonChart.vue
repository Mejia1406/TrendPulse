<!-- Samuel Moncada, Sara Hurtado -->
<script setup lang="ts">
// external imports
import { computed, ref, watch } from 'vue';
import type { ChartData } from 'chart.js';

// internal imports
import BaseBarChart from '@/components/charts/BaseBarChart.vue';

// props
const props = defineProps<{
  comparisonRows: {
    name: string;
    likesCount: number;
    commentsCount: number;
    sharesCount: number;
  }[];
}>();

// reactive variables
const chartKey = ref(0);

// watchers
watch(
  () => props.comparisonRows,
  () => {
    chartKey.value++;
  },
  {
    deep: true,
  },
);

// chart data configuration
const chartData = computed<ChartData<'bar'>>(() => ({
  labels: props.comparisonRows.map(
    (socialMedia) => socialMedia.name,
  ),

  datasets: [
    {
      label: 'Likes',
      data: props.comparisonRows.map(
        (socialMedia) => socialMedia.likesCount,
      ),
      backgroundColor: '#14b8a6',
      borderRadius: 5,
    },

    {
      label: 'Comentarios',
      data: props.comparisonRows.map(
        (socialMedia) => socialMedia.commentsCount,
      ),
      backgroundColor: '#f97316',
      borderRadius: 5,
    },

    {
      label: 'Compartidos',
      data: props.comparisonRows.map(
        (socialMedia) => socialMedia.sharesCount,
      ),
      backgroundColor: '#c84fd2',
      borderRadius: 5,
    },
  ],
}));
</script>

<template>
  <BaseBarChart
    title="Likes vs. comentarios vs. compartidos"
    :chart-data="chartData"
    :chart-key="chartKey"
    :empty="comparisonRows.length === 0"
    empty-message="Selecciona al menos una red social."
  />
</template>