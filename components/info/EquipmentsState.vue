<template>
    <div style="height: 0;
    width: 100%;
    overflow: auto;
    min-height: 100%;">
        <div class="table">
            <v-row class="tr" no-gutters>
                <v-col cols="6" class="td">名称</v-col>
                <v-col cols="3" class="td">类型</v-col>
                <v-col cols="3" class="td">状态</v-col>
            </v-row>
            <v-row class="tr" no-gutters v-for="(item,index) in data" :key="index" @click="clickEQ(item)">
                <v-col cols="6" class="td">{{item['EQ_NAME']}}</v-col>
                <v-col cols="3" class="td">{{item['EQ_SUB_TYPE_NAME']}}</v-col>
                <v-col cols="3" class="td">
                    <v-chip small v-if="item['EQ_STATUS']==1"
                            color="green"
                            text-color="white">
                        在线
                        <v-icon right>mdi-check-circle</v-icon>
                    </v-chip>
                    <v-chip small v-else-if="item['EQ_STATUS']==0"
                            color="red"
                            text-color="white">
                        离线<v-icon right>mdi-close-circle</v-icon>
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
    import {getDictionaryName} from '../../util/getDictionaryName'
    export default {
        name: "EquipmentsState",
        props: {
            data: {
                default: () => (
                    []
                )
            }
        },
        filters:{
            type(data){
                return getDictionaryName(data)['name']
            }
        },
        methods:{
            clickEQ(ob){
                this.$store.commit('setTarget',{id:ob.EQ_ID,type:'equipment'})
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
