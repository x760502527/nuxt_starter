import axios from "axios";
import Vue from 'vue'
import moment from 'moment'
import nuxtConfig from '@/nuxt.config'
import global from '@/plugins/global'
//基本路径
//是开发环境是代理为真路径为"" 否则是 nuxtConfig.axios.baseURL
let path = nuxtConfig.dev ? nuxtConfig.axios.proxy ? "/api" : nuxtConfig.axios.baseURL : nuxtConfig.axios.baseURL

let apiService = {
    alarmToday() {
        return new Promise((resolve, reject) => {
            axios.get( path + `/alarms/statistics/type`, {
                params: {
                }
            }).then((value => {
                let datas = value['data']

                let data = datas['data'] || []
                resolve(data)
            }))
        })
    },
    //报警总数
    listAlarmByDeptCount(){
        return new Promise((resolve, reject) => {
            axios.get( path + `/alarms/listAlarmByDeptCount`, {
                params: {
                }
            }).then((value => {
                let datas = value['data']

                resolve(datas)
            }))
        })
    },
    //管道拐点
    listPipelineInflexCoordinate(){
        return new Promise((resolve, reject) => {
            axios.get( path + `/pipeline/listPipelineInflexCoordinate`, {
                params: {
                }
            }).then((value => {
                let datas = value['data']
                resolve(datas)
            }))
        })
    },
    getMarker(){
        return new Promise((resolve, reject) => {
            axios.get( path + `/equipment/getMarkerBy`, {
                params: {
                }
            }).then((value => {
                let datas = value['data']

                resolve(datas)
            }))
        })
    },
    getMarkerEquip(){
        return new Promise((resolve, reject) => {
            axios.get( path + `/equipment/getMarkerEquipBy`, {
                params: {
                }
            }).then((value => {
                let datas = value['data']

                resolve(datas)
            }))
        })
    }

}

export default apiService



