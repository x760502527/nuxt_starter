<template>
    <div style="height: 100%;width: 100%;padding:10px;">
        <div style="height: 100%;width: 100%" class="data_chart">
            <div style="height:calc(100% - 40px)">
                <v-chart ref="myChart" autoresize :options="chartOption" theme="theme"/>
            </div>
            <div style="padding:0px 0px;">
                <div style="float:left;margin-top: 6px;padding:0 10px;">数据时间：{{time}}</div>
            </div>
            <v-overlay
                    :absolute="true"
                    :value="overlay"
                    :opacity="1"
                    style="margin:10px"
                    color="rgb(10,29,79)"
            >
                <v-progress-circular indeterminate size="64"></v-progress-circular>
            </v-overlay>
        </div>
    </div>

</template>

<script>
    import moment from 'moment'

    export default {
        name: "dataChart",
        props: {
            data: {

            },
            unit:{
                default:() => '℃'
            },
            xName:{
                default:() => '温度'
            },
            loading:{
                default:()=> false
            },
            time:{

            }
        },
        data: () => {
            return {
                ticksLabels:[],
                overlay:false,
                temperatureCurvePlaybackNow: 0,
                sliderMax: 1,
                inverse: false,
                dataC: [],
            }
        },
        watch: {
            time(){
            },
            loading(){
                if(this.loading){
                    this.overlay=true
                    /*this.$refs['myChart'].showLoading('default',{
                        maskColor: 'rgba(255, 255, 255, 0.8)',
                    })*/
                }else{
                    this.overlay=false
                   /* this.$refs['myChart'].hideLoading()*/
                }
            },
            data() {
                // console.log(this.data)
                // let rd= []
                // for (let item of this.data) {
                //     let datas = item['data'] || []
                //     let xdata = item['xData'] || []
                //     let time = item['timeValue']
                //     let arr = []
                //     for (let i = 0; i < datas.length; i++) {
                //         let arr1 = []
                //         let dataItem = xdata[i]
                //         let da = datas[i]
                //         arr1.push(dataItem)
                //         arr1.push(da)
                //         arr.push(arr1)
                //     }
                //     rd.push(arr)
                // }
                // console.log(rd[0])
                // this.dataC = rd
            }
        },
        computed: {
            chartData() {
                if (!this.data) {
                    return []
                }
                return this.data['data'] || []
            },
            chartxData(){
                if (!this.data) {
                    return []
                }
                return this.data['xData'] || []
            },
            chartOption() {
                let myChart = this.$refs['myChart']
                let c=this
                return {
                    color: ['#00FF2A'],
                    tooltip: {
                        trigger: 'axis',
                        formatter: function (params) {
                            var result = '';
                            // params.forEach(function (item) {
                            //     result += item.seriesName + " : " + item.value + c.unit +"</br>";
                            // });
                            var item = params[0]
                            result += item.seriesName + " : " + item.value + c.unit + "</br>";
                            result += "距离" + " : " + item.axisValue + "米</br>"
                            return result;
                        }
                    },
                    legend: {
                        // data:['定温','温速','温差','振动','断纤'],
                        textStyle: {
                            color: '#fff'
                        },
                        show: false
                    },
                    textStyle: {
                        color: '#fff'
                    },
                    toolbox: {
                        left: 'right',
                        iconStyle: {
                                borderColor: 'rgb(10,29,79)'
                        },
                        emphasis:{
                            iconStyle: {
                                borderColor: 'rgb(255,255,255)'
                            },
                        },
                        feature: {
                            myTool1: {
                                show: true,
                                title: "反转",
                                icon: 'path://M922.345786 372.183628l-39.393195 38.687114L676.138314 211.079416l0 683.909301-54.713113 0L621.425202 129.010259l53.320393 0L922.345786 372.183628zM349.254406 894.989741 101.654214 651.815349l39.393195-38.687114 206.814276 199.792349L347.861686 129.010259l54.713113 0 0 765.978459L349.254406 894.988718z',
                                onclick: function () {
                                    c.inverse = !c.inverse
                                    let position = 'top'
                                    if (inverse)
                                        position = 'top'
                                    else
                                        position = 'bottom'
                                    myChart.setOption({
                                        yAxis: {
                                            inverse: c.inverse
                                        },
                                        xAxis: {
                                            position: position
                                        }
                                    })
                                }
                            },
                            dataZoom: {
                                title: {
                                    zoom: '区域缩放',
                                    back: "区域缩放还原"
                                },
                                yAxisIndex: 'none'
                            },
                            // magicType: {
                            //     type: ['line', 'bar']
                            // },
                            restore: {
                                title: "还原",
                            },


                        }
                    },
                    grid: {
                        left: '5%',
                        right: '5%',
                        bottom: '10%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        nameLocation: 'center',
                        nameGap: 20,
                        name: '距离' + '（' + '米' + '）',
                        axisLabel: {
                            showMaxLabel: true,
                            showMinLabel: true,
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#fff'
                            }
                        },
                        data: this.chartxData,
                    },
                    yAxis: {
                        type: 'value',
                        name: this.xName + this.unit,
                        axisLine: {
                            lineStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    series: [
                        {
                            name:  '温度',
                            type: 'line',
                            data: this.chartData,
                            markPoint: {
                                label: {
                                    fontSize: 14,
                                    fontWeight: "bold"
                                },
                                data: [
                                    {type: 'max', name: '最大值'},
                                ]
                            },
                            markLine: {
                                label: {
                                    position: 'middle',
                                    formatter: function (params) {
                                        return params['data']['coord'][1]
                                    }
                                },
                                lineStyle: {
                                    color: '#ff0000',
                                }
                            }

                        }
                    ]
                };
            }
        }
    }
</script>

<style scoped>
    .echarts {
        height: 100%;
        width: 100%;
    }

    .data_chart {
        border-radius: 5px;

        background: linear-gradient(rgba(49,112,182, .6), rgba(49,112,182, .7), rgba(49,112,182, .95));
    }


</style>
<style>
    .v-slider__tick-label{
        font-size: 14px;
    }
</style>
