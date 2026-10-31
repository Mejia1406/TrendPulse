import tailwindcss from "@tailwindcss/vite";
import { articles } from "./app/data/articles";

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
    "/trends": { ssr: true },
    "/trends/**": { ssr: true },
    "/help": { ssr: false },
    "/help/**": { ssr: false },
  },

  nitro: {
    prerender: {
      routes: articles.map((article) => `/blog/${article.id}`),
    },
  },
});
