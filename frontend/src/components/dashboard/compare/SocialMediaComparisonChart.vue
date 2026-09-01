<!-- Samuel Moncada, Sara Hurtado -->

<script setup lang="ts">

// external imports
import { Bar } from 'vue-chartjs';
import { computed, onActivated, onMounted, ref } from 'vue';
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
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  Tooltip,
);

// props
const props = defineProps<{
  comparisonRows: any[];
}>();

// reactive variables
const chartKey = ref(0);

// lifecycle hooks
onMounted(() => {
  chartKey.value++;
});

onActivated(() => {
  chartKey.value++;
});

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
          const value = Number(context.raw);
          return `${context.dataset.label}: ${FormatNumber.format(value)}`;
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
          return FormatNumber.format(
            Number(value),
          );
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
  <BaseCard>
    <h2 class="mb-6 text-lg font-semibold">
      Likes vs. comentarios vs. compartidos
    </h2>
    <div
    v-if="comparisonRows.length > 0"
    class="h-97.5"
    >
      <Bar
        :key="chartKey"
        :data="chartData"
        :options="chartOptions"
      />
    </div>

    <div
      v-else
      class="grid h-97.5 place-items-center text-slate-400"
    >
      Selecciona al menos una red social.
    </div>
  </BaseCard>
</template>