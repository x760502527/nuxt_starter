<template>
    <div  style="height: 100%;width: 100%;padding:10px;">
        <v-chart class="data_chart" :options="chartOption" theme="theme"/>
    </div>
</template>

<script>
    export default {
        name: "dataChart",
        computed: {
            chartOption() {
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
                        show:false
                    },
                    textStyle: {
                        color: '#fff'
                    },
                    toolbox: {
                        left: 'right',
                        feature: {
                            myTool1: {
                                show: true,
                                title: "反转",
                                icon: 'path://M922.345786 372.183628l-39.393195 38.687114L676.138314 211.079416l0 683.909301-54.713113 0L621.425202 129.010259l53.320393 0L922.345786 372.183628zM349.254406 894.989741 101.654214 651.815349l39.393195-38.687114 206.814276 199.792349L347.861686 129.010259l54.713113 0 0 765.978459L349.254406 894.988718z',
                                onclick: function () {
                                    inverse = !inverse
                                    let position = 'top'
                                    if (inverse)
                                        position = 'top'
                                    else
                                        position = 'bottom'
                                    c.myChart.setOption({
                                        yAxis: {
                                            inverse: inverse
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
                        bottom: '5%',
                        containLabel: true
                    },

                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['0', '1'],
                        nameLocation:'center',
                        nameGap:10,
                        name: '距离' + '（' + '米' + '）',
                        axisLabel: {
                            showMaxLabel: true,
                            showMinLabel: true,
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        name: '温度' + '（℃）',
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
                            data: [0, 0],
                            markPoint: {
                                label: {
                                    color: '#FF00FF',
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
    .echarts{
        height: 100%;
        width: 100%;
    }

    .data_chart{
        border-radius: 5px;
        background: linear-gradient(rgba(10,29,79,.05),rgba(10,29,79,.6), rgba(10,29,79,.8));
    }
</style>
