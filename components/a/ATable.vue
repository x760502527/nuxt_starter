<template>
    <div style="height: 0;
    width: 100%;
    overflow: auto;
    min-height: 100%;">
        <div class="table">
            <v-row class="tr" no-gutters v-for="(item,index) in data" :key="index">
                <v-col v-for="(item1,index1) in item" :key="index1" class="td">{{item1}}</v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "aTable",
        props: {
            data: {
                default: ()=>(
                    [
                        ['123','321']
                    ]
                )
            }
        },
        mounted(){
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
