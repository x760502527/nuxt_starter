import colors from 'vuetify/es5/util/colors'
import zhHans from 'vuetify/es5/locale/zh-Hans'
const env = require('./env')

let NODE_ENV = process.env.NODE_ENV
let NODE_HTTP = env[process.env.MODE]['NODE_HTTP']|| "http://127.0.0.1:8080"

let BASE_PATH = ''
if (NODE_ENV === 'generate') {
    BASE_PATH = "./"
}

export default {
    mode: 'universal',
    env: env[process.env.MODE],
    /* 'process.env' is environment variable */
    /*
    ** Headers of the page
    */
    head: {
        /*titleTemplate: '%s - ' + process.env.npm_package_name,*/
        titleTemplate: '%s',
        title: "油气运销部管道动态监测管理系统"/* process.env.npm_package_name || ''*/,
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/images/logn_icon.ico'}
        ],
        script:[{
            src:'/banner/js/swiper.animate1.0.2.min.js',
        },{
            src:'/banner/js/idangerous.swiper2.7.6.min.js'
        }]
    },

    server: {host: "0.0.0.0", port: 3000},
    /*
    ** Customize the progress-bar color
    */
    loading: {color: '#fff'},
    /*
    ** Global CSS
    */
    css: [
        '@/assets/css/index.scss',
        'vue-cesium/lib/vc-navigation.css',
        '@mdi/font/css/materialdesignicons.css',
        'vuetify/dist/vuetify.css',
        'material-design-icons-iconfont/dist/material-design-icons.css',
        'view-design/dist/styles/iview.css',
        'element-ui/lib/theme-chalk/index.css'
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        {src: '@/plugins/global', ssr: false},
        {src: '@/plugins/vcharts', ssr: false},
        {src: '@/plugins/moment', ssr: false},
        {src: '@/plugins/cesium', ssr: false},
        {src: '@/plugins/themeUtil', ssr: true},
        {src: '@/plugins/axios', ssr: true},
        {src: '@/plugins/iview', ssr: false},
        {src: '@/plugins/ElementUI', ssr: true},
    ],
    /*
    ** Nuxt.js dev-modules
    */
    devModules: [
        '@nuxtjs/vuetify',
    ],
    /*
    ** Nuxt.js modules
    */
    modules: ['@nuxtjs/axios'],
    axios: {
        proxy: true, // Can be also an object with default options
        baseURL:'http://127.0.0.1:8080'
    },
    proxy: {
        '/api/': {target: 'http://192.168.10.147:8080', pathRewrite: {'^/api/': ''}},
        '/api1/': {target: NODE_HTTP, pathRewrite: {'^/api1/': ''}},
        '/api2/': {target: 'http://192.168.10.147:8080/bigScreen', pathRewrite: {'^/api2/': ''}},
    },
    /*
    ** vuetify module configuration
    ** https://github.com/nuxt-community/vuetify-module
    */
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        lang: {
            locales: {zhHans},
            current: 'zhHans',
        },
        theme: {
            options: {
                customProperties: true,
            },
            dark: true,
            themes: {
                dark: {
                    primary: '#2A8CEF',
                    accent: '#666',
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3
                },
                light: {
                    primary: '#2A8CEF',
                    accent: '#666',
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3
                }
            }
        }
    },
    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        transpile: ['vue-echarts', 'resize-detector'],
        vendor: ['element-ui']
    },
    router: {
        base: BASE_PATH,
        middleware: 'auth'
    }
}
