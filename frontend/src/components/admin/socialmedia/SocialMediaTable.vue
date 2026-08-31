<!-- Samuel Moncada Mejía -->
<script setup lang="ts">
import type { SocialMediaInterface } from '@/interfaces/SocialMediaInterface';

defineProps<{
  socialMedias: SocialMediaInterface[];
}>();

const emit = defineEmits<{
  (e: 'edit', socialMedia: SocialMediaInterface): void;
  (e: 'delete', socialMedia: SocialMediaInterface): void;
}>();

</script>

<template>
  <div class="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
    <p class="mb-6 font-semibold text-white">
      {{ socialMedias.length }} redes registradas
    </p>

    <div class="overflow-x-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b border-slate-800 text-left text-sm text-sky-300">
            <th class="px-2 py-4 font-medium">
              Nombre
            </th>

            <th class="px-2 py-4 font-medium">
              Logo
            </th>

            <th class="px-2 py-4 font-medium">
              Color
            </th>

            <th class="px-2 py-4 text-right font-medium">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="socialMedia in socialMedias"
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
        </tbody>
      </table>
    </div>
  </div>
</template>