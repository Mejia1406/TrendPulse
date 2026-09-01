<!-- Samuel Moncada, Sara Hurtado -->
<script setup lang="ts">
// internal imports
import BaseCard from '@/components/common/BaseCard.vue';
import { FormatNumber } from '@/utils/formatters/formatNumber';

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
  <BaseCard>
    <h2 class="text-lg font-semibold">Tabla comparativa</h2>

    <div class="overflow-x-auto p-6">
      <table class="min-w-full text-left">
        <thead class="text-slate-300">
          <tr class="border-b border-slate-800">
            <th class="px-2 py-4">Red</th>

            <th class="px-2 py-4 text-right">Likes</th>

            <th class="px-2 py-4 text-right">Comentarios</th>

            <th class="px-2 py-4 text-right">Compartidos</th>

            <th class="px-2 py-4 text-right">Total</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="socialMedia in props.comparisonRows"
            :key="socialMedia.id"
            class="border-b border-slate-800 last:border-b-0"
          >
            <td class="px-2 py-4">
              <span class="rounded-full bg-slate-800 px-3 py-1 text-sm font-semibold">
                {{ socialMedia.name }}
              </span>
            </td>

            <td class="px-2 py-4 text-right">
              {{ FormatNumber.format(socialMedia.likesCount) }}
            </td>

            <td class="px-2 py-4 text-right">
              {{ FormatNumber.format(socialMedia.commentsCount) }}
            </td>

            <td class="px-2 py-4 text-right">
              {{ FormatNumber.format(socialMedia.sharesCount) }}
            </td>

            <td class="px-2 py-4 text-right font-bold text-slate-300">
              {{ FormatNumber.format(socialMedia.totalInteractions) }}
            </td>
          </tr>

          <tr v-if="comparisonRows.length === 0">
            <td colspan="5" class="px-4 py-10 text-center text-slate-400">
              No hay redes seleccionadas.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </BaseCard>
</template>
