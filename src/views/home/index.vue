<template>
  <div class="home-container layout-pd">
    <el-row :gutter="15" class="home-card-one mb15">
      <el-col
        :xs="24"
        :sm="12"
        :md="12"
        :lg="6"
        :xl="6"
        v-for="(v, k) in state.homeOne"
        :key="k"
        :class="{ 'home-media home-meida-lg': k > 1, 'home-meida-sm': k === 1 }"
      >
        <div class="home-card-item flex">
          <div class="flex-margin flex w100" :class="`home-one-animation${k}`">
            <div class="flex-auto">
              <span class="font30">{{ v.num1 }}</span>
              <span class="ml5 font16" :style="{ color: v.color1 }"
                >{{ v.num2 }}%</span
              >
              <div class="mt10">{{ v.num3 }}</div>
            </div>
            <div
              class="home-card-item-icon flex"
              :style="{ background: `var(${v.color2})` }"
            >
              <i
                class="flex-margin font32"
                :class="v.num4"
                :style="{ color: `var(${v.color3})` }"
              ></i>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="15" class="home-card-two mb15">
      <el-col :xs="24" :sm="14" :md="14" :lg="16" :xl="16">
        <div class="home-card-item">
          <div style="height: 100%" ref="homeLineRef"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang='ts' name='home'>
import {
  reactive,
  onMounted,
  ref,
  watch,
  nextTick,
  onActivated,
  markRaw,
} from 'vue'
import * as echarts from 'echarts'
import { storeToRefs } from 'pinia'
import { useThemeConfig } from '@/stores/themeConfig'
import { useTagsViewRoutes } from '@/stores/tagsViewRoutes'
import { homeOne, homeThree } from './data'
// 定义变量内容
const homeLineRef = ref()
const homePieRef = ref()
const homeBarRef = ref()
const storesTagsViewRoutes = useTagsViewRoutes()
const storesThemeConfig = useThemeConfig()
const { themeConfig } = storeToRefs(storesThemeConfig)
const { isTagsViewCurrentFull } = storeToRefs(storesTagsViewRoutes)
const state = reactive({
  global: {
    homeChartOne: null,
    homeChartTwo: null,
    homeCharThree: null,
    dispose: [null, '', undefined],
  } as any,
  homeOne,
  homeThree,
  myCharts: [] as EmptyArrayType,
  charts: {
    theme: '',
    bgColor: '',
    color: '#303133',
  },
})

// 折线图
const initLineChart = () => {
  if (!state.global.dispose.some((b: any) => b === state.global.homeChartOne)) {
    state.global.homeChartOne.dispose()
  }
  state.global.homeChartOne = markRaw(
    echarts.init(homeLineRef.value, state.charts.theme)
  )
  const option = {
    backgroundColor: state.charts.bgColor,
    title: {
      text: '政策补贴额度',
      x: 'left',
      textStyle: { fontSize: '15', color: state.charts.color },
    },
    grid: { top: 70, right: 20, bottom: 30, left: 30 },
    tooltip: { trigger: 'axis' },
    legend: { data: ['预购队列', '最新成交价'], right: 0 },
    xAxis: {
      data: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月',
      ],
    },
    yAxis: [
      {
        type: 'value',
        name: '价格',
        splitLine: {
          show: true,
          lineStyle: { type: 'dashed', color: '#f5f5f5' },
        },
      },
    ],
    series: [
      {
        name: '预购队列',
        type: 'line',
        symbolSize: 6,
        symbol: 'circle',
        smooth: true,
        data: [
          0, 41.1, 30.4, 65.1, 53.3, 53.3, 53.3, 41.1, 30.4, 65.1, 53.3, 10,
        ],
        lineStyle: { color: '#fe9a8b' },
        itemStyle: { color: '#fe9a8b', borderColor: '#fe9a8b' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#fe9a8bb3' },
            { offset: 1, color: '#fe9a8b03' },
          ]),
        },
      },
      {
        name: '最新成交价',
        type: 'line',
        symbolSize: 6,
        symbol: 'circle',
        smooth: true,
        data: [0, 24.1, 7.2, 15.5, 42.4, 42.4, 42.4, 24.1, 7.2, 15.5, 42.4, 0],
        lineStyle: { color: '#9E87FF' },
        itemStyle: { color: '#9E87FF', borderColor: '#9E87FF' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#9E87FFb3' },
            { offset: 1, color: '#9E87FF03' },
          ]),
        },
        emphasis: {
          itemStyle: {
            color: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.5,
              colorStops: [
                { offset: 0, color: '#9E87FF' },
                { offset: 0.4, color: '#9E87FF' },
                { offset: 0.5, color: '#fff' },
                { offset: 0.7, color: '#fff' },
                { offset: 0.8, color: '#fff' },
                { offset: 1, color: '#fff' },
              ],
            },
            borderColor: '#9E87FF',
            borderWidth: 2,
          },
        },
      },
    ],
  }
  state.global.homeChartOne.setOption(option)
  state.myCharts.push(state.global.homeChartOne)
}

// 批量设置 echarts resize
const initEchartsResizeFun = () => {
  nextTick(() => {
    for (let i = 0; i < state.myCharts.length; i++) {
      setTimeout(() => {
        state.myCharts[i].resize()
      }, i * 1000)
    }
  })
}
// 批量设置 echarts resize
const initEchartsResize = () => {
  window.addEventListener('resize', initEchartsResizeFun)
}

// 页面加载时
onMounted(() => {
  initEchartsResize()
})
// 由于页面缓存原因，keep-alive
onActivated(() => {
  initEchartsResizeFun()
})
// 监听 pinia 中的 tagsview 开启全屏变化，重新 resize 图表，防止不出现/大小不变等
watch(
  () => isTagsViewCurrentFull.value,
  () => {
    initEchartsResizeFun()
  }
)
// 监听 pinia 中是否开启深色主题
watch(
  () => themeConfig.value.isIsDark,
  (isIsDark) => {
    nextTick(() => {
      state.charts.theme = isIsDark ? 'dark' : ''
      state.charts.bgColor = isIsDark ? 'transparent' : ''
      state.charts.color = isIsDark ? '#dadada' : '#303133'
      setTimeout(() => {
        initLineChart()
      }, 500)
      // setTimeout(() => {
      //   initPieChart()
      // }, 700)
      // setTimeout(() => {
      //   initBarChart()
      // }, 1000)
    })
  },
  {
    deep: true,
    immediate: true,
  }
)
</script>

<style scoped lang='scss'>
$homeNavLengh: 8;
.home-container {
  overflow: hidden;
  .home-card-one,
  .home-card-two,
  .home-card-three {
    .home-card-item {
      width: 100%;
      height: 130px;
      border-radius: 4px;
      transition: all ease 0.3s;
      padding: 20px;
      overflow: hidden;
      background: var(--el-color-white);
      color: val(--el-text-color-primary);
      border: 1px soild var(--next-border-color-light);
      &:hover {
        box-shadow: 0 2px 12px var(--next-color-dark-hover);
        transition: all ease 0.3s;
      }
      &-icon {
        width: 70px;
        height: 70px;
        border-radius: 100%;
        flex-shrink: 1;
        i {
          color: var(--el-text-color-placeholder);
        }
      }
      &-title {
        font-size: 15px;
        font-weight: bold;
        height: 30px;
      }
    }
  }
  .home-card-one {
    @for $i from 0 through 3 {
      .home-one-animation#{$i} {
        opacity: 0;
        animation-name: error-num;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
        animation-delay: calc($i/4) + s;
      }
    }
  }
  .home-card-two,
  .home-card-three {
    .home-card-item {
      height: 400px;
      width: 100%;
      overflow: hidden;
      .home-monitor {
        height: 100%;
        .flex-warp-item {
          width: 25%;
          height: 111px;
          display: flex;
          .flex-warp-item-box {
            margin: auto;
            text-align: center;
            color: var(--el-text-color-primary);
            display: flex;
            border-radius: 5px;
            background: var(--next-bg-color);
            cursor: pointer;
            transition: all 0.3s ease;
            &:hover {
              background: var(--el-color-primary-light-9);
              transition: all 0.3s ease;
            }
          }
          @for $i from 0 through $homeNavLengh {
            .home-animation#{$i} {
              opacity: 0;
              animation-name: error-num;
              animation-duration: 0.5s;
              animation-fill-mode: forwards;
              animation-delay: calc($i/10) + s;
            }
          }
        }
      }
    }
  }
}
</style>