import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver  from 'unplugin-icons/resolver'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
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
  ]
});
