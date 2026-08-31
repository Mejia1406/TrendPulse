<!-- Athina Cappelleti -->

<script setup lang="ts">
import { computed, ref } from 'vue';

import BaseCard from '@/components/common/BaseCard.vue';
import { TrendService } from '@/services/TrendService';
import { SocialMediaService } from '@/services/SocialMediaService';
import { PublicationStatsService } from '@/services/PublicationStatsService';

const selectedSocialMedia = ref('Todas');

const trends = computed(() => {
  return TrendService.filterTrends({
    socialMedia: selectedSocialMedia.value,
  });
});

const selectorSocialMedias = computed(() => [
  'Todas',
  ...SocialMediaService
    .getSocialMedia()
    .map(
      (socialMedia) =>
        socialMedia.name,
    ),
]);

const chartSeries = computed(() => {
  const socialMedias = [
    ...new Map(
      trends.value
        .map((trend) =>
          TrendService.getSocialMedia(trend),
        )
        .filter(
          (socialMedia) =>
            socialMedia !== undefined,
        )
        .map((socialMedia) => [
          socialMedia.id,
          socialMedia,
        ]),
    ).values(),
  ];

  return socialMedias.map(
    (socialMedia) => ({
      name: socialMedia.name,

      data: trends.value
        .filter(
          (trend) =>
            trend.socialMediaId ===
            socialMedia.id,
        )
        .flatMap((trend) =>
          TrendService
            .getPublicationStats(trend)
            .map(
              (publicationStats) => ({
                x: publicationStats.captureAt,
                y: publicationStats.viewsCount,
              }),
            ),
        ),
    }),
  );
});

const chartColors = computed(() => {
  const socialMedias = [
    ...new Map(
      trends.value
        .map((trend) =>
          TrendService.getSocialMedia(trend),
        )
        .filter(
          (socialMedia) =>
            socialMedia !== undefined,
        )
        .map((socialMedia) => [
          socialMedia.id,
          socialMedia,
        ]),
    ).values(),
  ];

  return socialMedias.map(
    (socialMedia) =>
      socialMedia.color,
  );
});

const chartOptions = computed(() => ({
  chart: {
    type: 'area',
    height: 350,
    background: 'transparent',

    toolbar: {
      show: false,
    },

    zoom: {
      enabled: false,
    },
  },

  dataLabels: {
    enabled: false,
  },

  stroke: {
    curve: 'smooth',
    width: 3,
  },

  fill: {
    type: 'gradient',

    gradient: {
      shade: 'dark',
      type: 'vertical',
      shadeIntensity: 0.4,
      opacityFrom: 0.7,
      opacityTo: 0.15,
      stops: [0, 80, 100],
    },
  },

  colors: chartColors.value,

  markers: {
    size: 5,
    strokeWidth: 0,

    hover: {
      size: 7,
    },
  },

  grid: {
    borderColor: '#334155',
    strokeDashArray: 4,

    xaxis: {
      lines: {
        show: false,
      },
    },

    yaxis: {
      lines: {
        show: true,
      },
    },
  },

  xaxis: {
    type: 'datetime',

    labels: {
      style: {
        colors: '#94a3b8',
        fontSize: '12px',
      },
    },
  },

  yaxis: {
    labels: {
      formatter: (value: number) =>
        `${(value / 1000).toFixed(0)}k`,

      style: {
        colors: '#94a3b8',
      },
    },
  },

  tooltip: {
    theme: 'dark',

    x: {
      format: 'dd MMM yyyy',
    },

    y: {
      formatter: (value: number) =>
        `${value.toLocaleString()} vistas`,
    },
  },
}));

const getLatestViews = (
  trendId: string,
) => {
  const trend = trends.value.find(
    (currentTrend) =>
      currentTrend.id === trendId,
  );

  if (!trend) {
    return 0;
  }

  return PublicationStatsService.getLatestViews(
    trend,
  );
};

const getSocialMediaName = (
  socialMediaId: string,
) => {
  return (
    SocialMediaService.getById(
      socialMediaId,
    )?.name ?? 'Sin red social'
  );
};
</script>

<template>
  <main
    class="min-h-screen bg-slate-950 text-white"
  >
    <div
      class="mx-auto max-w-7xl px-4 py-8"
    >
      <BaseCard class="mt-2">
        <h1 class="text-4xl font-bold">
          Tendencias
        </h1>

        <p
          class="mt-1 text-sm text-slate-400"
        >
          Filtra y analiza la evolución de
          tendencias.
        </p>

        <div class="mt-6 max-w-md">
          <label class="block">
            <span
              class="mb-2 block text-sm text-slate-300"
            >
              Red social
            </span>

            <select
              v-model="selectedSocialMedia"
              class="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-teal-400"
            >
              <option
                v-for="socialMedia in selectorSocialMedias"
                :key="socialMedia"
                :value="socialMedia"
              >
                {{ socialMedia }}
              </option>
            </select>
          </label>
        </div>
      </BaseCard>

      <BaseCard class="mt-8">
        <h2
          class="mb-4 text-2xl font-bold"
        >
          Evolución de tendencias
        </h2>

        <apexchart
          type="area"
          height="350"
          :options="chartOptions"
          :series="chartSeries"
        />
      </BaseCard>

      <BaseCard class="mt-8 overflow-hidden">
        <div
          class="border-b border-slate-800 px-5 py-4"
        >
          <h3
            class="text-xl font-semibold"
          >
            Resultados ({{ trends.length }})
          </h3>
        </div>

        <div class="overflow-x-auto">
          <table
            class="min-w-full text-left"
          >
            <thead
              class="bg-slate-950/80 text-slate-300"
            >
              <tr>
                <th class="px-5 py-3">
                  Nombre
                </th>

                <th class="px-5 py-3">
                  Categoría
                </th>

                <th class="px-5 py-3">
                  Red
                </th>

                <th class="px-5 py-3">
                  Fecha
                </th>

                <th class="px-5 py-3">
                  Vistas
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="trend in trends"
                :key="trend.id"
                class="border-t border-slate-800 text-slate-200"
              >
                <td class="px-5 py-4">
                  <RouterLink
                    :to="`/tendencias/${trend.id}`"
                    class="font-semibold text-white transition hover:text-teal-400"
                  >
                    {{ trend.name }}
                  </RouterLink>
                </td>

                <td class="px-5 py-4">
                  {{ trend.category }}
                </td>

                <td class="px-5 py-4">
                  {{
                    getSocialMediaName(
                      trend.socialMediaId,
                    )
                  }}
                </td>

                <td class="px-5 py-4">
                  {{
                    new Date(
                      trend.createdAt,
                    ).toLocaleDateString(
                      'es-CO',
                    )
                  }}
                </td>

                <td class="px-5 py-4">
                  {{
                    getLatestViews(
                      trend.id,
                    ).toLocaleString()
                  }}
                </td>
              </tr>

              <tr
                v-if="trends.length === 0"
              >
                <td
                  colspan="5"
                  class="px-5 py-8 text-center text-slate-400"
                >
                  No se encontraron tendencias.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </BaseCard>
    </div>
  </main>
</template>