import { createApp } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App);
app.use(router);
app.use(store);

app.use(VueApexCharts);

app.mount('#app')
