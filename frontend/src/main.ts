// external imports
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VueApexCharts from 'vue3-apexcharts';

// internal imports
import './assets/css/input.css';
import App from './App.vue';
import router from './router';

const app = createApp(App);
const pinia = createPinia();

// Pinia must be registered before the router so that stores are available
// inside navigation guards (accessControl.ts) during the initial navigation.
app.use(pinia);
app.use(router);
app.use(VueApexCharts);

app.mount('#app');
