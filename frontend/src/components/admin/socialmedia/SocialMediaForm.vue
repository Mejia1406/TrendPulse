<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import type { SocialMediaInterface } from '@/interfaces/SocialMediaInterface';
import type { CreateSocialMediaDTO } from '@/dtos/CreateSocialMediaDTO';

const props = defineProps<{
  socialMedia: SocialMediaInterface | null;
}>();

const name = ref('');
const logo = ref('');
const color = ref('#000000');

const title = computed(() =>
  props.socialMedia ? 'Editar red' : 'Nueva red'
);

const resetForm = () => {
  name.value = '';
  logo.value = '';
  color.value = '#000000';
};

watch(
  () => props.socialMedia,
  (newSocialMedia) => {
    if (newSocialMedia) {
      name.value = newSocialMedia.name;
      logo.value = newSocialMedia.logo;
      color.value = newSocialMedia.color;
    } else {
      resetForm();
    }
  },
  { immediate: true },
);

const emit = defineEmits<{
  (e: 'submit', socialMedia: CreateSocialMediaDTO): void;
  (e: 'cancel'): void;
}>();

const handleSubmit = () => {
  const socialMediaData: CreateSocialMediaDTO = {
    name: name.value,
    logo: logo.value,
    color: color.value,
  };

  emit('submit', socialMediaData);

  resetForm();
};

</script>

<template>
  <div
    class="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-950 p-6 shadow-2xl"
  >
    <div class="mb-6 flex items-center justify-between">
      <h2 class="text-xl font-semibold text-white">
        {{ title }}
      </h2>

      <button
        type="button"
        class="text-xl text-slate-400 transition hover:text-white"
        @click="emit('cancel')"
      >

      </button>
    </div>

    <form
      class="space-y-5"
      @submit.prevent="handleSubmit"
    >
      <div>
        <label
          for="name"
          class="mb-2 block text-sm font-semibold text-slate-200"
        >
          Nombre
        </label>

        <input
          id="name"
          v-model="name"
          type="text"
          placeholder="Nombre de la red social"
          required
          class="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-teal-400"
        />
      </div>

      <div>
        <label
          for="logo"
          class="mb-2 block text-sm font-semibold text-slate-200"
        >
          Logo (emoji o texto)
        </label>

        <input
          id="logo"
          v-model="logo"
          type="text"
          placeholder="Logo o emoji"
          required
          class="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-teal-400"
        />
      </div>

      <div>
        <label
          for="color"
          class="mb-2 block text-sm font-semibold text-slate-200"
        >
          Color
        </label>

        <div
          class="rounded-xl border border-slate-700 bg-slate-950 p-3"
        >
          <input
            id="color"
            v-model="color"
            type="color"
            class="h-8 w-full cursor-pointer border-0 bg-transparent"
          />
        </div>
      </div>

      <div class="flex justify-end gap-4 pt-2">
        <button
          type="button"
          class="rounded-xl px-4 py-3 font-semibold text-slate-200 transition hover:bg-slate-800"
          @click="emit('cancel')"
        >
          Cancelar
        </button>

        <button
          type="submit"
          class="rounded-xl bg-teal-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-teal-300"
        >
          Guardar
        </button>
      </div>
    </form>
  </div>
</template>