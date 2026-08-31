<!-- Samuel Moncada Mejía -->
<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import BaseButton from '@/components/common/BaseButton.vue';
import type { UserInterface } from '@/interfaces/UserInterface';
import type { CreateUserDTO } from '@/dtos/CreateUserDTO';

const props = defineProps<{
  user: UserInterface | null;
}>();

const form = ref<CreateUserDTO>({
  name: '',
  email: '',
  password: '',
  role: 'user',
});

const isRoleOpen = ref(false);

const selectorRoles = [
  { label: 'Usuario', value: 'user' },
  { label: 'Administrador', value: 'admin' },
];

const selectRole = (value: string) => {
  form.value.role = value;
  isRoleOpen.value = false;
};

const title = computed(() => (props.user ? 'Editar usuario' : 'Nuevo usuario'));

const resetForm = () => {
  form.value = {
    name: '',
    email: '',
    password: '',
    role: 'user',
  };
};

watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      form.value = {
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
      };

      return;
    }

    resetForm();
  },
  {
    immediate: true,
  },
);

const emit = defineEmits<{
  (e: 'submit', user: CreateUserDTO): void;
  (e: 'cancel'): void;
}>();

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
          placeholder="Nombre del usuario"
          required
          class="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-teal-400"
        />
      </div>

      <div>
        <label for="email" class="mb-2 block text-sm font-semibold text-slate-200"> Email </label>

        <input
          id="email"
          v-model="form.email"
          type="email"
          placeholder="Email del usuario"
          required
          class="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-teal-400"
        />
      </div>

      <div>
        <label for="password" class="mb-2 block text-sm font-semibold text-slate-200">
          Contraseña
        </label>

        <input
          id="password"
          v-model="form.password"
          type="password"
          placeholder="Contraseña del usuario"
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
              {{ form.role === 'admin' ? 'Administrador' : 'Usuario' }}
            </span>

            <span class="text-slate-400"> ▼ </span>
          </button>

          <div
            v-if="isRoleOpen"
            class="absolute z-20 mt-1 w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-1 shadow-xl"
          >
            <button
              v-for="role in selectorRoles"
              :key="role.value"
              type="button"
              class="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition"
              :class="
                form.role === role.value
                  ? 'bg-orange-500 text-black'
                  : 'text-slate-200 hover:bg-slate-800'
              "
              @click="selectRole(role.value)"
            >
              <span>
                {{ role.label }}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div class="flex justify-end gap-4 pt-2">
        <BaseButton variant="secondary" type="button" @click="emit('cancel')">
          Cancelar
        </BaseButton>

        <BaseButton type="submit">
          Guardar
        </BaseButton>
      </div>
    </form>
  </div>
</template>
