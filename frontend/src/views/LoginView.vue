<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { AuthService } from '@/services/AuthService';

const router = useRouter();

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const handleSubmit = () => {
  errorMessage.value = '';

  const user = AuthService.login({
    email: email.value,
    password: password.value,
  });

  if (!user) {
    errorMessage.value = 'Email o contraseña incorrectos';
    return;
  }

  if (user.role === 'admin') {
    router.push('/admin/usuarios');
    return;
  }

  router.push('/home');
};
</script>

<template>
  <main class="grid min-h-screen place-items-center bg-slate-950 px-4 text-white">
    <div class="w-full max-w-md">
      <div class="mb-6 flex items-center gap-3">
        <div
          class="grid h-10 w-10 place-items-center rounded-lg bg-teal-400 font-bold text-slate-950"
        >
          TP
        </div>

        <span class="text-xl font-bold">
          Trend<span class="text-teal-400">Pulse</span>
        </span>
      </div>

      <section
        class="rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-2xl"
      >
        <h1 class="text-2xl font-bold">
          Bienvenido
        </h1>

        <p class="mt-1 text-sm text-slate-400">
          Ingresa a tu panel de análisis.
        </p>

        <form
          class="mt-6 space-y-5"
          @submit.prevent="handleSubmit"
        >
          <div>
            <label
              for="email"
              class="mb-2 block text-sm font-semibold text-slate-200"
            >
              Email
            </label>

            <input
              id="email"
              v-model="email"
              type="email"
              required
              placeholder="admin@trend.io"
              class="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-teal-400"
            />
          </div>

          <div>
            <label
              for="password"
              class="mb-2 block text-sm font-semibold text-slate-200"
            >
              Contraseña
            </label>

            <input
              id="password"
              v-model="password"
              type="password"
              required
              placeholder="********"
              class="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-teal-400"
            />
          </div>

          <div
            v-if="errorMessage"
            class="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400"
          >
            {{ errorMessage }}
          </div>

          <button
            type="submit"
            class="w-full rounded-xl bg-teal-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-teal-300"
          >
            Ingresar
          </button>
        </form>

        <div
          class="mt-6 rounded-lg border border-dashed border-slate-700 bg-slate-950/50 p-3 text-xs text-slate-400"
        >
          <p class="font-medium text-white">
            Cuentas demo
          </p>

          <p class="mt-1">
            Admin: smoncadam@eafit.edu.co / 123456
          </p>

          <p>
            Usuario: shurtadom3@eafit.edu.co / 123456
          </p>
        </div>

        <p class="mt-6 text-center text-sm text-slate-400">
          ¿No tienes cuenta?
          <RouterLink
            to="/about"
            class="text-teal-400 hover:underline"
          >
            Contacta al administrador
          </RouterLink>
        </p>
      </section>
    </div>
  </main>
</template>