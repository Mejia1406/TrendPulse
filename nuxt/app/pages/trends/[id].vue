<script setup lang="ts">
import type { Trend } from "~~/server/data/trends";

const route = useRoute();
const id = computed(() => String(route.params.id));

const { data: trend } = await useFetch<Trend>(`/api/trends/${id.value}`);
</script>

<template>
  <div v-if="trend" class="mx-auto max-w-4xl px-6 py-8">
    <NuxtLink
      to="/trends"
      class="text-sm font-medium text-teal-400 hover:text-teal-300"
    >
      ← Volver a tendencias
    </NuxtLink>

    <article
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
  </div>
</template>
