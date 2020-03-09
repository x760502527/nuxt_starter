<template>
    <div style="height: 100%;width: 100%;padding: 10px">
        <v-chart autoresize class="echarts" :options="chartOption" theme="theme"/>
    </div>
</template>

<script>
    export default {
        async asyncData({$axios, callback}) {

        },
        async mounted() {

        },
        props:{
            data: {
                default: ()=>([
                    ['定温',0],
                    ['温速',0],
                    ['温差',0],
                    ['振动',0],
                    ['断纤',0],
                    ['应变',0],
                ])
            },
        },
        name: "AlarmTodayChart",
        data() {
            return {

            }
        },
        computed: {
            chartOption() {
                return {
                    tooltip: {
                        trigger: 'item',
                        formatter:function (parms){
                            const str= parms.marker+""+parms.data[0]+"</br>"+
                                "次数："+ parms.data[1]+"</br>"+
                                "占比："+ parms.percent+"%";
                            return  str ;
                        }
                    },
                    title: {
                        x: 'center',
                        top: '40%',
                        textStyle: {
                            fontSize: 18,
                            fontWeight: 'normal',
                            color: [this._getColor()]
                        },
                        subtextStyle: {
                            color: this._getColor(),
                            fontSize: 12
                        },
                    },
                    dataset:{
                        dimensions: ['', 'value'],
                        source:this.data
                    },
                    legend: {
                        show: true,
                        itemWidth: 14,
                        itemHeight: 14,
                        borderWidth: 0,
                        icon: "rect",
                        itemGap:15,
                        borderRadius: 0,
                        textStyle: {
                            fontSize: '14',
                            color: this._getColor()
                        },
                        data:['定温','温速','温差','\n','振动','断纤','应变'],
                    },
                    series: {
                        name:"今日报警",
                        type: 'pie',
                        selectedMode: 'single',
                        radius: ['20%', '50%'],//设置饼图大小
                        center: ['50%', '50%'],//设置饼图位置
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .echarts{
        height: 100%;
        width: 100%;
        display: block;
    }
</style>
