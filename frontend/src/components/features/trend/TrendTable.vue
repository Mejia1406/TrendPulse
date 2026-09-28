<!-- Athina Cappelleti -->
<script setup lang="ts">
// internal imports
import BaseTable from '@/components/common/BaseTable.vue';
import type { TrendInterface } from '@/interfaces/TrendInterface';

// props
const props = defineProps<{
  trends: TrendInterface[];
  getLatestViews: (trendId: string) => number;
  getSocialMediaName: (socialMediaId: string) => string;
}>();
</script>

<template>
  <BaseTable
    :title="`Resultados (${props.trends.length})`"
    :empty="props.trends.length === 0"
    :columns="5"
    empty-message="No se encontraron tendencias."
    card-class="mt-8"
    header-class="bg-slate-950/80"
  >
    <template #header>
      <tr>
        <th class="px-5 py-3">
          Nombre
        </th>

        <th class="px-5 py-3">
          Categoría
        </th>

        <th class="px-5 py-3">
          Red
        </th>

        <th class="px-5 py-3">
          Fecha
        </th>

        <th class="px-5 py-3">
          Vistas
        </th>
      </tr>
    </template>

    <template #body>
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
    </template>
  </BaseTable>
</template>