<!-- Sara Hurtado -->
<script setup lang="ts">
// external imports
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

// internal imports
import TrendHeader from '@/components/features/trendDetail/TrendHeader.vue';
import TrendHistoryChart from '@/components/charts/trendDetail/TrendHistoryChart.vue';
import TrendStatsCards from '@/components/features/trendDetail/TrendStatsCards.vue';

import { PublicationStatsService } from '@/services/PublicationStatsService';
import { SocialMediaService } from '@/services/SocialMediaService';
import { TrendService } from '@/services/TrendService';

import type { TrendInterface } from '@/interfaces/TrendInterface';
import type { SocialMediaInterface } from '@/interfaces/SocialMediaInterface';
import type { PublicationStatsInterface } from '@/interfaces/PublicationStatsInterface';

// types
type Stats = 'viewsCount' | 'likesCount' | 'commentsCount' | 'sharesCount';

// variables
const route = useRoute();

// selectors
const selectedStats = ref<Stats>('viewsCount');

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

// reactive variables
const trend = ref<TrendInterface | null>(null);

const socialMedia = ref<SocialMediaInterface | null>(null);

const publicationStats = ref<PublicationStatsInterface[]>([]);

const latestPublicationStats =
  ref<PublicationStatsInterface | null>(null);

// methods
const getTrendDetailData = async () => {
  const trendId = Number(route.params.id);

  trend.value = await TrendService.getById(trendId);

  if (!trend.value) {
    return;
  }

  const [
    socialMediaData,
    publicationStatsData,
    latestPublicationStatsData,
  ] = await Promise.all([
    SocialMediaService.getById(
      trend.value.socialMediaId,
    ),

    PublicationStatsService.getByTrendId(
      trend.value.id,
    ),

    PublicationStatsService.getLatestByTrendId(
      trend.value.id,
    ),
  ]);

  socialMedia.value = socialMediaData;

  publicationStats.value =
    publicationStatsData;

  latestPublicationStats.value =
    latestPublicationStatsData;
};

// lifecycle
onMounted(() => {
  getTrendDetailData();
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
        <h1 class="text-2xl font-bold">Tendencia no encontrada</h1>

        <p class="mt-2 text-slate-400">
          La tendencia solicitada no existe.
        </p>
      </div>

      <template v-else>
        <TrendHeader
          :trend="trend"
          :social-media="socialMedia"
          :latest-stats="latestPublicationStats"
        />

        <TrendStatsCards
          :latest-stats="latestPublicationStats"
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