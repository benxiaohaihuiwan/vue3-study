<template>
  <Login />
</template>
<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
// 引入组件
const Login = defineAsyncComponent(() => import('@/views/login/index.vue'))
</script>
<style scoped lang="scss">
</style>
