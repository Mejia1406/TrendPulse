<!-- Samuel Moncada Mejía -->
<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import type { UserInterface } from '@/interfaces/UserInterface';
import type { CreateUserDTO } from '@/dtos/CreateUserDTO';

const props = defineProps<{
  user: UserInterface | null;
}>();

const name = ref('');
const email = ref('');
const password = ref('');
const role = ref('user');
const isRoleOpen = ref(false);
const roles = [
  { label: 'Usuario', value: 'user' },
  { label: 'Administrador', value: 'admin' },
];
const selectRole = (value: string) => {
  role.value = value;
  isRoleOpen.value = false;
};

const title = computed(() => (props.user ? 'Editar usuario' : 'Nuevo usuario'));

const resetForm = () => {
  name.value = '';
  email.value = '';
  password.value = '';
  role.value = 'user';
};

watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      name.value = newUser.name;
      email.value = newUser.email;
      password.value = newUser.password;
    } else {
      resetForm();
    }
  },
  { immediate: true },
);

const emit = defineEmits<{
  (e: 'submit', user: CreateUserDTO): void;
  (e: 'cancel'): void;
}>();

const handleSubmit = () => {
  const userData: CreateUserDTO = {
    name: name.value,
    email: email.value,
    password: password.value,
    role: role.value,
  };

  emit('submit', userData);

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
          v-model="name"
          type="text"
          placeholder="Nombre del usuario"
          required
          class="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-teal-400"
        />
      </div>

      <div>
        <label for="email" class="mb-2 block text-sm font-semibold text-slate-200"> Email </label>

        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="Email del usuario"
          required
          class="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-teal-400"
        />
      </div>

      <div>
        <label class="mb-2 block text-sm font-semibold text-slate-200"> Rol </label>

        <div class="relative">
          <button
            type="button"
            class="flex w-full items-center justify-between rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-left text-slate-200 outline-none transition hover:border-slate-600"
            @click="isRoleOpen = !isRoleOpen"
          >
            <span>
              {{ role === 'admin' ? 'Administrador' : 'Usuario' }}
            </span>

            <span class="text-slate-400"> ▼ </span>
          </button>

          <div
            v-if="isRoleOpen"
            class="absolute z-20 mt-1 w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-1 shadow-xl"
          >
            <button
              v-for="option in roles"
              :key="option.value"
              type="button"
              class="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition"
              :class="
                role === option.value
                  ? 'bg-orange-500 text-black'
                  : 'text-slate-200 hover:bg-slate-800'
              "
              @click="selectRole(option.value)"
            >
              <span>{{ option.label }}</span>

            </button>
          </div>
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
