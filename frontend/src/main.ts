// external imports
import { createApp } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

// internal imports
import './assets/css/input.css';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);
app.use(VueApexCharts);
app.mount('#app');
