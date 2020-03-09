<template>
    <div>
        <v-row class="row" no-gutters>
            <v-col cols="4" class="text-right">
                设备ID：
            </v-col>
            <v-col cols="8">
                {{data['EQ_ID']}}
            </v-col>
        </v-row>
        <v-row class="row" no-gutters>
            <v-col cols="4" class="text-right">
                名称：
            </v-col>
            <v-col cols="8">
                {{data['EQ_NAME']}}
            </v-col>
        </v-row>
        <v-row class="row" no-gutters>
            <v-col cols="4" class="text-right">
                类型：
            </v-col>
            <v-col cols="8">
                {{data['EQ_SUB_TYPE_NAME']}}
            </v-col>
        </v-row>
        <v-row class="row" no-gutters>
            <v-col cols="4" class="text-right">
                通道号：
            </v-col>
            <v-col cols="8">
                {{data['EQ_CHN_NUM']}}
            </v-col>
        </v-row>
        <v-row class="row" no-gutters>
            <v-col cols="4" class="text-right">
                注册日期：
            </v-col>
            <v-col cols="8">
                {{data['CHANGE_TIME']}}
            </v-col>
        </v-row>
        <v-row class="row" no-gutters>
            <v-col cols="4" class="text-right">
                经纬度：
            </v-col>
            <v-col cols="8">
                {{pos}}
            </v-col>
        </v-row>
        <v-row class="row" no-gutters>
            <v-col cols="4" class="text-right">
                状态：
            </v-col>
            <v-col cols="8">
                <v-chip small v-if="data['onlineStatus']==1"
                        color="green"
                        text-color="white">
                    在线
                    <v-icon right>mdi-check-circle</v-icon>
                </v-chip>
                <v-chip small v-else-if="data['onlineStatus']==0"
                        color="red"
                        text-color="white">
                    离线<v-icon right>mdi-close-circle</v-icon>
                </v-chip>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        name: "EquipmentInfo",
        props: {
            data: {
                default:()=>({})
            }
        },
        filter:{
            length(data){
                return data + "米"
            }
        },
        computed:{
            length(){
                if(this.data['PP_LEN']){
                    return this.data['PP_LEN'] + '米'
                }
                return ''
            },
            pos(){
                let lat = this.data['EQ_LAT'] || 0
                // let lon = this.data['EQ_LAT'] || 0
                let lon = this.data['EQ_LON'] || 0
                // if(lat == lon == 0){
                //     return ''
                // }
                return `${lat.toFixed(2)}°N,${lon.toFixed(2)}°E`
            }
        }
    }
</script>

<style scoped>
    .row{
        word-break: break-all;
        padding:5px 5px;
    }
</style>
