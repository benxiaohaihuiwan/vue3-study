import Cookies from 'js-cookie'

/**
 * window.localStorage 浏览器永久缓存
 * @method set 设置缓存
 * @method get 获取缓存
 * @method remove 移除缓存
 * @method clear 移除全部永久缓存
 */

export const Local = {
  /** 
   *  `key` 编写成 `${__NEXT_NAME__}:${key}`，防止部署多套系统到同一域名不同目录时，变量共用的问题（`__NEXT_NAME__`为 `package.json` 中的 `name`）
   *  __NEXT_NAME__ 已经在vite.config.ts中进行全局配置
  */
  setKey(key:string){
    return `${__NEXT_NAME__}:${key}`
  }

  // 设置永久缓存
  set<T>(key: string, val:T){
    window.localStorage.setItem(Local.setKey(key),JSON.stringify(val))
  }

  // 获取永久缓存
  get(key:string){
    let json = <string>window.localStorage.getItem(Local.setKey(key))
  }

  // 移除永久缓存
  remove(key:string){
    window.localStorage.removeItem(Local.setKey(key))
  }

  // 移除全部永久缓存
  clear(key:string){
    window.localStorage.clear()
  }
}

/**
 * window.sessionStorage 浏览器临时缓存
 * @method set 设置临时缓存
 * @method get 获取临时缓存
 * @method remove 移除临时缓存
 * @method clear 移除全部临时缓存
 */

export const Session = {
  // 设置临时缓存
  set<T>(key:string,val:T){
    if(key === 'token') return Cookies.set(key,val)
    window.sessionStorage.setItem(Local.setKey(key),JSON.stringify(val))
  }

  // 获取临时缓存
  get(key:string){
    if(key === 'token') return Cookies.get(key)
    let json = <string>window.sessionStorage.getItem(Local.setKey(key))
    return JSON.parse(json)
  }

  // 移除临时缓存
  remove(key:string){
    if(key === 'token') return Cookies.remove(key)
    window.sessionStorage.removeItem(Local.setKey(key))
  }

  // 移除全部临时缓存
  clear(){
    Cookies.remove('token')
    window.sessionStorage.clear()
  }
}