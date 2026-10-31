<script setup lang="ts">
import type { Trend } from "~~/server/data/trends";

const { data: trends } = await useFetch<Trend[]>("/api/trends");
</script>

<template>
  <div class="mx-auto max-w-7xl px-6 py-8">
    <div class="mb-8">
      <p class="mb-2 text-sm font-semibold text-teal-400">TrendPulse Tendencias</p>

      <h1 class="text-3xl font-bold sm:text-4xl">Tendencias</h1>

      <p class="mt-2 text-slate-400">
        Explora las tendencias registradas en las distintas redes sociales.
      </p>
    </div>

    <section aria-label="Listado de tendencias" class="space-y-4">
      <article
        v-for="trend in trends"
        :key="trend.id"
        class="rounded-xl border border-slate-800 bg-slate-900 p-6"
      >
        <h2 class="text-xl font-semibold">
          <NuxtLink
            :to="`/trends/${trend.id}`"
            class="transition hover:text-teal-400"
          >
            {{ trend.name }}
          </NuxtLink>
        </h2>

        <p class="mt-1 text-sm text-slate-400">
          {{ trend.category }} · {{ trend.socialMedia }}
        </p>

        <NuxtLink
          :to="`/trends/${trend.id}`"
          :aria-label="`Ver tendencia: ${trend.name}`"
          class="mt-4 inline-block text-sm font-medium text-teal-400 hover:text-teal-300"
        >
          Ver tendencia →
        </NuxtLink>
      </article>
    </section>
  </div>
</template>
