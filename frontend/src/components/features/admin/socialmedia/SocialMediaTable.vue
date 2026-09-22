<!-- Samuel Moncada Mejía -->
<script setup lang="ts">
// internal imports
import BaseTable from '@/components/common/BaseTable.vue';
import type { SocialMediaInterface } from '@/interfaces/SocialMediaInterface';

// props
const props = defineProps<{
  socialMedias: SocialMediaInterface[];
}>();

// emits
const emit = defineEmits<{
  (e: 'edit', socialMedia: SocialMediaInterface): void;
  (e: 'delete', socialMedia: SocialMediaInterface): void;
}>();
</script>

<template>
  <BaseTable
    :title="`${props.socialMedias.length} redes registradas`"
    :empty="props.socialMedias.length === 0"
    :columns="4"
    empty-message="No hay redes sociales registradas."
    content-class="px-6 pb-6"
  >
    <template #header>
      <tr class="border-b border-slate-800 text-left">
        <th class="px-2 py-4">
          Nombre
        </th>

        <th class="px-2 py-4">
          Logo
        </th>

        <th class="px-2 py-4">
          Color
        </th>

        <th class="px-2 py-4 text-right">
          Acciones
        </th>
      </tr>
    </template>

    <template #body>
      <tr
        v-for="socialMedia in props.socialMedias"
        :key="socialMedia.id"
        class="border-b border-slate-800 last:border-b-0"
      >
        <td class="px-2 py-4 font-semibold text-white">
          {{ socialMedia.name }}
        </td>

        <td class="px-2 py-4">
          <img
            :src="socialMedia.logo"
            :alt="`Logo de ${socialMedia.name}`"
            class="h-8 w-8 object-contain"
          />
        </td>

        <td class="px-2 py-4">
          <div
            class="h-6 w-6 rounded"
            :style="{ backgroundColor: socialMedia.color }"
          ></div>
        </td>

        <td class="px-2 py-4">
          <div class="flex justify-end gap-4">
            <button
              type="button"
              class="text-slate-300 transition hover:text-teal-400"
              @click="emit('edit', socialMedia)"
            >
              Editar
            </button>

            <button
              type="button"
              class="text-red-500 transition hover:text-red-400"
              @click="emit('delete', socialMedia)"
            >
              Eliminar
            </button>
          </div>
        </td>
      </tr>
    </template>
  </BaseTable>
</template>