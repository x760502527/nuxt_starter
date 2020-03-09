<template>
    <div style="height: 100%;width: 100%;padding:10px;">
        <v-chart ref="myChart" autoresize :options="chartOption" theme="theme"/>
    </div>
</template>

<script>
    export default {
        name: "EquipmentRate",
        props: {
            data: {
                default: () => (
                    {}
                )
            }
        },
        computed:{
            chartOption(){
                let cpu = this.data['cpuUsed'] || 0
                let disk = this.data['disksUsed'] || 0
                let momory = this.data['freeUsed'] || 0
                return {
                    polar: {},
                    tooltip: {
                        show: true,
                        formatter: '{b}'
                    },
                    angleAxis: {
                        show: false,
                        min: function (value) {
                            return 0
                        },
                        max: function (value) {
                            return 100
                        }
                    },
                    radiusAxis: {
                        z: 999,
                        type: 'category',
                        axisLabel: {
                            interval: 0,
                            color: "#fff",
                            fontSize: 12
                        },
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false,
                            alignWithLabel: true
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: "rgba(17, 51, 68, 0.8)"
                            }
                        },
                        data: [`磁盘使用率${disk}%`,`CPU使用率${cpu}%`,`内存使用率${momory}%`]
                    },
                    series: [
                        {
                            type: 'bar',
                            coordinateSystem: 'polar',
                            barWidth: 8,
                            itemStyle: {
                                barBorderRadius: 10,
                                shadowBlur: 20,
                                // shadowColor: "rgba(255, 255, 255, 0.8)",
                            },
                            emphasis: {
                                itemStyle: {
                                    shadowColor: "rgba(255, 255, 255, 1)",
                                }
                            },
                            data: [
                                {
                                    name: `磁盘使用率${disk}%`, value: disk,
                                    itemStyle: {
                                        normal: {
                                            color: "rgb(93,50,158)"
                                        }
                                    }
                                },
                                {
                                    name: `CPU使用率${cpu}%`, value: cpu,
                                    itemStyle: {
                                        normal: {
                                            color: 'rgb(255,124,1)'
                                        }
                                    }
                                },
                                {
                                    name: `内存使用率${momory}%`, value: momory,
                                    itemStyle: {
                                        normal: {
                                            color: 'rgb(36,135,204)'
                                        }
                                    }
                                },
                            ]
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
