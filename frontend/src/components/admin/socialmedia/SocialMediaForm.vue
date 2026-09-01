<!-- Samuel Moncada Mejía -->
<script setup lang="ts">
//external imports
import { computed, ref, watch } from 'vue';

//internal imports
import BaseButton from '@/components/common/BaseButton.vue';
import type { CreateSocialMediaDTO } from '@/dtos/CreateSocialMediaDTO';
import type { SocialMediaInterface } from '@/interfaces/SocialMediaInterface';

// props
const props = defineProps<{
  socialMedia: SocialMediaInterface | null;
}>();

// emits
const emit = defineEmits<{
  (e: 'submit', socialMedia: CreateSocialMediaDTO): void;

  (e: 'cancel'): void;
}>();

// reactive variables
const form = ref<CreateSocialMediaDTO>({
  name: '',
  logo: '',
  color: '#000000',
});

// computed variables
const title = computed(() => (props.socialMedia ? 'Editar red' : 'Nueva red'));

// functions
const resetForm = () => {
  form.value = {
    name: '',
    logo: '',
    color: '#000000',
  };
};

// watchers
watch(
  () => props.socialMedia,
  (newSocialMedia) => {
    if (newSocialMedia) {
      form.value = {
        name: newSocialMedia.name,
        logo: newSocialMedia.logo,
        color: newSocialMedia.color,
      };

      return;
    }

    resetForm();
  },
  {
    immediate: true,
  },
);

// handlers
const handleSubmit = () => {
  emit('submit', {
    ...form.value,
  });

  resetForm();
};
</script>

<template>
  <div class="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-950 p-6 shadow-2xl">
    <div class="mb-6 flex items-center justify-between">
      <h2 class="text-xl font-semibold text-white">
        {{ title }}
      </h2>

      <button
        type="button"
        class="text-xl text-slate-400 transition hover:text-white"
        @click="emit('cancel')"
      ></button>
    </div>

    <form class="space-y-5" @submit.prevent="handleSubmit">
      <div>
        <label for="name" class="mb-2 block text-sm font-semibold text-slate-200"> Nombre </label>

        <input
          id="name"
          v-model="form.name"
          type="text"
          placeholder="Nombre de la red social"
          required
          class="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-teal-400"
        />
      </div>

      <div>
        <label for="logo" class="mb-2 block text-sm font-semibold text-slate-200">
          Logo (emoji o texto)
        </label>

        <input
          id="logo"
          v-model="form.logo"
          type="text"
          placeholder="Logo o emoji"
          required
          class="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-teal-400"
        />
      </div>

      <div>
        <label for="color" class="mb-2 block text-sm font-semibold text-slate-200"> Color </label>

        <div class="rounded-xl border border-slate-700 bg-slate-950 p-3">
          <input
            id="color"
            v-model="form.color"
            type="color"
            class="h-8 w-full cursor-pointer border-0 bg-transparent"
          />
        </div>
      </div>

      <div class="flex justify-end gap-4 pt-2">
        <BaseButton variant="secondary" type="button" @click="emit('cancel')">
          Cancelar
        </BaseButton>

        <BaseButton type="submit"> Guardar </BaseButton>
      </div>
    </form>
  </div>
</template>
