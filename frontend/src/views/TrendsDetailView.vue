<!-- Sara Hurtado -->
<script setup lang="ts">

// external imports
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

// internal imports
import TrendHeader from '@/components/dashboard/trendsDetail/TrendHeader.vue';
import TrendHistoryChart from '@/components/dashboard/trendsDetail/TrendHistoryChart.vue';
import TrendStatsCards from '@/components/dashboard/trendsDetail/TrendStatsCards.vue';

import { PublicationStatsService } from '@/services/PublicationStatsService';
import { SocialMediaService } from '@/services/SocialMediaService';
import { TrendService } from '@/services/TrendService';

// types
type Stats =
  | 'viewsCount'
  | 'likesCount'
  | 'commentsCount'
  | 'sharesCount';

// variables
const route = useRoute();

// reactive variables
const selectedStats = ref<Stats>('viewsCount');

// constants
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

// computed variables
const trend = computed(() => {
  return TrendService.getById(
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
</script>


<template>
  <main class="min-h-screen bg-slate-950 text-white">
    <div class="mx-auto max-w-7xl px-6 py-8">
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

        <p class="mt-2 text-slate-400">
          La tendencia solicitada no existe.
        </p>
      </div>

      <template v-else>
        <TrendHeader
          :trend="trend"
          :social-media="socialMedia"
          :latest-stats="latestStats"
        />
        <TrendStatsCards
          :latest-stats="latestStats"
        />
        <TrendHistoryChart
          :publication-stats="publicationStats"
          :selected-stats="selectedStats"
          :selector-stats="selectorStats"
          @update:selected-stats="selectedStats = $event"
        />
      </template>
    </div>
  </main>
</template>