<template>
  <el-form size="large" class="login-content-form">
    <el-form-item class="login-animation1">
      <el-input
        text
        :placeholder="$t('message.account.accountPlaceholder1')"
        v-model="state.ruleForm.userName"
        clearable
        autocomplete="off"
      >
        <template #prefix>
          <el-icon class="el-input__icon"><ele-User /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item class="login-animation2">
      <el-input
        :type="state.isShowPassword ? 'text' : 'password'"
        :placeholder="$t('message.account.accountPlaceholder2')"
        v-model="state.ruleForm.password"
        autocomplete="off"
      >
        <template #prefix>
          <el-icon class="el-input__icon"><ele-Unlock /></el-icon>
        </template>
        <template #suffix>
          <i
            class="iconfont el-input__icon login-content-password"
            :class="
              state.isShowPassword ? 'icon-yincangmima' : 'icon-xianshimima'
            "
            @click="state.isShowPassword = !state.isShowPassword"
          >
          </i>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item class="login-animation3">
      <el-col :span="15">
        <el-input
          text
          maxlength="4"
          :placeholder="$t('message.account.accountPlaceholder3')"
          v-model="state.ruleForm.code"
          clearable
          autocomplete="off"
        >
          <template #prefix>
            <el-icon class="el-input__icon"><ele-Position /></el-icon>
          </template>
        </el-input>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="8">
        <el-button class="login-content-code" v-waves>1234</el-button>
      </el-col>
    </el-form-item>
    <el-form-item class="login-animation4">
      <el-button
        type="primary"
        class="login-content-submit"
        v-waves
        round
        @click="onSignIn"
        :loading="state.loading.signIn"
      >
        <span>{{ $t('message.account.accountBtnText') }}</span>
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang='ts' name='loginAccount'>
import { reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Cookies from 'js-cookie'
import { storeToRefs } from 'pinia'
import { useThemeConfig } from '@/stores/themeConfig'
import { useI18n } from 'vue-i18n'
import { initFrontEndControlRoutes } from '@/router/frontEnd'
import { Session } from '@/utils/storage'
import { formatAxis } from '@/utils/formatTime'
import { NextLoading } from '@/utils/loading'
import { ElMessage } from 'element-plus'
import nProgress from 'nprogress'

const { t } = useI18n()
const storesThemeConfig = useThemeConfig()
const { themeConfig } = storeToRefs(storesThemeConfig)
const route = useRoute()
const router = useRouter()
const state = reactive({
  isShowPassword: false,
  ruleForm: {
    userName: 'admin',
    password: '123456',
    code: '1234',
  },
  loading: {
    signIn: false,
  },
})

// 时间获取
const currentTime = computed(() => {
  return formatAxis(new Date())
})

// 登录
const onSignIn = async () => {
  state.loading.signIn = true
  // 存储token到浏览器缓存
  Session.set('token', Math.random().toString(36).substring(0))
  // 模拟数据，对接接口时，记得删除多余的代码
  Cookies.set('userName', state.ruleForm.userName)
  // 默认是前端控制路由
  if (!themeConfig.value.isRequestRoutes) {
    const isNoPower = await initFrontEndControlRoutes()
    signInSuccess(isNoPower)
  }
}

// 登录成功后进行跳转
const signInSuccess = (isNoPower: boolean | undefined) => {
  if (isNoPower) {
    ElMessage.warning('抱歉，您没有登录权限')
    Session.clear()
  } else {
    // 初始化登录成功时间问候语
    let currentTimeInfo = currentTime.value
    // 登录成功，跳转到首页
    // 如果是复制粘贴的路径，非首页/登录页，那么登录成功后重定向到对应的路径中
    if (route.query?.redirect) {
      router.push({
        path: <string>route.query?.redirect,
        query:
          Object.keys(<string>route.query?.params).length > 0
            ? JSON.parse(<string>route.query?.params)
            : '',
      })
    } else {
      router.push('/')
    }
    // 登录成功后提示
    const signInText: string = t('message.signInText')
    ElMessage.success(`${currentTimeInfo},${signInText}`)
    NextLoading.start()
  }
  state.loading.signIn = false
}
</script>

<style lang='scss' scoped>
.login-content-form {
  margin-top: 20px;
  @for $i from 1 through 4 {
    .login-animation#{$i} {
      opacity: 0;
      animation-name: error-num;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
      animation-delay: calc($i/10) + s;
    }
  }
  .login-content-password {
    display: inline-block;
    width: 20px;
    cursor: pointer;
    &:hover {
      color: #909399;
    }
  }
  .login-coontent-code {
    width: 100%;
    padding: 0;
    font-weight: bold;
    letter-spacing: 5px;
  }
  .login-content-submit {
    width: 100%;
    letter-spacing: 2px;
    font-weight: 300;
    margin-top: 15px;
  }
}
</style>