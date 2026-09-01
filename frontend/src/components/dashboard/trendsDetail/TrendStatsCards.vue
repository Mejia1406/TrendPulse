<!-- Sara Hurtado -->
<script setup lang="ts">
// internal imports
import BaseCard from '@/components/common/BaseCard.vue';
import { FormatNumber } from '@/utils/formatters/formatNumber';
import type { PublicationStatsInterface } from '@/interfaces/PublicationStatsInterface';

// props
const props = defineProps<{
  latestStats?: PublicationStatsInterface;
}>();
</script>

<template>
  <section class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <BaseCard>
      <p class="text-sm text-slate-400">Likes</p>

      <p class="mt-3 text-3xl font-bold">
        {{ FormatNumber.format(props.latestStats?.likesCount ?? 0) }}
      </p>
    </BaseCard>

    <BaseCard>
      <p class="text-sm text-slate-400">Comentarios</p>

      <p class="mt-3 text-3xl font-bold">
        {{ FormatNumber.format(props.latestStats?.commentsCount ?? 0) }}
      </p>
    </BaseCard>

    <BaseCard>
      <p class="text-sm text-slate-400">Compartidos</p>

      <p class="mt-3 text-3xl font-bold">
        {{ FormatNumber.format(props.latestStats?.sharesCount ?? 0) }}
      </p>
    </BaseCard>

    <BaseCard>
      <p class="text-sm text-slate-400">Vistas</p>

      <p class="mt-3 text-3xl font-bold">
        {{ FormatNumber.format(props.latestStats?.viewsCount ?? 0) }}
      </p>
    </BaseCard>
  </section>
</template>
