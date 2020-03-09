<template>
    <div>
        <v-row class="row" no-gutters>
            <v-col cols="4" class="text-right">
                序号：
            </v-col>
            <v-col cols="8">
                {{data['PP_ID']}}
            </v-col>
        </v-row>
        <v-row class="row" no-gutters>
            <v-col cols="4" class="text-right">
                名称：
            </v-col>
            <v-col cols="8">
                {{data['PP_NAME']}}
            </v-col>
        </v-row>
        <v-row class="row" no-gutters>
            <v-col cols="4" class="text-right">
                所属部门：
            </v-col>
            <v-col cols="8">
                {{data['PP_DEP']}}
            </v-col>
        </v-row>
        <v-row class="row" no-gutters>
            <v-col cols="4" class="text-right">
                类型：
            </v-col>
            <v-col cols="8">
                {{data['PP_TYPE_NAME']}}
            </v-col>
        </v-row>
        <v-row class="row" no-gutters>
            <v-col cols="4" class="text-right">
                长度：
            </v-col>
            <v-col cols="8">
                {{data['PP_LEN'] | length}}
            </v-col>
        </v-row>
        <v-row class="row" no-gutters>
            <v-col cols="4" class="text-right">
                投产日期：
            </v-col>
            <v-col cols="8">
                {{data['PP_COMMISSION_DATE']}}
            </v-col>
        </v-row>
        <v-row class="row" no-gutters>
            <v-col cols="4" class="text-right">
                备注：
            </v-col>
            <v-col cols="8">
                {{data['PP_REMARK']}}
            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        name: "PipelineInfo",
        props: {
            data: {
                default:()=> ({})
            },

        },
        filters:{
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
