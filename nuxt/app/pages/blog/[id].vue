<script setup lang="ts">
import { articles } from "~/data/articles";

definePageMeta({
  validate(route) {
    const param = String(route.params.id);

    return articles.some((article) => article.id === param);
  },
});

const route = useRoute();
const id = computed(() => String(route.params.id));
const article = computed(() => articles.find((item) => item.id === id.value));
</script>

<template>
  <div v-if="article" class="mx-auto max-w-4xl px-6 py-8">
    <NuxtLink
      to="/blog"
      class="text-sm font-medium text-teal-400 hover:text-teal-300"
    >
      ← Volver al blog
    </NuxtLink>

    <article
      class="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-6 sm:p-8"
    >
      <p class="mb-3 text-sm font-semibold text-teal-400">TrendPulse Blog</p>

      <h1 class="text-3xl font-bold sm:text-4xl">
        {{ article.title }}
      </h1>

      <p class="mt-4 text-slate-400">
        {{ article.summary }}
      </p>

      <div class="my-6 border-t border-slate-800"></div>

      <p class="leading-8 text-slate-300">
        {{ article.content }}
      </p>
    </article>
  </div>
</template>
