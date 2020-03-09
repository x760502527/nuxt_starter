<template>
    <div v-show="value">
        <div class="popup_container">
            <div class="popup_content">
                <Tree class="ivu-tree" @on-check-change="change" :data="items"  show-checkbox check-directly></Tree>
            </div>
            <div class="close" @click="close()">
                <v-btn small text icon >
                    <v-icon small>close</v-icon>
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "Layer",
        model: {
            prop: 'value',
        },
        data: () => ({
            color: '#666666',

        }),
        props: {
            value: {
                type: Boolean,
                default: false
            },
        },
        methods: {
            change(arr,obj){
                let id = obj['id']
                if(id=='all'){
                    this.$store.commit('changeLayerAll',obj['checked'])
                    return
                }
                this.$store.commit('changeLayerById',{id:obj['id'],value:obj['checked']})
            },
            close() {
                this.$store.commit('changePopupState', "")
            }
        },
        computed:{
            items(){
                return [{
                    id:"all",
                    title: '图层选择',
                    expand: true,
                    selected:true,
                    children: [
                        {
                            id:'markers',
                            title: '标志物',
                            checked: this.layer['markers']
                        },
                        {
                            id:'equipments',
                            title: '设备',
                            checked: this.layer['equipments']
                        },
                        {
                            id:'pipelines',
                            title: '管道',
                            checked: this.layer['pipelines']
                        },
                        {
                            id:'alarms',
                            title: '报警',
                            checked: this.layer['alarms']
                        },
                        {
                            id:'text',
                            title: '文字标注',
                            checked: this.layer['text']
                        },
                    ]
                }]
            },
            ...mapState([
                'layer'
            ])
        }
    }
</script>

<style scoped>
    .popup_container {
        border-radius: 5px;
        width: 12rem;
        background:rgba(54,119,184,.8);
        box-shadow:rgb(11, 234, 235) 0px 0px 18px inset,0px 0px 5px rgba(255,255,0,.8);
        color:#ffffff;
    }

    .popup_content{
        height: 15rem;
        overflow: auto;
        padding:3px 8px;
    }

    .popup_title {
        font-size: 16px;
        margin: 5px;
        padding: 5px;
        border-bottom: 1px solid #ffffff;
    }
    .close {
        position: absolute;
        right: 0px;
        top: 0px;
    }
</style>
<style lang="scss">
    .popup_container {
        * {
            font-size: 14px;
        }
    }

    .ivu-icon-ios-arrow-forward{
        position:relative;
        top:-2.5px;
    }
    .ivu-tree-title{
        color:#ffffff!important;
        background-color: rgba(0,0,0,0)!important;
    }
    Tree{
        display: block;
    }
    /*.ivu-tree ul{*/
    /*    padding: 0px!important;*/
    /*}*/
</style>
