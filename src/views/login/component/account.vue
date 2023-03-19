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
import { storeToRefs } from 'pinia'
import { useThemeConfig } from '@/stores/themeConfig'

const storesThemeConfig = useThemeConfig()
const { themeConfig } = storeToRefs(storesThemeConfig)
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

// 登录
const onSignIn = async () => {}

// 登录成功后跳转
const signInSuccess = () => {}
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