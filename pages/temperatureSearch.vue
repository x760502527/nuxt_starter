<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col>
        <v-layout row class="align-center layout px-4 app--page-header">
          <div class="page-header-left">
            <h3 class="pr-3">温度查询</h3>
          </div>
          <v-breadcrumbs divider="-" :items="breadcrumbs">
            <template v-slot:item="props">
              <a :href="props.item.href" :class="[props.item.disabled && 'disabled']">{{ props.item.text}}</a>
            </template>
          </v-breadcrumbs>
        </v-layout>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <v-card>

          <v-tabs>
            <v-tab>曲线回放</v-tab>
            <!--              <v-tab>单点曲线</v-tab>-->
            <v-tab-item>
              <v-card
                flat
                tile
              >
                <v-card-title>
                  <v-form ref="form" style="width: 100%;" v-model="valid">

                    <v-row class="px-2">
                      <v-col md="2" cols="12">
                        <v-select
                          label="通道号"
                          :items="channels"
                          v-model="channel_qxhf"
                        ></v-select>
                      </v-col>
                      <v-col md="2" cols="12">
                        <v-menu
                          v-model="startPickerShow_qxhf"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="startDateTime_qxhf"
                              label="开始时间"
                              :rules="timeRules"
                              prepend-icon="event"
                              readonly
                              @click="startDateFlag_qxhf = 0"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-if="startDateFlag_qxhf==0" locale="zh-ch" v-model="startDate_qxhf"
                                         @input="startDateFlag_qxhf = 1"></v-date-picker>
                          <v-time-picker v-if="startDateFlag_qxhf==1" v-model="startTime_qxhf" format="24hr"
                                         @click:minute="startPickerShow_qxhf = false"></v-time-picker>
                        </v-menu>
                      </v-col>
                      <v-col md="2" cols="12">
                        <v-menu
                          v-model="endPickerShow_qxhf"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="endDateTime_qxhf"
                              label="结束时间"
                              :rules="timeRules"
                              prepend-icon="event"
                              readonly
                              @click="endDateFlag_qxhf = 0"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-if="endDateFlag_qxhf==0" locale="zh-ch" v-model="endDate_qxhf"
                                         @input="endDateFlag_qxhf = 1"></v-date-picker>
                          <v-time-picker v-if="endDateFlag_qxhf==1" v-model="endTime_qxhf" format="24hr"
                                         @click:minute="endPickerShow_qxhf = false"></v-time-picker>
                        </v-menu>
                      </v-col>
                      <v-col md="2" col="12"></v-col>
                      <div class="flex-grow-1"></div>
                      <div class="flex-grow-1"></div>
                      <div class="flex-grow-1"></div>
                      <div class="flex-grow-1"></div>
                      <div class="flex-grow-1"></div>
                      <div class="flex-grow-1"></div>
                      <div class="flex-grow-1"></div>
                      <div class="flex-grow-1"></div>
                      <v-col>
                        <v-btn block @click="searchTemperatureCurvePlayback" color="primary darken-1">
                          查询
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>

                  <v-row>
                    <v-col>
                      <ve-line ref="chart1" width="100%" height="300px" :data="chartData_qxhf"
                               :extend="chartExtend_qxhf"
                               :settings="chartSettings_qxhf"
                               :loading="loading_qxhf"
                               :data-empty="dataEmpty_qxhf"></ve-line>
                    </v-col>
                  </v-row>
                  <v-row align="center"
                         justify="center">
                    <v-col md="11">
                      当前时间：{{chartCurrentTime}}
                      <!--                        :thumb-label="times"-->
                      <!--                        :thumb-size="100"-->
                      <v-slider
                        v-model="temperatureCurvePlaybackNow"
                        ticks
                        :max="sliderMax"
                      >
                        <!--<template v-slot:thumb-label="props">
                          {{ times[props.value] }}
                        </template>-->
                      </v-slider>
                      <v-row no-gutters>
                        <v-col style="">
                          开始时间：{{chartStartTime}}
                        </v-col>
                        <v-col style="" class="text-right">
                          结束时间：{{chartEndTime}}
                        </v-col>
                      </v-row>
                    </v-col>

                  </v-row>

                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card>
                <v-card-title>
                  <v-row class="px-2">
                    <v-col md="2" cols="12">
                      <v-select
                        label="通道号"
                        :items="channels"
                        v-model="channel_ddqx"
                      ></v-select>
                    </v-col>
                    <v-col md="2" cols="12">
                      <v-text-field
                        label="光纤位置"
                        v-model="fibLoc"
                      ></v-text-field>
                    </v-col>
                    <v-col md="2" cols="12">
                      <v-menu
                        v-model="startPickerShow_ddqx"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="startDateTime_ddqx"
                            label="开始时间"
                            prepend-icon="event"
                            readonly
                            @click="startDateFlag_ddqx = 0"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-if="startDateFlag_ddqx==0" locale="zh-ch" v-model="startDate_ddqx"
                                       @input="startDateFlag_ddqx = 1"></v-date-picker>
                        <v-time-picker v-if="startDateFlag_ddqx==1" v-model="startTime_ddqx" format="24hr"
                                       @click:minute="startPickerShow_ddqx = false"></v-time-picker>
                      </v-menu>
                    </v-col>
                    <v-col md="2" cols="12">
                      <v-menu
                        v-model="endPickerShow_ddqx"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="endDateTime_ddqx"
                            label="结束时间"
                            prepend-icon="event"
                            readonly
                            @click="endDateFlag_ddqx = 0"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-if="endDateFlag_ddqx==0" locale="zh-ch" v-model="endDate_ddqx"
                                       @input="startDateFlag_ddqx = 1"></v-date-picker>
                        <v-time-picker v-if="endDateFlag_ddqx==1" v-model="endTime_ddqx" format="24hr"
                                       @click:minute="endPickerShow_ddqx = false"></v-time-picker>
                      </v-menu>
                    </v-col>
                    <v-col class="ml-auto" cols="12" md="2">
                      <v-btn class="float-right" @click="searchSinglePoint" color="primary darken-1">
                        查询
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-row>
                    <v-col>
                      <ve-line ref="chart2" width="100%" height="500px" :data="chartData_ddqx"
                               :extend="chartExtend_ddqx"
                               :settings="chartSettings_ddqx"></ve-line>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import moment from 'moment'
  import {getTemperatureCurvePlayback, getEquipment, getTemperatureSinglePoint} from '@/services/apiService'
  import 'v-charts/lib/style.css'

  export default {
    name: "alarmSearch",
    mounted() {
      let c = this
      window.onresize = function () {
        try {
          c.$refs[`chart1`].echarts.resize()
          c.$refs[`chart2`].echarts.resize()
        } catch (e) {
        }
      }
      this.setEquipment()
    },
    data() {
      return {
        valid: false,
        loading_qxhf: false,
        channels: [],
        channel_qxhf: 1,
        channel_ddqx: 1,
        breadcrumbs: [{
          text: "主页",
          href: "/",
          disabled: false
        },
          {
            text: "温度查询",
            href: "/temperatureSearch",
            disabled: true
          }],
        times: [],
        startDate_qxhf: moment().format('YYYY-MM-DD'),
        startTime_qxhf: moment().format('hh:mm'),
        startPickerShow_qxhf: false,
        startDateFlag_qxhf: 0,
        endDate_qxhf: moment().format('YYYY-MM-DD'),
        endTime_qxhf: moment().format('hh:mm'),
        endPickerShow_qxhf: false,
        endDateFlag_qxhf: 0,
        startDate_ddqx: moment().format('YYYY-MM-DD'),
        startTime_ddqx: moment().format('hh:mm'),
        startPickerShow_ddqx: false,
        startDateFlag_ddqx: 0,
        endDate_ddqx: moment().format('YYYY-MM-DD'),
        endTime_ddqx: moment().format('hh:mm'),
        endPickerShow_ddqx: false,
        endDateFlag_ddqx: 0,
        chartSettings_qxhf: {
          yAxisName: ['温度(℃)']
        },
        fibLoc: 0,
        chartExtend_qxhf: {
          color: ['#2A8CEF'],
          toolbox: {
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              restore: {},
            },
            iconStyle: {
              borderColor: this._getColor('primary', -1)
            },
            right: '3%',
            top: '0%'
          },
          xAxis: {
            name: "光纤距离(m)",
            type: 'category',
            boundaryGap: false,
            gridIndex: 0,
          },
          yAxis: {},
          legend: {
            show: false
          },
          textStyle: {
            color: this._getColor()
          },
          grid: {
            left: '3%',
            right: '3%',
            bottom: '10%',
            top: '10%',
            containLabel: true
          },
        },
        chartData_ddqx: {
          columns: ['time', 'data'],
          rows: []
        },
        chartSettings_ddqx: {
          yAxisName: ['温度(℃)']
        },
        chartExtend_ddqx: {
          toolbox: {
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              restore: {},
            },
            iconStyle: {
              borderColor: "#19d4ae"
            },
            right: '3%',
            top: '0%'
          },
          xAxis: {
            name: "时间",
            type: 'category',
            boundaryGap: false,
            gridIndex: 0,
          },
          yAxis: {},
          legend: {
            show: false
          },
          textStyle: {
            color: '#fff'
          },
          grid: {
            left: '3%',
            right: '3%',
            bottom: '8%',
            top: '8%',
            containLabel: true
          },
        },
        temperatureCurvePlaybackData: [],
        temperatureCurvePlaybackNow: 0,
        chartStartTime: '',
        chartEndTime: '',
        timeRules: [v => {
          return true
        }]
      }
    },
    computed: {
      startDateTime_qxhf() {
        return `${this.startDate_qxhf} ${this.startTime_qxhf}`
      },
      endDateTime_qxhf() {
        return `${this.endDate_qxhf} ${this.endTime_qxhf}`
      },
      startDateTime_ddqx() {
        return `${this.startDate_ddqx} ${this.startTime_ddqx}`
      },
      endDateTime_ddqx() {
        return `${this.endDate_ddqx} ${this.endTime_ddqx}`
      },
      //当前时间
      chartCurrentTime() {
        if (this.temperatureCurvePlaybackData[this.temperatureCurvePlaybackNow]) {
          return moment(this.temperatureCurvePlaybackData[this.temperatureCurvePlaybackNow]['time']).format('YYYY-MM-DD hh:mm:ss')
        }
      },
      //滚动条最大数目
      sliderMax() {
        if (this.temperatureCurvePlaybackData.length == 0)
          return 1
        return this.temperatureCurvePlaybackData.length - 1
      },
      dataEmpty_qxhf() {
        if (this.chartData_qxhf) {
          if (!this.chartData_qxhf.rows || this.chartData_qxhf.rows.length < 1) {
            return true
          }
        } else {
          return true
        }
        return false
      },
      chartData_qxhf() {

        let object = {
          columns: ['光纤距离(m)', '温度(℃)'],
          rows: []
        }

        if (!this.temperatureCurvePlaybackData || !this.temperatureCurvePlaybackData[this.temperatureCurvePlaybackNow] || this.temperatureCurvePlaybackData.length <= this.temperatureCurvePlaybackNow) {
          return []
        }
        let data = this.temperatureCurvePlaybackData[this.temperatureCurvePlaybackNow]['datas']
        let loc = 0
        object.rows = data.map(value => {
          let ob = {}
          ob[object['columns'][0]] = loc
          ob[object['columns'][1]] = value
          loc++
          return ob
        })
        return object
      }
    },
    methods: {
      async searchTemperatureCurvePlayback() {
        let st = moment(this.startDateTime_qxhf).valueOf()
        let et = moment(this.endDateTime_qxhf).valueOf()
        let c = et - st

        if(c > 1000 * 3600 || c < 0){
          this.timeRules = ["结束时间需要大于开始时间一个小时内"]
          this.$refs.form.validate()
        }else{
          this.timeRules = [true]
          this.$refs.form.validate()
          this.loading_qxhf = true
          const startTimeStamp = moment(this.startDateTime_qxhf).valueOf()
          const endTimeStamp = moment(this.endDateTime_qxhf).valueOf()

          const datas = await getTemperatureCurvePlayback(this.channel_qxhf, startTimeStamp, endTimeStamp)
          this.temperatureCurvePlaybackNow = 0
          this.temperatureCurvePlaybackData = datas
          this.chartStartTime = this.startDateTime_qxhf
          this.chartEndTime = this.endDateTime_qxhf
          this.loading_qxhf = false
        }
      },
      async searchSinglePoint() {
        const startTimeStamp = moment(this.startDateTime_ddqx).valueOf()
        const endTimeStamp = moment(this.endDateTime_ddqx).valueOf()
        const fibLoc = this.fibLoc
        const datas = await getTemperatureSinglePoint(this.channel_qxhf, startTimeStamp, endTimeStamp, fibLoc)
        let arr = []
        for (const item of datas) {
          let time = item['time']
          const data = item['data']
          time = moment(time).format('YYYY-MM-DD HH:mm:ss')
          let ob = {
            time,
            data
          }
          arr.push(ob)
        }
        this.chartData_ddqx['rows'] = arr
      },
      async setEquipment() {
        const data = await getEquipment()
        const {channel} = data

        let slideMax = []
        for (let i = 0; i < channel; i++) {
          slideMax.push(i + 1)
        }
        this.channels = slideMax
      }
    }
  }
</script>

<style lang="scss" scoped>
  .disabled {
    color: #aaa;
    pointer-events: none;
    text-decoration: blink;
  }
</style>
