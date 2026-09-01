<!-- Samuel Moncada -->

<script setup lang="ts">
// external imports
import { computed, ref } from 'vue';

// internal imports
import { TrendService } from '@/services/TrendService';

import BaseCard from '@/components/common/BaseCard.vue';
import SocialMediaComparisonChart from '@/components/dashboard/compare/SocialMediaComparisonChart.vue';
import SocialMediaComparisonTable from '@/components/dashboard/compare/SocialMediaComparisonTable.vue';

// variables
const trends = TrendService.getAll();

// computed variables
const socialMediaStats = computed(() => {
  return TrendService.getTrendStatsBySocialMedia(trends);
});

const selectorSocialMedias = computed(() => {
  return socialMediaStats.value;
});

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

// selectors
const selectedSocialMediaId = ref('all');
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
        <SocialMediaComparisonChart :comparisonRows="comparisonRows" />
      </section>

      <section class="mt-6">
        <SocialMediaComparisonTable :comparisonRows="comparisonRows" />
      </section>
    </div>
  </main>
</template>
