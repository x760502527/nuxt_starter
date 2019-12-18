<template>
    <div style="height: 0;
    width: 100%;
    overflow: auto;
    min-height: 100%;">
        <div class="table">
            <v-row class="tr" no-gutters>
                <v-col class="td">报警级别</v-col>
                <v-col class="td">详情</v-col>
                <v-col class="td">时间</v-col>
            </v-row>
            <v-row class="tr" no-gutters>
                <v-col class="td">温度一级</v-col>
                <v-col class="td">管道100米处</v-col>
            </v-row>
            <v-row class="tr" no-gutters>
                <v-col class="td">温度二级</v-col>
                <v-col class="td">管道100米处</v-col>
            </v-row>
            <v-row class="tr" no-gutters>
                <v-col class="td">震动一级</v-col>
                <v-col class="td">管道100米处</v-col>
            </v-row>
            <v-row class="tr" no-gutters>
                <v-col class="td">震动一级</v-col>
                <v-col class="td">管道100米处</v-col>
            </v-row>
            <v-row class="tr" no-gutters>
                <v-col class="td">震动一级</v-col>
                <v-col class="td">管道100米处</v-col>
            </v-row>
            <v-row class="tr" no-gutters>
                <v-col class="td">震动一级</v-col>
                <v-col class="td">管道100米处</v-col>
            </v-row>
            <v-row class="tr" no-gutters>
                <v-col class="td">震动一级</v-col>
                <v-col class="td">管道100米处</v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AlarmTable"
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
