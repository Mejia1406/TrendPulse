<!-- Sara Hurtado -->
<script setup lang="ts">

// internal imports
import BaseButton from '@/components/common/BaseButton.vue';

// props
const props = defineProps<{
  trend: any;
  socialMedia: any;
  latestStats: any;
}>();
</script>

<template>
  <section class="mt-6">
    <div class="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-4xl font-bold">
          {{ props.trend.name }}
        </h1>

        <div class="mt-3 flex flex-wrap items-center gap-2 text-sm">
          <span class="rounded-full bg-slate-800 px-3 py-1 font-medium text-slate-200">
            {{ props.trend.category }}
          </span>

          <span class="text-slate-400">
            {{
              props.socialMedia?.name ??
              'Sin red social'
            }}
          </span>

          <span class="text-slate-600">
            •
          </span>

          <span class="text-slate-400">
            {{
              new Date(
                props.trend.createdAt,
              ).toLocaleDateString(
                'es-CO',
              )
            }}
          </span>
        </div>
      </div>
      <a
        v-if="props.latestStats?.url"
        :href="props.latestStats.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        <BaseButton class="w-fit">
          Ver publicación original
        </BaseButton>
      </a>
    </div>
  </section>
</template>