<template>
  <vxe-grid
    border
    stripe
    height="400"
    show-overflow
    :loading="demo1.loading"
    :column-config="{ resizable: true }"
    :row-config="{ isHover: true }"
    :checkbox-config="{ labelField: 'id', highlight: true, range: true }"
    :data="tableData"
    :columns="columns"
  >
  </vxe-grid>
</template>

<script setup lang='ts' name=''>
import { defineComponent, onMounted, reactive } from 'vue'
import { VxeColumnPropTypes } from 'vxe-table'

interface Props {
  columns: []
  tableData: []
}
defineProps<Props>()

onMounted(() => {})
</script>

<style scoped lang='scss'>
</style>