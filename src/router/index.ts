import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import pinia from '@/stores/index'
import { storeToRefs } from 'pinia'
import { useThemeConfig } from '@/stores/themeConfig'
import { staticRoutes, notFoundAndNoPower } from '@/router/route'
/**
 * 1 前端控制路由时： isRequestRoutes 为 false，需要写roles，需要走 setFilterRoute 方法
 * 2 后端控制路由时： isRequestRoutes 为 true，不需要写 roles，不需要走 setFilterRoute 方法
 * 相关方法已拆解到对应的 'backEnd.ts' 与 'frontEnd.ts'
 * 特别说明：
 * 1 前端控制: 路由菜单由前端去写（无菜单管理界面，有角色管理界面），角色管理中有 roles 属性，需返回到useInfo中
 * 2 后端控制：路由菜单由后端返回（有菜单管理界面，有角色管理界面）
 */

// 读取 ‘src/stores/themeConfig.ts’ 是否开启后端控制路由配置
const storesThemeConfig = useThemeConfig(pinia)
console.log('storesThemeConfig:',storesThemeConfig)
const { themeConfig } = storeToRefs(storesThemeConfig)
const { isRequestRoutes } = themeConfig.value

/**
 * 创建一个可以被 Vue 应用程序使用的路由实例
 * @method createRouter(options: RouterOptions): Router
 * @link 参考：https://next.router.vuejs.org/zh/api/#createrouter
 */
export const router = createRouter({
  history: createWebHashHistory(),
  /**
   * 说明：
   * 1 notFoundAndNoPower 默认添加 404，401界面，防止一直提示 No match found for location with path 'xxx'
   * 2 backEnd.ts(后端控制路由)，frontEnd.ts(前端控制路由)中也需要加notFoundAndNoPower 404、401 界面。
   * 防止 404，401 不在 layout布局中，不设置404，401 界面将会全屏显示
   */
  routes: [...notFoundAndNoPower, ...staticRoutes]
})

/**
 * 路由多级嵌套数组处理成一维数组
 * @param arr 传入路由菜单数组
 * @returns 返回处理后的一维路由菜单数组
 */
export function formatFlatteningRoutes(arr: any){
  if(!arr.length) return
  for(let i=0; i< arr.length;i++){
    if(arr[i].children){
      arr = arr.slice(0, i + 1).concat(arr[i].children,arr.slice(i+1))
    }
  }
  return arr
}

/**
 * 一维数组处理成多级嵌套数组（只保留二级：也就是二级以上全部处理成只有二级，keep-alive 只支持二级缓存）
 * @description isKeepAlive 处理 name 值，进行缓存。顶级关闭，全部不缓存
 * @link 参考：https://v3.cn.vuejs.org/api/built-in-components.html#keep-alive
 * @param arr 处理后的一维路由菜单数组
 * @returns 返回将一维数组重新处理成 定义动态路由（dynamicRoutes）的格式
 */
export function formatTwoStageRoutes(arr:any){
  if(!arr.length) return
  const newArr: any = []
  const cacheList: Array<string> = []
  arr.forEach((v:any) => {
    if(v.path === '/'){
      newArr.push({ component: v.component, name: v.name, path:v.path, redirect:v.redirect,meta:v.meta,children:[]})
    }else{
      // 判断是否是动态路由（xx/:id/:name）， 用于 tasView 等使用
      if(v.path.indexOf('/:') > -1){
        v.meta['isDynamic'] = true
        v.meta['isDynamicPath'] = v,path
      }
      newArr[0].children.push({...v})
      // 存 name 值，keep-alive中 include使用，实现路由的缓存
      // 路径： @/layout/routerView/parent.vue
      if(newArr[0].meta.isKeepAlive && v.meta.isKeepAlive){
        cacheList.push(v.name)
        // const stores = useKeepALiveNames(pinia)
        // stores.setCacheKeepAlive(cacheList)
      }
    }
  })
  return newArr
}

// 路由加载前
router.beforeEach(async(to,from,next) => {
  // NProgress.configure({ showSpinner: false})
  NProgress.start()
  next()
})

// 路由加载后
router.afterEach(()=>{
  NProgress.done()
})

// 导出路由
export default router