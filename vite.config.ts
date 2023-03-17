import { defineConfig, ConfigEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver  from 'unplugin-icons/resolver'

import { viteMockServe } from 'vite-plugin-mock'
import { createHtmlPlugin } from 'vite-plugin-html'

import { resolve } from 'path'

const pathResolve = (dir: string) => {
	return resolve(__dirname, '.', dir);
};

const alias: Record<string, string> = {
	'@': pathResolve('./src/'),
	find: 'vue-i18n',
  replacement: 'vue-i18n/dist/vue-i18n.cjs.js', //解决i8n警告

};
// https://vitejs.dev/config/
const viteConfig = defineConfig((mode: ConfigEnv) => {
  return {
    resolve: { alias },
    plugins: [
      vue(),
      viteMockServe(),
      createHtmlPlugin({
        inject:{
          data:{
            title:'vue3+ts+vite'
          }
        }
      }),
      AutoImport({
        eslintrc:{
          enabled:true
        },
        resolvers: [
          // 自动导入 Element Plus 相关函数，如 ELMessage，ELMessageBx... 带样式
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({
            prefix:'Icon'
          })
        ],
      }),
      Components({
        resolvers: [
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
          // 自动注册图标
          IconsResolver({
            enabledCollections:['ep']
          })
        ],
      }),
      Icons({
        autoInstall:true
      })
    ],
    define: {
      __VUE_I18N_LEGACY_API__: JSON.stringify(false),
      __VUE_I18N_FULL_INSTALL__: JSON.stringify(false),
    },
  }
})
export default viteConfig;