<!-- Sara Hurtado -->
<script setup lang="ts">
// external imports
import { RouterLink } from 'vue-router';

// internal imports
import BaseCard from '@/components/common/BaseCard.vue';
import { FormatNumber } from '@/utils/formatters/formatNumber';

// props
const props = defineProps<{
  trends: {
    id: string;
    name: string;
    socialMediaName: string;
    latestViews: number;
  }[];
}>();
</script>

<template>
  <BaseCard>
    <h2 class="mb-6 text-xl font-semibold">Top 5 tendencias</h2>

    <div class="flex justify-between border-b border-slate-800 pb-3">
      <span class="text-sm text-slate-400"> Nombre </span>

      <span class="text-sm text-slate-400"> Vistas </span>
    </div>

    <div>
      <div
        v-for="trend in props.trends"
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
</template>
