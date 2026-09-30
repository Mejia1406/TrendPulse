<!-- Samuel Moncada Mejía -->
<script setup lang="ts">
// external imports
import { onMounted, ref } from 'vue';

// internal imports
import type { CreateSocialMediaDTO } from '@/dtos/CreateSocialMediaDTO';
import type { SocialMediaInterface } from '@/interfaces/SocialMediaInterface';
import { SocialMediaService } from '@/services/SocialMediaService';
import BaseButton from '@/components/common/BaseButton.vue';
import SocialMediaForm from '@/components/features/admin/socialmedia/SocialMediaForm.vue';
import SocialMediaTable from '@/components/features/admin/socialmedia/SocialMediaTable.vue';

// reactive variables
const isFormOpen = ref(false);
const socialMedias = ref<SocialMediaInterface[]>([]);

// methods
const getSocialMedias = async () => {
  socialMedias.value = await SocialMediaService.getAll();
};

// lifecycle hooks
onMounted(() => {
  getSocialMedias();
});

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

const handleDelete = async (socialMedia: SocialMediaInterface) => {
  await SocialMediaService.delete(socialMedia.id);

  await getSocialMedias();

  if (selectedSocialMedia.value?.id === socialMedia.id) {
    selectedSocialMedia.value = null;
    isFormOpen.value = false;
  }
};

const handleSubmit = async (socialMediaData: CreateSocialMediaDTO) => {
  if (selectedSocialMedia.value) {
    await SocialMediaService.update(selectedSocialMedia.value.id, socialMediaData);
  } else {
    await SocialMediaService.create(socialMediaData);
  }

  await getSocialMedias();

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
