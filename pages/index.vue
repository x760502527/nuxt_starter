<template>
    <div class="index" style="position: relative;" @mouseup="mouseup">
        <div class="index_bg"></div>
        <div class="login_title">
            管道动态监测
        </div>
        <!--<div class="pipeline_list">
            <div class="pipeline">131</div>
        </div>-->
        <div style="padding:5px 60px 20px 60px;height: 100%;width: 100%;">
            <div style="height: 100px;position: absolute;width: calc(100% - 120px);">
                <div style="float:left">
                    <iframe v-if="weatherShow" id="iframe1" allowtransparency="true" frameborder="0" width="180"
                            height="36" scrolling="no"
                            src="//tianqi.2345.com/plugin/widget/index.htm?s=3&z=2&t=0&v=0&d=3&bd=0&k=000000&f=ffffff&ltf=ffffff&htf=ffffff&q=1&e=1&a=0&c=61073&w=180&h=36&align=center"></iframe>
                    <img @load="w2" style="display: none;" alt="2345天气预报" :src="testImg">
                    <!--<iframe style="position: absolute;left:10px;" allowtransparency="true" frameborder="0" width="180"
                            height="30" scrolling="no"
                            src="//tianqi.2345.com/plugin/widget/index.htm?s=3&amp;z=2&amp;t=0&amp;v=0&amp;d=3&amp;bd=0&amp;k=&amp;f=ffffff&amp;ltf=ffffff&amp;htf=ffffff&amp;q=1&amp;e=1&amp;a=1&amp;c=54511&amp;w=180&amp;h=30&amp;align=center"></iframe>-->
                </div>
                <div style="float:right;margin-top: 10px;">
                    <span style="font-size: 12px;"><v-icon style="color:#03B7C9;margin-top: -2px;">mdi-account</v-icon>欢迎您，{{username}}</span>
                    <span @click="goHome()" class="exit" style="font-size: 12px;cursor: pointer;margin-left: 10px;"><v-icon
                            style="color:#03B7C9;margin-top: -2px;">mdi-home</v-icon>主页</span>
                    <span @click="logout()" class="exit" style="font-size: 12px;margin-left: 10px;cursor: pointer;"><v-icon
                            style="color:#03B7C9;margin-top: -2px;">mdi-power</v-icon>退出</span>
                </div>
            </div>
            <div style="margin-top:100px;height: calc(100% - 100px);position: relative;" class="content">
                <div style="height:40%;width: 75%;position: absolute;padding:0px 20px 20px 0px;">
                    <div style="height:40px;line-height: 40px;"
                         class="index_title">
                        <div style="float:left;background-image: url('/images/baojingtongji-nav.png');background-size: 100% 100%;width:120px;">
                            管道鱼骨图
                        </div>
                        <div style="float:right;font-size: 14px;" v-if="pipelines.length>1">
                            <div  :title="item['pipelineName']"
                                 style="white-space: nowrap;text-overflow:ellipsis;overflow: hidden;padding: 0px 5px;"
                                 v-for="(item,index) in pipelines" :key="item.pipelineId" class="pipeline"
                                 :class="{active1:pipeline['pipelineId']===item['pipelineId'],alarmPP:item['alarm']}"
                                 @click="clickPipeline(item)">
                                {{item['pipelineName']}}
                                <div v-if="item['alarmCount']>0" class="cfont1">
                                    {{item['alarmCount']}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--<div style="height:40px;line-height: 40px;background-image: url('/images/yugu-nav.png');background-size: 100% 100%;"
                         class="index_title">管道鱼骨图
                    </div>-->
                    <div style="height:calc(100% - 40px);padding-top:10px;">
                        <div style="height:calc(100%);background-image: url('/images/yugu-bg.png');background-size: 100% 100%;;">
                            <div class="fishA"> <!--@wheel="wheel" @mousedown.stop="mousedown"
                         @mousemove.stop="mousemove"-->
                                <div class="fishC" :style="fishS">
                                    <div class="fish">
                                        <div class="tail">
                                            <div class="tail_1"></div>
                                            <div class="tail_2"></div>
                                        </div>
                                        <div class="body">
                                            <div class="marker" v-for="(item,index) in fishMarkers" :key="item.id"
                                                 :style="{left:item['left']+'%'}">
                                                <div v-if="item.marketTypeName.indexOf('厂站') != -1 " class="marker_zhan"
                                                     style="font-size: 16px;">
                                                    <div class="fishLine" v-if="index%2==0">
                                                        <div class="line_1"></div>
                                                        <div class="line_2"></div>
                                                        <div class="line_3" style="text-align: end;">
                                                            {{item.marketName}}
                                                        </div>
                                                    </div>
                                                    <div class="fishLine_top" v-else>
                                                        <div class="line_1_top"></div>
                                                        <div class="line_2_top"></div>
                                                        <div class="line_3_top">
                                                            {{item.marketName}}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-else-if="item.marketTypeId.indexOf('01080612') != -1 "
                                                     style="font-size: 14px;" class="marker_fashi"
                                                     :class="{marker_fashi_top:index%2!=0}">
                                                    <div class="fishLine" v-if="index%2==0">
                                                        <div class="line_1"></div>
                                                        <div class="line_2"></div>
                                                        <div class="line_3" style="text-align: end;">{{item.marketName}}
                                                        </div>
                                                    </div>
                                                    <div class="fishLine_top" v-else>
                                                        <div class="line_1_top"></div>
                                                        <div class="line_2_top"></div>
                                                        <div class="line_3_top">{{item.marketName}}</div>
                                                    </div>
                                                </div>
                                                <div v-else class="marker_bzz" style="font-size: 12px;">
                                                    <div class="fishLine" v-if="index%2==0">
                                                        <div class="line_1"></div>
                                                        <div class="line_2"></div>
                                                        <div class="line_3" style="text-align: end;">
                                                            {{item.marketName}}
                                                        </div>
                                                    </div>
                                                    <div class="fishLine_top" v-else>
                                                        <div class="line_1_top"></div>
                                                        <div class="line_2_top"></div>
                                                        <div class="line_3_top">
                                                            {{item.marketName}}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="bj" v-for="(item,index) in alarms" :key="item.id"
                                                 :style="{left:item['left']+'%'}">
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                            </div>
                                            <!--                                        <div class="marker marker_zhan"></div>-->
                                            <!--                                        <div class="marker marker_alarm"></div>-->
                                            <!--                                        <div class="marker marker_fashi"></div>-->
                                        </div>
                                        <div class="head">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="width:25%;height:55%;position: absolute;left:75%;padding-left:20px;">
                    <div style="height:40px;line-height:40px;" class="index_title">
                        <div style="width: 100%;float:left;background-image: url('/images/gongdan-nav.png');background-size: 100% 100%;">
                            <div style="float:left;">报警列表</div>
                            <div style="float:right;">
                                <a @click="open('/alarmList')" class="more">更多>></a>
                            </div>
                        </div>
                        <div style="width:100px;float:right;">
                            <!--<Select size="small" v-model="markerModel" filterable placeholder="选点">
                                <Option v-for="item in markers" :value="item.value" :key="item.value">
                                    {{
                                    item.label
                                    }}
                                </Option>
                            </Select>-->
                        </div>
                    </div>
                    <div style="height:calc(100% - 40px);padding-top:10px;">
                        <div class="dxcr_scrollbar"
                             style="height: 100%;width: 100%;background-image: url('/images/baojingliebiao-bg.png');overflow: auto;background-size: 100% 100%;">
                            <div style="height: 100%;width: 100%;padding:20px;">
                                <div v-if="alarms.length==0"
                                     style="height: 100%;width: 100%;background-image: url(/images/noalarm.png);background-position: center;background-size: auto 100%;"></div>
                                <v-row v-for="(item,index) in alarms" class="alarmlist_row" :key="item.id" no-gutters
                                       :class="{chooseAlarm:item.id==handleAlarm.id}"
                                       style="height: 25%;align-items: center;border-bottom: 1px dashed rgb(10,88,100);padding: 10px;">
                                    <v-col @click="clickAlarm(item)" cols="4"
                                           style="height:100%;padding:0px 8px 0px 0px;">
                                        <div :style="alarmImg(item.pipelineLocation)"
                                             style="background-image: url('/images/alarm_map.png');background-size:100% 100%;height: 100%;">
                                            <div style="padding:0px 4px;font-size:12px;position: relative;top:50%;left:30%;border:1px solid #666;background: rgba(255,255,255,.4);color:#000;font-weight:bolder;width: 65px;white-space: nowrap;text-overflow:ellipsis;overflow: hidden;">
                                                {{item['markName']}}
                                            </div>
                                        </div>

                                    </v-col>
                                    <v-col @click="clickHandlerAlarm(item)"
                                           style="display: flex;height: 100%;flex-direction: column;align-items: baseline;justify-content: space-between;padding:0px 0px 0px 8px;">
                                        <div>
                                            <span>报警类型：</span>
                                            <span>{{item.typeName}}</span>
                                        </div>
                                        <div>
                                            <span>报警位置：</span>
                                            <span>{{item.alarmLocationDesc}}</span>
                                        </div>
                                        <div>
                                            <span>报警时间：</span>
                                            <span>{{item.alarmTime | Ftime}}</span>
                                        </div>
                                    </v-col>
                                    <div class="alarm_icon" @click="clickAlarm(item)">
                                        <v-icon style="color:#0ecfe0;">mdi-map-marker-outline</v-icon>
                                    </div>
                                </v-row>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="width:25%;height:30%;position: absolute;top:40%;padding-bottom: 10px;padding-right:10px;">
                    <div style="=padding: 0 10px;height: 100%;width: 100%;">
                        <div style="height:40px;line-height: 40px;background-image: url('/images/wanzhengxing-nav.png');background-size: 100% 100%;"
                             class="index_title">完整性评估
                        </div>
                        <div style="height:calc(100% - 40px);padding-top:10px;">
                            <div style="height:calc(100%);background-image: url('/images/wanzheng-bg.png');background-size: 100% 100%;">
                                <div style="width: 100%;display: flex;justify-content: center;height: 100%;align-items: center;">
                                    <img style="cursor: pointer;" src="/images/ghgqc.png" alt=""
                                         @click="showGHGQModel=!showGHGQModel;showFXPGModel=false;showEqListModel=false;">
                                    <img style="cursor: pointer;" src="/images/fxpgc.png" alt=""
                                         @click="showFXPGModel=!showFXPGModel;showGHGQModel=false;showEqListModel=false;">
                                </div>
                                <div v-show="showFXPGModel" class="FXPGModel" style="padding:10px;cursor: default;">
                                    <div style="height:100%;overflow: auto;width: 100%;">

                                    </div>
                                    <div @click="showFXPGModel=false" style="position: absolute;top: 3px;right: 10px;">
                                        <v-btn small text icon>
                                            <v-icon small>close</v-icon>
                                        </v-btn>
                                    </div>
                                </div>
                                <div v-show="showGHGQModel" class="GHGQModel" style="padding:10px;cursor: default;">
                                    <div style="height:100%;overflow: auto;width: 100%;">

                                    </div>
                                    <div @click="showGHGQModel=false" style="position: absolute;top: 3px;right: 10px;">
                                        <v-btn small text icon>
                                            <v-icon small>close</v-icon>
                                        </v-btn>
                                    </div>
                                </div>
                                <!-- old version-->
                                <!--<div style="width: 50%;height: 100%;position: relative;float: left;">
                                    <v-chart ref="monitorChart1" autoresize :options="monitorChartOption"></v-chart>
                                    <div class="monitorRate">
                                        <span class="monitorRate_num">{{rate}}</span>
                                        <span class="monitorRate_5">%</span>
                                    </div>
                                    <div class="monitorRateBg">
                                    </div>
                                    <div class="sea">
                                        <span class="wave" :style="{top:(100-rate) +'%'}"></span>
                                        <span class="wave" :style="{top:(100-rate) +'%'}"></span>
                                        <span class="wave" :style="{top:(100-rate) +'%'}"></span>
                                    </div>
                                </div>
                                <div style="width: 50%;height: 100%;float: left">
                                    <div style="padding:20px 0px;height: 100%">
                                        <div style="height:33.33%;display: flex;align-items: center;color:rgb(43,157,6)">
                                            <span style="font-size:28px;font-weight: bold;">
                                                &nbsp;20%
                                            </span>
                                            <span style="margin-left:5px;font-size: 16px;margin-top: 5px;">风险值</span>
                                        </div>
                                        <div style="height:33.33%;display: flex;align-items: center;color:rgb(24,199,235)">
                                            <span style="font-size:28px;font-weight: bold;">
                                                &nbsp;10%
                                            </span>
                                            <span style="margin-left:5px;font-size: 16px;margin-top: 5px;">失效后果值</span>
                                        </div>
                                        <div style="height:33.34%;display: flex;align-items: center;color:rgb(131,75,222)">
                                            <span style="font-size:28px;font-weight: bold;">
                                                &nbsp;98%
                                            </span>
                                            <span style="margin-left:5px;font-size: 16px;margin-top: 5px;">管理覆盖率</span>
                                        </div>
                                    </div>
                                </div>-->
                            </div>
                        </div>
                    </div>
                </div>
                <div style="width: 25%; height: 30%;position: absolute;top: 70%;padding-top:10px;padding-right:10px;">
                    <div style="height:40px;line-height: 40px;" class="index_title">
                        <div style="float:left;background-image: url('/images/baojingtongji-nav.png');background-size: 100% 100%;width:120px;">
                            报警统计
                        </div>
                        <div style="float:right;font-size: 14px;">
                            <div class="toily" :class="{active:alarmDateType==='DAY'}"
                                 @click="alarmsCountChange('DAY')">
                                当日
                            </div>
                            <div class="toily" :class="{active:alarmDateType==='MONTH'}"
                                 @click="alarmsCountChange('MONTH')">本月
                            </div>
                            <div class="toily" :class="{active:alarmDateType==='YEAR'}"
                                 @click="alarmsCountChange('YEAR')">本年
                            </div>
                        </div>
                    </div>
                    <div style="height:calc(100% - 40px);padding-top:10px;">
                        <div style="height: 100%;background-image: url('/images/baojingtongji-bg.png');background-size: 100% 100%">
                            <div style="height: 100%;">
                                <table class="alarm_table">
                                    <tr class="alarm_tr">
                                        <td class="alarm_td"
                                            style="width:20%;background-image: url('/images/xiexian.png');background-size: 100% 100%;position: relative;">
                                            <span style="position: absolute;top: 50%;left: 10%;color:#aaa">等级</span>
                                            <span style="position: absolute;top: 5%;left: 60%;color:rgb(247,251,147)">类型</span>
                                        </td>
                                        <td class="alarm_td" style="width:20%;color:rgb(247,251,147)">断纤</td>
                                        <td class="alarm_td" style="width:20%;color:rgb(247,251,147)">泄漏</td>
                                        <td class="alarm_td" style="width:40%;color:rgb(247,251,147)">第三方破坏</td>
                                    </tr>
                                    <tr class="alarm_tr">
                                        <td class="alarm_td" style="color:#aaa">一级</td>
                                        <td class="alarm_td" style="color:#aaa">{{breakLineFristCount}}</td>
                                        <td class="alarm_td" style="color:#aaa">{{leakFristCount}}</td>
                                        <td class="alarm_td" style="color:#aaa">{{ forceFristCount}}</td>
                                    </tr>
                                    <tr class="alarm_tr">
                                        <td class="alarm_td" style="color:rgb(242, 136, 4)">二级</td>
                                        <td class="alarm_td" style="color:rgb(242, 136, 4)">{{breakLineSecondCount}}
                                        </td>
                                        <td class="alarm_td" style="color:rgb(242, 136, 4)">{{ leakSecondCount}}
                                        </td>
                                        <td class="alarm_td" style="color:rgb(242, 136, 4)">
                                            {{ forceSecondCount}}
                                        </td>
                                    </tr>
                                    <tr class="alarm_tr">
                                        <td class="alarm_td" style="color:#f00">三级</td>
                                        <td class="alarm_td" style="color:#f00">{{breakLineThridCount}}</td>
                                        <td class="alarm_td" style="color:#f00">{{ leakThridCount}}</td>
                                        <td class="alarm_td" style="color:#f00">{{ forceThridCount}}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ybp"
                     style="width: 50%; height: 25%;position: absolute;top: 40%;left:25%;padding-left:10px;padding-right:10px;padding-bottom: 10px;">
                    <v-row style="height: 100%;">
                        <v-col style="position: relative;height: 100%;">
                            <v-chart ref="meterChart2" autoresize :options="meterChartOption1"></v-chart>
                            <div class="meterTitle">报警</div>
                            <v-row no-gutters class="meterInfo" style="width: 100%">
                                <v-col style="display: flex;padding-right: 10px;justify-content: flex-end;" md="6"
                                       sm="12">
                                    <div>
                                        <div class="circle" style="background-color: #fdff93;"></div>
                                        <span style="margin-left:5px;">报警总数</span>
                                        <span class="meterValue" style="color:#fdff93">{{alarmCount}}</span>
                                    </div>
                                </v-col>
                                <v-col style="display: flex;padding-left: 10px;justify-content: flex-start;" md="6"
                                       sm="12">
                                    <div>
                                        <div class="circle" style="background-color: rgb(124,165,168);"></div>
                                        <span style="margin-left:5px;">已处理</span>
                                        <span class="meterValue" style="color:rgb(124,165,168)">{{disposed}}</span>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col style="position: relative;height: 100%;">
                            <v-chart ref="meterChart4" autoresize :options="meterChartOption2"></v-chart>
                            <div class="meterTitle">未处理</div>
                            <v-row no-gutters class="meterInfo" style="width: 100%">
                                <v-col style="display: flex;padding: 0px;justify-content: center;">
                                    <span class="meterValue" style="color:#ff0000">{{unDisPise}}</span>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col style="position: relative;cursor: pointer;height: 100%;" class="eqState">
                            <v-chart ref="meterChart3" autoresize :options="meterChartOption3"></v-chart>
                            <div class="meterTitle">设备状态</div>
                            <v-row no-gutters class="meterInfo" style="width: 100%">
                                <v-col style="display: flex;padding-right: 10px;justify-content: flex-end;" md="6"
                                       sm="12">
                                    <div>
                                        <div class="circle" style="background-color: #fdff93;"></div>
                                        <span style="margin-left:5px;">设备总数</span>
                                        <span class="meterValue" style="color:#fdff93">{{eqAll}}</span>
                                    </div>
                                </v-col>
                                <v-col style="display: flex;padding-left: 10px;justify-content: flex-start;" md="6"
                                       sm="12">
                                    <div @click="clickEqState()" style="cursor: pointer;">
                                        <div class="circle"></div>
                                        <span style="margin-left:5px;">离线</span>
                                        <span class="meterValue" style="color:rgba(255,255,0,.7);">{{eqOffline}}</span>
                                        <div :style="offlineLeft()" v-if="eqOffline>0" class="cfont"></div>
                                    </div>
                                    <div v-show="showEqListModel" class="EqListModel"
                                         style="padding:10px;cursor: default;">
                                        <div style="height: 30px;border-bottom: 1px solid #226bdb;margin-right: 10px;">
                                            <div style="color:#fff;height:100%;border-bottom: 2px solid #226bdb;width: 70px;line-height: 30px;width:100%">
                                                <div style="float:left;">设备列表</div>
                                                <div style="float: left; margin-left: 10px;font-size: 12px;}">
                                                    <a style="font-size: 12px;" @click="open('/offlineDeviceList')"
                                                       class="more">更多>></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div style="height:calc(100% - 30px);overflow: auto;width: 100%;"
                                             class="dxcr_scrollbar">
                                            <v-row no-gutters
                                                   style="height: 30px;line-height: 30px;margin-top:10px;margin-right: 10px;color:rgb(232,235,148)">
                                                <v-col cols="3" style="text-align: center;background:rgb(20,81,125); ">
                                                    设备
                                                </v-col>
                                                <v-col cols="6" style="text-align: center;background:rgb(20,81,125);">
                                                    设备名称
                                                </v-col>
                                                <v-col cols="3" style="text-align: center;background:rgb(20,81,125);">
                                                    状态
                                                </v-col>
                                            </v-row>
                                            <v-row v-for="(item,index) in eqStateList" :key="item['equipmentId']"
                                                   no-gutters
                                                   style="height: 40px;line-height: 40px;margin-right: 10px;color:#999;border-bottom: 1px dashed #02cbcd;text-align: center;">
                                                <v-col cols="3">
                                                    <img v-if="item['equipmentType']=='01080102'" src="/images/dvs.png"
                                                         style="margin-top: 2px;" alt="">
                                                    <img v-else-if="item['equipmentType']=='01080301'"
                                                         src="/images/rtu.png" style="margin-top: 2px;" alt="">
                                                    <img v-else src="/images/dts.png" style="margin-top: 2px;" alt="">
                                                </v-col>
                                                <v-col cols="6" :title="item['equipmentName']"
                                                       style="white-space: nowrap;text-overflow:ellipsis;overflow: hidden;">
                                                    {{item['equipmentName']}}
                                                </v-col>
                                                <v-col cols="3">
                                                    <div style="position: relative;top: 15px;left:calc(50% - 5px);float:none;background: #999;border-radius: 10px;height: 10px;width: 10px;"></div>
                                                </v-col>
                                            </v-row>
                                        </div>
                                        <div @click="showEqListModel=false"
                                             style="position: absolute;top: 3px;right: 10px;">
                                            <v-btn small text icon>
                                                <v-icon small>close</v-icon>
                                            </v-btn>
                                        </div>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </div>
                <div style="width: 50%; height: 35%;position: absolute;top: 65%;left:25%;padding-left:10px;padding-right:10px;">
                    <div style="height:100%;">
                        <div style="height:40px;line-height:40px;background-image: url('/images/duocan-nav.png');background-size: 100% 100%;"
                             class="index_title">数据分析
                        </div>
                        <div class="data_max">
                            <span style="color:#FFAA45;">{{max1}}</span>
                            <span>/</span>
                            <span style="color:#6c50f3;">{{max2}}</span>
                            <span>/</span>
                            <span style="color:#00ca95;">{{max3}}</span>
                        </div>
                        <div style="height:calc(100% - 40px);position: relative">
                            <v-chart ref="centerLineChart" autoresize :options="centerLineChartOption"></v-chart>
                            <div style="position: absolute;right: -20px; bottom: 10%; font-size: 12px;">(公里)</div>
                        </div>
                    </div>
                </div>
                <div style="height:45%;position: absolute;top:55%;left:75%;width:25%;padding-left:20px;padding-top:10px;">
                    <div style="height:100%;">
                        <div style="height:40px;line-height:40px;background-image: url('/images/gongdan-nav.png');background-size: 100% 100%;"
                             class="index_title">
                            <div style="float:left;">处理工单</div>
                            <div style="float:right;">
                                <a @click="open('/orderList')" class="more">更多>></a>
                            </div>
                        </div>
                        <div style="height:calc(100% - 40px);padding-top:10px;">
                            <div style="height:calc(100%);background-image: url('/images/gongdan-bg.png');background-size: 100% 100%;">
                                <div style="padding:10px 20px;">
                                    <div style="padding:10px 10px;font-size: 12px;color:#ccc">
                                        <v-row no-gutters>
                                            <v-col style="padding:5px;">
                                                <span>管道单位：{{pipeline.pipelineDeptName}}</span>
                                            </v-col>
                                            <v-col style="padding:5px;">
                                                <span>管道名称：{{pipeline.pipelineName}}</span>
                                            </v-col>
                                        </v-row>
                                        <v-row no-gutters>
                                            <v-col style="padding:5px;">
                                                <span>报警类型：{{handleAlarm.typeName}}</span>
                                            </v-col>
                                            <v-col style="padding:5px;">
                                                <span>报警等级：{{handleAlarm.levelName}}</span>
                                            </v-col>
                                        </v-row>
                                        <v-row no-gutters>
                                            <v-col style="padding:5px;">
                                                <span>管道位置：{{handleAlarm.alarmLocationDesc}}</span>
                                            </v-col>
                                        </v-row>
                                    </div>
                                    <div style="padding:10px 0px 0px 0px;">
                                        <v-row no-gutters style="margin-top:-5px;">
                                            <v-col style="padding:0px 5px;">
                                                <v-select
                                                        :items="alarmStates"
                                                        label="报警状态"
                                                        placeholder="选择报警状态"
                                                        dense
                                                        outlined
                                                        required
                                                        v-model="alarmState"
                                                        :menu-props="{ bottom: true, offsetY: true }"
                                                        dark
                                                ></v-select>
                                            </v-col>
                                            <v-col style="padding:0px 5px;">
                                                <v-select
                                                        :items="handleModes"
                                                        label="选择处理方式"
                                                        placeholder="选择处理方式"
                                                        dense
                                                        outlined
                                                        required
                                                        v-model="handleMode"
                                                        :menu-props="{ bottom: true, offsetY: true }"
                                                        dark
                                                ></v-select>
                                            </v-col>
                                        </v-row>
                                        <v-row no-gutters style="margin-top:-15px;">
                                            <v-col style="padding:0px 5px;">
                                                <v-text-field
                                                        label="备注"
                                                        placeholder="请输入备注"
                                                        dense
                                                        outlined
                                                        required
                                                        v-model="remarks"
                                                        dark
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </div>
                                    <div style="margin-top:-20px;">
                                        <v-btn @click="handle()"
                                               :disabled="!submitflag"
                                               style="float:right;background-color: rgb(15,44,87);border: 1px solid rgb(12,79,146)">
                                            提交
                                        </v-btn>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import moment from 'moment'
    import apiService from "../services/apiService"
    import {mapState} from 'vuex'
    import DateTimePicker from '../components/a/DateTimePicker'
    import echarts from 'echarts'

    const Cookie = process.client ? require('js-cookie') : undefined
    export default {
        async asyncData({$axios, callback}) {

        },
        async mounted() {
            await this.getData()
            this.rtData();
            this.rtRate()
            this.rtRates()
        },
        destroyed() {
            clearInterval(this.intervalRate);
            clearInterval(this.intervalRtData);
        },
        methods: {
            w2() {
                this.weatherShow = true
            },
            rtRates() {
                this.intervalRate = setInterval(() => {
                    this.rtRate()
                }, 10000)
            },
            rtRate() {
                this.rate = parseInt(Math.random() * 5) + 90
            },
            rtData() {
                this.intervalRtData = setInterval(() => {
                    this.realtimeAlarmTop2()
                    this.alarmsCountDisposed();
                    this.getOnlineList();
                    this.alarmsCountLevel();
                    this.onlineCount();
                    this.getPipelineCount();
                    this.getRtData()
                }, 10000)
            },
            async getData() {
                this.getConfig()
                await this.fishbone();
                this.alarmsCountDisposed();
                this.getOnlineList();
                this.getPipelineCount();
                this.alarmsCountLevel();
                this.onlineCount();
                this.realtimeAlarmTop()
                this.getRtData()
                this.getAlarmState()
                this.getDisposed()
                this.getDisposedType()
            },
            async getPipelineCount() {
                const datas = await apiService.getPipelineCount()
                let data = datas['data']
                if (data && data.length > 0) {
                    for (let item of data) {
                        for (let item1 of this.pipelines) {
                            if (item['pipelineId'] == item1['pipelineId']) {
                                //if(item['totle']>0){
                                item1['alarmCount'] = item['totle']
                                //}
                            }
                        }
                    }
                }
            },
            async clickPipeline(item) {
                this.pipeline = item
                this.getData()
            },
            async isOnline() {
                const datas = await apiService.baidu()
            },
            async getConfig() {
                const datas = apiService.configJson()
                this.address_back = datas['address_back']
            },
            async getRtData() {
                let interval = parseInt(this.pipeline['pipelineLength'] / 1000)
                const result = await Promise.all([apiService.getRealTimeFitValue({
                    pipelineId: this.pipeline['pipelineId'],
                    intervalValue: interval
                }), apiService.getRealTimeDatas({
                    pipelineId: this.pipeline['pipelineId'],
                    dataType: '01080101',
                    intervalValue: interval,
                    returnType: 1
                }), apiService.getRealTimeDatas({
                    pipelineId: this.pipeline['pipelineId'],
                    dataType: '01080102',
                    intervalValue: interval,
                    returnType: 1
                })])

                let rtuData = result[0]['data'] || {}
                let temperature = result[1]['data'] || {}
                let vibration = result[2]['data'] || {}
                let xData = rtuData['datasPipelineLocation'] || temperature['datasPipelineLocation'] || vibration['datasPipelineLocation']
                //改成公里
                xData = xData.map((v) => {
                    return Math.ceil(v / 1000)
                })
                this.centerLineChartOption.xAxis[0].data = xData
                this.centerLineChartOption.series[0].data = temperature['datasValueFormat']
                this.centerLineChartOption.series[1].data = vibration['datasValueFormat']
                this.centerLineChartOption.series[2].data = rtuData['datasValueFormat']
                this.rtuData = rtuData
                this.temperature = temperature
                this.vibration = vibration
                this.max1 = temperature['maxRang']
                this.max2 = vibration['maxRang']
                this.max3 = rtuData['maxRang']
            },
            async getAlarmState() {
                const datas = await apiService.alarmState({})
                let data = datas['data']
                this.alarmStates = data.map((item) => {
                    let ob = {}
                    ob.text = item.value
                    ob.value = item.code
                    return ob
                })
                this.alarmState = this.alarmStates[0]['value']
            },
            async getDisposed() {
                const datas = await apiService.disposed({})
                let data = datas['data']
                this.handleStates = data.map((item) => {
                    let ob = {}
                    ob.text = item.value
                    ob.value = item.code
                    return ob
                })
                this.handleState = this.handleStates[0]['value']
            },
            async getOnlineList() {
                const datas = await apiService.getOnlineList({
                    pipelineID: this.pipeline['pipelineId'],
                })
                let data = datas['data']
                this.eqStateList = data.filter((v) => {
                    if (v['status'] == 0) {
                        return true
                    }
                })

            },
            async getDisposedType() {
                const datas = await apiService.disposedType({})
                let data = datas['data']
                this.handleModes = data.map((item) => {
                    let ob = {}
                    ob.text = item.value
                    ob.value = item.code
                    return ob
                })
                this.handleMode = this.handleModes[0]['value']
            },
            async realtimeAlarm() {
                let endTime = moment().valueOf()
                const datas = await apiService.alarms({
                    pageNo: 1,
                    pageSize: 99999,
                    pipelineId: this.pipeline['pipelineId'],
                    startTime: this.alarmStartTime,
                    endTime: endTime
                })
                let data = datas['data']

                if (data) {
                    for (let item of data) {
                        let left = item['pipelineLocation'] / this.pipeline['pipelineLength']
                        if (left > 1) {
                            left = 1
                        }
                        if (left < 0) {
                            left = 0
                        }
                        left *= 90
                        item['left'] = left
                    }
                    this.alarms.unshift(...data)
                    this.startTime = endTime + 1
                }
            },
            async realtimeAlarmTop2() {
                this.limitTime = moment().valueOf();
                this.alarmStartTime = this.limitTime
                const datas = await apiService.alarms({
                    pageNo: 1,
                    pageSize: 100,
                    pipelineId: this.pipeline['pipelineId']
                })
                let data = datas['data']
                if (data && data.length > 0) {
                    for (let item of data) {
                        //报警位置
                        let left = null

                        let redMarketId = item['redMarketId']
                        let redUpOrDown = item['redUpOrDown']
                        let redMinMus = item['redMinMus']
                        for (let it1 of this.fishMarkers) {
                            if (it1.marketId == redMarketId) {
                                left = it1['left']
                                if (redUpOrDown == 'up') {
                                    left = left - redMinMus / this.pipeline['pipelineLength']
                                } else {
                                    left = left + redMinMus / this.pipeline['pipelineLength']
                                }
                                break;
                            }
                        }

                        //没找到报警对应的标志物
                        if (!left) {
                            left = item['pipelineLocation'] / this.pipeline['pipelineLength']
                            if (left > 1) {
                                left = 1
                            }
                            if (left < 0) {
                                left = 0
                            }
                            left = left * 90 + 5
                        }
                        item['left'] = left
                    }
                    this.alarms = data
                } else {
                    this.alarms = []
                }

            },
            async realtimeAlarmTop() {
                this.limitTime = moment().valueOf();
                this.alarmStartTime = this.limitTime
                const datas = await apiService.alarms({
                    pageNo: 1,
                    pageSize: 100,
                    pipelineId: this.pipeline['pipelineId']
                })
                let data = datas['data']
                if (data && data.length > 0) {
                    this.handleAlarm = data[0]
                    this.handleMode = 'xxcl'
                    this.handleState = this.handleAlarm['disposeStatus']
                    this.alarmState = this.handleAlarm['stateCode']
                    for (let item of data) {

                        //报警位置
                        let left = null

                        let redMarketId = item['redMarketId']
                        let redUpOrDown = item['redUpOrDown']
                        let redMinMus = item['redMinMus']
                        for (let it1 of this.fishMarkers) {
                            if (it1.marketId == redMarketId) {
                                left = it1['left']
                                if (redUpOrDown == 'up') {
                                    left = left - redMinMus / this.pipeline['pipelineLength']
                                } else {
                                    left = left + redMinMus / this.pipeline['pipelineLength']
                                }
                                break;
                            }
                        }

                        //没找到报警对应的标志物
                        if (!left) {
                            left = item['pipelineLocation'] / this.pipeline['pipelineLength']
                            if (left > 1) {
                                left = 1
                            }
                            if (left < 0) {
                                left = 0
                            }
                            left = left * 90 + 5
                        }
                        item['left'] = left

                    }
                    this.alarms = data
                } else {
                    this.handleAlarm = {}
                    this.alarms = []
                }

            },
            async onlineCount() {
                const datas = await apiService.onlineCount({
                    pipelineID: this.pipeline['pipelineId']
                })
                let data = datas['data']
                if (data) {
                    let eqAll = data['all'] || 0
                    let eqOffline = data['offline'] || 0
                    this.eqAll = eqAll
                    this.eqOffline = eqOffline
                    this.meterChartOption3.series[2].data[0].value = eqAll
                    this.meterChartOption3.series[3].data[0].value = eqOffline
                    let max = (Math.floor(eqAll / 100) + 1) * 100
                    this.meterChartOption3.series[0].max = max
                    this.meterChartOption3.series[1].max = max
                    this.meterChartOption3.series[2].max = max
                    this.meterChartOption3.series[3].max = max
                }
            },
            async fishbone() {
                const datas = await apiService.fishboneDatas()
                let id = this.pipeline['pipelineId']

                let datas1 = datas['data']
                this.pipelines = datas1
                let data = null;
                for (let item of datas1) {
                    if (id == item['pipelineId']) {
                        data = item || {}
                    }
                }

                if (!data) {
                    data = datas['data'][0] || {}
                }

                const markers = data['pipieMarkets'] || []
                const pipelineID = data['pipelineId'] || []
                const pipelineLength = data['pipelineLength'] || []
                this.pipeline = data
                let index = 0
                for (let item of markers) {
                    item['left'] = 90 / (markers.length - 1) * index + 5
                    index++
                }
                this.fishMarkers = markers
            },
            async alarmsCountDisposed() {
                const datas = await apiService.alarmsCountDisposed({
                    pipelineID: this.pipeline['pipelineId'],
                    dateType: this.alarmDateType,
                })
                let data = datas['data']
                if (data) {
                    this.alarmCount = data['alarmCount']
                    this.disposed = data['disposed']
                    this.unDisPise = data['unDisPise']
                    this.meterChartOption1.series[2].data[0].value = this.alarmCount
                    this.meterChartOption1.series[3].data[0].value = this.disposed
                    this.meterChartOption2.series[2].data[0].value = this.unDisPise
                    let max = (Math.floor(this.alarmCount / 100) + 1) * 100
                    this.meterChartOption1.series[0].max = max
                    this.meterChartOption1.series[1].max = max
                    this.meterChartOption1.series[2].max = max
                    this.meterChartOption1.series[3].max = max
                    let max1 = (Math.floor(this.unDisPise / 100) + 1) * 100
                    this.meterChartOption2.series[0].max = max1
                    this.meterChartOption2.series[1].max = max1
                    this.meterChartOption2.series[2].max = max1
                }
            },
            alarmsCountChange(dateType) {
                this.alarmDateType = dateType
                this.alarmsCountLevel()
                this.alarmsCountDisposed()
            },
            async alarmsCountLevel() {
                const datas = await apiService.alarmsCountLevel({
                    dateType: this.alarmDateType,
                    pipelineID: this.pipeline['pipelineId']
                })
                let data = datas['data']
                if (data) {
                    this.breakLineFristCount = data['breakLineFristCount']
                    this.breakLineSecondCount = data['breakLineSecondCount']
                    this.breakLineThridCount = data['breakLineThridCount']
                    this.forceFristCount = data['forceFristCount']
                    this.forceSecondCount = data['forceSecondCount']
                    this.forceThridCount = data['forceThridCount']
                    this.leakFristCount = data['leakFristCount']
                    this.leakSecondCount = data['leakSecondCount']
                    this.leakThridCount = data['leakThridCount']
                }
            },
            async handle() {
                if (!this.handleAlarm['id']) {
                    this.$Message['success']({
                        background: true,
                        content: '当前暂无报警'
                    });
                    return
                }
                if(!this.submitflag){
                    return
                }

                this.submitflag = false
                let form = {
                    "alarmId": this.handleAlarm['id'],
                    "alarmType": this.handleMode,
                    "stateCode": this.alarmState,
                    "disposeStatus": "bjzt01",
                    "remarks": this.remarks,
                    "disposeTime": moment().valueOf(),
                    createBy: this.$store.state['user']['userId']
                }
                const datas = await apiService.handleAlarm(form)
                this.submitflag = true

                let mesg = datas['mesg'] || ''
                if (mesg == "successful") {
                    //改变工单为最新的报警
                    //删除报警
                    /*let index=0
                    for (let item of this.alarms){
                        if(item['id'] == this.handleAlarm['id']){
                            this.alarms.splice(index,1)
                        }
                        index++
                    }*/
                    this.remarks = ''
                    this.$Message['success']({
                        background: true,
                        content: '处理成功！切换到下一个报警'
                    });
                    await this.realtimeAlarmTop();

                } else {
                    this.$Message['error']({
                        background: true,
                        content: '处理失败！'
                    });
                }
            },
            goHome() {
                window.location = '/banner/index.html'
            },
            logout() {
                this.$Modal.confirm({
                    title: '退出登录',
                    content: '是否确定退出登录？',
                    onOk: () => {
                        apiService.logout();
                        Cookie.remove('token');
                        Cookie.remove('user');
                        this.$store.commit('user', null)
                        this.$store.commit('token', null)
                        window.location = '/login';
                    },
                    onCancel: () => {

                    }
                });

            },
            clickEqState() {
                //TODO 设备状态点击
                this.showEqListModel = !this.showEqListModel
                this.showFXPGModel = false
                this.showGHGQModel = false
            },
            clickHandlerAlarm(item) {
                this.handleAlarm = item
            },
            clickAlarm(alarm) {

                let lat = ''
                let lon = ''
                if (alarm['latLon']) {
                    lat = alarm['latLon'][0]
                    lon = alarm['latLon'][1]
                }
                let alarmLocationDesc = alarm['alarmLocationDesc']

                let typeName = alarm['typeName']
                let alarmStateName = alarm['alarmStateName']
                let alarmTime = alarm['alarmTime']
                let id = alarm['id']
                let levelName = alarm['levelName']
                let pipelineLocation = alarm['pipelineLocation']
                let alarmValue = alarm['alarmValue']
                let userId = this.$store.state['user']['userId']

                window.open(this.address_back + `/AWelcome?alarmId=${id}&userId=${userId}`)
            },
            offlineLeft() {
                let left = 184
                left += this.eqOffline.toString().length * 5
                return {left: left + "px"}
            },
            mousedown(e) {
                let x = e['clientX'] - 60
                this.cx = x
            },
            mouseup(e) {
                this.cx = null
            },
            mousemove(e) {
                if (!this.cx) {
                    return
                }
                let x = e['clientX'] - 60
                this.offsetX += (x - this.cx) / this.scalc
                this.cx = x
            },
            wheel(e) {
                let x = e['clientX'] - 60
                let y = e['clientY'] - 20
                if (e.wheelDelta > 0) {
                    //向上滚 放大
                    if (this.scalc > 3) {
                        return
                    }
                    this.scalc++
                } else {
                    if (this.scalc > 1) {
                        this.scalc--
                    } else {
                    }
                }

                if (this.scalc == 1) {
                    this.offsetX = 0
                } else {
                    let width = document.getElementsByClassName('fishC')[0]['clientWidth']
                    this.offsetX = (width / 2 - x) + ((x - width / 2) / width * width / this.scalc)
                }
            },
            alarmImg(location) {
                let m = 1
                if (location > 10000) {
                    m = 2
                    if (location > 20000) {
                        m = 3
                        if (location > 30000) {
                            m = 4
                            if (location > 40000) {
                                m = 5
                                if (location > 50000) {
                                    m = 6
                                    if (location > 60000) {
                                        m = 7
                                        if (location > 70000) {
                                            m = 8
                                            if (location > 80000) {
                                                m = 9
                                                if (location > 90000) {
                                                    m = 10
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                // let m =  parseInt(Math.random()*4) + 1
                return {
                    "background-image": `url('/images/alarm_map${m}.png')`
                }
            },
            open(url) {
                window.open(`${url}?pipelineId=${this.pipeline['pipelineId']}`)
            }
        },
        data() {
            let c = this
            return {
                submitflag:true,
                eqStateList: [],
                showFXPGModel: false,
                showGHGQModel: false,
                showWZModel: false,
                showEqListModel: false,
                rtuData: {},
                temperature: {},
                vibration: {},
                remarks: '',
                pipelines: [],
                weatherShow: false,
                address_back: '',
                max1: 100,
                max2: 100,
                max3: 100,
                intervalRate: null,
                intervalRtData: null,
                rate: 90,
                pipeline: {},
                handleAlarm: {},
                alarmStartTime: '',
                limitTime: 0,
                alarms: [],
                pipelineID: '',
                pipelineLength: '',
                fishMarkers: [],
                eqAll: 0,
                eqOffline: 0,
                breakLineFristCount: 0,
                breakLineSecondCount: 0,
                breakLineThridCount: 0,
                forceFristCount: 0,
                forceSecondCount: 0,
                forceThridCount: 0,
                leakFristCount: 0,
                leakSecondCount: 0,
                leakThridCount: 0,
                alarmDateType: 'DAY',
                alarmCount: 0,
                disposed: 0,
                unDisPise: 0,
                markerModel: '',
                markers: [],
                alarmStates: [],
                alarmState: '',
                handleStates: [],
                handleState: '',
                handleModes: [],
                handleMode: '',
                handleTime: moment().format('YYYY-MM-DD HH:mm'),
                scalc: 1,
                cx: null,
                offsetX: 1,
                monitorChartOption: {
                    color: ['rgba(176, 212, 251, 1)'],
                    series: [{
                        name: 'Line 1',
                        type: 'pie',
                        clockWise: true,
                        center: ['40%', '50%'], // 默认全局居中
                        radius: ['60%', '65%'],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                }
                            }
                        },
                        hoverAnimation: false,
                        data: [{
                            value: 100,
                            name: '01',
                            itemStyle: {
                                normal: {
                                    color: { // 完成的圆环的颜色
                                        colorStops: [{
                                            offset: 0,
                                            color: '#367bec' // 0% 处的颜色
                                        }, {
                                            offset: 1,
                                            color: '#00cefc' // 100% 处的颜色
                                        }]
                                    },
                                    label: {
                                        show: false
                                    },
                                    labelLine: {
                                        show: false
                                    }
                                }
                            }
                        }, {
                            name: '02',
                            value: 0,
                            itemStyle: {
                                normal: {
                                    color: '#666666'
                                }
                            }
                        }]
                    }]
                },
                centerLineChartOption: {
                    toolbox: {
                        iconStyle: {
                            normal: {
                                borderColor: '#fff'
                            }
                        },
                        left: 'right',
                        top: '3%',
                        feature: {
                            /*myTool1: {
                                show: true,
                                title:'反转',
                                icon: 'path://M922.345786 372.183628l-39.393195 38.687114L676.138314 211.079416l0 683.909301-54.713113 0L621.425202 129.010259l53.320393 0L922.345786 372.183628zM349.254406 894.989741 101.654214 651.815349l39.393195-38.687114 206.814276 199.792349L347.861686 129.010259l54.713113 0 0 765.978459L349.254406 894.988718z',
                                onclick: function () {
                                    inverse = !inverse
                                    let position='top'
                                    if(inverse)
                                        position='top'
                                    else
                                        position='bottom'
                                    c.myChart2.setOption({
                                        yAxis: {
                                            inverse: inverse
                                        },
                                        xAxis:{
                                            position:position
                                        }
                                    })
                                }
                            },*/
                            dataZoom: {
                                title: {
                                    zoom: "区域缩放",
                                    back: "区域缩放还原"
                                },
                                yAxisIndex: 'none'
                            },
                            // magicType: {
                            //     type: ['line', 'bar']
                            // },
                            restore: {
                                title: '还原',
                            },
                        }
                    },
                    backgroundColor: 'rgba(0,0,0,0)',
                    legend: {
                        data: ['温度', '振动', '多参量', '压力', '流量', '输差'],
                        right: 80,
                        top: '5%',
                        textStyle: {
                            color: '#fff',
                            fontSize: 12
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: function (params) {
                            let p = params[0]
                            let p1 = params[1]
                            let p2 = params[2]
                            let str=""
                            if(p){
                                let x = params[0]['axisValue'] + '公里'
                                let x1 = params[0]['marker'] + params[0]['seriesName'] + ":" + c.temperature['datasValue'][params[0]['dataIndex']]
                                str+=x + "<br/>" + x1
                            }
                            if(p1){
                                let x2 = params[1]['marker'] + params[1]['seriesName'] + ":" + c.vibration['datasValue'][params[1]['dataIndex']]
                                str+="<br/>" + x2
                            }
                            if(p2){
                                let x3 = params[2]['marker'] + params[2]['seriesName'] + ":" + c.rtuData['datasValue'][params[2]['dataIndex']]
                                str+="<br/>" + x3
                            }

                            return str
                        },
                        axisPointer: {
                            lineStyle: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0,
                                        color: 'rgba(0, 255, 233,0)'
                                    }, {
                                        offset: 0.5,
                                        color: 'rgba(255, 255, 255,1)',
                                    }, {
                                        offset: 1,
                                        color: 'rgba(0, 255, 233,0)'
                                    }],
                                    global: false
                                }
                            },
                        },
                    },
                    grid: {
                        top: '20%',
                        left: '2%',
                        right: '2%',
                        bottom: '10%',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        axisLine: {
                            show: true
                        },
                        splitArea: {
                            // show: true,
                            color: '#f00',
                            lineStyle: {
                                color: '#f00'
                            },
                        },
                        axisLabel: {
                            color: '#fff'
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(255,255,255,0.1)'
                            }
                        },
                        nameTextStyle: {
                            color: '#fff'
                        },
                        boundaryGap: false,
                        data: [0, 1],
                        /*interval: 10,
                        nameLocation: 'end',
                        nameGap: 10,
                        name: '公里'*/
                    }],
                    yAxis: [{
                        max: 100,
                        type: 'value',
                        splitNumber: 4,
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(255,255,255,0.1)'
                            }
                        },
                        axisLine: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                            margin: 20,
                            textStyle: {
                                color: '#d1e6eb',

                            },
                        },
                        axisTick: {
                            show: false,
                        },
                    }],
                    series: [{
                        name: '温度',
                        type: 'line',
                        // smooth: true, //是否平滑
                        showAllSymbol: true,
                        // symbol: 'image://./static/images/guang-circle.png',
                        symbol: 'circle',
                        symbolSize: 0,
                        label: {
                            show: false,
                            position: 'top',
                            textStyle: {
                                color: '#FFAA45',
                            }
                        },
                        itemStyle: {
                            color: "#FFAA45",
                            borderColor: "#fff",
                            borderWidth: 2,
                            shadowColor: 'rgba(0, 0, 0, .3)',
                            shadowBlur: 50,
                            shadowOffsetY: 2,
                            shadowOffsetX: 2,
                        },
                        tooltip: {
                            show: true
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(255,170,69,0.3)'
                                },
                                    {
                                        offset: 1,
                                        color: 'rgba(255,170,69,0)'
                                    }
                                ], false),
                                shadowColor: 'rgba(255,170,69, 0.9)',
                                shadowBlur: 20
                            }
                        },
                        data: [0, 0]
                    }, {
                        name: '振动',
                        type: 'line',
                        // smooth: true, //是否平滑
                        showAllSymbol: true,
                        // symbol: 'image://./static/images/guang-circle.png',
                        symbol: 'circle',
                        symbolSize: 0,
                        label: {
                            show: false,
                            position: 'top',
                            textStyle: {
                                color: '#6c50f3',
                            }
                        },
                        itemStyle: {
                            color: "#6c50f3",
                            borderColor: "#fff",
                            borderWidth: 2,
                            shadowColor: 'rgba(0, 0, 0, .3)',
                            shadowBlur: 50,
                            shadowOffsetY: 2,
                            shadowOffsetX: 2,
                        },
                        tooltip: {
                            show: true
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(108,80,243,0.3)'
                                },
                                    {
                                        offset: 1,
                                        color: 'rgba(108,80,243,0)'
                                    }
                                ], false),
                                shadowColor: 'rgba(108,80,243, 0.9)',
                                shadowBlur: 20
                            }
                        },
                        data: [0, 0]
                    },
                        {
                            name: '多参量',
                            type: 'line',
                            // smooth: true, //是否平滑
                            showAllSymbol: true,
                            // symbol: 'image://./static/images/guang-circle.png',
                            symbol: 'circle',
                            symbolSize: 0,

                            label: {
                                show: false,
                                position: 'top',
                                textStyle: {
                                    color: '#00ca95',
                                }
                            },
                            itemStyle: {
                                color: "#00ca95",
                                borderColor: "#fff",
                                borderWidth: 2,
                                shadowColor: 'rgba(0, 0, 0, .3)',
                                shadowBlur: 0,
                                shadowOffsetY: 2,
                                shadowOffsetX: 2,
                            },
                            tooltip: {
                                show: true
                            },
                            areaStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(0,202,149,0.3)'
                                    },
                                        {
                                            offset: 1,
                                            color: 'rgba(0,202,149,0)'
                                        }
                                    ], false),
                                    shadowColor: 'rgba(0,202,149, 0.9)',
                                    shadowBlur: 20
                                }
                            },
                            data: [0, 0],
                        },
                    ]
                },
                meterChartOption1: {
                    backgroundColor: 'rgba(128, 128, 128, 0)',
                    series: [{
                        type: 'gauge',
                        center: ['50%', '55%'], // 默认全局居中
                        radius: '65%',
                        min: 0,
                        max: 100,
                        splitNumber: 5, //刻度数量
                        startAngle: 200,
                        endAngle: -20,
                        clockwise: true,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                width: 2,
                                shadowBlur: 0,
                                color: [
                                    [1, '#03B7C9']
                                ]
                            }
                        },
                        axisTick: {
                            show: true,
                            lineStyle: {
                                color: '#03B7C9',
                                width: 1
                            },
                            length: -5,
                            splitNumber: 10
                        },
                        splitLine: {
                            show: true,
                            length: -8,
                            lineStyle: {
                                color: '#03B7C9',
                            }
                        },
                        axisLabel: {
                            distance: -15,
                            textStyle: {
                                color: "#03B7C9",
                                fontSize: "12",
                                fontWeight: "bold"
                            }
                        },
                        pointer: { //仪表盘指针
                            show: 0
                        },
                        detail: {
                            show: false
                        },
                        data: [{
                            name: "",
                            value: 1
                        }]
                    }, {
                        startAngle: 200,
                        endAngle: -20,
                        type: 'gauge',
                        center: ['50%', '55%'], // 默认全局居中
                        radius: '55%',
                        splitNumber: 0,
                        axisLine: { // 坐标轴线
                            lineStyle: {
                                color: [
                                    [0.66, '#dddddd'],
                                    [1, '#dddddd']
                                ], // 属性lineStyle控制线条样式
                                width: 4
                            }
                        },
                        axisLabel: { // 坐标轴小标记
                            textStyle: { // 属性lineStyle控制线条样式
                                fontWeight: 'bolder',
                                fontSize: 16,
                                color: 'rgba(30,144,255,0)',
                            }
                        },
                        splitLine: { // 分隔线
                            length: 10, // 属性length控制线长
                            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                                width: 0,
                                color: '#444'
                            }
                        },
                        pointer: { // 分隔线 指针
                            color: '#666666',
                            width: 0,
                            length: 230
                        },
                        detail: {
                            show: false
                        },

                    }, {
                        name: '累计受理',
                        type: 'gauge',
                        startAngle: 200,
                        endAngle: -20,
                        radius: '55%',
                        center: ['50%', '55%'], // 默认全局居中
                        axisLine: {
                            show: false,
                            lineStyle: {
                                width: 25,
                                shadowBlur: 0,
                                color: [
                                    [0.2, '#00FAFC'],
                                    [0.4, '#3BD542'],
                                    [0.6, '#E3F424'],
                                    [0.8, '#7E48DA'],
                                    [1, '#E531A8']
                                ]
                            }
                        },
                        axisTick: {
                            show: false,

                        },
                        splitLine: {
                            show: false,
                            length: 20,
                        },

                        axisLabel: {
                            show: false
                        },
                        pointer: {
                            show: true,
                        },
                        detail: {
                            show: false,
                            offsetCenter: [-50, '80%'],
                            textStyle: {
                                fontSize: 30,
                                color: '#fdff93'
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: "#fdff93",

                            }
                        },
                        data: [{
                            value: 0
                        }]
                    }, {
                        name: '累计受理',
                        type: 'gauge',
                        startAngle: 200,
                        endAngle: -20,
                        radius: '55%',
                        center: ['50%', '55%'], // 默认全局居中
                        axisLine: {
                            show: false,
                            lineStyle: {
                                width: 25,
                                shadowBlur: 0,
                                color: [
                                    [0.2, '#00FAFC'],
                                    [0.4, '#3BD542'],
                                    [0.6, '#E3F424'],
                                    [0.8, '#7E48DA'],
                                    [1, '#E531A8']
                                ]
                            }
                        },
                        axisTick: {
                            show: false,

                        },
                        splitLine: {
                            show: false,
                            length: 20,

                        },

                        axisLabel: {
                            show: false
                        },
                        pointer: {
                            show: true,
                        },
                        detail: {
                            show: false,
                            offsetCenter: [20, '100%'],
                            textStyle: {
                                fontSize: 30,
                                color: 'rgb(124,165,168)'
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: "rgb(124,165,168)",

                            }
                        },
                        data: [{
                            value: 0
                        }]
                    }]
                },
                meterChartOption2: {
                    backgroundColor: 'rgba(128, 128, 128, 0)',
                    series: [{
                        type: 'gauge',
                        center: ['50%', '55%'], // 默认全局居中
                        radius: '65%',
                        splitNumber: 5, //刻度数量
                        startAngle: 200,
                        endAngle: -20,
                        clockwise: true,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                width: 2,
                                shadowBlur: 0,
                                color: [
                                    [1, '#03B7C9']
                                ]
                            }
                        },
                        axisTick: {
                            show: true,
                            lineStyle: {
                                color: '#03B7C9',
                                width: 1
                            },
                            length: -5,
                            splitNumber: 10
                        },
                        splitLine: {
                            show: true,
                            length: -8,
                            lineStyle: {
                                color: '#03B7C9',
                            }
                        },
                        axisLabel: {
                            distance: -15,
                            textStyle: {
                                color: "#03B7C9",
                                fontSize: "12",
                                fontWeight: "bold"
                            }
                        },
                        pointer: { //仪表盘指针
                            show: 0
                        },
                        detail: {
                            show: false
                        },
                        data: [{
                            name: "",
                            value: 0
                        }]
                    }, {
                        startAngle: 200,
                        endAngle: -20,
                        type: 'gauge',
                        center: ['50%', '55%'], // 默认全局居中
                        radius: '55%',
                        splitNumber: 0,
                        axisLine: { // 坐标轴线
                            lineStyle: {
                                color: [
                                    [0.66, '#dddddd'],
                                    [1, '#dddddd']
                                ], // 属性lineStyle控制线条样式
                                width: 4
                            }
                        },
                        axisLabel: { // 坐标轴小标记
                            textStyle: { // 属性lineStyle控制线条样式
                                fontWeight: 'bolder',
                                fontSize: 16,
                                color: 'rgba(30,144,255,0)',
                            }
                        },
                        splitLine: { // 分隔线
                            length: 10, // 属性length控制线长
                            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                                width: 0,
                                color: '#444'
                            }
                        },
                        pointer: { // 分隔线 指针
                            color: '#666666',
                            width: 0,
                            length: 230
                        },
                        detail: {
                            show: false
                        },

                    }, {
                        name: '累计受理',
                        type: 'gauge',
                        startAngle: 200,
                        endAngle: -20,
                        radius: '55%',
                        center: ['50%', '55%'], // 默认全局居中
                        axisLine: {
                            show: false,
                            lineStyle: {
                                width: 25,
                                shadowBlur: 0,
                                color: [
                                    [0.2, '#00FAFC'],
                                    [0.4, '#3BD542'],
                                    [0.6, '#E3F424'],
                                    [0.8, '#7E48DA'],
                                    [1, '#E531A8']
                                ]
                            }
                        },
                        axisTick: {
                            show: false,

                        },
                        splitLine: {
                            show: false,
                            length: 20,

                        },

                        axisLabel: {
                            show: false
                        },
                        pointer: {
                            show: true,
                        },
                        detail: {
                            show: false,
                            offsetCenter: [20, '100%'],
                            textStyle: {
                                fontSize: 30,
                                color: '#ff0000'
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: "#ff0000",

                            }
                        },
                        data: [{
                            value: 0
                        }]
                    }]
                }, meterChartOption3: {
                    backgroundColor: 'rgba(128, 128, 128, 0)',
                    series: [{
                        type: 'gauge',
                        center: ['50%', '55%'], // 默认全局居中
                        radius: '65%',
                        min: 0,
                        max: 100,
                        splitNumber: 5, //刻度数量
                        startAngle: 200,
                        endAngle: -20,
                        clockwise: true,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                width: 2,
                                shadowBlur: 0,
                                color: [
                                    [1, '#03B7C9']
                                ]
                            }
                        },
                        axisTick: {
                            show: true,
                            lineStyle: {
                                color: '#03B7C9',
                                width: 1
                            },
                            length: -5,
                            splitNumber: 10
                        },
                        splitLine: {
                            show: true,
                            length: -8,
                            lineStyle: {
                                color: '#03B7C9',
                            }
                        },
                        axisLabel: {
                            distance: -15,
                            textStyle: {
                                color: "#03B7C9",
                                fontSize: "12",
                                fontWeight: "bold"
                            }
                        },
                        pointer: { //仪表盘指针
                            show: 0
                        },
                        detail: {
                            show: false
                        },
                        data: [{
                            name: "",
                            value: 0
                        }]
                    }, {
                        min: 0,
                        max: 100,
                        startAngle: 200,
                        endAngle: -20,
                        type: 'gauge',
                        center: ['50%', '55%'], // 默认全局居中
                        radius: '55%',
                        splitNumber: 0,
                        axisLine: { // 坐标轴线
                            lineStyle: {
                                color: [
                                    [0.66, '#dddddd'],
                                    [1, '#dddddd']
                                ], // 属性lineStyle控制线条样式
                                width: 4
                            }
                        },
                        axisLabel: { // 坐标轴小标记
                            textStyle: { // 属性lineStyle控制线条样式
                                fontWeight: 'bolder',
                                fontSize: 16,
                                color: 'rgba(30,144,255,0)',
                            }
                        },
                        splitLine: { // 分隔线
                            length: 10, // 属性length控制线长
                            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                                width: 0,
                                color: '#444'
                            }
                        },
                        pointer: { // 分隔线 指针
                            color: '#666666',
                            width: 0,
                            length: 230
                        },
                        detail: {
                            show: false
                        },

                    }, {
                        min: 0,
                        max: 100,
                        name: '累计受理',
                        type: 'gauge',
                        startAngle: 200,
                        endAngle: -20,
                        radius: '55%',
                        center: ['50%', '55%'], // 默认全局居中
                        axisLine: {
                            show: false,
                            lineStyle: {
                                width: 25,
                                shadowBlur: 0,
                                color: [
                                    [0.2, '#00FAFC'],
                                    [0.4, '#3BD542'],
                                    [0.6, '#E3F424'],
                                    [0.8, '#7E48DA'],
                                    [1, '#E531A8']
                                ]
                            }
                        },
                        axisTick: {
                            show: false,

                        },
                        splitLine: {
                            show: false,
                            length: 20,
                        },

                        axisLabel: {
                            show: false
                        },
                        pointer: {
                            show: true,
                        },
                        detail: {
                            show: false,
                            offsetCenter: [-50, '80%'],
                            textStyle: {
                                fontSize: 30,
                                color: '#fdff93'
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: "#fdff93",

                            }
                        },
                        data: [{
                            value: 0
                        }]
                    }, {
                        min: 0,
                        max: 100,
                        name: '累计受理',
                        type: 'gauge',
                        startAngle: 200,
                        endAngle: -20,
                        radius: '55%',
                        center: ['50%', '55%'], // 默认全局居中
                        axisLine: {
                            show: false,
                            lineStyle: {
                                width: 25,
                                shadowBlur: 0,
                                color: [
                                    [0.2, '#00FAFC'],
                                    [0.4, '#3BD542'],
                                    [0.6, '#E3F424'],
                                    [0.8, '#7E48DA'],
                                    [1, '#E531A8']
                                ]
                            }
                        },
                        axisTick: {
                            show: false,

                        },
                        splitLine: {
                            show: false,
                            length: 20,

                        },

                        axisLabel: {
                            show: false
                        },
                        pointer: {
                            show: true,
                        },
                        detail: {
                            show: false,
                            offsetCenter: [20, '100%'],
                            textStyle: {
                                fontSize: 30,
                                color: '#ff0000'
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: "#ff0000",

                            }
                        },
                        data: [{
                            value: 0
                        }]
                    }]
                }
            }
        },
        watch: {
            rate(value) {
                this.monitorChartOption.series[0].data[0].value = value
                this.monitorChartOption.series[0].data[1].value = 100 - value
            }
        },
        computed: {
            fishS() {
                return {
                    transform: `scale(${this.scalc}) translateX(${this.offsetX}px)`
                }
            },
            testImg() {
                return 'http://tianqi.2345.com/theme2/img/logo160722.png?' + moment().valueOf()
            },
            username() {
                return this.$store.state['user']['userName']
            },
        },
        components: {
            DateTimePicker
        },
        filters: {
            Ftime(value) {
                if (!value) {
                    return ''
                }
                return moment(value).format('YYYY-MM-DD HH:mm:ss')
            },
        }
    }
</script>

<!--qcss-->
<style lang="scss" scoped>
    .echarts {
        height: 100%;
        width: 100%;
    }


    .index {
        min-width: 1860px;
        min-height: 930px;
        height: 100%;
        width: 100%;
        color: #fff;

        .alarmPP {

        }

        .EqListModel {
            position: absolute;
            width: 280px;
            height: 300px;
            background: url("/images/eqStateBG.png");
            background-size: 100% 100%;
            z-index: 999;
            transform: translateX(-100%) translateY(-53%);
        }

        .WZModel {
            position: absolute;
            width: 250px;
            height: 300px;
            background: url("/images/eqStateBG.png");
            background-size: 100% 100%;
            z-index: 999;
            transform: translateX(100%) translateY(-53%);
            right: 0;
        }

        .FXPGModel {
            position: absolute;
            width: 1283px;
            height: 453px;
            background: url("/images/fxpg.png");
            background-size: 100% 100%;
            z-index: 999;
            transform: translateX(100%) translateY(-75%);
            right: 0;
        }

        .GHGQModel {
            position: absolute;
            width: 1283px;
            height: 453px;
            background: url("/images/ghgq.png");
            background-size: 100% 100%;
            z-index: 999;
            transform: translateX(100%) translateY(-75%);
            right: 0;
        }

        .more {
            font-size: 14px;
        }

        .cfont1 {
            font-size: 12px;
            color: rgba(255, 255, 0, 0.7);
            margin-top: -34px;
            margin-left: 50px;
            z-index: 9;
            position: absolute;
            height: 20px;
            width: 20px;
            line-height: 20px;
            text-align: center;
            background-image: radial-gradient(rgba(255, 0, 0, 1) 10%, rgba(255, 0, 0, .8) 20%, rgba(255, 0, 0, .6) 30%, rgba(255, 0, 0, .3) 50%, rgba(0, 0, 0, 0) 75%);
            animation: neon 1.5s linear infinite;
            /*text-shadow: 0 0 5px #f00, 0 0 10px #f00, 0 0 15px #f00, 0 0 40px #f00, 0 0 70px #f00, 0 0 100px #f00, 0 0 140px #f00;*/
        }

        .cfont {
            position: absolute;
            left: 194px;
            top: -5px;
            z-index: -1;
            height: 40px;
            width: 40px;
            line-height: 40px;
            text-align: center;
            background-image: radial-gradient(rgba(255, 0, 0, 1) 10%, rgba(255, 0, 0, .8) 20%, rgba(255, 0, 0, .6) 30%, rgba(255, 0, 0, .3) 50%, rgba(0, 0, 0, 0) 75%);
            animation: neon 1.5s linear infinite;
            /*text-shadow: 0 0 5px #f00, 0 0 10px #f00, 0 0 15px #f00, 0 0 40px #f00, 0 0 70px #f00, 0 0 100px #f00, 0 0 140px #f00;*/
        }

        @keyframes neon {
            from {
                background-image: radial-gradient(rgba(255, 0, 0, 1) 10%, rgba(255, 0, 0, .8) 20%, rgba(255, 0, 0, .6) 30%, rgba(255, 0, 0, .3) 50%, rgba(0, 0, 0, 0) 75%);
            }
            to {
                background-image: radial-gradient(rgba(255, 0, 0, .6) 10%, rgba(255, 0, 0, .4) 20%, rgba(255, 0, 0, .3) 30%, rgba(255, 0, 0, .2) 50%, rgba(0, 0, 0, 0) 75%);
            }

        }

        .bj {
            transform: translateX(-50%) translateY(-50%);
            top: 5px;
            position: absolute;
            width: 30px;
            height: 30px;
        }

        .bj span {
            position: absolute;
            display: inline-block;
        }

        .bj span:nth-child(1) {
            top: 13px;
            left: 13px;
            width: 4px;
            height: 4px;
            border-radius: 2px;
            -webkit-border-radius: 2px;
            -moz-border-radius: 2px;
            background: rgba(255, 0, 0, 1);
            animation: bj01 1.5s linear infinite;
            animation-delay: 0s;
            z-index: 5;
        }

        @keyframes bj01 {
            0% {
                top: 15px;
                left: 15px;
                width: 0px;
                height: 0px;
                background: rgba(255, 0, 0, 0);
            }
            25%, 75% {
                top: 13px;
                left: 13px;
                width: 4px;
                height: 4px;
                background: rgba(255, 0, 0, 1);
            }
            100% {
                top: 12px;
                left: 12px;
                width: 6px;
                height: 6px;
                background: rgba(255, 0, 0, 0);
            }

        }

        .bj span:nth-child(2) {
            top: 12px;
            left: 12px;
            width: 6px;
            height: 6px;
            border-radius: 3px;
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            background: rgba(255, 0, 0, 0);
            animation: bj02 1.5s linear infinite;
            animation-delay: 0.25s;
        }

        @keyframes bj02 {
            0% {
                top: 13px;
                left: 13px;
                width: 4px;
                height: 4px;
                background: rgba(255, 0, 0, 0);
            }
            25%, 75% {
                top: 12px;
                left: 12px;
                width: 6px;
                height: 6px;
                background: rgba(255, 0, 0, 0.75);
            }
            100% {
                top: 11px;
                left: 11px;
                width: 8px;
                height: 8px;
                background: rgba(255, 0, 0, 0);
            }
        }

        .bj span:nth-child(3) {
            top: 11px;
            left: 11px;
            width: 8px;
            height: 8px;
            border-radius: 4px;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            background: rgba(255, 255, 0, 0);
            animation: bj03 1.5s linear infinite;
            animation-delay: 0.5s;
        }

        @keyframes bj03 {
            0% {
                top: 12px;
                left: 12px;
                width: 6px;
                height: 6px;
                background: rgba(255, 255, 0, 0);
            }
            25%, 75% {
                top: 11px;
                left: 11px;
                width: 8px;
                height: 8px;
                background: rgba(255, 255, 0, 0.5);
            }
            100% {
                top: 10px;
                left: 10px;
                width: 10px;
                height: 10px;
                background: rgba(255, 255, 0, 0);
            }
        }

        .bj span:nth-child(4) {
            top: 9px;
            left: 9px;
            width: 12px;
            height: 12px;
            border-radius: 6px;
            -webkit-border-radius: 6px;
            -moz-border-radius: 6px;
            background: rgba(221, 36, 255, 0);
            animation: bj04 1.5s linear infinite;
            animation-delay: 0.75s;
        }

        @keyframes bj04 {
            0% {
                top: 11px;
                left: 11px;
                width: 8px;
                height: 8px;
                background: rgba(221, 36, 255, 0);
            }
            25%, 75% {
                top: 9px;
                left: 9px;
                width: 12px;
                height: 12px;
                background: rgba(221, 36, 255, 0.4);
            }
            100% {
                top: 8px;
                left: 8px;
                width: 14px;
                height: 14px;
                background: rgba(221, 36, 255, 0);
            }
        }

        .bj span:nth-child(5) {
            top: 7px;
            left: 7px;
            width: 16px;
            height: 16px;
            border-radius: 8px;
            -webkit-border-radius: 8px;
            -moz-border-radius: 8px;
            background: rgba(255, 0, 0, 0);
            animation: bj05 1.5s linear infinite;
            animation-delay: 1s;
        }

        @keyframes bj05 {
            0% {
                top: 9px;
                left: 9px;
                width: 12px;
                height: 12px;
                background: rgba(255, 0, 0, 0);
            }
            25%, 75% {
                top: 7px;
                left: 7px;
                width: 16px;
                height: 16px;
                background: rgba(255, 0, 0, 0.4);
            }
            100% {
                top: 4px;
                left: 4px;
                width: 20px;
                height: 20px;
                background: rgba(255, 0, 0, 0);
            }
        }

        .index_bg {
            height: 100%;
            width: 100%;
            background-image: url("/images/bg.jpg");
            background-size: 100% 100%;
            position: absolute;
            z-index: -999;
        }

        .alarm_icon {
            position: absolute;
            right: 2%;
            bottom: 15%;
            color: #0ecfe0;
        }

        .data_max {
            position: absolute;
            margin-top: 1%;
        }

        .chooseAlarm {
            box-shadow: rgb(7, 52, 73) 0px 0px 20px 10px inset !important;
            background: none !important;
        }

        .alarmlist_row {
            cursor: pointer;
            position: relative;

            &:hover {
                box-shadow: rgb(7, 37, 57) 0px 0px 20px 10px inset;
                background: none;
            }
        }

        .fishLine_top {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0px;
            transform: translateX(-50%) translateY(-100%) rotate(180deg);
        }

        .fishLine {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0px;
            transform: translateX(50%) translateY(100%);
        }

        .line_1_top {
            position: absolute;
            width: 2px;
            height: 10px;
            background: rgb(2, 203, 205);
            transform: translateX(-50%);
        }

        .line_2_top {
            position: absolute;
            top: 10px;
            width: 2px;
            height: 20px;
            background: rgb(2, 203, 205);
            margin-left: -7px;
            margin-top: -3px;
            transform: rotateZ(45deg) translateX(-50%);
        }

        .line_3_top {
            transform: translateX(-50%) translateY(0%) rotate(135deg);
            position: absolute;
            top: 48px;
            left: -48px;
            width: 80px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .fishLine {

        }

        .line_1 {
            position: absolute;
            width: 2px;
            height: 10px;
            background: rgb(2, 203, 205);
            transform: translateX(-50%);
        }

        .line_2 {
            position: absolute;
            top: 10px;
            width: 2px;
            height: 20px;
            background: rgb(2, 203, 205);
            margin-left: -7px;
            margin-top: -3px;
            transform: rotateZ(45deg) translateX(-50%);
        }

        .line_3 {
            transform: rotateZ(-45deg) translateX(-50%);
            position: absolute;
            top: 18px;
            left: -57px;
            width: 80px;
            text-align: end;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .exit {
            &:hover {
                color: rgb(2, 203, 205);
            }
        }

        .alarm_table {
            border-collapse: collapse;
        }

        .alarm_td:not(:last-of-type) {
            border-width: 0px 1px 0px 0px;
            border-color: rgb(2, 203, 205);
            border-style: dashed;
        }

        .alarm_tr:not(:last-of-type) {
            border-width: 0px 0px 1px 0px;
            border-color: rgb(2, 203, 205);
            border-style: dashed;
        }

        .active1 {
            background-image: url("/images/clickBG.png") !important;
            color: #0eebfc !important;
        }

        .pipeline.active {
            color: rgb(13, 122, 222);
        }

        .pipeline {

            &:hover {
                color: rgb(13, 122, 222);
            }

            cursor: pointer;
            float: left;
            width: 65px;
            height: 25px;
            text-align: center;
            line-height: 25px;
            margin-top: 15px;
            background-image: url('/images/xiuandian-bg.png');
            background-size: 100% 100%;
            margin-left: 10px;
        }

        .toily.active {
            color: rgb(13, 122, 222);
        }

        .toily {

            &:hover {
                color: rgb(13, 122, 222);
            }

            cursor: pointer;
            float: left;
            width: 65px;
            height: 25px;
            text-align: center;
            line-height: 25px;
            margin-top: 15px;
            background-image: url('/images/xiuandian-bg.png');
            background-size: 100% 100%;
            margin-left: 10px;
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

        .alarm_table_line {
        }

        .alarm_table {
            height: 100%;
            width: 100%;
            text-align: center;
        }

        .fishA {
            height: 100%;
            width: 100%;
            overflow: hidden;
        }

        .marker {
            transform: translateY(-50%) translateX(-50%);
            position: absolute;
            top: 5px;
        }

        .marker_bzz {
            height: 22px;
            width: 8px;
            background-image: url("/images/biaozhizhuang.png");
            background-size: 100% 100%;
        }

        .marker_zhan {
            height: 33px;
            width: 32px;
            background-image: url("/images/zhan.png");
            background-size: 100% 100%;
        }

        .marker_alarm {
            height: 30px;
            width: 30px;
            background-image: url("/images/baojing.gif");
            background-size: 100% 100%;
        }

        .marker_fashi {
            height: 38px;
            width: 24px;
            background-image: url("/images/fashi_bottom.png");
            background-size: 100% 100%;
        }

        .marker_fashi_top {
            background-image: url("/images/fashi_top.png") !important;
        }

        .index_table {
            height: 100%;
            width: 100%;
            border-collapse: collapse;
        }

        .index_tr {
            border-bottom: 1px solid #ff4500;
        }

        .index_td {
            text-align: center;
        }

        .sea {
            position: absolute;
            padding-bottom: 50%;
            top: 22.5%;
            height: 0;
            width: 50%;
            border-radius: 50%;
            box-shadow: 0 2px 30px rgba(0, 0, 0, 0.2);
            overflow: hidden;
            left: 40%;
            transform: translateX(-50%);
            z-index: 1;
        }

        .sea .title {
            color: white;
            font-size: 24px;
            text-align: center;
            line-height: 250px;
            text-transform: uppercase;
            letter-spacing: 0.4em;
            position: absolute;
            z-index: 3;
            width: 100%;
        }

        .sea .wave {
            position: absolute;
            padding-bottom: 200%;
            height: 0;
            left: -50%;
            top: 20%;
            width: 200%;
            background: #18C5FF;
            border-radius: 40%;
            animation: drift linear infinite;
            transform-origin: 50% 50%;
            z-index: 3;
        }

        .sea .wave:nth-of-type(1) {
            animation-duration: 5s;
            opacity: .7;
        }

        .sea .wave:nth-of-type(2) {
            animation-duration: 7s;
            opacity: .5;
        }

        .sea .wave:nth-of-type(3) {
            animation-duration: 9s;
            opacity: .3;
        }

        @keyframes drift {
            from {
                transform: rotate(360deg);
            }
        }

        .index_title {
            font-size: 16px;
        }

        .monitorRate {
            position: absolute;
            top: 30%;
            left: 42%;
            transform: translateX(-50%);
            z-index: 2;
        }

        .monitorRateBg {
            position: absolute;
            top: 22.5%;
            left: 40%;
            transform: translateX(-50%);
            height: 0;
            padding-bottom: 50%;
            width: 50%;
            border-radius: 50%;
            z-index: 1;
            background: #666;
        }

        .monitorRate_num {
            font-size: 30px;
            font-weight: bolder;
            background: linear-gradient(to bottom, #367bec, #0000FF);
            -webkit-background-clip: text;
            color: transparent;
        }

        .monitorRate_5 {
            font-size: 20px;
            font-weight: bolder;
            background: linear-gradient(to bottom, #367bec, #0000FF);
            -webkit-background-clip: text;
            color: transparent;
        }

        .meterValue {
            margin-left: -2px;
            font-size: 20px;
            color: #33ccff;
        }

        .circle {
            height: 8px;
            margin-top: 14px;
            width: 8px;
            background: red;
            border-radius: 10px;
            float: left;
        }

        .meterInfo {
            position: absolute;
            top: 80%;
            display: flex;
            color: #ccc;
        }

        .meterTitle {
            position: absolute;
            top: 65%;
            left: 50%;
            transform: translateX(-50%);
            color: #fff;
            font-size: 16px;
        }

        .content {
        }


        .fishC {
            height: 100%;
            width: 100%;
            display: flex;
            justify-items: center;
            align-items: center;
            /*transition: all .2s;*/
        }

        .fish {
            width: 95%;
            position: relative;
            margin: auto;

            .tail {
            }

            .tail_1 {
                width: 20px;
                height: 25px;
                transform: rotateZ(-35deg) skew(0deg, 35deg);
                background-color: #0eebfc;
                position: absolute;
                left: 13px;
                top: -22px;
            }

            .tail_2 {
                width: 20px;
                height: 25px;
                transform: rotateZ(-145deg) skew(0deg, -35deg);
                background-color: #0eebfc;
                position: absolute;
                top: -2px;
                left: 13px;

            }

            .body {
                transform: translateY(-50%);
                width: calc(100% - 38px - 25px);
                height: 10px;
                position: absolute;
                left: 38px;
                top: 0px;
                background-color: #0eebfc;
            }

            .head {
                width: 0;
                height: 0;
                border-width: 25px;
                border-style: solid;
                position: absolute;
                right: -25px;
                top: -25px;
                border-color: transparent transparent transparent #0eebfc;
            }
        }

    }
</style>
<style lang="scss">
    .ybp {
        canvas {
            cursor: default;
        }
    }

    .dxcr_scrollbar::-webkit-scrollbar { /*滚动条整体样式*/
        width: 8px;
        height: 4px;

    }

    .dxcr_scrollbar::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
        background: #1f2c61;
    }

    .dxcr_scrollbar::-webkit-scrollbar-track { /*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 8px rgba(83, 145, 254, 0.2);
        border-radius: 8px;
        background: #0b0215;
    }

    .v-application {
        background: none !important;
    }

    .index {
        .v-btn:before {
            background: none !important;
        }

        .ivu-select-not-found {
            padding-left: 0px !important;
        }

        .ivu-select-selection {
            background: url("/images/xiuandian-bg.png");
            background-size: 100% 100%;
            border: none;
            line-height: 24px;
        }

        .ivu-select-input {
            color: #fff;
            text-align: center;
        }

        .ivu-select-dropdown {
            background-color: #424242;
        }
    }

</style>
