<!-- Samuel Moncada Mejía -->
<script setup lang="ts">
// external imports
import { ref } from 'vue';

// internal imports
import type { CreateSocialMediaDTO } from '@/dtos/CreateSocialMediaDTO';
import type { SocialMediaInterface } from '@/interfaces/SocialMediaInterface';
import { SocialMediaService } from '@/services/SocialMediaService';

import BaseButton from '@/components/common/BaseButton.vue';
import SocialMediaForm from '@/components/admin/socialmedia/SocialMediaForm.vue';
import SocialMediaTable from '@/components/admin/socialmedia/SocialMediaTable.vue';

//variables
const socialMedias = SocialMediaService.getAll();

// reactive variables
const isFormOpen = ref(false);

// selectors
const selectedSocialMedia = ref<SocialMediaInterface | null>(null);

// handlers
const handleCreate = () => {
  selectedSocialMedia.value = null;
  isFormOpen.value = true;
};

const handleEdit = (socialMedia: SocialMediaInterface) => {
  selectedSocialMedia.value = socialMedia;
  isFormOpen.value = true;
};

const handleDelete = (socialMedia: SocialMediaInterface) => {
  SocialMediaService.delete(socialMedia.id);

  if (selectedSocialMedia.value?.id === socialMedia.id) {
    selectedSocialMedia.value = null;
    isFormOpen.value = false;
  }
};

const handleSubmit = (socialMediaData: CreateSocialMediaDTO) => {
  if (selectedSocialMedia.value) {
    SocialMediaService.update(selectedSocialMedia.value.id, socialMediaData);
  } else {
    SocialMediaService.create(socialMediaData);
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
          <p class="mb-1 text-sm font-semibold text-orange-500">Administración</p>

          <h1 class="text-3xl font-bold">Redes sociales</h1>
        </div>

        <BaseButton type="button" @click="handleCreate"> + Crear nueva red </BaseButton>
      </div>

      <SocialMediaTable :socialMedias="socialMedias" @edit="handleEdit" @delete="handleDelete" />
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
