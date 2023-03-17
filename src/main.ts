import { createApp } from 'vue'
import App from '@/App.vue'
import i18n  from '@/i18n/index.js'
import pinia from '@/stores/index.js'
import '@/theme/index.scss'
const app = createApp(App)

app.use(pinia).use(i18n).mount('#app')
