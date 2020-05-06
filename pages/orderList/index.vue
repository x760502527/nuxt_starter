<template>
    <div class="alarmList dxcr_index">
        <div class="index_bg"></div>
        <div class="login_title">
            管道动态监测
        </div>
        <!--<div class="pipeline_list">
            <div class="pipeline">131</div>
        </div>-->
        <div style="padding:5px 60px 20px 60px;height: 100px;position: absolute;width: calc(100% - 120px);top: 0;">
            <div style="float:left">
<!--                <iframe v-if="weatherShow" id="iframe1" allowtransparency="true" frameborder="0" width="180"-->
<!--                        height="36" scrolling="no"-->
<!--                        src="//tianqi.2345.com/plugin/widget/index.htm?s=3&z=2&t=0&v=0&d=3&bd=0&k=000000&f=ffffff&ltf=ffffff&htf=ffffff&q=1&e=1&a=0&c=61073&w=180&h=36&align=center"></iframe>-->
<!--                <img @load="w2" style="display: none;" alt="2345天气预报" :src="testImg">-->
                <!--<iframe style="position: absolute;left:10px;" allowtransparency="true" frameborder="0" width="180"
                        height="30" scrolling="no"
                        src="//tianqi.2345.com/plugin/widget/index.htm?s=3&amp;z=2&amp;t=0&amp;v=0&amp;d=3&amp;bd=0&amp;k=&amp;f=ffffff&amp;ltf=ffffff&amp;htf=ffffff&amp;q=1&amp;e=1&amp;a=1&amp;c=54511&amp;w=180&amp;h=30&amp;align=center"></iframe>-->
            </div>
        </div>
        <div style="height: calc(100% - 100px);width: 100%;margin-top:100px;padding:20px;position: relative;">
            <div class="dxcr_list">
                <div class="dxcr_container">
                    <div class="list_title">工单历史</div>
                    <div class="handle-box">
                        <div class="dxcr_op">
                            <span class="dxcr_label">开始时间： </span>
                            <el-date-picker
                                    v-model="startTimeValue"
                                    class="dxcr_input"
                                    size="small"
                                    type="datetimerange"
                                    range-separator="-"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    format="yyyy-MM-dd HH:mm:ss">
                            </el-date-picker>
                        </div>
                        <div class="dxcr_op">
                            <span class="dxcr_label">报警类别： </span>
                            <el-select class="dxcr_input"  v-model="alarmTypeValue" size="small" placeholder="请选择">
                                <el-option
                                        v-for="item in alarmType"
                                        :label="item.label"
                                        :key="item.value"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="dxcr_op">
                            <span class="dxcr_label">报警等级： </span>
                            <el-select class="dxcr_input" v-model="levelCodeValue" size="small" placeholder="请选择">
                                <el-option
                                        v-for="item in levelCode"
                                        :label="item.label"
                                        :key="item.value"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="dxcr_op">
                            <span class="dxcr_label">报警状态： </span>
                            <el-select class="dxcr_input" v-model="stateCodeValue" size="small" placeholder="请选择">
                                <el-option
                                        v-for="item in stateCode"
                                        :label="item.label"
                                        :key="item.value"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                       <!-- <div class="dxcr_op">
                            <span class="dxcr_label">处理状态： </span>
                            <el-select class="dxcr_input" v-model="alarmStateValue" size="small" placeholder="请选择">
                                <el-option
                                        v-for="item in alarmState"
                                        :label="item.label"
                                        :key="item.value"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>-->
                        <div class="dxcr_op">
                            <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                        </div>
                    </div>
                    <el-table
                            :data="tableDataR"
                            class="table"
                    >
                        <el-table-column prop="no" label="序号" width="60">
                            <template slot-scope="scope">
                                <span>{{scope.$index + (query.pageIndex -1 ) * query.pageSize + 1}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="pipelineName" label="管道名称"></el-table-column>

                        <el-table-column prop="typeName" label="报警类型名称"></el-table-column>
                        <el-table-column prop="alarmStateName" label="报警状态名称"></el-table-column>
                        <el-table-column prop="levelName" label="报警等级"></el-table-column>
                        <el-table-column prop="pipelineLocation" align="right" label="报警位置"></el-table-column>
                        <el-table-column prop="alarmLocationDesc" width="180" label="报警定位"></el-table-column>
                        <el-table-column prop="alarmValue" align="right" label="报警值"></el-table-column>
                        <el-table-column prop="disposeStatus" label="处理状态"></el-table-column>
                        <el-table-column prop="datetime" label="报警时间" width="160"></el-table-column>
                        <el-table-column prop="dealBy" label="处理人"></el-table-column>
                        <el-table-column prop="dealType" label="处理方式"></el-table-column>
                        <el-table-column prop="dealTime" :formatter="dateFormat" label="处理时间" width="160"
                                         align="center"></el-table-column>
                        <el-table-column prop="dealRemark"  width="220" label="备注" align="center"></el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination
                                background
                                layout="total, prev, pager, next"
                                :current-page="query.pageIndex"
                                :page-size="query.pageSize"
                                :total="total"
                                @current-change="handlePageChange"
                        ></el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {fetchData} from '@/services/fetchData';
    import apiService from "../../services/apiService";
    import moment from 'moment'

    export default {
        name: 'alarmList',
        data() {
            return {
                weatherShow: true,
                query: {
                    pageIndex: 1,
                    pageSize: 10
                },
                alarmType: [{
                    value: '',
                    label: '全部'
                }, {
                    value: 'xl',
                    label: '泄漏'
                }, {
                    value: 'dsfph',
                    label: '第三方破坏'
                }, {
                    value: 'dx',
                    label: '断纤'
                }],
                levelCode: [{
                    value: '',
                    label: '全部'
                }, {
                    value: 'L1',
                    label: '一级'
                }, {
                    value: 'L2',
                    label: '二级'
                }, {
                    value: 'L3',
                    label: '三级'
                }],
                stateCode: [{
                    value: '',
                    label: '全部'
                }/*, {
                    value: 'yx',
                    label: '预警'
                }*/, {
                    value: 'wb',
                    label: '正常'
                }, {
                    value: 'shg',
                    label: '报警'
                }],
                alarmState: [{
                    value: '',
                    label: '全部'
                }, {
                    value: 'bjzt02',
                    label: '未处理'
                }, {
                    value: 'bjzt01',
                    label: '已处理'
                }],
                alarmTypeValue: "",
                levelCodeValue: "",
                stateCodeValue: "",
                alarmStateValue: "",
                startTimeValue: [moment().subtract(1, 'M').valueOf(),moment().valueOf()],
                endTimeValue:  moment().valueOf(),
                tableData: [],
                tableDataR: [],
                total: 0
            };
        },
        computed: {
            testImg() {
                return 'http://tianqi.2345.com/theme2/img/logo160722.png?' + moment().valueOf()
            },
        },
        async asyncData({$axios, callback}) {

        },
        mounted() {
            this.getData();
        },
        methods: {
            w2() {
                this.weatherShow = true
            },
            search(){
                this.$set(this.query, 'pageIndex', 1);
                this.getData()
            },
            async getData() {
                let startTimeStr;
                let endTimeStr;
                if(this.startTimeValue){
                    startTimeStr = moment(this.startTimeValue[0]).valueOf();
                    endTimeStr =  moment(this.startTimeValue[1]).valueOf();
                }
                /*if (!startTimeStr) {
                    startTimeStr = new Date().getTime();
                }
                if (!endTimeStr){
                    endTimeStr = new Date().getTime();
                }*/
                let pipelineId = this.$route.query.pipelineId;
                let alarmType = this.alarmTypeValue;
                let stateCode = this.stateCodeValue;
                let levelCode = this.levelCodeValue;
                let alarmState = "bjzt01";
                let pageNumber = this.query.pageIndex;
                let pageSize = this.query.pageSize;
                let data = await apiService.realtimeAlarmsOrderHistoryList({
                    pipelineId, alarmState, startTimeStr, endTimeStr, stateCode, alarmType, levelCode, pageNumber, pageSize
                })
                this.tableData = data.data;
                this.total = data.total;
                this.tableDataR = data.data;
                for (let item of this.tableDataR){
                    item['datetime'] = moment(item['datetime']).format('YYYY-MM-DD HH:mm:ss')
                }
            },
            dateFormat: function (row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH:mm:ss");
            },
            handlePageChange(val) {
                this.$set(this.query, 'pageIndex', val);
                this.getData();
            }
        }
    };
</script>

<style lang="scss" scoped>
    .dxcr_list {

    }

    .alarmList {
        width: 100%;
        height: 100%;
    }

    .index_bg {
        height: 100%;
        width: 100%;
        background-image: url("/images/listBG.png");
        background-size: 100% 100%;
        position: absolute;
        z-index: -999;
    }

    .login_title {
        text-shadow: 1px 0 0 #205efd, 0 1px 0 #205efd,
        0 -1px 0 #205efd, -1px 0 0 #205efd,
        1px 0 1px #205efd, 0 1px 1px #205efd,
        0 -1px 1px #205efd, -1px 0 1px #205efd;
        position: absolute;
        transform: translateX(-50%);
        left: 50%;
        top: 4.3%;
        font-size: 26px;
    }

    .dxcr_container {
        padding: 30px;
    }

    .handle-box {
        float: left;
        margin-bottom: 20px;
        margin-top: 50px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }

    .table {
        width: 100%;
        font-size: 14px;
    }

    .red {
        color: #ff0000;
    }

    .mr10 {
        margin-right: 10px;
    }

    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }
</style>
<style lang="scss">
    .dxcr_list {
        background-image: url("/images/liebiao.png");
        background-size: 100% 100%;
        .el-pager {
            padding-left: 0px;
        }

        .pagination {
            margin: 20px 0;
            text-align: right;
        }
    }

    .v-application {
        background: none !important;
    }
</style>
