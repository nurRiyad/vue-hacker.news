import { createHead } from '@vueuse/head'
import { PiniaColada } from '@pinia/colada'
import { createPinia } from 'pinia'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)
const head = createHead()

app.use(createPinia())
app.use(PiniaColada, { queryOptions: { staleTime: 30_000 } })
app.use(router)
app.use(head)

app.mount('#app')
