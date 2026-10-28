<script setup lang="ts">
const metrics = [
  {
    id: 1,
    title: 'Visualizaciones',
    description:
      'Indican cuántas veces se ha visto una publicación. Permiten observar la atención que recibe un contenido.',
  },
  {
    id: 2,
    title: 'Me gusta',
    description:
      'Indican cuántas reacciones de me gusta recibe una publicación. Ayudan a identificar el interés del público por un contenido.',
  },
  {
    id: 3,
    title: 'Comentarios',
    description:
      'Indican cuántos comentarios recibe una publicación. Permiten observar la participación del público en la conversación.',
  },
  {
    id: 4,
    title: 'Compartidos',
    description:
      'Indican cuántas veces se comparte una publicación. Ayudan a entender cómo los usuarios difunden un contenido.',
  },
];
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
      Guía de métricas
    </h1>

    <p class="mt-2 text-slate-400">
      Conoce las métricas que puedes consultar en TrendPulse.
    </p>

    <section
      aria-label="Métricas de las publicaciones"
      class="mt-8 space-y-4"
    >
      <details
        v-for="metric in metrics"
        :key="metric.id"
        class="rounded-xl border border-slate-800 bg-slate-900 p-6"
      >
        <summary class="cursor-pointer font-semibold hover:text-teal-400">
          {{ metric.title }}
        </summary>

        <p class="mt-3 text-sm leading-7 text-slate-400">
          {{ metric.description }}
        </p>
      </details>
    </section>
  </div>
</template>