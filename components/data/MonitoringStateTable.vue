<template>
    <div style="height: 0;
    width: 100%;
    overflow: auto;
    min-height: 100%;">
        <div class="table">
            <v-row class="tr" no-gutters>
                <v-col class="td">管道</v-col>
                <v-col class="td">状态</v-col>
            </v-row>
            <v-row class="tr" no-gutters>
                <v-col class="td">管道啊啊啊啊</v-col>
                <v-col class="td">大飒飒</v-col>
            </v-row>
            <v-row class="tr" no-gutters>
                <v-col class="td">管道换行</v-col>
                <v-col class="td">的撒</v-col>
            </v-row>
            <v-row class="tr" no-gutters>
                <v-col class="td">管道换行</v-col>
                <v-col class="td">的撒</v-col>
            </v-row>
            <v-row class="tr" no-gutters>
                <v-col class="td">管道换行</v-col>
                <v-col class="td">的撒</v-col>
            </v-row>
            <v-row class="tr" no-gutters>
                <v-col class="td">管道换行</v-col>
                <v-col class="td">的撒</v-col>
            </v-row>
            <v-row class="tr" no-gutters>
                <v-col class="td">管道换行</v-col>
                <v-col class="td">的撒</v-col>
            </v-row>
            <v-row class="tr" no-gutters>
                <v-col class="td">管道换行</v-col>
                <v-col class="td">的撒</v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MonitoringState",
        props: {
            data: {
                default: ()=>(
                    [

                    ]
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
    }
    .tr{
        height: 40px;
        line-height: 40px;
        text-align: center;
    }
</style>
<style lang="scss">

</style>
