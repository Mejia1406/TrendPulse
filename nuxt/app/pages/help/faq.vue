// Sara Hurtado

<script setup lang="ts">
// internal imports
import { faqs } from '~/data/faqs'
</script>

<template>
  <div class="mx-auto max-w-4xl px-6 py-8">
    <NuxtLink
      to="/help"
      class="text-sm font-medium text-teal-400 hover:text-teal-300"
    >
      ← Volver al centro de ayuda
    </NuxtLink>

    <h1 class="mt-6 text-3xl font-bold sm:text-4xl">
      Preguntas frecuentes
    </h1>

    <p class="mt-2 text-slate-400">
      Encuentra respuestas a las dudas más comunes sobre TrendPulse.
    </p>

    <section
      aria-label="Preguntas y respuestas"
      class="mt-8 space-y-4"
    >
      <details
        v-for="faq in faqs"
        :key="faq.id"
        class="rounded-xl border border-slate-800 bg-slate-900 p-6"
      >
        <summary class="cursor-pointer font-semibold hover:text-teal-400">
          {{ faq.question }}
        </summary>

        <p class="mt-3 text-sm leading-7 text-slate-400">
          {{ faq.answer }}
        </p>
      </details>
    </section>
  </div>
</template>