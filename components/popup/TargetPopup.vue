<template>
    <div v-show="value">
        <div class="popup_container">
            <div class="popup_content">
                <Tree class="ivu-tree" @on-select-change="select1" :data="items"  check-directly :render="renderContent"></Tree>
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
    import apiService from "../../services/apiService"

    export default {
        name: "TargetPopup",
        model: {
            prop: 'value',
            event: 'showChange'
        },
        data: () => ({
            color: '#666666',
            items: [{
                id: "0",
                title: '管道公司',
                expand: true,
                selected: true,
                children: [

                ]
            }],
            buttonProps: {
                type: 'default',
                size: 'small',
            }
        }),
        props: {
            value: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
            this.getTree()
        },
        methods: {
            select1(arr, obj) {
            },
            async getTree() {
                const data = await apiService.getTree()
                this.items = this.toRTree(data)
            },
            toRTree(arr) {
                let newData = []
                for (let item of arr) {
                    let {id, text, nodes,type} = item
                    let ob = {
                        id,
                        type,
                        title: text,
                        children: this.toRTree(nodes),
                    }
                    if(id == '0'){
                        ob.expand = true
                    }
                    newData.push(ob)
                }
                return newData
            },
            close() {
                this.$store.commit('changePopupState', "")
            },
            renderContent (h, { root, node, data }) {
                let {type} = data
                let src= '/images/tree/r1.png'
                if(type=='dept'){
                    src='/images/tree/r4.png'
                }else if(type=='pipeline'){
                    src='/images/tree/r3.png'
                }else if(type=='equipment'){
                    src='/images/tree/r2.png'
                }
                return h('span', {
                    style: {
                    },
                    class:'ivu-tree-title',
                    on: {
                        click: () => {
                            if(data.id=='0' || data.type=='dept'){
                                this.$set(data, 'expand', !data['expand']);
                            }else{
                                this.$store.commit('setTarget',{id:data.id,type:data.type})
                            }
                        }
                    },
                }, [
                    h('span',{
                        style:{
                            display:'flex',
                            "justify-content":"center",
                            'align-item':"center"
                        }
                    } ,[
                        h('img', {
                            attrs: {
                                src: src
                            },
                            style: {
                                height:'21px',
                                width:'21px',
                                marginRight: '2px'
                            }
                        }),
                        h('span', data.title)
                    ]),
                ]);
            },
        }
    }
</script>


<style scoped>
    .popup_container {
        border-radius: 5px;
        background: rgba(54, 119, 184, .8);
        box-shadow: rgb(11, 234, 235) 0px 0px 18px inset, 0px 0px 5px rgba(255, 255, 0, .8);
        color: #ffffff;
    }

    .popup_content {
        width: 15rem;
        overflow: auto;
        height: 20rem;
        padding: 3px 8px;
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

        .ivu-tree-title{
            padding:0px;
        }
    }

    .v-application .accent--text {
        color: #ffffff !important;
    }

    .v-treeview--dense .v-treeview-node__root {
        min-height: 32px !important;
    }

    .v-icon.v-icon {
        font-size: 18px;
    }

    .v-treeview-node--leaf > .v-treeview-node__root {
        padding-left: 14px;
    }

    Tree {
        display: block;
    }
</style>
