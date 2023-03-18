import { createApp } from 'vue'
import App from '@/App.vue'
import i18n  from '@/i18n/index.ts'
import pinia from '@/stores/index.js'
import '@/theme/index.scss'
import other from '@/utils/other';
const app = createApp(App)
other.elSvg(app);
app.use(pinia).use(i18n).mount('#app')
