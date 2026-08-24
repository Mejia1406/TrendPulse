<!-- Samuel Moncada Mejía -->
<script setup lang="ts">
import { ref } from 'vue';

import type { SocialMediaInterface } from '@/interfaces/SocialMediaInterface';
import type { CreateSocialMediaDTO } from '@/dtos/CreateSocialMediaDTO';

import SocialMediaTable from '@/components/admin/socialmedia/SocialMediaTable.vue';
import SocialMediaForm from '@/components/admin/socialmedia/SocialMediaForm.vue';

import { SocialMediaService } from '@/services/SocialMediaService';

const isFormOpen = ref(false);

const socialMediaList = SocialMediaService.getSocialMedia();

const selectedSocialMedia = ref<SocialMediaInterface | null>(null);

const handleCreate = () => {
  selectedSocialMedia.value = null;
  isFormOpen.value = true;
};

const handleEdit = (socialMedia: SocialMediaInterface) => {
  selectedSocialMedia.value = socialMedia;
  isFormOpen.value = true;
};

const handleDelete = (socialMedia: SocialMediaInterface) => {
  SocialMediaService.deleteSocialMedia(socialMedia.id);

  if (selectedSocialMedia.value?.id === socialMedia.id) {
    selectedSocialMedia.value = null;
    isFormOpen.value = false;
  }
};

const handleSubmit = (socialMediaData: CreateSocialMediaDTO) => {
  if (selectedSocialMedia.value) {
    SocialMediaService.updateSocialMedia(
      selectedSocialMedia.value.id,
      socialMediaData,
    );
  } else {
    SocialMediaService.createSocialMedia(socialMediaData);
  }

  selectedSocialMedia.value = null;
  isFormOpen.value = false;
};

const handleCancel = () => {
  selectedSocialMedia.value = null;
  isFormOpen.value = false;
};
</script>

<template>
  <div class="min-h-screen bg-slate-950 p-8 text-white">
    <div class="mx-auto max-w-7xl">
      <div class="mb-8 flex items-center justify-between">
        <div>
          <p class="mb-1 text-sm font-semibold text-orange-500">
            Administración
          </p>

          <h1 class="text-3xl font-bold">
            Redes sociales
          </h1>
        </div>

        <button
          type="button"
          class="rounded-xl bg-teal-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-teal-300"
          @click="handleCreate"
        >
          + Crear nueva red
        </button>
      </div>

      <SocialMediaTable
        :socialMedia="socialMediaList"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </div>

    <div
      v-if="isFormOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
    >
      <SocialMediaForm
        :socialMedia="selectedSocialMedia"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
    </div>
  </div>
</template>