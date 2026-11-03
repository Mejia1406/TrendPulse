<script setup lang="ts">
import { articles } from "~/data/articles";
</script>

<template>
  <div class="mx-auto max-w-7xl px-6 py-8">
    <div class="mb-8">
      <p class="mb-2 text-sm font-semibold text-teal-400">TrendPulse Blog</p>

      <h1 class="text-3xl font-bold sm:text-4xl">Blog de tendencias</h1>

      <p class="mt-2 text-slate-400">
        Artículos para conocer y entender las tendencias en redes sociales.
      </p>
    </div>

    <section aria-label="Artículos del blog" class="space-y-4">
      <article
        v-for="article in articles"
        :key="article.id"
        class="rounded-xl border border-slate-800 bg-slate-900 p-6"
      >
        <h2 class="text-xl font-semibold">
          <NuxtLink
            :to="`/blog/${article.id}`"
            class="transition hover:text-teal-400"
          >
            {{ article.title }}
          </NuxtLink>
        </h2>

        <p class="mt-2 text-sm leading-6 text-slate-400">
          {{ article.summary }}
        </p>

        <NuxtLink
          :to="`/blog/${article.id}`"
          :aria-label="`Leer artículo: ${article.title}`"
          class="mt-4 inline-block text-sm font-medium text-teal-400 hover:text-teal-300"
        >
          Leer artículo →
        </NuxtLink>
      </article>
    </section>
  </div>
</template>
