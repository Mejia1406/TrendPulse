<template>
  <div class="mx-auto max-w-7xl px-6 py-8">
    <div class="mb-8">
      <p class="mb-2 text-sm font-semibold text-teal-400">
        TrendPulseHelp
      </p>

      <h1 class="text-3xl font-bold sm:text-4xl">
        Centro de ayuda
      </h1>

      <p class="mt-2 text-slate-400">
        Resuelve tus dudas sobre el uso de TrendPulse.
      </p>
    </div>

    <section aria-label="Secciones de ayuda" class="space-y-4">
      <NuxtLink
        to="/help/faq"
        class="block rounded-xl border border-slate-800 bg-slate-900
               p-6 transition hover:border-teal-400"
      >
        <h2 class="text-xl font-semibold text-teal-400">
          Preguntas frecuentes
        </h2>

        <p class="mt-2 text-sm leading-6 text-slate-400">
          Encuentra respuestas a las preguntas más comunes sobre
          TrendPulse.
        </p>
      </NuxtLink>
      <NuxtLink
        to="/help/guide"
        class="block rounded-xl border border-slate-800 bg-slate-900
               p-6 transition hover:border-teal-400"
      >
        <h2 class="text-xl font-semibold text-teal-400">
          Guía de métricas
        </h2>

        <p class="mt-2 text-sm leading-6 text-slate-400">
          Conoce las métricas que puedes consultar en
          TrendPulse.
        </p>
      </NuxtLink>
    </section>
  </div>
</template>