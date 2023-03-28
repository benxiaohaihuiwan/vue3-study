import { createApp } from 'vue'
import App from '@/App.vue'
import i18n  from '@/i18n/index'
import pinia from '@/stores/index'
import '@/theme/index.scss'
import other from '@/utils/other'
import router from '@/router'
// import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
// 按需加载引入
import VXETable from './plugins/vxe-table'


const app = createApp(App)
other.elSvg(app);
app.use(pinia).use(i18n).use(router).use(VXETable).mount('#app')
