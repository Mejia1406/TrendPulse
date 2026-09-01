<!-- Athina Cappelleti -->
<script setup lang="ts">
// internal imports
import BaseCard from '@/components/common/BaseCard.vue';
import type { TrendInterface } from '@/interfaces/TrendInterface';

// props
const props = defineProps<{
  trends: TrendInterface[];
  getLatestViews: (trendId: string) => number;
  getSocialMediaName: (socialMediaId: string) => string;
}>();
</script>

<template>
  <BaseCard class="mt-8 overflow-hidden">
    <div class="border-b border-slate-800 px-5 py-4">
      <h3 class="text-xl font-semibold">Resultados ({{ props.trends.length }})</h3>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full text-left">
        <thead class="bg-slate-950/80 text-slate-300">
          <tr>
            <th class="px-5 py-3">Nombre</th>

            <th class="px-5 py-3">Categoría</th>

            <th class="px-5 py-3">Red</th>

            <th class="px-5 py-3">Fecha</th>

            <th class="px-5 py-3">Vistas</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="trend in props.trends"
            :key="trend.id"
            class="border-t border-slate-800 text-slate-200"
          >
            <td class="px-5 py-4">
              <RouterLink
                :to="`/tendencias/${trend.id}`"
                class="font-semibold text-white transition hover:text-teal-400"
              >
                {{ trend.name }}
              </RouterLink>
            </td>

            <td class="px-5 py-4">
              {{ trend.category }}
            </td>

            <td class="px-5 py-4">
              {{ props.getSocialMediaName(trend.socialMediaId) }}
            </td>

            <td class="px-5 py-4">
              {{ new Date(trend.createdAt).toLocaleDateString('es-CO') }}
            </td>

            <td class="px-5 py-4">
              {{ props.getLatestViews(trend.id).toLocaleString() }}
            </td>
          </tr>

          <tr v-if="props.trends.length === 0">
            <td colspan="5" class="px-5 py-8 text-center text-slate-400">
              No se encontraron tendencias.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </BaseCard>
</template>
