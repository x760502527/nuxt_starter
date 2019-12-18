<template>
    <div style="height: 100%;width: 100%">
        <v-chart :options="chartOption" theme="theme"/>
    </div>
</template>

<script>
    export default {
        name: "AlarmSumChart",
        data() {
            return {}
        },
        props: {
            data: {
                default: ()=>([['', 0, 0, 0]])
            }
        },
        computed: {
            chartOption() {
                return {
                    color: ['#fe7200', '#752fdf', '#009843'],
                    legend: {
                        show: true,
                        itemWidth: 14,
                        itemHeight: 14,
                        borderWidth: 0,
                        icon: "rect",
                        borderRadius: 0,
                        textStyle: {
                            fontSize: '14',
                            color: this._getColor()
                        },
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    dataset: {
                        dimensions: ['product', 'DTS', 'DVS', 'DTSS'],
                        source: this.data
                    },
                    xAxis: {
                        type: 'category',
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: this._getColor()
                            }
                        }
                    },
                    yAxis: {
                        name: '次数',
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: this._getColor()
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        max: function (value) {
                            return parseInt((value.max / 10) + 1) * 10;
                        }
                    },
                    // Declare several bar series, each will be mapped
                    // to a column of dataset.source by default.
                    series: [
                        {
                            type: 'bar',
                            center: ['50%', '30%',],
                            barWidth: 10,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                ]
                            },
                        },
                        {
                            type: 'bar',
                            center: ['50%', '30%'],
                            barWidth: 10,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                ],

                            },

                        },
                        {
                            type: 'bar',
                            center: ['50%', '30%'],
                            barWidth: 10,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                ]
                            },
                        },


                    ]
                }
            }
        }
    }
</script>

<style scoped>
    .echarts {
        height: 100%;
        width: 100%;
    }
</style>
