<!-- Samuel Moncada Mejía -->
<script setup lang="ts">
// external imports
import { computed } from 'vue';

// props
const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'danger';
    type?: 'button' | 'submit' | 'reset';
  }>(),
  {
    variant: 'primary',
    type: 'button',
  },
);

// computed variables
const buttonClasses = computed(() => {
  const variants = {
    primary: 'bg-teal-400 text-slate-950 hover:bg-teal-300',

    secondary: 'text-slate-200 hover:bg-slate-800',

    danger: 'text-red-500 hover:bg-red-500/10 hover:text-red-400',
  };

  return variants[props.variant];
});
</script>

<template>
  <button :type="type" class="rounded-xl px-5 py-3 font-semibold transition" :class="buttonClasses">
    <slot />
  </button>
</template>
