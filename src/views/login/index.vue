<template>
  <div class="login-container flex">
    <div class="login-left">
      <div class="login-left-logo">
        <img :src="logoMini" />
        <div class="login-left-logo-text">
          <span>{{ getThemeConfig.globalViceTitle }}</span>
          <span class="login-left-logo-text-msg">
            {{ getThemeConfig.globalViceTitleMsg }}
          </span>
        </div>
      </div>
      <div class="login-left-img">
        <img :src="loginMain" />
      </div>
      <img :src="loginBg" class="login-left-waves" />
    </div>
  </div>
</template>

<script setup lang='ts' name="loginIndex">
import { defineAsyncComponent, reactive, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeConfig } from '@/stores/themeConfig'
import logoMini from '@/assets/logo-mini.svg'
import loginMain from '@/assets/login-main.svg'
import loginBg from '@/assets/login-bg.svg'

// 定义内容变量
const storesThemeConfig = useThemeConfig()
const { themeConfig } = storeToRefs(storesThemeConfig)

// 获取布局配置信息
const getThemeConfig = computed(() => {
  return themeConfig.value
})
</script>

<style scoped lang='scss'>
.login-container {
  height: 100%;
  background: var(--el-color-white);
  .login-left {
    flex: 1;
    position: relative;
    background-color: rgba(211, 239, 255, 1);
    margin-right: 100px;
    &-logo {
      display: flex;
      align-items: center;
      position: absolute;
      top: 50px;
      left: 80px;
      z-index: 1;
      animation: logoAnimation 0.3s ease;
      img {
        width: 52px;
        height: 52px;
      }
      &-text {
        display: flex;
        flex-direction: column;
        span {
          margin-left: 10px;
          font-size: 28px;
          color: #26a59a;
        }
        &-msg {
          font-size: 12px !important;
          color: #32a99e !important;
        }
      }
    }
    &-img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 52%;
      img {
        width: 100%;
        height: 100%;
        animation: error-num 0.6s ease;
      }
    }
  }
}
</style>
