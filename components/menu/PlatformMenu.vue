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
                        <div :class="{animation:!listShow}" class="menu1"></div>
                    </v-col>
                    <v-col>
                        <div :class="{animation:!listShow}" class="menu2"></div>
                    </v-col>
                    <v-col>
                        <div :class="{animation:!listShow}" class="menu3"></div>
                    </v-col>
                    <v-col>
                        <div :class="{animation:!listShow}" class="menu4"></div>
                    </v-col>
                    <v-col>
                        <div :class="{animation:!listShow}" class="menu5"></div>
                    </v-col>
                    <v-col>
                        <div :class="{animation:!listShow}" class="menu6"></div>
                    </v-col>
                    <v-col>
                        <div :class="{animation:!listShow}" class="menu7"></div>
                    </v-col>
                    <v-col>
                        <div :class="{animation:!listShow}" class="menu8"></div>
                    </v-col>
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
                listShow: false
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
        background-image: url("/images/index_52.png");
        transform:translateX(left(3));
    }

    .menu4 {
        @extend %menuSize;
        background-image: url("/images/index_54.png");
        transform:translateX(left(4));
    }

    .menu5 {
        @extend %menuSize;
        background-image: url("/images/index_56.png");
        transform:translateX(left(5));
    }

    .menu6 {
        @extend %menuSize;
        background-image: url("/images/index_58.png");
        transform:translateX(left(6));
    }

    .menu7 {
        @extend %menuSize;
        background-image: url("/images/index_60.png");
        transform:translateX(left(7));
    }

    .menu8 {
        @extend %menuSize;
        background-image: url("/images/index_61.png");
        transform:translateX(left(8));
    }
</style>
