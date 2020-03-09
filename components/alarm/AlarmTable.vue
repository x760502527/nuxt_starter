<template>
    <div style="height: 0;
    width: 100%;
    overflow: auto;
    min-height: 100%;">
        <div class="table">
            <v-row class="tr" no-gutters>
                <v-col cols="3" class="td">级别</v-col>
                <v-col cols="3" class="td">管道位置（米）</v-col>
                <v-col cols="6" class="td">时间</v-col>
            </v-row>
            <v-row class="tr" no-gutters v-for="(item,index) in data" :key="index">
                <v-col cols="3" class="td">{{item['type']}}</v-col>
                <v-col cols="3" class="td">{{item['ppLoc']}}</v-col>
                <v-col cols="6" class="td">{{item['time']}}</v-col>
                <!-- <v-col cols="3" class="td">{{item['levelId']}}</v-col>
                <v-col cols="3" class="td">{{item['pipelineLocation']}}</v-col>
                <v-col cols="6" class="td">{{item['alarmTime']}}</v-col> -->
            </v-row>
            <div class="tr none" v-if="data.length<1">
                暂无数据
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AlarmTable",
        props: {
            data: {
                default: () => (
                    []
                )
            }
        },
    }
</script>
<style lang="scss" scoped>
    .table{
        height: 100%;
    }
    .tr + .tr{
        border-top:1px dashed #3b8070;
    }
    .td{
        text-align: center;
        padding:0 4px;
    }
    .tr{
        min-height: 40px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .none{
        height: calc(100% - 70px);
        color:#aaaaaa;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
<style lang="scss">

</style>
