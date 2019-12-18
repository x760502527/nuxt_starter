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
                    油气管道入侵防护和泄露监测平台
                </div>
                <div class="goto">
                    <a href="http://114.115.141.215:7777/HAGFrame/index">前往后台管理系统>></a>
                </div>
            </v-col>
        </v-row>
        <!--content-->
        <v-row style="height: calc(100% - 40px);position: relative;top:40px;" no-gutters>
            <v-col style="flex: 0 0 20.1%;max-width: 20.1%;">
                <!-- left -->
                <v-row style="height:50%" no-gutters class="block">
                    <v-col lg="12" cols="12" class="top-left">
                        <!-- top left -->
                        <v-row class="block-title">
                            <v-col>
                                <span>
                                今日报警
                                </span>
                                <img class="nav-left-arrow" src="/images/nav-left-arrow.png" alt="">
                            </v-col>
                        </v-row>
                        <v-row class="block-container">
                            <v-col>
                                <alarm-today-chart :data="alarmTodayData"/>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row style="height:50%" no-gutters class="block">
                    <v-col lg="12" cols="12" class="bottom-left">
                        <!-- bottom left -->
                        <v-row class="block-title" style="padding:10px;">
                            <v-col>
                                <span>
                                    监测状态
                                </span>
                                <img class="nav-left-arrow" src="/images/nav-left-arrow.png" alt=""></v-col>
                        </v-row>
                        <v-row no-gutters class="block-container"
                               style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom: 2px;">
                            <v-col>
                                <monitoring-state-table :data="monitoringStateData"></monitoring-state-table>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-col>
            <v-col style="height: 100%;position: relative;flex: 0 0 59.8%;max-width: 59.8%;overflow: hidden;">
                <!-- center -->
                <div class="map">
                    <global-map></global-map>
                </div>
                <div class="platformMenu">
                    <platform-menu></platform-menu>
                </div>
                <div class="functionMenu">
                    <function-menu></function-menu>
                </div>
                <div class="lineChart" style="display: none">
                    <data-chart></data-chart>
                </div>
            </v-col>
            <v-col style="flex: 0 0 20.1%;max-width: 20.1%;">
                <!-- right -->
                <v-row v-show="right" style="height:50%" no-gutters class="block">
                    <v-col lg="12" cols="12" class="top-right">
                        <!-- top right -->
                        <v-row class="block-title">
                            <v-col>
                                <span>
                                    报警总数分布
                                </span>
                                <img class="nav-left-arrow" src="/images/nav-left-arrow.png" alt="">
                            </v-col>
                        </v-row>
                        <v-row class="block-container">
                            <v-col>
                                <alarm-sum-chart :data="alarmSumData"></alarm-sum-chart>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row v-show="right" style="height:50%" no-gutters class="block">
                    <v-col lg="12" cols="12" class="bottom-right">
                        <!-- bottom right -->
                        <v-row class="block-title">
                            <v-col>
                                <span>
                                    设备在线率
                                </span>
                                <img class="nav-left-arrow" src="/images/nav-left-arrow.png" alt=""></v-col>
                        </v-row>
                        <v-row class="block-container">
                            <v-col>
                                <equipment-online-chart :data="equipmentOnlineData"></equipment-online-chart>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row v-show="!right" style="height:100%;" no-gutters class="block">
                    <v-col lg="12" cols="12" class="right">
                        <!-- bottom left -->
                        <v-row class="block-title" style="padding:10px;">
                            <v-col>
                                <span>
                                    报警列表
                                </span>
                                <img class="nav-left-arrow" src="/images/nav-left-arrow.png" alt=""></v-col>
                        </v-row>
                        <v-row no-gutters class="block-container"
                               style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom: 2px;">
                            <v-col>
                                <alarm-table></alarm-table>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
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
    import apiService from "../services/apiService"

    export default {
        async asyncData({$axios, callback}) {

        },
        async mounted() {
            await Promise.all([this.getAlarmToday(),this.listAlarmByDeptCount()])
        },
        methods: {
            async getAlarmToday(){
                const data =await apiService.alarmToday()
                let alarmTodayData = [['定温',data['contantTemperatureCount']],
                    ['温速',data['temperatureSpeedCount']],
                    ['温差',data['temperatureDifferenceCount']],
                    ['振动',data['shockCount']],
                    ['断纤',data['brokenOpticalFiberCount']],
                    ['应变',data['strainCount']],]
                this.alarmTodayData = alarmTodayData
            },
            async listAlarmByDeptCount(){
                const datas =await apiService.listAlarmByDeptCount()
                let arr = []
                for(let item of datas){
                    let arr1 = []
                    arr1.push(item['DEPT_NAME'])
                    arr1.push(parseInt(item['strain']))
                    arr1.push(parseInt(item['temperature']))
                    arr1.push(parseInt(item['vibration']))
                    arr.push(arr1)
                }
                this.alarmSumData  = arr
            },
        },

        watch: {},
        data() {
            return {
                alarmTodayData:undefined,
                targetPopup:undefined,
                alarmSumData:undefined,
                equipmentOnlineData:undefined,
                monitoringStateData:undefined,
                right:true
            }
        },
        computed: {},
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
        background: url("~assets/images/top-left.png");
        background-size: 100% 100%;
    }

    .top-right {
        background: url("~assets/images/top-right.png");
        background-size: 100% 100%;
    }

    .bottom-left {
        background: url("~assets/images/bottom-left.png");
        background-size: 100% 100%;
    }

    .bottom-right {
        background: url("~assets/images/bottom-right.png");
        background-size: 100% 100%;
    }

    .right{
        background: url("~assets/images/bottom-right.png");
        background-size: 100% 100%;
    }

    .block-title {
        font-size: 16px;
        padding: 10px 10px;
        height: $title_height;
    }

    .block-container {
        padding: 10px;
        height: calc(100% - #{$title_height});
    }

    .nav-left-arrow {
        position: relative;
        top: 5px;
    }

    .lineChart{
        position: absolute;
        bottom: 0px;
        width: 100%;
        height: 25%;
    }
    .goto{
        position: absolute;
        top: 0px;
        right: 20px;
        font-size: 14px;
        cursor: pointer;
    }
    .goto a{
        &:hover{
            color:rgb(255,255,128)

        }
    }

</style>
<style lang="scss">
    html {
        overflow: auto;
        min-height: 932px;
        min-width: 1879px;
    }
</style>
