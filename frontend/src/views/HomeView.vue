<!-- Sara Hurtado -->

<script setup lang="ts">
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';

import BaseCard from '@/components/common/BaseCard.vue';

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

import { FormatNumber } from '@/utils/formatters/formatNumber';
import { TrendService } from '@/services/TrendService';
import { PublicationStatsService } from '@/services/PublicationStatsService';

ChartJS.register(Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const trends = TrendService.getAll();

const topTrendsByViews = computed(() => {
  return TrendService.getTopTrendsByViews(trends, 5).map((trend) => {
    return {
      ...trend,

      latestViews: PublicationStatsService.getLatestViews(trend.id),

      socialMediaName: TrendService.getSocialMedia(trend)?.name ?? 'Sin red social',
    };
  });
});

const trendStatsBySocialMedia = computed(() => {
  return TrendService.getTrendStatsBySocialMedia(trends);
});

const chartData = computed<ChartData<'bar'>>(() => ({
  labels: trendStatsBySocialMedia.value.map((trendSocialMediaStats) => trendSocialMediaStats.name),

  datasets: [
    {
      label: 'Likes',

      data: trendStatsBySocialMedia.value.map(
        (trendSocialMediaStats) => trendSocialMediaStats.likesCount,
      ),

      backgroundColor: '#14b8a6',
      borderRadius: 5,
    },

    {
      label: 'Vistas',

      data: trendStatsBySocialMedia.value.map(
        (trendSocialMediaStats) => trendSocialMediaStats.viewsCount,
      ),

      backgroundColor: '#f97316',
      borderRadius: 5,
    },
  ],
}));

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
          return `${context.dataset.label}: ${FormatNumber.format(Number(context.raw))}`;
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
          return FormatNumber.format(Number(value));
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
  <main class="min-h-screen bg-slate-950 text-white">
    <div class="mx-auto max-w-7xl px-6 py-8">
      <div class="mb-8">
        <p class="mb-2 text-sm font-semibold text-teal-400">En vivo</p>
        <h1 class="text-4xl font-bold">Pulso de tendencias</h1>
        <p class="mt-2 text-slate-400">Lo que está moviéndose ahora mismo en tus redes.</p>
      </div>
      <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <BaseCard
          v-for="trendSocialMediaStats in trendStatsBySocialMedia"
          :key="trendSocialMediaStats.id"
        >
          <p class="text-sm text-slate-400">
            {{ trendSocialMediaStats.name }}
          </p>

          <p class="mt-2 text-3xl font-bold">
            {{ FormatNumber.format(trendSocialMediaStats.viewsCount) }}
          </p>

          <p class="mt-1 text-sm text-slate-500">vistas totales</p>
        </BaseCard>
      </section>
      <section class="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <BaseCard class="lg:col-span-2">
          <h2 class="mb-6 text-xl font-semibold">Tendencias por red social</h2>

          <div class="h-87.5">
            <Bar :data="chartData" :options="chartOptions" />
          </div>
        </BaseCard>
        <BaseCard>
          <h2 class="mb-6 text-xl font-semibold">Top 5 tendencias</h2>

          <div class="flex justify-between border-b border-slate-800 pb-3">
            <span class="text-sm text-slate-400"> Nombre </span>

            <span class="text-sm text-slate-400"> Vistas </span>
          </div>

          <div>
            <div
              v-for="trend in topTrendsByViews"
              :key="trend.id"
              class="flex items-center justify-between border-b border-slate-800 py-4 last:border-b-0"
            >
              <div>
                <RouterLink
                  :to="`/tendencias/${trend.id}`"
                  class="font-semibold text-white transition hover:text-teal-400"
                >
                  {{ trend.name }}
                </RouterLink>

                <p class="mt-1 text-sm text-slate-400">
                  {{ trend.socialMediaName }}
                </p>
              </div>

              <p class="font-medium text-teal-400">
                {{ FormatNumber.format(trend.latestViews) }}
              </p>
            </div>
          </div>
        </BaseCard>
      </section>
    </div>
  </main>
</template>
