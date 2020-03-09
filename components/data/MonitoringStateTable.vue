<template>
    <div style="height: 0;
    width: 100%;
    overflow: auto;
    min-height: 100%;">
        <div class="table">
            <v-row class="tr" no-gutters>
                <v-col cols="8" class="td">管道</v-col>
                <v-col cols="4" class="td">状态</v-col>
            </v-row>
            <v-row class="tr" no-gutters v-for="(item,index) in data" :key="index" @click="clickPP(item)">
                <v-col cols="8" class="td">{{item['name']}}</v-col>
                <v-col cols="4" class="td">
                    <v-chip small v-if="item['state']=='报警'"
                            color="red"
                            text-color="white">
                        报警
                        <v-icon right>mdi-alarm-light</v-icon>
                    </v-chip>
                    <v-chip small v-else-if="item['state']=='预警'"
                            color="orange"
                            text-color="white">
                        预警<v-icon right>mdi-alarm-light</v-icon>
                    </v-chip>
                    <v-chip small v-else-if="item['state']=='正常'"
                            color="green"
                            text-color="white">
                        正常<v-icon right>mdi-check-circle</v-icon>
                    </v-chip>
                </v-col>
            </v-row>
            <div class="tr none" v-if="data.length<1">
                暂无数据
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MonitoringState",
        props: {
            data: {
                default: () => (
                    []
                )
            }
        },
        mounted() {

        },
        methods:{
            clickPP(ob){
                this.$store.commit('setTarget',{id:ob.id,type:ob.type})
            }
        }
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
    .tr:hover{
        cursor: pointer;
        background: #2a8cef;
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
