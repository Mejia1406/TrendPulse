<!-- Samuel Moncada, Sara Hurtado -->
<script setup lang="ts">
// internal imports
import BaseTable from '@/components/common/BaseTable.vue';
import { formatNumber } from '@/utils/formatters/formatNumber';

// props
const props = defineProps<{
  comparisonRows: {
    id: string;
    name: string;
    likesCount: number;
    commentsCount: number;
    sharesCount: number;
    totalInteractions: number;
  }[];
}>();
</script>

<template>
  <BaseTable
    title="Tabla comparativa"
    :empty="props.comparisonRows.length === 0"
    :columns="5"
    empty-message="No hay redes seleccionadas."
    content-class="p-6"
  >
    <template #header>
      <tr class="border-b border-slate-800">
        <th class="px-2 py-4">Red</th>

        <th class="px-2 py-4 text-right">
          Likes
        </th>

        <th class="px-2 py-4 text-right">
          Comentarios
        </th>

        <th class="px-2 py-4 text-right">
          Compartidos
        </th>

        <th class="px-2 py-4 text-right">
          Total
        </th>
      </tr>
    </template>

    <template #body>
      <tr
        v-for="socialMedia in props.comparisonRows"
        :key="socialMedia.id"
        class="border-b border-slate-800 last:border-b-0"
      >
        <td class="px-2 py-4">
          <span
            class="rounded-full bg-slate-800 px-3 py-1 font-semibold"
          >
            {{ socialMedia.name }}
          </span>
        </td>

        <td class="px-2 py-4 text-right">
          {{ formatNumber.format(socialMedia.likesCount) }}
        </td>

        <td class="px-2 py-4 text-right">
          {{ formatNumber.format(socialMedia.commentsCount) }}
        </td>

        <td class="px-2 py-4 text-right">
          {{ formatNumber.format(socialMedia.sharesCount) }}
        </td>

        <td class="px-2 py-4 text-right font-bold text-slate-300">
          {{ formatNumber.format(socialMedia.totalInteractions) }}
        </td>
      </tr>
    </template>
  </BaseTable>
</template>