<!-- Athina Cappelleti -->
<script setup lang="ts">

// external imports
import { computed, ref } from 'vue';

// internal imports
import { PublicationStatsService } from '@/services/PublicationStatsService';
import { SocialMediaService } from '@/services/SocialMediaService';
import { TrendService } from '@/services/TrendService';

import BaseCard from '@/components/common/BaseCard.vue';
import TrendEvolutionChart from '@/components/dashboard/trend/TrendEvolutionChart.vue';
import TrendTable from '@/components/dashboard/trend/TrendTable.vue';

// selectors
const selectedSocialMedia = ref('Todas');

// computed variables
const trends = computed(() => {
  return TrendService.getFiltered({
    socialMedia: selectedSocialMedia.value,
  });
});

const selectorSocialMedias = computed(() => [
  'Todas',
  ...SocialMediaService
    .getAll()
    .map(
      (socialMedia) =>
        socialMedia.name,
    ),
]);


// functions
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
    trend.id,
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
  <main class="min-h-screen bg-slate-950 text-white">
    <div class="mx-auto max-w-7xl px-4 py-8">
      <BaseCard class="mt-2">
        <h1 class="text-4xl font-bold">
          Tendencias
        </h1>

        <p class="mt-1 text-sm text-slate-400">
          Filtra y analiza la evolución de tendencias.
        </p>

        <div class="mt-6 max-w-md">
          <label class="block">
            <span class="mb-2 block text-sm text-slate-300">
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

      <TrendEvolutionChart
        :trends="trends"
      />
      <TrendTable
        :trends="trends"
        :get-latest-views="getLatestViews"
        :get-social-media-name="getSocialMediaName"
      />
    </div>
  </main>
</template>