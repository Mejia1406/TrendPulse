<!-- Sara Hurtado -->
<script setup lang="ts">
// external imports
import { Bar } from 'vue-chartjs';
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
import { formatNumber } from '@/utils/formatters/formatNumber';

// register chart components
ChartJS.register(
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  Tooltip,
);

// props
withDefaults(
  defineProps<{
    title: string;
    chartData: ChartData<'bar'>;
    empty?: boolean;
    emptyMessage?: string;
    heightClass?: string;
    cardClass?: string;
    chartKey?: number;
  }>(),
  {
    empty: false,
    emptyMessage: 'No hay datos disponibles.',
    heightClass: 'h-97.5',
    cardClass: '',
    chartKey: 0,
  },
);

// chart options configuration
const chartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,

  animation: {
    duration: 1000,
    easing: 'easeOutQuart',
  },

  plugins: {
    legend: {
      position: 'bottom',

      labels: {
        color: '#cbd5e1',
        padding: 20,
      },
    },

    tooltip: {
      callbacks: {
        label: (context) => {
          return `${context.dataset.label}: ${formatNumber.format(
            Number(context.raw),
          )}`;
        },
      },
    },
  },

  scales: {
    x: {
      ticks: {
        color: '#7dd3fc',
      },

      grid: {
        color: '#15303a',
      },
    },

    y: {
      beginAtZero: true,

      ticks: {
        color: '#7dd3fc',

        callback: (value) => {
          return formatNumber.format(Number(value));
        },
      },

      grid: {
        color: '#15303a',
      },
    },
  },
};
</script>

<template>
  <BaseCard :class="cardClass">
    <h2 class="mb-6 text-lg font-semibold">
      {{ title }}
    </h2>

    <div v-if="!empty" :class="heightClass">
      <Bar
        :key="chartKey"
        :data="chartData"
        :options="chartOptions"
      />
    </div>

    <div
      v-else
      :class="[
        heightClass,
        'grid place-items-center text-slate-400',
      ]"
    >
      {{ emptyMessage }}
    </div>
  </BaseCard>
</template>