import axios from "axios";
import Vue from 'vue'
import moment from 'moment'
import nuxtConfig from '@/nuxt.config'
import global from '@/plugins/global'

//基本路径
//是开发环境是代理为真路径为"" 否则是 nuxtConfig.axios.baseURL
let NODE_ENV = process.env.NODE_ENV
let path = NODE_ENV !== 'generate' ? nuxtConfig.axios.proxy ? "/api" : nuxtConfig.axios.baseURL : nuxtConfig.axios.baseURL

let apiService = {
    test(){
        return new Promise((resolve, reject) => {
            axios.get(path + `/test`, {

            }).then((value => {
                let datas = value['data']

                resolve(datas)
            }))
        })
    }
}

export default apiService



