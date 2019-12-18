import Vue from 'vue'
import echarts from 'echarts'
import theme from '~/theme/echartsTheme.js'
echarts.registerTheme('theme', theme);
import ECharts from 'vue-echarts' // refers to components/ECharts.vue in webpack


Vue.component('v-chart', ECharts)
Vue.prototype.echarts = echarts
