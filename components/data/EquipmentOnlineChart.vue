<template>
    <div style="height: 100%;width: 100%">
        <v-chart ref="echart" :options="chartOption" theme="theme"/>
    </div>
</template>

<script>
    export default {
        name: "EquipmentOnlineChart",
        data() {
            return {}
        },
        props: {
            data: {
                default: ()=>(
                    [
                        ['product', '当前在线率','最大在线率'],
                        ['西北', 1,100],
                        ['西南', 5,100],
                        ['华北', 10,100],
                        ['华南', 50,100],
                    ]
                )
            }
        },
        computed: {
            chartOption() {
                let echart = this.$refs["echart"]
                return {
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    dataset: {
                        dimensions: ['product', '当前在线率','最大在线率'],
                        source: this.data
                    },
                    xAxis: [
                        {
                            type: 'category',
                            axisTick:{
                                show:false
                            },
                            axisLine: {
                                lineStyle: {
                                    color: this._getColor()
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '在线率(%)',
                            axisLine: {
                                lineStyle: {
                                    color: this._getColor()
                                }
                            },
                            axisTick:{
                                show:false
                            },
                            max:100,
                            splitLine:{
                                show:false
                            }
                        }
                    ],
                    series: [
                        {
                            type: 'bar',
                            barWidth: 20,
                        },
                        {
                            type: 'bar',
                            barGap: '-100%',
                            barWidth: 20,
                            itemStyle: {
                                normal: {
                                    barBorderRadius: 5,

                                }
                            },
                            z: -12,
                            itemStyle: {
                                normal: {
                                    color: 'rgba(0,0,0,0)',
                                    barBorderColor: 'rgb(254,114,0)',
                                    barBorderWidth:1,
                                    barBorderRadius:0,
                                    borderType:"dotted"
                                }
                            }
                        },
                    ]
                }
            }
        }
    }
</script>

<style scoped>
    .echarts{
        height: 100%;
        width: 100%;
    }
</style>
