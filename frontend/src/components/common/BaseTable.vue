<!-- Sara Hurtado -->
<script setup lang="ts">
// internal imports
import BaseCard from '@/components/common/BaseCard.vue';

// props
withDefaults(
  defineProps<{
    title?: string;
    empty: boolean;
    emptyMessage?: string;
    columns: number;
    cardClass?: string;
    contentClass?: string;
    headerClass?: string;
  }>(),
  {
    title: '',
    emptyMessage: 'No hay datos disponibles.',
    cardClass: '',
    contentClass: '',
    headerClass: '',
  },
);
</script>

<template>
  <BaseCard :class="cardClass">
    <div
      v-if="title"
      class="px-5 py-4"
    >
      <h2 class="text-xl font-semibold">
        {{ title }}
      </h2>
    </div>

    <div :class="['overflow-x-auto', contentClass]">
      <table class="min-w-full text-left">
        <thead
          :class="[
            'text-base font-medium text-sky-300',
            headerClass,
          ]"
        >
          <slot name="header" />
        </thead>

        <tbody class="text-base">
          <slot v-if="!empty" name="body" />

          <tr v-else>
            <td
              :colspan="columns"
              class="px-5 py-8 text-center text-slate-400"
            >
              {{ emptyMessage }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </BaseCard>
</template>