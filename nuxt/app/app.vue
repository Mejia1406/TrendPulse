<template>
  <div class="flex min-h-screen flex-col bg-slate-950 text-white">
    <NuxtRouteAnnouncer />

    <header class="border-b border-slate-800 bg-slate-950">
      <div
        class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <NuxtLink to="/blog" class="flex items-center gap-3">
          <div
            class="grid h-10 w-10 place-items-center rounded-xl bg-teal-400 font-bold text-slate-950">
            TP
          </div>

          <span class="text-xl font-bold">
            Trend<span class="text-teal-400">Pulse</span>
          </span>
        </NuxtLink>

        <nav aria-label="Navegación principal">
          <div class="flex items-center gap-4">
            <NuxtLink
              to="/blog"
              class="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white">
              Blog
            </NuxtLink> 

            <NuxtLink
              to="/help"
              class="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white">
              Centro de ayuda
            </NuxtLink>
          </div>
        </nav>
      </div>
    </header>

    <main class="flex-1">
      <NuxtPage />
    </main>

    <footer
      class="border-t border-slate-800 px-6 py-5 text-center text-sm text-slate-400">
      TrendPulse · Blog de tendencias digitales
    </footer>
  </div>
</template>
