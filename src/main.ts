import { createApp } from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { createPinia } from 'pinia'

const app = createApp(App);
app.use(router);
app.use(store);
app.use(createPinia());
app.mount('#app')
