import axios from "axios";
import Vue from 'vue'
import moment from 'moment'
import nuxtConfig from '@/nuxt.config'
import global from '@/plugins/global'
//基本路径
//是开发环境是代理为真路径为"" 否则是 nuxtConfig.axios.baseURL

let NODE_ENV = process.env.NODE_ENV
let path = NODE_ENV !== 'generate' ? nuxtConfig.axios.proxy ? "/api" : nuxtConfig.axios.baseURL : nuxtConfig.axios.baseURL

let rTime = moment().valueOf()
let getRealTimeDataSTime = moment().valueOf()
let apiService = {
    alarmToday(params={}) {
        let stime = moment().startOf('d').valueOf()
        let etime = moment().endOf('d').valueOf()
        params.startTime = stime
        params.endTime = etime
        return new Promise((resolve, reject) => {
            axios.get(path + `/alarms/alarmsCountToday`, {
                params
            }).then((value => {
                let datas = value['data']

                let data = datas['data'] || []
                resolve(data)
            }))
        })
    },
    //报警总数
    listAlarmByDeptCount(params) {
        return new Promise((resolve, reject) => {
            axios.get(path + `/alarms/alarmsCountByDept`, {
                params
            }).then((value => {
                let datas = value['data']['data']

                resolve(datas)
            }))
        })
    },
    //管道拐点
    listPipelineInflexCoordinate(params) {
        return new Promise((resolve, reject) => {
            axios.get(path + `/pipelines/listPipelineInflexCoordinate`, {
                params
            }).then((value => {
                let datas = value['data']
                resolve(datas)
            }))
        })
    },
    getMarker(params) {
        return new Promise((resolve, reject) => {
            axios.get(path + `/markers/listMarkers`, {
                params
            }).then((value => {
                let {data} = value['data']

                resolve(data)
            }))
        })
    },
    getMarkerEquip(params) {
        return new Promise((resolve, reject) => {
            axios.get(path + `/equipments`, {
                params
            }).then((value => {
                let {data} = value['data']

                resolve(data)
            }))
        })
    },
    async getTree(params) {
        return new Promise((resolve, reject) => {
            axios.get(path + `/dept/getHomeTree`, {
                params
            }).then((value => {
                let datas = value['data']

                resolve(datas)
            }))
        })
    },
    async getPipelines(params) {
        return new Promise((resolve, reject) => {
            axios.get(path + `/pipelines`, {
                params
            }).then((value => {
                let datas = value['data']

                resolve(datas)
            }))
        })
    },
    async getEquipmentOnlineRate(params) {
        return new Promise((resolve, reject) => {
            axios.get(path + `/equipments/onlineRate`, {
                params
            }).then((value => {
                let datas = value['data']

                resolve(datas)
            }))
        })
    },
    async getRealTimeAlarm(params) {
        let endTime = moment().valueOf()
        return new Promise((resolve, reject) => {
            //用这个
            // let url=`/alarms?order=asc&startTime=${rTime}&endTime=${endTime}&processState=1`
            let handleState = 'bjzt02'
            let url=`/alarms/realtimeAlarms?order=asc&handleState=${handleState}`

            /*//测试的
            let url=`/alarms?order=asc&startTime=1572644200886&endTime=1577754201323&processState=1`*/
            // let url = '/alarms'
            axios.get(path + url, {
                startTime:rTime,
                endTime:endTime
            }).then((value => {
                let datas = value['data']['data']
                // datas= [{
                //     "id": "ece457b1-5863-4b7a-85cc-5c1fb840b799",
                //     "alarmStateName": "报警",
                //     "alarmValue": 20.9,
                //     "alarmTime": 1579005332077,
                //     "equipmentId": "E400AD2A8120_1",
                //     "pipelineId": "66fbd60b3c1f4444bd969088cb8805de",
                //     "pipelineLocation": 900,
                //     "fiberLocation": 900,
                //     "levelId": "01060101",
                //     "latLon": [
                //         109.75612686872076,
                //         30.45170473796658
                //     ]
                // }]
                if(datas.length>0){
                    rTime = endTime
                }
                resolve(datas)
            }))
        })
    },
    async getRealTimeData(params) {
        let endTime = moment().valueOf()
        return new Promise((resolve, reject) => {
            axios.get(path + `/data/realTimeDatas?startTime=${getRealTimeDataSTime}&endTime=${endTime}`, {
                params
            }).then((value => {
                let datas = value['data'] || {}
                if(datas.length>0){
                    getRealTimeDataSTime = endTime
                }
                resolve(datas)
            }))
        })
    },
    async getPipelineInfo(params,id) {
        return new Promise((resolve, reject) => {
            axios.get(path + `/pipelines/${id}`, {
                params
            }).then((value => {
                let datas = value['data']

                resolve(datas)
            }))
        })
    },
    async getEqiupmentRate(params) {
        return new Promise((resolve, reject) => {
            axios.get(path + `/`, {
                params
            }).then((value => {
                let datas = value['data']

                resolve(datas)
            }))
        })
    },
    async getEqiupmentInfo(params,id) {
        return new Promise((resolve, reject) => {
            axios.get(path + `/equipments/${id}`, {
                params
            }).then((value => {
                let datas = value['data']

                resolve(datas)
            }))
        })
    },
    async getMarkerInfo(params,id) {
        return new Promise((resolve, reject) => {
            axios.get(path + `/markers/${id}`, {
                params
            }).then((value => {
                let datas = value['data']

                resolve(datas)
            }))
        })
    },
    async getEqiupments(params) {
        return new Promise((resolve, reject) => {
            axios.get(path + `/equipments`, {
                params
            }).then((value => {
                let datas = value['data']

                resolve(datas)
            }))
        })
    },
    async getAlarmById(params,id) {
        return new Promise((resolve, reject) => {
            axios.get(path + `/alarms/${id}`, {
                params
            }).then((value => {
                let datas = value['data']

                resolve(datas)
            }))
        })
    },
    async getAlarms(params) {
        return new Promise((resolve, reject) => {
            // axios.get(path + `/alarms`, {
            axios.get(path + `/alarms/listAlarmsHistory`, {//替换成这个请求
                params
            }).then((value => {
                let datas = value['data']

                resolve(datas)
            }))
        })
    },
    getAlarmTypes(params) {
        return new Promise((resolve, reject) => {
            axios.get(path + `/dictionary/alarmType`, {
                params
            }).then((value => {
                let datas = value['data']

                resolve(datas)
            }))
        })
    },
    getDataTypes(params) {
        return new Promise((resolve, reject) => {
            axios.get(path + `/dictionary/dataType`, {
                params
            }).then((value => {
                let datas = value['data']

                resolve(datas)
            }))
        })
    },
    getDatas(params){
        return new Promise((resolve, reject) => {
            axios.get(path + `/data/historical`, {
                params
            }).then((value => {
                let datas = value['data']

                resolve(datas)
            }))
        })
    },
    pipelineAlarmsToday(params){
        let stime = moment().startOf('d').valueOf()
        let etime = moment().endOf('d').valueOf()
        params.startTime = stime
        params.endTime = etime
        return new Promise((resolve, reject) => {
            axios.get(path + `/alarms/alarmsCountToday`, {
                params
            }).then((value => {
                let datas = value['data']

                resolve(datas)
            }))
        })
    },
    equipmentAlarmsToday(params){
        let stime = moment().startOf('d').valueOf()
        let etime = moment().endOf('d').valueOf()
        params.startTime = stime
        params.endTime = etime
        return new Promise((resolve, reject) => {
            axios.get(path + `/alarms/alarmsCountToday`, {
                params
            }).then((value => {
                let datas = value['data']

                resolve(datas)
            }))
        })
    },
    usage(id){
        return new Promise((resolve, reject) => {
            axios.get(path + `/equipments/usage/${id}`, {
            }).then((value => {
                let datas = value['data']

                resolve(datas)
            }))
        })
    }
}

export default apiService



