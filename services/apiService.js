import axios from "axios";
import Vue from 'vue'
import moment from 'moment'
import nuxtConfig from '@/nuxt.config'
import global from '@/plugins/global'

//基本路径
//是开发环境是代理为真路径为"" 否则是 nuxtConfig.axios.baseURL
let NODE_ENV = process.env.NODE_ENV
let path = NODE_ENV === 'development' ? nuxtConfig.axios.proxy ? "/api" : "/api1" : "/api1"

let apiService = {
    baidu(){
        return new Promise((resolve, reject) => {
            axios.get( `http://www.baidu.com`).then((value => {
                let datas = value['data']
                resolve(datas)
            }))
        })
    },
    configJson(){
        return new Promise((resolve, reject) => {
            axios.get( `/config.json`).then((value => {
                let datas = value['data']
                resolve(datas)
            }))
        })
    },
    login(params){
        return new Promise((resolve, reject) => {
            axios.get( path + `/datacenter/login`,{
                params
            }).then((value => {
                let datas = value['data']

                resolve(datas)
            }))
        })
    },
    logout(params){
        return new Promise((resolve, reject) => {
            axios.get( path + `/datacenter/logout`,{
                params
            }).then((value => {
                let datas = value['data']

                resolve(datas)
            }))
        })
    },
    fishboneDatas(params){
        return new Promise((resolve, reject) => {
            axios.get( path + `/datacenter/bigScreen/fishboneDatas`,{
                params
            }).then((value => {
                let datas = value['data']
                resolve(datas)
            }))
        })
    },
    alarms(params){
        return new Promise((resolve, reject) => {
            axios.get( path + `/datacenter/bigScreen/realtimeAlarmsListWithPosition`,{
                params
            }).then((value => {
                let datas = value['data']
                resolve(datas)
            }))
        })
    },
    alarmsCountDisposed(params){
        return new Promise((resolve, reject) => {
            axios.get( path + `/datacenter/alarms/alarmsCountDisposed`,{
                params
            }).then((value => {
                let datas = value['data']
                resolve(datas)
            }))
        })
    },
    alarmsCountLevel(params){
        return new Promise((resolve, reject) => {
            axios.get( path + `/datacenter/alarms/alarmsCountLevel`,{
                params
            }).then((value => {
                let datas = value['data']
                resolve(datas)
            }))
        })
    },
    onlineCount(params){
        return new Promise((resolve, reject) => {
            axios.get( path + `/datacenter/equipments/onlineCount`,{
                params
            }).then((value => {
                let datas = value['data']
                resolve(datas)
            }))
        })
    },
    alarmState(params){
        return new Promise((resolve, reject) => {
            axios.get( path + `/datacenter/dictionary/alarmState`,{
                params
            }).then((value => {
                let datas = value['data']
                resolve(datas)
            }))
        })
    },
    disposed(params){
        return new Promise((resolve, reject) => {
            axios.get( path + `/datacenter/dictionary/disposed`,{
                params
            }).then((value => {
                let datas = value['data']
                resolve(datas)
            }))
        })
    },
    disposedType(params){
        return new Promise((resolve, reject) => {
            axios.get( path + `/datacenter/dictionary/disposedType`,{
                params
            }).then((value => {
                let datas = value['data']
                resolve(datas)
            }))
        })
    },
    getRealTimeFitValue(params){
        return new Promise((resolve, reject) => {
            axios.get( path + `/datacenter/bigScreen/getRealTimeFitValue`,{
                params
            }).then((value => {
                let datas = value['data']
                resolve(datas)
            }))
        })
    },
    getRealTimeDatas(params){
        return new Promise((resolve, reject) => {
            axios.get( path + `/datacenter/bigScreen/getFitValueOtherDatas`,{
                params
            }).then((value => {
                let datas = value['data']
                resolve(datas)
            }))
        })
    },
    handleAlarm(params){
        return new Promise((resolve, reject) => {
            axios.post( path + `/datacenter/bigScreen/dealAlarmOrder`,
                params
            ).then((value => {
                let datas = value['data']
                resolve(datas)
            }))
        })
    },
    getPipelineCount(){
        return new Promise((resolve, reject) => {
            axios.get( path + `/datacenter/bigScreen/getPipelineCount`).then((value => {
                let datas = value['data']
                resolve(datas)
            }))
        })
    },
    realtimeAlarmsHistoryList(params){
        return new Promise((resolve, reject) => {
            axios.get( path + `/datacenter/bigScreen/realtimeAlarmsHistoryList`,{
                params
            }).then((value => {
                let datas = value['data']
                resolve(datas)
            }))
        })
    },
    realtimeAlarmsOrderHistoryList(params){
        return new Promise((resolve, reject) => {
            axios.get( path + `/datacenter/bigScreen/realtimeAlarmsOrderHistoryList`,{
                params
            }).then((value => {
                let datas = value['data']
                resolve(datas)
            }))
        })
    },

    getOnlineList(params){
        return new Promise((resolve, reject) => {
            axios.get( path + `/datacenter/equipments/onlineList`,{
                params
            }).then((value => {
                let datas = value['data']
                resolve(datas)
            }))
        })
    },
    //获取设备历史状态
    onlineNetRecord(params){
        return new Promise((resolve, reject) => {
            axios.get( path + `/datacenter/equipments/onlineNetRecord`,{
                params
            }).then((value => {
                let datas = value['data']
                resolve(datas)
            }))
        })
    },
    //查询历史报警
    //获取设备历史状态


    //查询历史工单
    //验证mac
    checkMac(){
        return new Promise((resolve, reject) => {
            axios.get( path + `/datacenter/checkMac`,{
                params
            }).then((value => {
                let datas = value['data']
                resolve(datas)
            }))
        })
    }
}

export default apiService



