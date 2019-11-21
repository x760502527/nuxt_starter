<template>
  <v-container fluid class="index" style="height:100%;min-height: 768px;">
    <div class="sxsj">刷新时间：<span>{{sxsj}}</span></div>
    <v-row no-gutters style="height: 66.66%;">
      <v-col lg="9" cols="12" class="card_parent">
        <v-card class="card bgImg">
          <v-container fluid grid-list-xs fill-height pa-0>
            <div class="equipment_info">
              <span style="padding-left:8px;padding-right:8px;">当前通道：<span
                class="v">{{currentChannelShow}}</span></span>
              <span style="padding-left:8px;padding-right:8px;">通道数量：<span class="v">{{channel}}</span></span>
              <span style="padding-left:8px;padding-right:8px;">设备类型：<span class="v">{{type}}</span></span>
              <span style="padding-left:8px;padding-right:8px;">设备长度：<span class="v">{{lengthShow}}</span></span>
            </div>
            <div class="channel">
              <div v-for="(item,index) in slideMax">
                <div @click="currentChannel=index" style="margin: auto;" :class="index==currentChannel?'sxy':''"
                     class="yuan"></div>
                <div style="margin: auto;padding-bottom:8px;">通道{{index + 1}}</div>
              </div>
            </div>
            <div ref="image" class="image">
              <!--<div class="point" v-for="(item,index) in points"
                   style="position: absolute;z-index: 1"
                   :style="{transform:'translate(' + item.x + 'px,'+item.y +'px)'}">
              </div>-->
              <div class="alarmPoint" v-for="(item,index) in alarmPoints"
                   style="position: absolute;z-index: 1"
                   :style="{transform:'translate(' + item.x + 'px,'+item.y +'px)'}">
              </div>
              <div class="line" v-for="(item,index) in lines"
                   :style="lineStyle(item['x1'],item['y1'],item['x2'],item['y2'])">
              </div>

              <div class="line" v-for="(item,index) in linesTemperature"
                   :style="item['style']">
              </div>

            </div>
            <div class="ribbon-container">
              <div class="scale">

                <div class="scale-item">

                </div>
                <div class="scale-item">

                </div>
                <div class="scale-item">

                </div>
                <div class="scale-item">

                </div>
                <div class="scale-item">

                </div>
                <div class="scale-item">

                </div>
                <div class="scale-item">

                </div>
                <div class="scale-item">

                </div>
                <div class="scale-item">
                </div>
                <div class="scale-item">
                </div>
                <div class="scale-item">
                </div>
              </div>
              <div class="ribbon"></div>
            </div>
            <img style="display: none" ref="img" src="~assets/images/bj.png"/>
          </v-container>
        </v-card>
      </v-col>
      <v-col lg="3" cols="12">
        <!--<v-row  no-gutters style="height: 50%">
          <v-col>
            <v-card class="card">
              <v-container pa-0 fluid grid-list-xs fill-height>
                <v-layout column>
                  <v-flex class="card-title" px-3 py-2 style="flex: 1;">
                    设备信息
                  </v-flex>
                  <v-flex class="card-content" style="flex: 2;">
                    <v-layout row align-center justify-center fill-height>
                      <v-flex style="flex: 1;text-align: center;">
                        通道数量：{{channel}}
                      </v-flex>
                      <v-flex style="flex: 1;text-align: center;">
                        设备类型：{{type}}
                      </v-flex>
                      <v-flex style="flex: 1;text-align: center;">
                        当前通道：{{currentChannelShow}}
                      </v-flex>
                      <v-flex style="flex: 1;text-align: center;">
                        通道长度：{{lengthShow}}
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-col>
        </v-row>-->
        <v-row no-gutters style="height: 50%">
          <v-col class="card_parent">
            <v-card class="card">
              <v-container pa-0 fluid grid-list-xs fill-height>
                <v-layout column>
                  <v-flex class="card-title" px-3 py-3 style="flex: 1;">
                    当日报警统计
                  </v-flex>
                  <v-flex style="flex: 5;">
                    <ve-pie ref="chart1" width="100%" height="100%" :data="todayAlarmChartData"
                            :extend="todayAlarmChartExtendC"></ve-pie>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
        <v-row no-gutters style="height: 50%">
          <v-col class="card_parent">
            <v-card class="card">
              <v-container pa-0 fluid grid-list-xs fill-height>
                <v-layout column>
                  <v-flex class="card-title" px-3 py-3 style="flex: 1;">
                    当日温度统计
                  </v-flex>
                  <v-flex style="flex: 5;">
                    <v-data-table
                      :headers="temperatureStatisticsHeaders"
                      :items="temperatureStatisticsDatas"
                      class="elevation-1"
                      hide-default-footer
                      disable-pagination
                    >
                      <template v-slot:items="props">
                        <td>{{ props.item.number }}</td>
                        <td>{{ props.item.name }}</td>
                        <td>{{ props.item.min }}</td>
                        <td>{{ props.item.max }}</td>
                        <td>{{ props.item.average }}</td>
                        <td>{{ props.item.id }}</td>
                      </template>
                    </v-data-table>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row no-gutters style="height: 33.34%">
      <v-col lg="9" cols="12" class="card_parent">
        <v-card class="card">
          <v-container fluid grid-list-xs fill-height pa-0>
            <v-layout column>
              <v-flex class="card-title" px-3 py-3 style="flex: 1;">
                    <span class="chooseBtn"
                          :class="{dis:!bottomChartdataTemperatureFlag,sel:bottomChartdataTemperatureFlag}"
                          @click="cTemperature()">温度曲线</span>
                <span class="chooseBtn"
                      :class="{dis:bottomChartdataTemperatureFlag,sel:!bottomChartdataTemperatureFlag}"
                      @click="cLight()">光曲线</span>
              </v-flex>
              <v-flex style="flex: 5;">
                <!--:data-zoom="dataZoom"-->
                <ve-line ref="chart2" width="100%" height="100%"
                         :data="temperatureOrLightChartDataC"
                         :extend="temperatureChartExtend"
                         :settings="temperatureChartSettings"></ve-line>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-col>
      <v-col lg="3" cols="12" class="card_parent">
        <v-card class="card">
          <v-container pa-0 fluid grid-list-xs fill-height>
            <v-layout column>
              <v-flex class="card-title" px-3 py-3 style="flex: 1;">
                实时报警
              </v-flex>
              <v-flex style="flex: 5;">
                <v-data-table
                  :headers="realTimeAlarmHeaders"
                  :items="realTimeAlarmDatas"
                  class="elevation-1"
                  hide-default-footer
                  disable-pagination
                >
                  <template v-slot:items="props">
                    <td>{{ props.item.alarmLevel }}</td>
                    <td class="text-xs-right">{{ props.item.info }}</td>
                    <td class="text-xs-right">{{ props.item.alarmTime }}</td>
                  </template>
                </v-data-table>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import Logo from '~/components/Logo.vue'
  import VuetifyLogo from '~/components/VuetifyLogo.vue'
  import 'echarts/lib/component/dataZoom'
  import moment from 'moment'
  import {
    getLightAndTemperatureData,
    getEquipment,
    getAlarmsStatisticsToday,
    getZonalTemperature,
    getRealTimeAlarm,
    getPipelineInflectionPoint,
    getRealTimeAlarmResetTime,
    showsTime
  } from '@/services/apiService'

  export default {
    async asyncData({$axios, callback}) {

    },
    methods: {
      //画线
      lineStyle(x1, y1, x2, y2, lineWidth = 4, color = '#02386F') {
        let rectX = x1 < x2 ? x1 : x2;
        let rectY = y1 < y2 ? y1 : y2;
        let rectWidth = Math.abs(x1 - x2);
        let rectHeight = Math.abs(y1 - y2);
        //弦长
        let stringWidth = Math.ceil(Math.sqrt((rectWidth * rectWidth) + (rectHeight * rectHeight)));
        let xPad = (rectWidth - stringWidth) / 2;
        let yPad = (rectHeight - lineWidth) / 2;
        //倾斜角
        let radNum = Math.atan2((y1 - y2), (x1 - x2));
        return `position: absolute;
        width: ${stringWidth}px;
        height: ${lineWidth}px;
        background-color: ${color};
        transform: translate(${rectX + xPad}px, ${rectY + yPad}px) rotate(${radNum}rad);`;
      },
      getColors(startColor, endColor, step) {
        function gradientColor(startColor, endColor, step) {
          let startRGB = colorToRgb(startColor);//转换为rgb数组模式
          let startR = startRGB[0];
          let startG = startRGB[1];
          let startB = startRGB[2];

          let endRGB = colorToRgb(endColor);
          let endR = endRGB[0];
          let endG = endRGB[1];
          let endB = endRGB[2];

          let sR = (endR - startR) / step;//总差值
          let sG = (endG - startG) / step;
          let sB = (endB - startB) / step;

          var colorArr = [];
          for (var i = 0; i < step; i++) {
            //计算每一步的hex值
            // var hex = colorToHex('rgb(' + parseInt((sR * i + startR)) + ',' + parseInt((sG * i + startG)) + ',' + parseInt((sB * i + startB)) + ')');

            //简化算法
            var hex = 'rgb(' + parseInt((sR * i + startR)) + ',' + parseInt((sG * i + startG)) + ',' + parseInt((sB * i + startB)) + ')'
            colorArr.push(hex);
          }
          return colorArr;
        }

        function colorToRgb(sColor) {
          var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
          var sColor = sColor.toLowerCase();
          if (sColor && reg.test(sColor)) {
            if (sColor.length === 4) {
              var sColorNew = "#";
              for (var i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
              }
              sColor = sColorNew;
            }
            //处理六位的颜色值
            var sColorChange = [];
            for (var i = 1; i < 7; i += 2) {
              sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
            }
            return sColorChange;
          } else {
            return sColor;
          }
        };

        // 将rgb表示方式转换为hex表示方式
        function colorToHex(rgb) {
          var _this = rgb;
          var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
          if (/^(rgb|RGB)/.test(_this)) {
            var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
            var strHex = "#";
            for (var i = 0; i < aColor.length; i++) {
              var hex = Number(aColor[i])
              hex = hex < 16 ? 0 + '' + hex.toString(16) : hex.toString(16);// 保证每个rgb的值为2位
              if (hex === "0") {
                hex += hex;
              }
              strHex += hex;
            }
            if (strHex.length !== 7) {
              strHex = _this;
            }

            return strHex;
          } else if (reg.test(_this)) {
            var aNum = _this.replace(/#/, "").split("");
            if (aNum.length === 6) {
              return _this;
            } else if (aNum.length === 3) {
              var numHex = "#";
              for (var i = 0; i < aNum.length; i += 1) {
                numHex += (aNum[i] + aNum[i]);
              }
              return numHex;
            }
          } else {
            return _this;
          }
        }

        return gradientColor(startColor, endColor, step)
      },
      getColorByTemperature(data) {
        if (!this.colors) {
          var colors = this.getColors('#535A91', '#0080ff', 10);
          var colors1 = this.getColors('#0080ff', '#02f78e', 10);
          var colors2 = this.getColors('#02f78e', '#00ec00', 10);
          var colors3 = this.getColors('#00ec00', '#f9f900', 10);
          var colors4 = this.getColors('#f9f900', '#ff8040', 10);
          var colors5 = this.getColors('#ff8040', '#ff0000', 10);
          colors.push(...colors1)
          colors.push(...colors2)
          colors.push(...colors3)
          colors.push(...colors4)
          colors.push(...colors5)
          this.colors = colors
        }

        colors = this.colors
        var num = colors.length
        var arr = []
        var max = 50
        var i = 0
        var color = '#b15bff';
        if (data > max) {
          color = '#ff0000'
        } else if (data < i) {
          color = '#b15bff'
        } else {
          while (i <= max) {
            arr.push(i)
            i += max / colors.length
          }
          for (var j in arr) {
            if (arr[j] > data) {
              num = parseInt(j) - 1
              color = colors[num]
              break
            }
          }
        }

        return color
      },
      getXYByLoc(meter) {
        let ppLength = this.everyMeter * meter
        let length = 0
        let cppLength = ppLength

        for (let item of this.lines) {

          let x = Math.abs(item['x2'] - item['x1'])
          let y = Math.abs(item['y2'] - item['y1'])
          let cLength = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))

          length += cLength
          if (ppLength <= length) {
            return {
              x: cppLength / cLength * (item['x2'] - item['x1']) + item['x1'],
              y: cppLength / cLength * (item['y2'] - item['y1']) + item['y1'],
            }
          }

          cppLength -= cLength
        }
        return {}
      },
      getRealTimeAlarmStatistics(type) {
        return this.realTimeAlarmDatas.filter(value => {
          value['name'] = type
        }).length
      },
      async setLightAndTemperatureData() {
        try {
          const data = await getLightAndTemperatureData(this.currentChannel + 1)
          let temperatureObject = data['temperature']
          let temperatureMax = data['temperatureMax']
          let temperatureMin = data['temperatureMin']
          let lightObject = data['light']
          let lightMin = data['lightMin']
          let lightMax = data['lightMax']

          let temperatureDatas = temperatureObject.datas
          let lightDatas = lightObject.datas

          this.temperatureMax = temperatureMax
          this.temperatureMin = temperatureMin
          this.lightMax = lightMax
          this.lightMin = lightMin
          this.temperatureDatas = temperatureDatas
          this.lightDatas = lightDatas
        } catch (e) {
        }
      },
      async setEquipment() {
        const data = await getEquipment()
        const {channel, length, state, type} = data
        this.channel = channel

        let slideMax = []
        for (let i = 0; i < channel; i++) {
          slideMax.push(i + 1)
        }
        this.slideMax = slideMax
        this.length = length
        this.state = state
        this.type = type
      },
      async setAlarmsStatisticsToday() {
        const data = await getAlarmsStatisticsToday(this.currentChannel + 1)
        let arr = []
        for (let item of data) {
          let ob = {}
          ob['报警类型'] = item['name']
          ob['次数'] = item['count']
          arr.push(ob)
        }
        this.todayAlarmChartData['rows'] = arr
      },
      async setZonalTemperature() {
        const data = await getZonalTemperature(this.currentChannel + 1)
        let arr = []
        let number = 0
        for (let item of data) {
          number++
          let ob = item
          ob.number = number
          arr.push(ob)
        }
        this.temperatureStatisticsDatas = arr
      },
      async setRealTimeAlarm() {
        const data = await getRealTimeAlarm(this.currentChannel + 1)
        for (let item of data) {
          if (this.realTimeAlarmDatas.length >= 50) {
            this.realTimeAlarmDatas.shift()
          }
          this.realTimeAlarmDatas.unshift(item)
        }
      },
      async setPipelineInflectionPoint() {
        const data = await getPipelineInflectionPoint(this.currentChannel + 1)
        this.originalPoints = data
        this.handlePoint()
      },
      handlePoint() {
        let data = this.originalPoints
        let cImg = this.$refs['image']
        let img = this.$refs['img']

        let {width, height} = img
        let cWidth = cImg.clientWidth
        let cHeight = cImg.clientHeight
        let blWidth = cWidth / width
        let blHeight = cHeight / height

        this.points = data.map(value => {
          let ob = {
            x: value['x'] * blWidth,
            y: value['y'] * blHeight
          }
          return ob
        })
      },
      intervalSetPipelineInflectionPoint() {
        Promise.all([this.setPipelineInflectionPoint().then(() => {
          this.setRealTimeAlarm()
          this.setLightAndTemperatureData()
        }),
          this.setAlarmsStatisticsToday(),
          this.setZonalTemperature(),
        ]).then(() => {
          this.sxsj = moment().format('YYYY-MM-DD HH:mm:ss')
        })

        if (this.intervalID) {
          clearInterval(this.intervalID)
        }
        this.intervalID = setInterval(() => {
          Promise.all([this.setPipelineInflectionPoint().then(() => {
            this.setRealTimeAlarm()
            this.setLightAndTemperatureData()
          }),
            this.setAlarmsStatisticsToday(),
            this.setZonalTemperature(),
          ]).then(() => {
            this.sxsj = moment().format('YYYY-MM-DD HH:mm:ss')
          })
        }, 13000)
      },
      setDatas() {
        this.setEquipment()
        // this.setAlarmsStatisticsToday()
        // this.setZonalTemperature()
        // this.setRealTimeAlarm()
        // this.setPipelineInflectionPoint()
        this.intervalSetPipelineInflectionPoint()
        // this.setLightAndTemperatureData()
      },
      cTemperature() {
        this.bottomChartdataTemperatureFlag = true
      },
      cLight() {
        this.bottomChartdataTemperatureFlag = false
      }
    },
    beforeDestroy() {
      if (this.intervalID) {
        clearInterval(this.intervalID)
      }
    },
    async mounted() {
      let c = this

      setTimeout(function () {
        c.$refs[`chart1`].echarts.resize()
        c.$refs[`chart2`].echarts.resize()
      }, 200)
      window.onresize = function () {
        try {
          c.$refs[`chart1`].echarts.resize()
          c.$refs[`chart2`].echarts.resize()
          c.handlePoint()
        } catch (e) {
        }
      }
      this.setDatas()
    },
    watch: {
      currentChannel: {
        handler() {
          this.realTimeAlarmDatas = []
          getRealTimeAlarmResetTime()
          this.setDatas()
        }
      }
    },
    data() {
      let sxsj = moment().format('YYYY-MM-DD HH:mm:ss')
      return {
        sxsj: sxsj,
        intervalID: null,
        temperatureMax: null,
        temperatureMin: null,
        lightMax: null,
        lightMin: null,
        channel: '',
        length: '',
        state: '',
        type: "",
        currentChannel: 0,
        slideMax: [1],
        originalPoints: [],
        lightDatas: [],
        temperatureChartData: {
          columns: ['光纤距离', '温度(℃)'],
          rows: []
        },
        todayAlarmChartData: {
          columns: ['报警类型', '次数'],
          rows: [
            {'报警类型': '定温', '次数': 0},
            {'报警类型': '温速', '次数': 0},
            {'报警类型': '温差', '次数': 0},
            {'报警类型': '断纤', '次数': 0},
          ]
        },
        temperatureDatas: [],
        temperatureStatisticsHeaders: [
          {
            text: '序号',
            align: 'center',
            value: 'number',
            sortable: false,
            width: '10%'
          },
          {
            text: '分区',
            value: 'name',
            align: 'center',
            sortable: false,
            width: '35%'
          },
          {
            text: '最低(℃)',
            value: 'min',
            align: 'center',
            sortable: false,
            width: '15%'
          },
          {
            text: '最高(℃)',
            value: 'max',
            align: 'center',
            sortable: false,
            width: '15%'
          },
          {
            text: '平均(℃)',
            value: 'average',
            align: 'center',
            sortable: false,
            width: '15%'
          },
          {
            text: 'ID',
            value: 'id',
            align: 'center',
            sortable: false,
            width: '10%'
          }
        ],
        temperatureStatisticsDatas: [],
        realTimeAlarmHeaders: [
          {
            text: '报警级别',
            align: 'center',
            sortable: false,
            value: 'type',
            width: '25%'

          },
          {
            text: '详情',
            value: 'postext',
            align: 'center',
            sortable: false,
            width: '49%'

          },
          {
            text: '时间',
            value: 'dt',
            align: 'center',
            sortable: false,
            width: '26%'

          },
        ],
        realTimeAlarmDatas: [],
        points: [],
        bottomChartdataTemperatureFlag: true,
      }
    },
    computed: {
      temperatureChartSettings() {
        if (this.bottomChartdataTemperatureFlag) {
          return {
            yAxisName: ['温度(℃)']
          }
        } else {
          return {
            yAxisName: ['光数据']
          }
        }
      },
      alarmPoints() {
        let c = this
        let arr = []

        if (this.realTimeAlarmDatas) {
          arr = this.realTimeAlarmDatas.map((item) => {
            return c.getXYByLoc(item['pos'])
          })
        }
        return arr
      },
      linesTemperature() {
        let arr = []

        if (this.points.length < 2) {
          return [];
        }
        let data = []

        let count = 0
        let max = -999999
        let temp = null

        for (let item of this.temperatureChartDataC['rows']) {
          if (count >= 20) {
            data.push(temp)
            max = 0
            count = 0
          } else {
            if (max < item['温度(℃)']) {
              max = item['温度(℃)']
              temp = item
            }
            count++
          }
        }

        for (let i = 0; i < data.length - 2; i++) {
          let item = data[i]
          let item1 = data[i + 1]
          let loc = item['光纤距离']
          let loc1 = item1['光纤距离']
          let temp = item['温度(℃)']
          let start = this.getXYByLoc(loc)
          let end = this.getXYByLoc(loc1)
          arr.push({
            style: this.lineStyle(start['x'], start['y'], end['x'], end['y'], undefined, this.getColorByTemperature(temp))
          })
        }

        return arr
      },
      lengthShow() {
        return Math.round(this.length / 1000) + 'km'
      },
      everyMeter() {
        let length = 0
        for (let item of this.lines) {
          let x = Math.abs(item['x1'] - item['x2'])
          let y = Math.abs(item['y1'] - item['y2'])
          length += Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
        }
        let allLength = this.temperatureDatas.length
        const everyMeter = length / allLength
        return everyMeter
      },
      lines() {
        let arr = []
        for (let i = 0; i < this.points.length - 1; i++) {
          let ob = {}
          let ob1 = this.points[i]
          let ob2 = this.points[i + 1]
          ob['x1'] = ob1['x']
          ob['y1'] = ob1['y']
          ob['x2'] = ob2['x']
          ob['y2'] = ob2['y']
          arr.push(ob)
        }
        return arr
      },
      dataZoom() {
        return [
          {
            type: 'slider',
            start: 0,
            end: 20,
            height: 20,
            textStyle: {
              color: this._getColor()
            }
          },
          {
            type: 'inside',
            start: 0,
            end: 20
          }
        ]
      },
      temperatureChartExtend() {
        let max = 0
        if (this.bottomChartdataTemperatureFlag) {
          if (this.temperatureMax) {
            max = this.temperatureMax - this.temperatureMin
          }
        } else {
          if (this.lightMax) {
            max = this.lightMax - this.lightMin
          }
        }
        return {
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
          yAxis: {
            interval: max / 4,
            max: (value) => {
              if (this.bottomChartdataTemperatureFlag) {
                if (this.temperatureMax) {
                  return this.temperatureMax
                }
              } else {
                if (this.lightMax) {
                  return this.lightMax
                }
              }
              return value.max
            },
            min: (value) => {
              if (this.bottomChartdataTemperatureFlag) {
                if (this.temperatureMin) {
                  return this.temperatureMin
                }
              } else {
                if (this.lightMin) {
                  return this.lightMin
                }
              }
              return value.max
            }
          },
          legend: {
            show: false
          },
          textStyle: {
            color: this._getColor()
          },
          grid: {
            left: '3%',
            right: '3%',
            bottom: '21%',
            top: '21%',
            containLabel: true
          },
        }
      },
      todayAlarmChartExtend() {
        return {
          title: {
            text: 0,
            subtext: '总报警次数',
            x: 'center',
            top: '40%',
            textStyle: {
              fontSize: 18,
              fontWeight: 'normal',
              color: [this._getColor()]
            },
            subtextStyle: {
              color: this._getColor(),
              fontSize: 12
            },
          },
          legend: {
            show: true,
            itemWidth: 14,
            itemHeight: 14,
            borderWidth: 0,
            icon: "rect",
            borderRadius: 0,
            textStyle: {
              fontSize: '14',
              color: this._getColor()
            },
          },
          series: {
            type: 'pie',
            selectedMode: 'single',
            radius: ['40%', '60%'],//设置饼图大小
            center: ['50%', '50%'],//设置饼图位置
            // itemStyle: {
            //   emphasis: {
            //     shadowBlur: 10,
            //     shadowOffsetX: 0,
            //     shadowColor: 'rgba(0, 0, 0, 0.5)'
            //   }
            // }
          }
        }
      },
      currentChannelShow() {
        return this.currentChannel + 1
      },
      temperatureChartDataC() {
        let ob = Object.assign({}, this.temperatureChartData)
        let loc = 0
        let ob1 = this.temperatureDatas
        if (ob1) {
          ob.rows = ob1.map(value => {
            let rowsItem = {}
            rowsItem[ob.columns[0]] = loc
            rowsItem[ob.columns[1]] = value.data
            if (rowsItem[ob.columns[1]] > 100 || rowsItem[ob.columns[1]] < -50) {
              rowsItem[ob.columns[1]] = 20
            }
            loc++;
            return rowsItem
          })
        }
        return ob
      },
      temperatureOrLightChartDataC() {
        let ob = Object.assign({}, this.temperatureChartData)
        let loc = 0
        let ob1 = this.bottomChartdataTemperatureFlag ? this.temperatureDatas : this.lightDatas
        if (ob1) {
          ob.rows = ob1.map(value => {
            let rowsItem = {}
            rowsItem[ob.columns[0]] = loc
            rowsItem[ob.columns[1]] = value.data
            if (rowsItem[ob.columns[1]] > 100 || rowsItem[ob.columns[1]] < -50) {
              rowsItem[ob.columns[1]] = 20
            }
            loc++;
            return rowsItem
          })
        }
        return ob
      },
      todayAlarmChartExtendC() {
        let ob = this.todayAlarmChartExtend
        let count = 0
        this.todayAlarmChartData.rows.forEach(value => {
          count += value['次数']
        })
        ob.title.text = count
        return ob;
      }
    },
    components: {
      Logo,
      VuetifyLogo
    }
  }
</script>
<style lang="scss" scoped>


</style>
<style lang="scss">
  $color: rgb(74, 241, 4);

  html {
    font-size: 16px;
  }

  .index {
    .ribbon-container {
      position: absolute;
      top: 0px;
      right: 0px;
      height: 100%;
    }

    .scale {
      float: left;
      color: $color;
      position: relative;
      height: calc(100%);
      width: 5px;
    }

    .ribbon {
      height: calc(100%);
      width: 15px;
      background: -webkit-linear-gradient(bottom, #535A91, #0080ff, #02f78e, #00ec00, #f9f900, #ff8040, #ff0000) no-repeat;
      background: -moz-linear-gradient(bottom, #535A91, #0080ff, #02f78e, #00ec00, #f9f900, #ff8040, #ff0000) no-repeat;
      background: -o-linear-gradient(bottom, #535A91, #0080ff, #02f78e, #00ec00, #f9f900, #ff8040, #ff0000) no-repeat;
      background: -ms-linear-gradient(bottom, #535A91, #0080ff, #02f78e, #00ec00, #f9f900, #ff8040, #ff0000) no-repeat;
      background: linear-gradient(to top, #535A91, #0080ff, #02f78e, #00ec00, #f9f900, #ff8040, #ff0000) no-repeat;
      float: right;
    }

    .scale-item {
      position: absolute;
      border-top: 1px solid $color;
      height: 10%;
      width: 5px;
    }

    .scale-item:nth-of-type(1) {
      top: 0%;
      border-top: none;
    }

    .scale-item:nth-of-type(1):after {
      content: "50";
      left: -20px;
      top: 0px;
    }

    .scale-item:nth-of-type(2) {
      top: 10%;
    }

    .scale-item:nth-of-type(2):after {
      content: "45";
    }

    .scale-item:nth-of-type(3) {
      top: 20%;
    }

    .scale-item:nth-of-type(3):after {
      content: "40";
    }

    .scale-item:nth-of-type(4) {
      top: 30%;
    }

    .scale-item:nth-of-type(4):after {
      content: "35";
    }

    .scale-item:nth-of-type(5) {
      top: 40%;
    }

    .scale-item:nth-of-type(5):after {
      content: "30";
    }

    .scale-item:nth-of-type(6) {
      top: 50%;
    }

    .scale-item:nth-of-type(6):after {
      content: "25";
    }

    .scale-item:nth-of-type(7) {
      top: 60%;
    }

    .scale-item:nth-of-type(7):after {
      content: "20";
    }

    .scale-item:nth-of-type(8) {
      top: 70%;
    }

    .scale-item:nth-of-type(8):after {
      content: "15";
    }

    .scale-item:nth-of-type(9) {
      top: 80%;
    }

    .scale-item:nth-of-type(9):after {
      content: "10";
    }

    .scale-item:nth-of-type(10) {
      top: 90%;
    }

    .scale-item:nth-of-type(10):after {
      left: -15px;
      content: "5";
    }

    .scale-item:nth-of-type(11) {
      top: 100%;
      border-top: none;
    }

    .scale-item:nth-of-type(11):after {
      content: "0";
      left: -12px;
      top: -16px;
    }

    .scale-item:after {
      position: absolute;
      left: -20px;
      top: -10px;
    }

    .sxy {
      background: var(--v-primary-base)
    }

    .bgImg {
      min-height: 500px !important;
    }

    .card {
      height: 100%;
      min-height: 250px;
    }

    .card_parent {
      padding: 8px !important;
    }

    .image {
      height: 100%;
      width: 100%;
      background: url("~assets/images/bj.png");
      background-size: 100% 100%;
    }

    .card-title {
      max-height: 45px;
    }

    .card-content {
      font-size: 0.75rem;
    }

    .container {
      margin: 0 !important;
    }

    .layout {
      margin: 0 !important;
    }

    .badge {
      width: 2rem;
    }

    .equipment_info {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%);

      font-size: 12px;
      padding: 12px;
      background: rgba(255, 255, 255, .3);
      text-align: center;
    }

    .equipment_info .v {
      color: var(--v-primary-base);
    }

    .channel {
      position: absolute;
      top: 50%;
      left: 0%;
      transform: translate(0, -50%);

      font-size: 12px;
      padding: 12px;
      background: rgba(255, 255, 255, .3);
    }

    .v-data-table {
      word-break: break-all;
      height: 0px;
      min-height: 100%;
      overflow: auto;
    }

    .v-data-table td {
      height: 2rem !important;
    }

    .v-data-table th {
      padding: 5px;
    }

    .v-data-table tr {
      height: 2rem !important;
    }

    .dis {
      color: #333;
      cursor: pointer;
    }

    .sel {
      color: #fff;
      font-weight: normal;
      background: var(--v-primary-base);
    }

    .point {
      height: 12px;
      width: 12px;
      margin-left: -6px;
      margin-top: -6px;
      border-radius: 8px;
      background: #E6A027;
      border: 1px solid var(--v-primary-base);
    }

    .alarmPoint {
      width: 16px;
      height: 16px;

      margin-left: -8px;
      margin-top: -16px;

      background: url("~assets/images/alarm.png");
      background-size: 100% 100%;
    }

    .card-title {
      background: #ECF5FF;
      color: #333;
      font-weight: normal;
      font-size: 14px;
    }

    .yuan {
      height: 16px;
      width: 16px;
      border-radius: 16px;
      border: 1px solid var(--v-primary-base);
      cursor: pointer;
    }

    .chooseBtn {
      padding-top: 8px;
      padding-bottom: 8px;
      padding-left: 12px;
      padding-right: 12px;
    }

    .sxsj {
      position: fixed;
      margin-left: 10px;
      bottom: 0;
      font-size: 12px;
    }
  }
</style>
