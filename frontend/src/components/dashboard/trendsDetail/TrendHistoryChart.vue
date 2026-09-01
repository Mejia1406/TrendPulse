<!-- Sara Hurtado -->
<script setup lang="ts">

// external imports
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from 'chart.js';

// internal imports
import BaseCard from '@/components/common/BaseCard.vue';
import { FormatNumber } from '@/utils/formatters/formatNumber';

// types
type Stats =
  | 'viewsCount'
  | 'likesCount'
  | 'commentsCount'
  | 'sharesCount';

// register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

// props
const props = defineProps<{
  publicationStats: any[];
  selectedStats: Stats;
  selectorStats: {
    value: Stats;
    label: string;
  }[];
}>();

// emits
const emit = defineEmits<{
  (
    e: 'update:selectedStats',
    value: Stats,
  ): void;
}>();

// computed variables
const selectedStatsLabel = computed(() => {
  return (
    props.selectorStats.find(
      (stats) =>
        stats.value === props.selectedStats,
    )?.label ?? ''
  );
});

// chart data configuration
const chartData = computed<ChartData<'line'>>(() => {
  return {

    labels: props.publicationStats.map(
      (stats) =>
        new Date(
          stats.captureAt,
        ).toLocaleDateString(
          'es-CO',
        ),
    ),

    datasets: [
      {
        label: selectedStatsLabel.value,
        data: props.publicationStats.map(
          (stats) =>
            stats[props.selectedStats],
        ),

        borderColor: '#14b8a6',
        backgroundColor: '#14b8a6',
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };
});

// chart options configuration
const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      display: false,
    },

    tooltip: {
      callbacks: {
        label: (context) => {
          return `${selectedStatsLabel.value}: ${FormatNumber.format(
            Number(context.raw),
          )}`;
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
  <BaseCard class="mt-8">
    <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 class="text-xl font-semibold">
          Histórico
        </h2>

        <p class="mt-1 text-sm text-slate-400">
          Evolución de las estadísticas
          registradas para esta tendencia.
        </p>
      </div>

      <label class="w-full sm:w-56">
        <span class="mb-2 block text-sm text-slate-400">
          Estadísticas de la tendencia
        </span>

        <select
          :value="props.selectedStats"
          @change="
            emit(
              'update:selectedStats',
              ($event.target as HTMLSelectElement).value as Stats,
            )
          "
          class="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-teal-400"
        >

          <option
            v-for="stats in props.selectorStats"
            :key="stats.value"
            :value="stats.value"
          >

            {{ stats.label }}

          </option>
        </select>
      </label>
    </div>

    <div
      v-if="props.publicationStats.length > 0"
      class="h-96"
    >
      <Line
        :data="chartData"
        :options="chartOptions"
      />
    </div>

    <div
      v-else
      class="flex h-64 items-center justify-center text-slate-400"
    >
      No existen datos históricos para
      esta tendencia.
    </div>
  </BaseCard>
</template>