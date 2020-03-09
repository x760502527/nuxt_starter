import Vue from 'vue'
import VueCesium from 'vue-cesium'

Vue.use(VueCesium, {
    // cesiumPath 是指引用的Cesium.js路径，如
    // 项目本地的Cesium Build包，vue项目需要将Cesium Build包放static目录：
    // cesiumPath: /static/Cesium/Cesium.js
    // 个人在线Cesium Build包：
    // cesiumPath: 'https://zouyaoji.top/vue-cesium/statics/Cesium/Cesium.js'
    // 个人在线SuperMap Cesium Build包（在官方基础上二次开发出来的）：
    // cesiumPath: 'https://zouyaoji.top/vue-cesium/statics/SuperMapCesium/Cesium.js'
    // 官方在线Cesium Build包，有CDN加速，推荐用这个：
    cesiumPath: '/Cesium/Cesium.js',
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2NTBlMzU4OC1jODMyLTRjNDUtODRmNC1jNGRkMzJhZDM1YTAiLCJpZCI6MjExMDMsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1Nzg5ODEwNzd9.4ybP6ggSIzaIdUXnevQsxHp3WTn_lIM39fVpAd6QfGk'
})


