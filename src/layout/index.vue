<template>
  <component :is="layouts[themeConfig.layout]"></component>
</template>

<script setup lang='ts' name='layout'>
import {
  onBeforeMount,
  onMounted,
  defineAsyncComponent,
  onUnmounted,
} from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeConfig } from '@/stores/themeConfig'
import mittBus from '@/utils/mitt'
import { Local } from '@/utils/storage'

// 引入组件
const layouts: any = {
  defaults: defineAsyncComponent(() => import('@/layout/main/defaults.vue')),
  classic: defineAsyncComponent(() => import('@/layout/main/classic.vue')),
  transverse: defineAsyncComponent(
    () => import('@/layout/main/transverse.vue')
  ),
  columns: defineAsyncComponent(() => import('@/layout/main/columns.vue')),
}

// 定义变量内容
const storesThemeConfig = useThemeConfig()
const { themeConfig } = storeToRefs(storesThemeConfig)

// 窗口大小改变时（适配移动端）
const onLayoutResize = () => {
  if (!Local.get('oldLayout')) Local.set('oldLayout', themeConfig.value.layout)
  const clientWidth = document.body.clientWidth
  if (clientWidth < 1000) {
    themeConfig.value.isCollapse = false
    mittBus.emit('layoutMobileResize', {
      layout: 'defaults',
      clientWidth,
    })
  } else {
    const oldLayout: any = Local.get('oldLayout')
    const layoutMoblieResize: any = 'layoutMoblieResize'
    mittBus.emit(layoutMoblieResize, {
      layout: oldLayout ? oldLayout : themeConfig.value.layout,
      clientWidth,
    })
  }
}

// 页面加载前
onBeforeMount(() => {
  onLayoutResize()
  window.addEventListener('resize', onLayoutResize)
})

// 页面加载时
onUnmounted(() => {
  window.removeEventListener('resize', onLayoutResize)
})
</script>

<style scoped lang='scss'>
</style>