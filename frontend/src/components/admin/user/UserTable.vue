<!-- Samuel Moncada Mejía -->
<script setup lang="ts">
// internal imports
import type { UserInterface } from '@/interfaces/UserInterface';

// props
defineProps<{
  users: UserInterface[];
}>();

// emits
const emit = defineEmits<{
	(e: 'edit', user: UserInterface): void;
	(e: 'delete', user: UserInterface): void;
}>();
</script>

<template>
	<div class="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
	<p class="mb-6 font-semibold text-white">
    {{ users.length }} usuarios registrados
  </p>

	<div class="overflow-x-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b border-slate-800 text-left text-user text-sky-300">
            <th class="px-2 py-4 font-medium">
              Nombre
            </th>

            <th class="px-2 py-4 font-medium">
              Email
            </th>

            <th class="px-2 py-4 font-medium">
              Rol
            </th>

            <th class="px-2 py-4 text-right font-medium">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="user in users"
            :key="user.id"
            class="border-b border-slate-800 last:border-b-0"
          >
            <td class="px-2 py-4 font-semibold text-white">
              {{ user.name }}
            </td>

            <td class="px-2 py-4">
              {{ user.email }}
            </td>

            <td class="px-2 py-4">
              {{ user.role }}
            </td>

            <td class="px-2 py-4">
              <div class="flex justify-end gap-4">
                <button
                  type="button"
                  class="text-slate-300 transition hover:text-teal-400"
                  @click="emit('edit', user)"
                >
                  Editar
                </button>

                <button
                  type="button"
                  class="text-red-500 transition hover:text-red-400"
                  @click="emit('delete', user)"
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