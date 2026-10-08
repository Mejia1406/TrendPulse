<!-- Athina Cappelleti -->
<script setup lang="ts">
// external imports
import { computed, onMounted, ref } from 'vue';

// internal imports
import { PublicationStatsService } from '@/services/PublicationStatsService';
import { SocialMediaService } from '@/services/SocialMediaService';
import { TrendService } from '@/services/TrendService';
import { TrendUtil } from '@/utils/TrendUtil';

import type { TrendInterface } from '@/interfaces/TrendInterface';
import type { SocialMediaInterface } from '@/interfaces/SocialMediaInterface';
import type { PublicationStatsInterface } from '@/interfaces/PublicationStatsInterface';

import BaseCard from '@/components/common/BaseCard.vue';
import TrendEvolutionChart from '@/components/charts/trend/TrendEvolutionChart.vue';
import TrendTable from '@/components/features/trend/TrendTable.vue';

// reactive variables
const trends = ref<TrendInterface[]>([]);
const socialMedias = ref<SocialMediaInterface[]>([]);
const publicationStats = ref<PublicationStatsInterface[]>([]);

const selectedSocialMedia = ref('Todas');

// selectors
const selectorSocialMedias = computed(() => [
  'Todas',
  ...socialMedias.value.map((socialMedia) => socialMedia.name),
]);

// computed variables
const filteredTrends = computed(() => {
  return TrendUtil.getFiltered(
    trends.value,
    socialMedias.value,
    { socialMedia: selectedSocialMedia.value },
  );
});

// methods
const getTrendsViewData = async () => {
  const [
    trendsData,
    socialMediasData,
    publicationStatsData,
  ] = await Promise.all([
    TrendService.getAll(),
    SocialMediaService.getAll(),
    PublicationStatsService.getAll(),
  ]);

  trends.value = trendsData;
  socialMedias.value = socialMediasData;
  publicationStats.value = publicationStatsData;
};

const getLatestViews = (trendId: number) => {
  const trendStats = publicationStats.value
    .filter((stat) => stat.trendId === trendId)
    .sort((a, b) => new Date(b.captureAt).getTime() - new Date(a.captureAt).getTime());

  return trendStats[0]?.viewsCount ?? 0;
};

const getSocialMediaName = (socialMediaId: number) => {
  return socialMedias.value.find((socialMedia) => socialMedia.id === socialMediaId)?.name ?? 'Sin red social';
};

// lifecycle
onMounted(() => {
  getTrendsViewData();
});
</script>

<template>
  <main class="min-h-screen bg-slate-950 text-white">
    <div class="mx-auto max-w-7xl px-4 py-8">
      <BaseCard class="mt-2">
        <h1 class="text-4xl font-bold">Tendencias</h1>

        <p class="mt-1 text-sm text-slate-400">Filtra y analiza la evolución de tendencias.</p>

        <div class="mt-6 max-w-md">
          <label class="block">
            <span class="mb-2 block text-sm text-slate-300"> Red social </span>

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

      <TrendEvolutionChart
        :trends="filteredTrends"
        :social-medias="socialMedias"
        :publication-stats="publicationStats"
      />
      <TrendTable
        :trends="filteredTrends"
        :get-latest-views="getLatestViews"
        :get-social-media-name="getSocialMediaName"
      />
    </div>
  </main>
</template>
