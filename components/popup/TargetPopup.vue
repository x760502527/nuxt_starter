<template>
    <div v-show="value">
        <div class="popup_container">
            <div class="popup_content">
                <v-treeview selectable dense
                            :items="data" :color="color"></v-treeview>
            </div>
            <!--<div class="close" @click="close()">
                <v-btn x-small text icon color="pink">
                    <v-icon x-small>close</v-icon>
                </v-btn>
            </div>-->
        </div>
    </div>
</template>

<script>
    export default {
        name: "TargetPopup",
        model:{
            prop:'value',
            event:'showChange'
        },
        data: () => ({
            color: '#666666',
        }),
        props: {
            value: {
                type: Boolean,
                default: false
            },
            data: {
                default: ()=>(
                    [
                        {
                            id: 1,
                            name: '管道1',
                        },
                        {
                            id: 2,
                            name: '管道2',
                        },
                        {
                            id: 3,
                            name: '管道3',
                        }
                    ]
                )
            },
        },
        methods: {
            close() {
                this.$store.commit('changePopupState', "")
            }
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
        padding: 5px;
    }

    .popup_title {
        font-size: 16px;
        margin: 5px;
        padding: 5px;
        border-bottom: 1px solid #ffffff;
    }
    .close {
        position: absolute;
        right:0px;
        top: 3px;
    }
</style>
<style lang="scss">
    .popup_container {
        * {
            font-size: 14px;
        }



    }
    .v-application .accent--text{
        color:#ffffff!important;
    }
    .v-treeview--dense .v-treeview-node__root {
        min-height: 32px!important;
    }
    .v-icon.v-icon{
        font-size: 18px;
    }
    .v-treeview-node--leaf > .v-treeview-node__root{
        padding-left:14px;
    }
</style>
