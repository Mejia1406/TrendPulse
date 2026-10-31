<script setup lang="ts">
import type { Trend } from "~~/server/data/trends";

const route = useRoute();
const id = computed(() => String(route.params.id));

const { data: trend, error } = await useFetch<Trend>(
  `/api/trends/${id.value}`,
);
</script>

<template>
  <div class="mx-auto max-w-4xl px-6 py-8">
    <NuxtLink
      to="/trends"
      class="text-sm font-medium text-teal-400 hover:text-teal-300"
    >
      ← Volver a tendencias
    </NuxtLink>

    <article
      v-if="trend"
      class="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-6 sm:p-8"
    >
      <p class="mb-3 text-sm font-semibold text-teal-400">
        {{ trend.category }} · {{ trend.socialMedia }}
      </p>

      <h1 class="text-3xl font-bold sm:text-4xl">
        {{ trend.name }}
      </h1>

      <div class="my-6 border-t border-slate-800"></div>

      <p class="leading-8 text-slate-300">
        {{ trend.description }}
      </p>
    </article>

    <div
      v-else
      class="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-6 text-center sm:p-8"
    >
      <h1 class="text-2xl font-bold sm:text-3xl">
        La tendencia no existe
      </h1>

      <p class="mt-3 text-slate-400">
        No encontramos ninguna tendencia con el identificador
        <span class="font-semibold text-slate-200">{{ id }}</span>. Es posible
        que el enlace sea incorrecto o que la tendencia ya no esté disponible.
      </p>

      <NuxtLink
        to="/trends"
        class="mt-6 inline-block rounded-lg bg-teal-400 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-teal-300"
      >
        Ver todas las tendencias
      </NuxtLink>
    </div>
  </div>
</template>
