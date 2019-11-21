<template>
  <v-form>
    <v-container fluid>
      <v-row no-gutters>
        <v-col>
          <v-layout row class="align-center layout px-4 app--page-header">
            <div class="page-header-left">
              <h3 class="pr-3">报警查询</h3>
            </div>
            <v-breadcrumbs divider="-" :items="breadcrumbs">
              <template v-slot:item="props">
                <a :href="props.item.href" :class="[props.item.disabled && 'disabled']">{{ props.item.text}}</a>
              </template>
            </v-breadcrumbs>
          </v-layout>
        </v-col>
      </v-row>
      <v-card>
        <v-card-title>

          <v-row align="center"
                 justify="center">
            <v-col md="2" cols="12">
              <v-select
                label="通道号"
                :items="channels"
                v-model="channel"
              ></v-select>
            </v-col>

            <v-col md="2" cols="12">
              <v-select
                label="类型"
                :items="types"
                v-model="type"
              ></v-select>
            </v-col>
            <v-col md="2" cols="12">
              <v-menu
                v-model="startPickerShow"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="startDateTime"
                    label="开始时间"
                    prepend-icon="event"
                    readonly
                    @click="startDateFlag = 0"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-if="startDateFlag==0" locale="zh-ch" v-model="startDate"
                               @input="startDateFlag = 1"></v-date-picker>
                <v-time-picker v-if="startDateFlag==1" v-model="startTime" format="24hr"
                               @click:minute="startPickerShow = false;"></v-time-picker>
              </v-menu>
            </v-col>
            <v-col md="2" cols="12">
              <v-menu
                v-model="endPickerShow"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="endDateTime"
                    label="结束时间"
                    prepend-icon="event"
                    readonly
                    @click="endDateFlag = 0"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-if="endDateFlag==0" locale="zh-ch" v-model="endDate"
                               @input="endDateFlag = 1"></v-date-picker>
                <v-time-picker v-if="endDateFlag==1" v-model="endTime" format="24hr"
                               @click:minute="endPickerShow = false"></v-time-picker>
              </v-menu>
            </v-col>
            <div class="flex-grow-1"></div>
            <div class="flex-grow-1"></div>
            <div class="flex-grow-1"></div>
            <div class="flex-grow-1"></div>
            <div class="flex-grow-1"></div>
            <div class="flex-grow-1"></div>
            <div class="flex-grow-1"></div>
            <div class="flex-grow-1"></div>
            <v-col>
              <v-btn block @click="search" color="primary darken-1">
                查询
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col>
              <v-data-table
                :headers="tableHeaders"
                :items="tableData"
                :items-per-page="10"
              ></v-data-table>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </v-form>
</template>

<script>
  import {getAlarmSearch,getEquipment,showsTime} from '@/services/apiService'
  import moment from 'moment'

  export default {
    name: "alarmSearch",
    mounted() {
      // this.search()
      this.setEquipment()
    },
    data() {
      return {
        channels: [],
        channel: 1,
        types:[{
          text:"全部",
          value:0
        },{
          text:"一级高温报警",
          value:1
        },{
          text:"二级高温报警",
          value:2
        },{
          text:"三级高温报警 ",
          value:3
        },{
          text:"正温升报警",
          value:5
        },{
          text:"区域温差报警",
          value:6
        },{
          text:"断纤报警",
          value:7
        },{
          text:"其他报警",
          value:11
        }],
        type:0,
        breadcrumbs: [{
          text: "主页",
          href: "/",
          disabled: false
        },
          {
            text: "报警查询",
            href: "/alarmSearch",
            disabled: true
          }],
        startDate: moment().format('YYYY-MM-DD'),
        startTime: moment().format('hh:mm'),
        startPickerShow: false,
        startDateFlag: 0,
        endDate: moment().format('YYYY-MM-DD'),
        endTime: moment().format('hh:mm'),
        endPickerShow: false,
        endDateFlag: 0,
        tableHeaders: [
          {
            text: '时间',
            value: 'dt',
          },
          {text: '类型', value: 'type'},
          {text: '分区', value: 'pname'},
          {text: '位置', value: 'pos'},
          {text: '温度', value: 'temp'},
          {text: '描述', value: 'postext'},
        ],
        tableData: [],
      }
    },
    computed: {
      startDateTime() {
        return `${this.startDate} ${this.startTime}`
      },
      endDateTime() {
        return `${this.endDate} ${this.endTime}`
      }
    },
    methods: {
      async search() {
        let startTimeStamp = moment(this.startDateTime).valueOf()
        let endTimeStamp = moment(this.endDateTime).valueOf()
        let data = await getAlarmSearch(this.channel, this.type, startTimeStamp, endTimeStamp)
        this.tableData = data
      },
      async setEquipment(){
        const data = await getEquipment()
        const { channel } = data

        let slideMax =  []
        for (let i = 0; i < channel; i++) {
          slideMax.push(i+1)
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
