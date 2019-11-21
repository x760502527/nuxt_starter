import axios from "axios";
import moment from 'moment'
import nuxtConfig from '@/nuxt.config'
import global from '@/plugins/global'
//基本路径
//是开发环境是代理为真路径为"" 否则是 nuxtConfig.axios.baseURL
let path = nuxtConfig.dev ? nuxtConfig.axios.proxy ? "" : nuxtConfig.axios.baseURL : nuxtConfig.axios.baseURL

let getEquipment = () => {
  return new Promise((resolve, reject) => {
    let data = sessionStorage.getItem("equipment")
    let tempTime = moment().valueOf()
    if (data) {
      data = JSON.parse(data)
      resolve(data)
    } else {
      axios.get(path + `/api/equipment?tempTime=${tempTime}`).then((value => {
        let datas = value['data']
        let data = datas['data'] || []
        sessionStorage.setItem("equipment", JSON.stringify(data))
        resolve(data)
      }))
    }
  })
}

let getAlarmSearch = (channel, type, startTime, endTime) => {
  return new Promise((resolve, reject) => {
    let tempTime = moment().valueOf()
    axios.get(path + `/api/alarmSearch?tempTime=${tempTime}&channel=${channel}&startTime=${startTime}&endTime=${endTime}&type=${type}&order=1`).then((value => {
      let datas = value['data']
      let data = datas['data'] || []
      for (let item of data) {
        item['dt'] = moment(item['dt']).format('YYYY-MM-DD HH:mm:ss')
        item.type = global.getAlarmTypesText(item.type)
      }
      resolve(data)
    }))
  })
}

let getTemperatureCurvePlayback = (channel, startTime, endTime) => {
  return new Promise((resolve, reject) => {
    let tempTime = moment().valueOf()
    axios.get(path + `/api/temperatureCurvePlayback?tempTime=${tempTime}&channel=${channel}&startTime=${startTime}&endTime=${endTime}`).then((value => {
      let datas = value['data']
      let data = datas['data'] || []
      resolve(data)
    }))
  })
}

let getLightAndTemperatureData = (channel) => {
  return new Promise((resolve, reject) => {
    let tempTime = moment().valueOf()
    axios.get(path + `/api/lightAndTemperatureData?tempTime=${tempTime}&channel=${channel}`).then((value => {
      let datas = value['data']
      let data = datas['data'] || []
      resolve(data)
    }))
  })
}

//获取管道坐标点在地图底图的位置
let getPipelineInflectionPoint = (channel) => {
  return new Promise((resolve, reject) => {
    let tempTime = moment().valueOf()
    axios.get(path + `/api/pipelineInflectionPoint?tempTime=${tempTime}&channel=${channel}`).then((value => {
      let datas = value['data']
      let data = datas['data'] || []
      resolve(data)
    }))
  })
}

//6.2.4 当日报警统计
let getAlarmsStatisticsToday = (channel) => {
  let startTime = moment().startOf('day').valueOf();
  let endTime = moment().valueOf();
  return new Promise((resolve, reject) => {
    let tempTime = moment().valueOf()
    axios.get(path + `/api/alarmStatistics?tempTime=${tempTime}&channel=${channel}`, {
      params: {
        startTime,
        endTime
      }
    }).then((value => {
      let datas = value['data']
      let data = datas['data'] || []
      resolve(data)
    }))
  })
}

//6.2.5 分区温度统计
let getZonalTemperature = (channel) => {
  let startTime = moment().startOf('day').valueOf();
  let endTime = moment().valueOf();
  return new Promise((resolve, reject) => {
    let tempTime = moment().valueOf()
    axios.get(path + `/api/ZonalTemperature?tempTime=${tempTime}&channel=${channel}`, {
      params: {
        startTime,
        endTime
      }
    }).then((value => {
      let datas = value['data']
      let data = datas['data'] || []
      resolve(data)
    }))
  })
}

let getRealTimeAlarmResetTime = () =>{
    stime = currentTime
}

let currentTime = moment().valueOf()
let stime = moment().valueOf()
//6.2. 实时报警
let getRealTimeAlarm = (channel) => {
  return new Promise((resolve, reject) => {
    let tempTime = moment().valueOf()
    let startTime = stime
    let endTime = moment().add(10,'m').valueOf()

    axios.get(path + `/api/alarmSearch?tempTime=${tempTime}&channel=${channel}&startTime=${startTime}&endTime=${endTime}&type=1&order=1`).then((value => {
      let datas = value['data']
      let data = datas['data'] || []
      if(data.length>0){
        stime = endTime
      }
      for (let item of data) {
        item['dt'] = moment(item['dt']).format('YYYY-MM-DD HH:mm:ss')
        item.type = global.getAlarmTypesText(item.type)
      }
      resolve(data)
    }))
  })
}

//获得地图信息
let getMap = (channel) => {
  return new Promise((resolve, reject) => {
    let tempTime = moment().valueOf()
    axios.get(path + `/api/getMap?tempTime=${tempTime}`).then((value => {
      let datas = value['data']
      let data = datas['data'] || []
      resolve(data)
    }))
  })
}

//6.2.9 温度单点曲线查询
const getTemperatureSinglePoint = (channel, startTime, endTime, ficLoc) => {
  return new Promise((resolve, reject) => {
    let tempTime = moment().valueOf()
    axios.get(path + `/api/temperatureSinglePoint?tempTime=${tempTime}`, {
      params: {
        channel,
        startTime,
        endTime,
        ficLoc
      }
    }).then((value => {
      let datas = value['data']
      let data = datas['data'] || []
      resolve(data)
    }))
  })
}

const showsTime = () => {
  return stime
}
export {
  showsTime,
  getRealTimeAlarmResetTime,
  getAlarmSearch,
  getTemperatureCurvePlayback,
  getLightAndTemperatureData,
  getEquipment,
  getPipelineInflectionPoint,
  getAlarmsStatisticsToday,
  getZonalTemperature,
  getRealTimeAlarm,
  getMap,
  getTemperatureSinglePoint
}
