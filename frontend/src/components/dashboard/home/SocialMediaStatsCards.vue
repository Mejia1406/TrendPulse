<!-- Sara Hurtado -->
<script setup lang="ts">
// internal imports
import BaseCard from '@/components/common/BaseCard.vue';
import { FormatNumber } from '@/utils/formatters/formatNumber';

// props
const props = defineProps<{
  stats: any[];
}>();
</script>

<template>
  <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <BaseCard
      v-for="trendSocialMediaStats in props.stats"
      :key="trendSocialMediaStats.id"
    >
      <p class="text-sm text-slate-400">
        {{ trendSocialMediaStats.name }}
      </p>

      <p class="mt-2 text-3xl font-bold">
        {{
          FormatNumber.format(
            trendSocialMediaStats.viewsCount,
          )
        }}
      </p>

      <p class="mt-1 text-sm text-slate-500">
        vistas totales
      </p>

    </BaseCard>
  </section>
</template>