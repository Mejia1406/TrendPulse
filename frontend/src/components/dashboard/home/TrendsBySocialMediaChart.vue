<!-- Sara Hurtado -->
<script setup lang="ts">
// external imports
import { Bar } from 'vue-chartjs';
import { computed } from 'vue';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from 'chart.js';

// internal imports
import BaseCard from '@/components/common/BaseCard.vue';
import { FormatNumber } from '@/utils/formatters/formatNumber';

// register chart components
ChartJS.register(
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
);

// props
const props = defineProps<{
  stats: any[];
}>();

// chart data configuration
const chartData = computed<ChartData<'bar'>>(() => ({
  labels: props.stats.map(
    (trendSocialMediaStats) =>
      trendSocialMediaStats.name,
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

// chart options configuration
const chartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      position: 'bottom',

      labels: {
        color: '#94a3b8',
      },
    },

    tooltip: {
      callbacks: {
        label: (context) => {
          return `${context.dataset.label}: ${
            FormatNumber.format(
              Number(context.raw),
            )
          }`;
        },
      },
    },
  },

  scales: {
    x: {
      ticks: {
        color: '#94a3b8',
      },

      grid: {
        color: '#1e293b',
      },
    },

    y: {
      beginAtZero: true,
      ticks: {
        color: '#94a3b8',
        callback: (value) => {
          return FormatNumber.format(
            Number(value),
          );
        },
      },

      grid: {
        color: '#1e293b',
      },
    },
  },
};
</script>

<template>
  <BaseCard class="lg:col-span-2">
    <h2 class="mb-6 text-xl font-semibold">
      Tendencias por red social
    </h2>

    <div class="h-87.5">
      <Bar
        :data="chartData"
        :options="chartOptions"
      />
    </div>
  </BaseCard>
</template>