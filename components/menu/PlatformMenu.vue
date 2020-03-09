<template>
    <div>
        <div>
            <v-row no-gutters>
                <v-col>
                    <div class="menu" @click="listShow=!listShow"></div>
                </v-col>
                <v-row no-gutters style="align-items:center;
                justify-content:center;">

                    <v-col>
                        <div @click="goto('http://192.168.10.52:3000/')" :class="{animation:!listShow}" class="menu1" @mouseover="s1=true" @mouseout="s1=false">
                            <div :class="{hh:s1}" class="menu_name">生产运行监测</div>
                        </div>
                    </v-col>
                    <v-col>
                        <div @click="goto('http://192.168.10.228/product/index.html')" :class="{animation:!listShow}" class="menu2" @mouseover="s2=true" @mouseout="s2=false">
                            <div :class="{hh:s2}" class="menu_name">生产监控</div>
                        </div>
                    </v-col>
                    <v-col>
                        <div @click="goto('http://192.168.10.228/manager/index.html')" :class="{animation:!listShow}" class="menu3" @mouseover="s3=true" @mouseout="s3=false">
                            <div :class="{hh:s3}" class="menu_name">管道完整性管理</div>
                        </div>
                    </v-col>
                    <v-col>
                        <div @click="goto('http://192.168.10.228/spjk.html')" :class="{animation:!listShow}" class="menu4" @mouseover="s4=true" @mouseout="s4=false">
                            <div :class="{hh:s4}" class="menu_name">视频监控</div>
                        </div>
                    </v-col>
                    <v-col>
                        <div @click="goto('http://192.168.10.228/car/index.html')" :class="{animation:!listShow}" class="menu5" @mouseover="s5=true" @mouseout="s5=false">
                            <div :class="{hh:s5}" class="menu_name">车辆调度</div>
                        </div>
                    </v-col>
                    <v-col>
                        <div @click="goto('http://192.168.10.228/3d.html')" :class="{animation:!listShow}" class="menu6" @mouseover="s6=true" @mouseout="s6=false">
                            <div :class="{hh:s6}" class="menu_name">3d</div>
                        </div>
                    </v-col>
                    <v-col>
                        <div @click="goto('http://192.168.10.52:8083/WebFrames_war_exploded')" :class="{animation:!listShow}" class="menu7" @mouseover="s7=true" @mouseout="s7=false">
                            <div :class="{hh:s7}" class="menu_name">后台管理</div>
                        </div>
                    </v-col>
                   <!-- <v-col>
                        <div :class="{animation:!listShow}" class="menu8"></div>
                        <div></div>
                    </v-col>-->
                </v-row>

            </v-row>
        </div>

    </div>
</template>

<script>
    export default {
        name: "PlatFormMenu",
        data() {
            return {
                listShow: false,
                s1:false,
                s2:false,
                s3:false,
                s4:false,
                s5:false,
                s6:false,
                s7:false,
                s8:false,
            }
        },
        methods:{
            selectStyle(){

            },
            outStyle(){

            },
            goto(url){
                window.open(url)
                // window.location.href =url
            }
        }
    }
</script>

<style lang="scss" scoped>
    @keyframes getup {
        0%{
            transform:rotateY(0deg) rotateX(0deg) rotate(0deg);
            opacity: 1;
        }

        25%{
            transform:rotateY(0deg) rotateX(0deg) rotate(90deg);
        }
        50%{
            opacity: 1;
            transform:rotateY(0deg) rotateX(0deg) rotate(180deg);
        }

        75%{
            transform:rotateY(0deg) rotateX(0deg) rotate(270deg);
        }

        100%{
            opacity: 1;
            transform:rotateY(0deg) rotateX(0deg)  rotate(360deg);
        }
    }

    .menu {
        width: 156px;
        height: 159px;
        background-size: 100% 100%;
        background-image: url("/images/index_40.png");
        cursor: pointer;
        position: absolute;
        left:0;
        bottom: 0;
        opacity: .7;
        z-index: 2;
        transition: all .2s linear;
    }

    .menu:hover{
        animation: getup 3s linear;
        animation-iteration-count: infinite;
    }

    .animation{
        transform:translateX(24px)!important;
        opacity:0;
        z-index: 1;
    }
    %menuSize {
        width: 115px;
        height: 109px;
        background-size: 100% 100%;
        cursor: pointer;
        position: absolute;
        transition: all .2s linear;
        left:0;
        top: -134px;

    }

    @function left($n) {
        @return 156 + ($n - 1) * 110 + px
    }

    .hh{
        opacity: 1!important;
        margin-top: -10px!important;;
    }

    .menu_name{
        text-align: center;
        font-size: 16px;
        color:#ffffff;
        font-weight: bolder;
        margin-top: -5px;
        opacity: 0;
        transition: all .2s linear;
    }

    .menu1 {
        @extend %menuSize;
        background-image: url("/images/index_46.png");
        transform:translateX(left(1));
    }

    .menu2 {
        @extend %menuSize;
        background-image: url("/images/index_49.png");
        transform:translateX(left(2));
    }

    .menu3 {
        @extend %menuSize;
        background-image: url("/images/index_58.png");
        transform:translateX(left(3));
    }

    .menu4 {
        @extend %menuSize;
        background-image: url("/images/index_52.png");
        transform:translateX(left(4));
    }

    .menu5 {
        @extend %menuSize;
        background-image: url("/images/index_60.png");
        transform:translateX(left(5));
    }

    .menu6 {
        @extend %menuSize;
        background-image: url("/images/index_54.png");
        transform:translateX(left(6));
    }

    .menu7 {
        @extend %menuSize;
        background-image: url("/images/index_56.png");
        transform:translateX(left(7));
    }

    .menu8 {
        @extend %menuSize;
        background-image: url("/images/index_61.png");
        transform:translateX(left(8));
    }
</style>
