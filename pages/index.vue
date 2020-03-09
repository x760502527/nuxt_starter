<template>
    <v-container fluid
                 class="container">
        <!-- title -->
        <v-row class="title" style="height: 60px;position: absolute" no-gutters>
            <v-col lg="12" cols="12">
                <iframe style="position: absolute;left:10px;" allowtransparency="true" frameborder="0" width="180"
                        height="30" scrolling="no"
                        src="//tianqi.2345.com/plugin/widget/index.htm?s=3&amp;z=2&amp;t=0&amp;v=0&amp;d=3&amp;bd=0&amp;k=&amp;f=ffff80&amp;ltf=009944&amp;htf=cc0000&amp;q=1&amp;e=1&amp;a=1&amp;c=54511&amp;w=180&amp;h=30&amp;align=center"></iframe>
                <div style="display: flex;justify-content: center;align-items: center;height: 100%">
                    <img src="~assets/images/logo_blue.png" alt="">
                    管道监测生产系统
                </div>
                <div class="goto">
                    <!-- <a href="http://192.168.10.52:8083/WebFrames">前往后台管理系统>></a> -->
                    <a href="http://192.168.10.147:8080/WebFrames/index">前往后台管理系统>></a>
                </div>
            </v-col>
        </v-row>
        <!--content-->
        <v-row style="height: calc(100% - 40px);position: relative;top:40px;" no-gutters>
            <v-col style="flex: 0 0 18%;max-width: 18%;">
                <!-- left -->
                <v-row style="height:50%" no-gutters class="block">
                    <v-col lg="12" cols="12" class="top-left">
                        <!-- top left -->
                        <v-row class="block-title"  no-gutters>
                            <v-col>
                                <span>
                                    {{leftTopTitle}}
                                </span>
                                <img class="nav-left-arrow" src="/images/nav-left-arrow.png" alt="">
                            </v-col>
                        </v-row>
                        <v-row class="block-container"  no-gutters>
                            <v-col>
                                <component :is="leftTopComponent" :data="leftTopData"></component>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row style="height:50%" no-gutters class="block">
                    <v-col lg="12" cols="12" class="bottom-left">
                        <!-- bottom left -->
                        <v-row class="block-title"  no-gutters>
                            <v-col>
                                <span>
                                     {{leftBottomTitle}}
                                </span>
                                <img class="nav-left-arrow" src="/images/nav-left-arrow.png" alt=""></v-col>
                        </v-row>
                        <v-row no-gutters class="block-container">
                            <v-col>
                                <component :is="leftBottomComponent" :data="leftBottomData"></component>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-col>
            <v-col style="height: 100%;position: relative;flex: 0 0 64%;max-width: 64%;overflow: hidden;">
                <!-- center -->
                <div class="map">
                    <global-map ref="map" :realTimePipelines="realTimePipelines" :realTimeAlarms="realTimeAlarms"></global-map>
                </div>
                <div class="platformMenu" v-show="center">
                    <platform-menu></platform-menu>
                </div>
                <div class="functionMenu">
                    <function-menu v-on:search="search" v-on:setMapCenter="setMapCenter"></function-menu>
                </div>
                <div class="lineChart" v-show="!center">
                    <component :is="centerComponent" :data="centerData" :unit="searchUnit" :xName="xName"
                               :loading="dataChartLoading" :time="centerDataTime"></component>
                    <!--                    <data-chart :data="centerData" :unit="searchUnit" :xName="xName" :loading="dataChartLoading"></data-chart>-->
                </div>
            </v-col>
            <v-col style="flex: 0 0 18%;max-width: 18%;">
                <!-- right -->
                <v-row v-show="right" style="height:50%" no-gutters class="block">
                    <v-col lg="12" cols="12" class="top-right">
                        <!-- top right -->
                        <v-row  no-gutters class="block-title">
                            <v-col>
                                <span>
                                    {{rightTopTitle}}
                                </span>
                                <img class="nav-left-arrow" src="/images/nav-left-arrow.png" alt="">
                            </v-col>
                        </v-row>
                        <v-row  no-gutters class="block-container">
                            <v-col>
                                <component :is="rightTopComponent" :data="rightTopData"></component>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row v-show="right" style="height:50%" no-gutters class="block">
                    <v-col lg="12" cols="12" class="bottom-right">
                        <!-- bottom right -->
                        <v-row  no-gutters class="block-title">
                            <v-col>
                                <span>
                                    {{rightBottomTitle}}
                                </span>
                                <img class="nav-left-arrow" src="/images/nav-left-arrow.png" alt=""></v-col>
                        </v-row>
                        <v-row no-gutters class="block-container">
                            <v-col>
                                <component :is="rightBottomComponent" :data="rightBottomData"></component>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row v-show="!right" style="height:100%;" no-gutters class="block">
                    <v-col lg="12" cols="12" class="right">
                        <!-- right -->
                        <v-row  no-gutters class="block-title">
                            <v-col>
                                <span>
                                    报警列表
                                </span>
                                <img class="nav-left-arrow" src="/images/nav-left-arrow.png" alt=""></v-col>
                        </v-row>
                        <v-row no-gutters class="block-container">
                            <v-col>
                                <alarm-table :data="rightData"></alarm-table>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
    import moment from 'moment'
    import AlarmTodayChart from '../components/alarm/AlarmTodayChart.vue'
    import AlarmTable from '../components/alarm/AlarmTable.vue'
    import AlarmSumChart from '../components/alarm/AlarmSumChart.vue'
    import EquipmentOnlineChart from '../components/data/EquipmentOnlineChart.vue'
    import MonitoringStateTable from '../components/data/MonitoringStateTable.vue'
    import GlobalMap from '../components/map/GlobalMap.vue'
    import FunctionMenu from '../components/menu/FunctionMenu.vue'
    import PlatformMenu from '../components/menu/PlatformMenu.vue'
    import LayerPopup from '../components/popup/LayerPopup.vue'
    import SearchPopup from '../components/popup/SearchPopup.vue'
    import TargetPopup from '../components/popup/TargetPopup.vue'
    import DataChart from "../components/data/dataChart";
    import RealTimeDataChart from "../components/data/RealTimeDataChart";
    import ATable from "../components/a/ATable";
    import EquipmentInfo from "../components/info/EquipmentInfo";
    import EquipmentImg from "../components/info/EquipmentImg";
    import PipelineInfo from "../components/info/PipelineInfo";
    import EquipmentsState from "../components/info/EquipmentsState";
    import EquipmentRate from "../components/info/EquipmentRate";
    import apiService from "../services/apiService"
    import {mapState} from 'vuex'

    export default {
        async asyncData({$axios, callback}) {

        },
        async mounted() {
            await this.homeDatas()
        },
        methods: {
            async changePipeline() {
                if (this.cType != 'pipeline') {
                    this.leftTopTitle = '管道信息'
                    this.leftTopComponent = 'pipeline-info'
                    this.leftBottomTitle = '设备列表'
                    this.leftBottomComponent = 'equipments-state'
                    this.rightTopTitle = '今日报警'
                    this.rightTopComponent = 'alarm-today-chart'
                    this.rightBottomTitle = '报警列表'
                    this.rightBottomComponent = 'alarm-table'
                    this.centerComponent = 'real-time-data-chart'
                    this.leftTopData = undefined
                    this.leftBottomData = undefined
                    this.rightTopData = undefined
                    this.rightBottomData = undefined
                    this.centerData = undefined
                    this.center = false
                    this.right = true
                    this.cType = 'pipeline'
                    this.ppDatas()
                }else{
                    this.ppData()
                }
                // await Promise.all([this.getPipelineInfo(this.target), this.getEqiupments(this.target), this.getAlarmTodayByPP(this.target), this.getAlarmById(this.target), this.getRealTimeDataPP(this.target)])
            },
            async ppDatas() {
                this.ppData()
                setTimeout(() => {
                    if (this.cType == 'pipeline') {
                        this.ppDatas()
                    }
                }, 10000)
            },
            async ppData() {
                await Promise.all([this.getPipelineInfo(this.target), this.getEqiupments(this.target), this.getAlarmTodayByPP(this.target), this.getAlarmById(this.target), this.getRealTimeDataPP(this.target)])
            },
            async changeEquipment() {
                if (this.cType != 'equipment') {
                    this.leftTopTitle = '设备信息'
                    this.leftTopComponent = 'equipment-info'
                    // this.leftBottomTitle = '设备使用率'
                    this.leftBottomTitle = ''
                    this.leftBottomComponent = 'equipment-img'
                    this.rightTopTitle = '今日报警'
                    this.rightTopComponent = 'alarm-today-chart'
                    this.rightBottomTitle = '报警列表'
                    this.rightBottomComponent = 'alarm-table'
                    this.centerComponent = 'real-time-data-chart'
                    this.leftTopData = undefined
                    this.leftBottomData = undefined
                    this.rightTopData = undefined
                    this.rightBottomData = undefined
                    this.centerData = undefined
                    this.center = false
                    this.right = true
                    this.cType = 'equipment'
                    this.eqDatas()
                }else{
                    this.eqData()
                }
                // await Promise.all([this.getEqiupmentInfo(this.target), this.getEqiupmentRate(this.target), this.getAlarmTodayByEQ(this.target), this.getAlarmByEQId(this.target), this.getRealTimeDataEQ(this.target)])
            },
            async eqDatas() {
                this.eqData()
                setTimeout(() => {
                    if (this.cType == 'equipment') {
                        this.eqDatas()
                    }
                }, 10000)
            },
            async eqData() {
                await Promise.all([this.getEqiupmentInfo(this.target)/*, this.getEqiupmentRate(this.target)*/, this.getAlarmTodayByEQ(this.target), this.getAlarmByEQId(this.target), this.getRealTimeDataEQ(this.target)])
            },
            async changeHome() {
                if (this.cType != 'home') {
                    this.leftTopTitle = '今日报警'
                    this.leftBottomTitle = '监测状态'
                    this.rightTopTitle = '报警总数分布'
                    this.rightBottomTitle = '设备在线率'
                    this.leftTopComponent = 'alarm-today-chart'
                    this.leftBottomComponent = 'monitoring-state-table'
                    this.rightTopComponent = 'alarm-sum-chart'
                    this.rightBottomComponent = 'equipment-online-chart'
                    this.leftTopData = undefined
                    this.leftBottomData = undefined
                    this.rightTopData = undefined
                    this.rightBottomData = undefined
                    this.center = true
                    this.right = true
                    this.cType = 'home'
                    this.homeDatas()
                }else{
                    this.homeData()
                }
            },
            async homeDatas() {
                this.homeData()
                setTimeout(() => {
                    if (this.cType == 'home') {
                        this.homeDatas()
                    }
                }, 10000)
            },
            async homeData() {
                await Promise.all([this.getAlarmToday(), this.listAlarmByDeptCount(), this.getPipelinesMonitor(), this.getEquipmentOnlineRate(), this.getRealTimeData(), this.getRealTimeAlarm()])
            },
            setMapCenter(){
                this.$refs['map'].setMapCenter()
            },
            async getRealTimeDataPP(target) {
                this.dataChartLoading = true
                const {data} = await apiService.getRealTimeData({
                    pipelineId: target['id'],
                    dataType: '01080101',
                    intervalValue: 20,
                    returnType: '1'
                })
                this.dataChartLoading = false
                let ob = {
                    data: data['datasValue'],
                    xData: data['datasPipelineLocation']
                }
                let m = moment(data['dataTime']).format('YYYY-MM-DD HH:mm:ss')
                this.centerData = ob
                this.centerDataTime = m

            },
            async getRealTimeDataEQ(target) {
                this.dataChartLoading = true
                let {data} = await apiService.getRealTimeData({
                    equipmentId: target['id'],
                    dataType: '01080101',
                    intervalValue: 20,
                    returnType: '1'
                })
                data = data || {}
                this.dataChartLoading = false
                let ob = {
                    data: data['datasValue'],
                    xData: data['datasPipelineLocation']
                }
                let m = moment(data['dataTime']).format('YYYY-MM-DD HH:mm:ss')
                this.centerData = ob
                this.centerDataTime = m

            },
            async getAlarmById(param) {
                const data = await apiService.getAlarmById({PP_ID: param['id']})
                this.rightBottomData = data['rows']
            },
            async getAlarmByEQId(param) {
                const data = await apiService.getAlarmById({EQ_ID: param['id']})
                this.rightBottomData = data['rows']
            },
            async getEqiupmentRate(param) {
                const {data} = await apiService.usage(param['id'])
                this.leftBottomData = data
            },
            async getEqiupments(param) {
                const {data} = await apiService.getEqiupments({ppId: param['id']})
                this.leftBottomData = data
            },
            async getPipelineInfo(param) {
                const data = await apiService.getPipelineInfo({}, param['id'])
                let pipeline = data[0]
                this.leftTopData = pipeline
            },
            async getEqiupmentInfo(param) {
                const {data} = await apiService.getEqiupmentInfo({}, param['id'])
                console.log(data)
                this.leftTopData = data
                this.leftBottomData = data['EQ_SUB_TYPE_NAME']
            },
            async getAlarmTodayByPP(param) {
                const {data} = await apiService.pipelineAlarmsToday({pipelineId: param['id']})
                let alarmTodayData = [['定温', data['contantTemperatureCount']],
                    ['温速', data['temperatureSpeedCount']],
                    ['温差', data['temperatureDifferenceCount']],
                    ['振动', data['shockCount']],
                    ['断纤', data['brokenOpticalFiberCount']],
                    ['应变', data['strainCount']]]
                this.rightTopData = alarmTodayData
            },
            async getAlarmTodayByEQ(param) {
                const {data} = await apiService.equipmentAlarmsToday({EQ_ID: param['id']})
                let alarmTodayData = [['定温', data['contantTemperatureCount']],
                    ['温速', data['temperatureSpeedCount']],
                    ['温差', data['temperatureDifferenceCount']],
                    ['振动', data['shockCount']],
                    ['断纤', data['brokenOpticalFiberCount']],
                    ['应变', data['strainCount']]]
                this.rightTopData = alarmTodayData
            },
            async getAlarmToday(param) {
                const data = await apiService.alarmToday(param)
                let alarmTodayData = [['定温', data['contantTemperatureCount']],
                    ['温速', data['temperatureSpeedCount']],
                    ['温差', data['temperatureDifferenceCount']],
                    ['振动', data['shockCount']],
                    ['断纤', data['brokenOpticalFiberCount']],
                    ['应变', data['strainCount']]]
                if (param) {
                    this.rightTopData = alarmTodayData
                } else {
                    this.leftTopData = alarmTodayData
                }
            },
            async getRealTimeAlarm() {
                const data = await apiService.getRealTimeAlarm()
                this.realTimeAlarms = data
            },
            async getRealTimeData() {
                const {data} = await apiService.getRealTimeData({
                    dataType: '01080101',
                    intervalValue: 20,
                    returnType: '2'
                })
                let arr = []
                for (let item of data) {
                    let ob = {}
                    let positions = item['latLong']
                    let arr2 = positions.reduce(function (a, b) {
                        return a.concat(b)
                    });
                    ob.positions = arr2
                    ob.colors = item['colors']
                    ob.id = item['id'],
                        arr.push(ob)
                }
                this.realTimePipelines = arr
            },
            async listAlarmByDeptCount(param) {
                const datas = await apiService.listAlarmByDeptCount(param)
                let arr = []
                for (let item of datas) {
                    let arr1 = []
                    arr1.push(item['deptName'])
                    arr1.push(parseInt(item['temperatureCount']))
                    arr1.push(parseInt(item['vibrationCount']))
                    arr1.push(parseInt(item['strainCount']))
                    arr.push(arr1)
                }
                this.rightTopData = arr
            },
            async getPipelinesMonitor(param) {
                const datas = await apiService.getPipelines(param)
                let arr = []
                for (let item of datas['rows']) {
                    let ob = {}
                    ob['name'] = item['PP_NAME']
                    ob['id'] = item['PP_ID']
                    ob['type'] = 'pipeline'
                    ob['state'] = item['alarmStateName']
                    arr.push(ob)
                }
                this.leftBottomData = arr
            },
            async getEquipmentOnlineRate(param) {
                const datas1 = await apiService.getEquipmentOnlineRate(param)
                let {data, xData} = datas1.data
                let arr = []
                for (let i = 0; i < data.length; i++) {
                    let arr1 = []
                    let dataItem = data[i]
                    let xDataItem = xData[i]
                    arr1.push(xDataItem)
                    arr1.push(dataItem)
                    arr1.push(100)
                    arr.push(arr1)
                }
                this.rightBottomData = arr
            },
            async search(ob) {
                let {type, level, target, targetType, startTime, endTime, startLocation, endLocation} = ob

                startTime = moment(startTime).valueOf()
                endTime = moment(endTime).valueOf()
                if (type == '报警') {
                    this.right = false

                    let search = {
                        startTime,
                        endTime,
                        alarmType: level,
                        // startLoc,
                        // endLoc
                        startLocation,
                        endLocation
                    }
                    if (targetType == '管道') {
                        // search['PP_ID'] = target
                        search['pipelineId'] = target
                    } else {
                        // search['EQ_ID'] = target
                        search['equipmentId'] = target
                    }
                    const datas = await apiService.getAlarms(search)
                    // let alarms = datas['rows']
                    let alarms = datas['data']
                    let alarmsT = alarms.map((alarm) => {
                        // let typeName = alarm['typeName']
                        // let name = alarm['name']
                        // let ppLoc = alarm['ppLoc']
                        // let endTime = moment(alarm['endTime']).format('YYYY-MM-DD HH:mm:ss')
                        // let alarmStateName = alarm['alarmStateName']
                        let typeName = alarm['typeName']
                        let levelName = alarm['levelName']
                        let ppLoc = alarm['pipelineLocation']
                        let endTime = moment(alarm['alarmTime']).format('YYYY-MM-DD HH:mm:ss')
                        let alarmStateName = alarm['alarmStateName']
                        let ob = {
                            type: typeName + levelName,
                            ppLoc: ppLoc,
                            state: alarmStateName,
                            time: endTime
                        }
                        return ob
                    })
                    this.rightData = alarmsT

                } else if (type == '数据') {
                    let params = {
                        startTime,
                        endTime,
                        code: level,
                        // startLoc,
                        // endLoc
                        startLocation,
                        endLocation
                    }
                    if (targetType == '管道') {
                        params['pipelineId'] = target
                    } else {
                        params['equipmentId'] = target
                    }
                    this.centerComponent = 'data-chart'
                    this.center = false
                    if (level == '010602') {
                        this.searchUnit = '振幅'
                        this.xName = '振动'
                    } else if (level == '010601') {
                        this.searchUnit = '℃'
                        this.xName = '温度'
                    } else if (level == '010603') {
                        this.searchUnit = 'με'
                        this.xName = '应变'
                    }
                    this.dataChartLoading = true
                    let {data} = await apiService.getDatas(params)
                    this.centerData = data
                    this.dataChartLoading = false
                }


            }
        },
        data() {
            return {
                cType: 'home',
                dataChartLoading: false,
                searchUnit: undefined,
                xName: undefined,
                alarmTodayData: undefined,
                targetPopup: undefined,
                alarmSumData: undefined,
                equipmentOnlineData: undefined,
                monitoringStateData: undefined,
                centerData: undefined,
                right: true,
                center: true,
                leftTopTitle: '今日报警',
                leftBottomTitle: '监测状态',
                rightTopTitle: '报警总数分布',
                rightBottomTitle: '设备在线率',
                leftTopComponent: 'alarm-today-chart',
                leftBottomComponent: 'monitoring-state-table',
                rightTopComponent: 'alarm-sum-chart',
                rightBottomComponent: 'equipment-online-chart',
                centerComponent: 'data-chart',
                leftTopData: undefined,
                leftBottomData: undefined,
                rightTopData: undefined,
                rightBottomData: undefined,
                realTimePipelines: [],
                realTimeAlarms: [],
                rightData: [],
                centerDataTime: undefined,
                loadingData: false
            }
        },
        watch: {
            target() {
                if (this.target) {
                    let type = this.target['type']
                    if (type == 'equipment') {
                        this.changeEquipment()
                    } else if (type == 'pipeline') {
                        this.changePipeline()
                    }
                } else {
                    this.changeHome()
                }
            }
        },
        computed: {
            ...mapState([
                'target'
            ])
        },
        components: {
            DataChart,
            AlarmTodayChart,
            AlarmTable,
            AlarmSumChart,
            EquipmentOnlineChart,
            MonitoringStateTable,
            GlobalMap,
            FunctionMenu,
            PlatformMenu,
            LayerPopup,
            SearchPopup,
            TargetPopup,
            ATable,
            EquipmentInfo,
            PipelineInfo,
            EquipmentsState,
            EquipmentRate,
            RealTimeDataChart,
            EquipmentImg
        }
    }
</script>
<style lang="scss" scoped>
    $title_height: 50px;
    .container {
        background: url("~assets/images/background.png");
        background-size: 100% 100%;
        height: 100%;
        padding: 0px;
        overflow: hidden;
        min-height: 768px;

    }

    .title {
        z-index: 999;
        width: 100%;
        text-align: center;
        background: url("/images/top_01.png");
        background-size: 100% 100%;
    }

    .platformMenu {
        position: absolute;
        bottom: 10px;
    }

    .functionMenu {
        position: absolute;
        top: 20px;
        left: 20px;
    }

    .map {
        height: 100%;
    }

    .block {
        padding: 10px;
    }

    .top-left {
        background: url("~assets/images/backgroud.png");
        background-size: 100% 100%;
    }

    .top-right {
        background: url("~assets/images/backgroud.png");
        background-size: 100% 100%;
    }

    .bottom-left {
        background: url("~assets/images/backgroud.png");
        background-size: 100% 100%;
    }

    .bottom-right {
        background: url("~assets/images/backgroud.png");
        background-size: 100% 100%;
    }

    .right {
        background: url("~assets/images/right.png");
        background-size: 100% 100%;
    }

    .block-title {
        font-size: 16px;
        padding: 15px 10px;
        height: $title_height;
        border-bottom: 1px solid rgb(16,75,129);
    }

    .block-container {
        height: calc(100% - #{$title_height});
    }

    .nav-left-arrow {
        position: relative;
        top: 5px;
    }

    .lineChart {
        position: absolute;
        bottom: 15px;
        width: 100%;
        height: 25%;
    }

    .goto {
        position: absolute;
        top: 0px;
        right: 20px;
        font-size: 14px;
        cursor: pointer;
    }

    .goto a {
        &:hover {
            color: rgb(255, 255, 128)

        }
    }

</style>
<style lang="scss">
    html {
        overflow: auto;
        min-height: 768px;
        min-width: 1366px;
        font-size: 16px !important;
    }

    .list {
        /*padding-left:0!important;*/
    }
    .v-application ul{
        padding-left: 0px;
    }
    .v-icon.v-icon {
        font-size: 18px!important;
    }
</style>
