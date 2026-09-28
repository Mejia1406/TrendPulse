<!-- Samuel Moncada Mejía -->
<script setup lang="ts">
// internal imports
import BaseTable from '@/components/common/BaseTable.vue';
import type { UserInterface } from '@/interfaces/UserInterface';

// props
const props = defineProps<{
  users: UserInterface[];
}>();

// emits
const emit = defineEmits<{
  (e: 'edit', user: UserInterface): void;
  (e: 'delete', user: UserInterface): void;
}>();
</script>

<template>
  <BaseTable
    :title="`${props.users.length} usuarios registrados`"
    :empty="props.users.length === 0"
    :columns="4"
    empty-message="No hay usuarios registrados."
    card-class="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-6"
  >
    <template #header>
      <tr class="border-b border-slate-800 text-left">
        <th class="px-2 py-4">
          Nombre
        </th>

        <th class="px-2 py-4">
          Email
        </th>

        <th class="px-2 py-4">
          Rol
        </th>

        <th class="px-2 py-4 text-right">
          Acciones
        </th>
      </tr>
    </template>

    <template #body>
      <tr
        v-for="user in props.users"
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
    </template>
  </BaseTable>
</template>