<!-- Sara Hurtado -->

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Line } from 'vue-chartjs';

import BaseButton from '@/components/common/BaseButton.vue';
import BaseCard from '@/components/common/BaseCard.vue';

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

import { TrendService } from '@/services/TrendService';
import { SocialMediaService } from '@/services/SocialMediaService';
import { PublicationStatsService } from '@/services/PublicationStatsService';

import { FormatNumber } from '@/utils/formatters/formatNumber';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

type Stats =
  | 'viewsCount'
  | 'likesCount'
  | 'commentsCount'
  | 'sharesCount';

const route = useRoute();

const selectedStats =
  ref<Stats>('viewsCount');

const selectorStats: {
  value: Stats;
  label: string;
}[] = [
  {
    value: 'viewsCount',
    label: 'Vistas',
  },
  {
    value: 'likesCount',
    label: 'Likes',
  },
  {
    value: 'commentsCount',
    label: 'Comentarios',
  },
  {
    value: 'sharesCount',
    label: 'Compartidos',
  },
];

const trend = computed(() => {
  return TrendService.getTrendById(
    String(route.params.id),
  );
});

const socialMedia = computed(() => {
  if (!trend.value) {
    return undefined;
  }

  return SocialMediaService.getById(
    trend.value.socialMediaId,
  );
});

const publicationStats = computed(() => {
  if (!trend.value) {
    return [];
  }

  return PublicationStatsService.getByTrendId(
    trend.value.id,
  );
});

const latestStats = computed(() => {
  if (!trend.value) {
    return undefined;
  }

  return PublicationStatsService.getLatest(
    trend.value.id,
  );
});

const selectedStatsLabel = computed(() => {
  return (
    selectorStats.find(
      (stats) =>
        stats.value ===
        selectedStats.value,
    )?.label ?? ''
  );
});

const chartData = computed<
  ChartData<'line'>
>(() => {
  return {
    labels: publicationStats.value.map(
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

        data: publicationStats.value.map(
          (stats) =>
            stats[selectedStats.value],
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
          return FormatNumber.formatWithSeparators(
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
  <main
    class="min-h-screen bg-slate-950 text-white"
  >
    <div
      class="mx-auto max-w-7xl px-6 py-8"
    >
      <RouterLink
        :to="{ name: 'tendencias' }"
        class="inline-flex items-center text-sm text-slate-400 transition hover:text-teal-400"
      >
        ← Volver
      </RouterLink>

      <div
        v-if="!trend"
        class="mt-8 rounded-2xl border border-slate-800 bg-slate-900/90 p-8 text-center"
      >
        <h1 class="text-2xl font-bold">
          Tendencia no encontrada
        </h1>

        <p
          class="mt-2 text-slate-400"
        >
          La tendencia solicitada no existe.
        </p>
      </div>

      <template v-else>
        <section class="mt-6">
          <div
            class="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h1
                class="text-4xl font-bold"
              >
                {{ trend.name }}
              </h1>

              <div
                class="mt-3 flex flex-wrap items-center gap-2 text-sm"
              >
                <span
                  class="rounded-full bg-slate-800 px-3 py-1 font-medium text-slate-200"
                >
                  {{ trend.category }}
                </span>

                <span
                  class="text-slate-400"
                >
                  {{
                    socialMedia?.name ??
                    'Sin red social'
                  }}
                </span>

                <span
                  class="text-slate-600"
                >
                  •
                </span>

                <span
                  class="text-slate-400"
                >
                  {{
                    new Date(
                      trend.createdAt,
                    ).toLocaleDateString(
                      'es-CO',
                    )
                  }}
                </span>
              </div>
            </div>

            <a
              v-if="latestStats?.url"
              :href="latestStats.url"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BaseButton class="w-fit">
                Ver publicación original
              </BaseButton>
            </a>
          </div>
        </section>

        <section
          class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <BaseCard>
            <p
              class="text-sm text-slate-400"
            >
              Likes
            </p>

            <p
              class="mt-3 text-3xl font-bold"
            >
              {{
                FormatNumber.formatWithSeparators(
                  latestStats?.likesCount ??
                    0,
                )
              }}
            </p>
          </BaseCard>

          <BaseCard>
            <p
              class="text-sm text-slate-400"
            >
              Comentarios
            </p>

            <p
              class="mt-3 text-3xl font-bold"
            >
              {{
                FormatNumber.formatWithSeparators(
                  latestStats?.commentsCount ??
                    0,
                )
              }}
            </p>
          </BaseCard>

          <BaseCard>
            <p
              class="text-sm text-slate-400"
            >
              Compartidos
            </p>

            <p
              class="mt-3 text-3xl font-bold"
            >
              {{
                FormatNumber.formatWithSeparators(
                  latestStats?.sharesCount ??
                    0,
                )
              }}
            </p>
          </BaseCard>

          <BaseCard>
            <p
              class="text-sm text-slate-400"
            >
              Vistas
            </p>

            <p
              class="mt-3 text-3xl font-bold"
            >
              {{
                FormatNumber.formatWithSeparators(
                  latestStats?.viewsCount ??
                    0,
                )
              }}
            </p>
          </BaseCard>
        </section>

        <BaseCard class="mt-8">
          <div
            class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <h2
                class="text-xl font-semibold"
              >
                Histórico
              </h2>

              <p
                class="mt-1 text-sm text-slate-400"
              >
                Evolución de las estadísticas
                registradas para esta tendencia.
              </p>
            </div>

            <label
              class="w-full sm:w-56"
            >
              <span
                class="mb-2 block text-sm text-slate-400"
              >
                Estadísticas de la tendencia
              </span>

              <select
                v-model="selectedStats"
                class="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-teal-400"
              >
                <option
                  v-for="stats in selectorStats"
                  :key="stats.value"
                  :value="stats.value"
                >
                  {{ stats.label }}
                </option>
              </select>
            </label>
          </div>

          <div
            v-if="
              publicationStats.length > 0
            "
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
    </div>
  </main>
</template>