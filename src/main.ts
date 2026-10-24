import { createHead } from '@vueuse/head'
import { createPinia } from 'pinia'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)
const head = createHead()

app.use(createPinia())
app.use(router)
app.use(head)

app.mount('#app')
