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
                    <div class="list_title">设备列表</div>
                    <div class="handle-box">
                        <div class="dxcr_op">
                            <span class="dxcr_label">设备名称:</span>
                            <el-select class="dxcr_input"   ref="netValue" v-model="deviceValue" size="small" clearable placeholder="请选择">
                                <el-option
                                        v-for="item in deviceOptions"
                                        :key="item.equipmentId"
                                        :label="item.equipmentName"
                                        :value="item.equipmentId">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="dxcr_op">
                            <span class="dxcr_label">起始时间：</span>
                            <el-date-picker
                                    ref="datePickers"
                                    v-model="datePickers"
                                    type="daterange"
                                    class="dxcr_input"
                                    align="right"
                                    unlink-panels
                                    value-format="timestamp"
                                    range-separator="-"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    size="small"
                                    :picker-options="pickerOptions">
                            </el-date-picker>
                        </div>
                        <div class="dxcr_op">
                            <span class="dxcr_label">设备状态：</span>
                            <el-select class="dxcr_input" size="small"   ref="netValue" v-model="netValue"  clearable placeholder="请选择">
                                <el-option
                                        v-for="item in netOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="dxcr_op">
                            <el-button size="small" type="primary" icon="el-icon-search" @click="submitDevice">搜索</el-button>
                        </div>
                    </div>
                    <el-table
                            :data="tableDataR"
                            border
                            class="table"
                            ref="multipleTable"
                            header-cell-class-name="table-header"
                            @row-click="handleRowClick"
                            @selection-change="handleSelectionChange"
                    >
                        <el-table-column prop="no" type="index" label="序号" width="60">
                            <template slot-scope="scope">
                                <span>{{(query.pageIndex-1)*query.pageSize+scope.$index + 1}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="deviceName" label="设备名称"></el-table-column>
                        <el-table-column prop="deviceState" label="状态">
                            <template slot-scope="{row: {deviceState}}">
                                <span v-if="deviceState === 1">上线</span>
                                <span v-else>离线</span>
                            </template>

                        </el-table-column>
                        <el-table-column prop="updateTimes" label="时间"></el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination
                                background
                                layout="total, prev, pager, next"
                                :current-page="query.pageIndex"
                                :page-size="query.pageSize"
                                :total="pageTotal"
                                @current-change="handlePageChange"
                        ></el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import apiService from "../../services/apiService";

    export default {
        name: 'devicelist',
        data() {
            return {
                query: {
                    pageIndex: 1,
                    pageSize: 10
                },
                dataParams:{
                    deviceParams:'',
                    startParams:'',
                    endParams:'',
                    netStateParams:'',
                },
                tableData: [],
                tableDataR: [],
                multipleSelection: [],
                delList: [],
                editVisible: false,
                addVisible: false,
                pageTotal: 0,
                form: {},
                searchInfo: '',
                addForm: {},
                idx: -1,
                id: -1,
                netOptions: [{
                    value: '1',
                    label: '上线'
                }, {
                    value: '0',
                    label: '离线'
                }],
                netValue: '',

                deviceOptions: [],
                deviceValue: '',

                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                datePickers: ''
            };
        },
        created() {
            this.getOnlineList();
        },
        mounted() {
            this.getCheckData("","","","",1);
        },
        methods: {

            //获取设备列表
            async getOnlineList(){
                let pipelineID = this.$route.query.pipelineId;//"66fbd60b3c1f4444bd969088cb8805de";
                let  data  = await apiService.getOnlineList({pipelineID});
                this.deviceOptions = data.data;
            },

            // 获取带筛选条件的的数据
            async getCheckData(devices,starts,ends,netstats,pages) {
                console.log("starts："+starts+",ends："+ends+",netstats："+netstats+",pages:"+pages);
                let deviceId =devices;
                let deviceState = netstats;
                let pipelineId = this.$route.query.pipelineId;//"66fbd60b3c1f4444bd969088cb8805de";
                let pageNumber = pages;
                let pageSize = 10;
                //console.log(pageNumber);
                //console.log(pageSize);
                let startTime = starts;
                let endTime = ends;

                let data = await apiService.onlineNetRecord({
                    deviceId, deviceState, pipelineId, startTime, endTime, pageNumber, pageSize
                })
                console.log(data.data);

                this.tableData = data.data;
                this.tableDataR = data.data;
                this.pageTotal = data.total || 0;


                //返回结果：{"code":"10000000","mesg":"successful","timestamp":"2020-04-24T10:22:44.178Z","data":[{"id":"01043f78612c4201b60c5007d5054934","deviceName":"二号阀室至三号阀室_出","deviceId":"RTU_7_2","deviceState":0,"piplineId":"66fbd60b3c1f4444bd969088cb8805de","updateTimes":"2020-04-24T08:16:58.000+0000"},{"id":"1ece8055977e4d2987056c52f74c4245","deviceName":"七号阀室至雅克拉末站_出","deviceId":"RTU_17_2","deviceState":0,"piplineId":"66fbd60b3c1f4444bd969088cb8805de","updateTimes":"2020-04-24T08:16:58.000+0000"},{"id":"2c543d99725d4431bc7e78c3fae00d6d","deviceName":"C400AD2AB0DD_1","deviceId":"C400AD2AB0DD_1","deviceState":0,"piplineId":"66fbd60b3c1f4444bd969088cb8805de","updateTimes":"2020-04-24T08:16:58.000+0000"},{"id":"30574264712845ed92f08fc7ffdf33e0","deviceName":"七号阀室至雅克拉末站_进","deviceId":"RTU_16_1","deviceState":0,"piplineId":"66fbd60b3c1f4444bd969088cb8805de","updateTimes":"2020-04-24T08:16:58.000+0000"},{"id":"34300d584ec94c8d9c97de63cb09f26b","deviceName":"三号阀室至五号阀室_出","deviceId":"RTU_9_2","deviceState":0,"piplineId":"66fbd60b3c1f4444bd969088cb8805de","updateTimes":"2020-04-24T08:16:58.000+0000"},{"id":"397c12b987da473ea0c591b8dccac040","deviceName":"C400AD35678E","deviceId":"C400AD35678E_1","deviceState":0,"piplineId":"66fbd60b3c1f4444bd969088cb8805de","updateTimes":"2020-04-24T08:16:58.000+0000"},{"id":"455f2fd5e16c49e48025a23cd17e0c4b","deviceName":"三号阀室至五号阀室_进","deviceId":"RTU_8_1","deviceState":0,"piplineId":"66fbd60b3c1f4444bd969088cb8805de","updateTimes":"2020-04-24T08:16:58.000+0000"},{"id":"488ee49c74be40bfba80bae80e290c69","deviceName":"六号阀室至七号阀室_出","deviceId":"RTU_15_2","deviceState":0,"piplineId":"66fbd60b3c1f4444bd969088cb8805de","updateTimes":"2020-04-24T08:16:58.000+0000"},{"id":"4b0c72c21f58467bbb18a3070b7709be","deviceName":"C400AD29ECA5_2","deviceId":"C400AD29ECA5_2","deviceState":0,"piplineId":"66fbd60b3c1f4444bd969088cb8805de","updateTimes":"2020-04-24T08:16:58.000+0000"},{"id":"4bdb01e988e44d6e853f75b4c2960fe6","deviceName":"000BABE56689","deviceId":"000BABE56689_1","deviceState":0,"piplineId":"66fbd60b3c1f4444bd969088cb8805de","updateTimes":"2020-04-24T08:16:58.000+0000"}],"totle":10}
            },
            handleAdd() {
                this.addVisible = true
            },
            submitDevice(){
                    console.log("选择的设备："+this.deviceValue+",选择的日期："+this.datePickers+",选择的设备状态："+this.netValue);
                    if(this.datePickers && this.datePickers.length>0){
                        let start = this.datePickers[0];
                        let end = this.datePickers[1];
                        this.dataParams.deviceParams = this.deviceValue;
                        this.dataParams.startParams = start;
                        this.dataParams.endParams = end;
                        this.dataParams.netStateParams = this.netValue;
                    }else {
                        let start = '';
                        let end = '';
                        this.dataParams.deviceParams = this.deviceValue;
                        this.dataParams.startParams = start;
                        this.dataParams.endParams = end;
                        this.dataParams.netStateParams = this.netValue;
                    }


                this.getCheckData( this.dataParams.deviceParams,this.dataParams.startParams ,this.dataParams.endParams,this.dataParams.netStateParams,1)




            },

            // 多选操作
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleRowClick(row, column, event) {
                this.$refs.multipleTable.toggleRowSelection(row);
            },

            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'pageIndex', val);
                this.getCheckData( this.dataParams.deviceParams,this.dataParams.startParams ,this.dataParams.endParams,this.dataParams.netStateParams,this.query.pageIndex )
            }
        }
    };
</script>

<style scoped>

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

