<!-- Samuel Moncada Mejía -->
<script setup lang="ts">
import { ref } from 'vue';

import type { UserInterface } from '@/interfaces/UserInterface';
import type { CreateUserDTO } from '@/dtos/CreateUserDTO';

import UserTable from '@/components/admin/user/UserTable.vue';
import UserForm from '@/components/admin/user/UserForm.vue';

import { UserService } from '@/services/UserService';

const isFormOpen = ref(false);
const users = UserService.getUsers();
const selectedUser = ref<UserInterface | null>(null);

const handleCreate = () => {
  selectedUser.value = null;
  isFormOpen.value = true;
};

const handleEdit = (user: UserInterface) => {
  selectedUser.value = user;
  isFormOpen.value = true;
};

const handleDelete = (user: UserInterface) => {
  UserService.deleteUser(user.id);

  if (selectedUser.value?.id === user.id) {
    selectedUser.value = null;
    isFormOpen.value = false;
  }
};

const handleSubmit = (userData: CreateUserDTO) => {
  if (selectedUser.value) {
    UserService.updateUser(selectedUser.value.id, userData);
  } else {
    UserService.createUser(userData);
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
          <p class="mb-1 text-sm font-semibold text-orange-500">
            Administración
          </p>

          <h1 class="text-3xl font-bold">
            Usuarios
          </h1>
        </div>

        <button
          type="button"
          class="rounded-xl bg-teal-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-teal-300"
          @click="handleCreate"
        >
          + Crear usuario
        </button>
      </div>

      <UserTable
        :users="users"
        @edit="handleEdit"  
        @delete="handleDelete"
      />
    </div>

    <div
      v-if="isFormOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
    >
      <UserForm
        :user="selectedUser"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
    </div>
  </div>
</template>