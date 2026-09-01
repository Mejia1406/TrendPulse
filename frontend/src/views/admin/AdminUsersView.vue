<!-- Samuel Moncada Mejía -->
<script setup lang="ts">
// external imports
import { ref } from 'vue';

// internal imports
import type { CreateUserDTO } from '@/dtos/CreateUserDTO';
import type { UserInterface } from '@/interfaces/UserInterface';
import { UserService } from '@/services/UserService';
import BaseButton from '@/components/common/BaseButton.vue';
import UserForm from '@/components/admin/user/UserForm.vue';
import UserTable from '@/components/admin/user/UserTable.vue';

// variables
const users = UserService.getAll();

// reactive variables
const isFormOpen = ref(false);

// selectors
const selectedUser = ref<UserInterface | null>(null);

// handlers
const handleCreate = () => {
  selectedUser.value = null;
  isFormOpen.value = true;
};

const handleEdit = (user: UserInterface) => {
  selectedUser.value = user;
  isFormOpen.value = true;
};

const handleDelete = (user: UserInterface) => {
  UserService.delete(user.id);

  if (selectedUser.value?.id === user.id) {
    selectedUser.value = null;
    isFormOpen.value = false;
  }
};

const handleSubmit = (userData: CreateUserDTO) => {
  if (selectedUser.value) {
    UserService.update(selectedUser.value.id, userData);
  } else {
    UserService.create(userData);
  }

  selectedUser.value = null;
  isFormOpen.value = false;
};

const handleCancel = () => {
  selectedUser.value = null;
  isFormOpen.value = false;
};
</script>

<template>
  <div class="min-h-screen bg-slate-950 p-8 text-white">
    <div class="mx-auto max-w-7xl">
      <div class="mb-8 flex items-center justify-between">
        <div>
          <p class="mb-1 text-sm font-semibold text-orange-500">Administración</p>

          <h1 class="text-3xl font-bold">Usuarios</h1>
        </div>

        <BaseButton type="button" @click="handleCreate"> + Crear usuario </BaseButton>
      </div>

      <UserTable :users="users" @edit="handleEdit" @delete="handleDelete" />
    </div>

    <div
      v-if="isFormOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
    >
      <UserForm :user="selectedUser" @submit="handleSubmit" @cancel="handleCancel" />
    </div>
  </div>
</template>
