<!-- Athina Cappelleti -->
<script setup lang="ts">
// external imports
import { computed } from 'vue';

// internal imports
import BaseCard from '@/components/common/BaseCard.vue';
import { FormatNumber } from '@/utils/formatters/formatNumber';
import type { TrendInterface } from '@/interfaces/TrendInterface';
import { TrendService } from '@/services/TrendService';

// props
const props = defineProps<{
  trends: TrendInterface[];
}>();

// chart series configuration
const chartSeries = computed(() => {
  const socialMedias = [
    ...new Map(
      props.trends
        .map((trend) => TrendService.getSocialMedia(trend))
        .filter((socialMedia) => socialMedia !== undefined)
        .map((socialMedia) => [socialMedia.id, socialMedia]),
    ).values(),
  ];

  return socialMedias.map((socialMedia) => ({
    name: socialMedia.name,
    data: props.trends
      .filter((trend) => trend.socialMediaId === socialMedia.id)
      .flatMap((trend) =>
        TrendService.getPublicationStats(trend).map((publicationStats) => ({
          x: publicationStats.captureAt,
          y: publicationStats.viewsCount,
        })),
      ),
  }));
});

// chart colors configuration
const chartColors = computed(() => {
  const socialMedias = [
    ...new Map(
      props.trends
        .map((trend) => TrendService.getSocialMedia(trend))
        .filter((socialMedia) => socialMedia !== undefined)
        .map((socialMedia) => [socialMedia.id, socialMedia]),
    ).values(),
  ];

  return socialMedias.map((socialMedia) => socialMedia.color);
});

// chart options configuration
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
      formatter: (value: number) => FormatNumber.format(value),
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
      formatter: (value: number) => FormatNumber.format(value) + ' vistas',
    },
  },
}));
</script>

<template>
  <BaseCard class="mt-8">
    <h2 class="mb-4 text-2xl font-bold">Evolución de tendencias</h2>

    <apexchart type="area" height="350" :options="chartOptions" :series="chartSeries" />
  </BaseCard>
</template>
