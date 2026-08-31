<!-- Samuel Moncada -->

<script setup lang="ts">
import { computed, onActivated, onMounted, ref } from 'vue';

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

import { TrendService } from '@/services/TrendService';

import { FormatNumber } from '@/utils/formatters/formatNumber';

import BaseCard from '@/components/common/BaseCard.vue';

ChartJS.register(BarElement, CategoryScale, Legend, LinearScale, Tooltip);

const trends = TrendService.getTrends();

const chartKey = ref(0);

onMounted(() => {
  chartKey.value++;
});

onActivated(() => {
  chartKey.value++;
});

const socialMediaStats = computed(() => {
  return TrendService.getTrendStatsBySocialMedia(trends);
});

const selectorSocialMedias = computed(() => {
  return socialMediaStats.value;
});

const selectedSocialMediaId = ref('all');

const selectedSocialMediaStats = computed(() => {
  if (selectedSocialMediaId.value === 'all') {
    return socialMediaStats.value;
  }

  return socialMediaStats.value.filter(
    (socialMedia) => socialMedia.id === selectedSocialMediaId.value,
  );
});

const comparisonRows = computed(() => {
  return selectedSocialMediaStats.value.map((socialMedia) => {
    return {
      ...socialMedia,

      totalInteractions:
        socialMedia.likesCount + socialMedia.commentsCount + socialMedia.sharesCount,
    };
  });
});

const chartData = computed<ChartData<'bar'>>(() => ({
  labels: comparisonRows.value.map((socialMedia) => socialMedia.name),

  datasets: [
    {
      label: 'Likes',

      data: comparisonRows.value.map((socialMedia) => socialMedia.likesCount),

      backgroundColor: '#14b8a6',
      borderRadius: 5,
    },

    {
      label: 'Comentarios',

      data: comparisonRows.value.map((socialMedia) => socialMedia.commentsCount),

      backgroundColor: '#f97316',
      borderRadius: 5,
    },

    {
      label: 'Compartidos',

      data: comparisonRows.value.map((socialMedia) => socialMedia.sharesCount),

      backgroundColor: '#c84fd2',
      borderRadius: 5,
    },
  ],
}));

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

          return `${context.dataset.label}: ${FormatNumber.formatWithSeparators(value)}`;
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
          return FormatNumber.formatWithSeparators(Number(value));
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
  <main class="min-h-screen bg-slate-950 text-white">
    <div class="mx-auto max-w-7xl px-6 py-10">
      <section>
        <h1 class="text-4xl font-bold">Comparativa entre redes</h1>

        <p class="mt-2 text-sky-300">Selecciona las redes que quieres comparar.</p>
      </section>

      <section class="mt-8">
        <BaseCard>
          <label for="social-media-filter" class="mb-2 block text-sm font-semibold text-slate-300">
            Redes sociales
          </label>

          <select
            id="social-media-filter"
            v-model="selectedSocialMediaId"
            class="w-full max-w-md rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-teal-400"
          >
            <option value="all">Todas las redes</option>

            <option
              v-for="socialMedia in selectorSocialMedias"
              :key="socialMedia.id"
              :value="socialMedia.id"
            >
              {{ socialMedia.name }}
            </option>
          </select>
        </BaseCard>
      </section>

      <section class="mt-6">
        <BaseCard>
          <h2 class="mb-6 text-lg font-semibold">Likes vs. comentarios vs. compartidos</h2>

          <div v-if="comparisonRows.length > 0" class="h-97.5">
            <Bar :key="chartKey" :data="chartData" :options="chartOptions" />
          </div>

          <div v-else class="grid h-97.5 place-items-center text-slate-400">
            Selecciona al menos una red social.
          </div>
        </BaseCard>
      </section>

      <section class="mt-6">
        <BaseCard>
          <h2 class="text-lg font-semibold">Tabla comparativa</h2>

          <div class="overflow-x-auto p-6">
            <table class="min-w-full text-left">
              <thead class="text-slate-300">
                <tr class="border-b border-slate-800">
                  <th class="px-2 py-4">Red</th>

                  <th class="px-2 py-4 text-right">Likes</th>

                  <th class="px-2 py-4 text-right">Comentarios</th>

                  <th class="px-2 py-4 text-right">Compartidos</th>

                  <th class="px-2 py-4 text-right">Total</th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="socialMedia in comparisonRows"
                  :key="socialMedia.id"
                  class="border-b border-slate-800 last:border-b-0"
                >
                  <td class="px-2 py-4">
                    <span class="rounded-full bg-slate-800 px-3 py-1 text-sm font-semibold">
                      {{ socialMedia.name }}
                    </span>
                  </td>

                  <td class="px-2 py-4 text-right">
                    {{ FormatNumber.formatWithSeparators(socialMedia.likesCount) }}
                  </td>

                  <td class="px-2 py-4 text-right">
                    {{ FormatNumber.formatWithSeparators(socialMedia.commentsCount) }}
                  </td>

                  <td class="px-2 py-4 text-right">
                    {{ FormatNumber.formatWithSeparators(socialMedia.sharesCount) }}
                  </td>

                  <td class="px-2 py-4 text-right font-bold text-slate-300">
                    {{ FormatNumber.formatWithSeparators(socialMedia.totalInteractions) }}
                  </td>
                </tr>

                <tr v-if="comparisonRows.length === 0">
                  <td colspan="5" class="px-4 py-10 text-center text-slate-400">
                    No hay redes seleccionadas.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </BaseCard>
      </section>
    </div>
  </main>
</template>
