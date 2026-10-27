import tailwindcss from "@tailwindcss/vite";
import { trends } from "./app/data/trends";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

  devtools: {
    enabled: true,
  },

  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  routeRules: {
    "/blog": { prerender: true },
    "/blog/**": { prerender: true },
  },

  nitro: {
    prerender: {
      routes: trends.map((trend) => `/blog/${trend.id}`),
    },
  },
});
