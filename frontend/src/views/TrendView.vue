<!-- Athina Cappelletti -->
<script setup lang="ts">
import { computed, ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import { TrendService } from '@/services/TrendService';

const filters = ref({
    socialMedia: 'Todas',
});

const trends = computed(() => TrendService.filterTrends(filters.value));

const socialMediaOptions = computed(() => [
    'Todas',
    ...new Set(TrendService.getTrends().map((trend) => trend.socialMedia)),
]);

const chartSeries = computed(() => {
    const selected =
        filters.value.socialMedia === 'Todas'
            ? [...new Set(TrendService.getTrends().map((trend) => trend.socialMedia))]
            : [filters.value.socialMedia];

    return selected.map((network) => ({
        name: network,
        data: TrendService.getTrends()
            .filter((trend) => trend.socialMedia === network)
            .map((trend) => ({
                x: trend.date,
                y: trend.views,
                socialMedia: trend.socialMedia,
            })),
    }));
});

const chartOptions = computed(() => ({
    chart: {
        type: 'area',
        height: 350,
        background: 'transparent',
        toolbar: { show: false },
        zoom: { enabled: false },
    },
    dataLabels: { enabled: false },
    stroke: {
        curve: 'smooth',
        width: 3,
        colors: ['#2dd4bf'],
    },
    fill: {
        type: 'gradient',
        gradient: {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 0.4,
            gradientToColors: ['#14b8a6'],
            opacityFrom: 0.7,
            opacityTo: 0.15,
            stops: [0, 80, 100],
        },
    },
    colors: ['#2dd4bf'],
    markers: {
        size: 5,
        strokeWidth: 0,
        colors: ['#2dd4bf'],
        hover: {
            size: 7,
        },
    },
    grid: {
        borderColor: '#334155',
        strokeDashArray: 4,
        xaxis: { lines: { show: false } },
        yaxis: { lines: { show: true } },
    },
    xaxis: {
        type: 'datetime',
        labels: {
            style: {
                colors: '#94a3b8',
                fontSize: '12px',
            },
        },
    },
    yaxis: {
        labels: {
            formatter: (value: number) => `${(value / 1000).toFixed(0)}k`,
            style: { colors: '#94a3b8' },
        },
    },
    tooltip: {
        theme: 'dark',
        custom: ({ series, seriesIndex, dataPointIndex, w }: any) => {
            const point = w.config.series[seriesIndex].data[dataPointIndex];
            const date = point?.x ?? '';
            const value = series[seriesIndex][dataPointIndex];
            const network = point?.socialMedia ?? w.config.series[seriesIndex].name;

            return `
      <div style="
        background:#0f172a;
        color:#fff;
        border:1px solid #2dd4bf;
        border-radius:12px;
        padding:12px 14px;
        min-width:180px;
        box-shadow:0 10px 20px rgba(0,0,0,0.35);
      ">
        <div style="font-size:12px; color:#cbd5e1; margin-bottom:6px;">${date}</div>
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
          <span style="
            width:10px; height:10px; border-radius:50%;
            background:#2dd4bf; display:inline-block;
          "></span>
          <strong>${network}</strong>
        </div>
        <div style="font-size:14px; font-weight:600;">
          Vistas: ${Number(value).toLocaleString()} vistas
        </div>
      </div>
    `;
        },
    },
}));
</script>

<template>
    <main class="min-h-screen bg-slate-950 text-white">
        <div class="mx-auto max-w-7xl px-4 py-8">
            <div class="mt-2 rounded-2xl border border-slate-800 bg-slate-900/90 p-6">
                <h1 class="text-4xl font-bold">Tendencias</h1>
                <p class="mt-1 text-sm text-slate-400">
                    Filtra y analiza la evolución de tendencias.
                </p>

                <div class="mt-6 max-w-md">
                    <label class="block">
                        <span class="mb-2 block text-sm text-slate-300">Red social</span>
                        <select v-model="filters.socialMedia"
                            class="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-teal-400">
                            <option v-for="option in socialMediaOptions" :key="option" :value="option">
                                {{ option }}
                            </option>
                        </select>
                    </label>
                </div>
            </div>

            <div class="mt-8 rounded-2xl border border-slate-800 bg-slate-900/90 p-6">
                <h2 class="mb-4 text-2xl font-bold">Evolución de tendencias</h2>

                <apexchart type="area" height="350" :options="chartOptions" :series="chartSeries" />
            </div>

            <div class="mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90">
                <div class="border-b border-slate-800 px-5 py-4">
                    <h3 class="text-xl font-semibold">Resultados ({{ trends.length }})</h3>
                </div>

                <div class="overflow-x-auto">
                    <table class="min-w-full text-left">
                        <thead class="bg-slate-950/80 text-slate-300">
                            <tr>
                                <th class="px-5 py-3">Nombre</th>
                                <th class="px-5 py-3">Red</th>
                                <th class="px-5 py-3">Fecha</th>
                                <th class="px-5 py-3">Vistas</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="trend in trends" :key="trend.id"
                                class="border-t border-slate-800 text-slate-200">
                                <td class="px-5 py-4">{{ trend.name }}</td>
                                <td class="px-5 py-4">{{ trend.socialMedia }}</td>
                                <td class="px-5 py-4">{{ trend.date }}</td>
                                <td class="px-5 py-4">{{ trend.views.toLocaleString() }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </main>
</template>