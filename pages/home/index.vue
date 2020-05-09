<template>
    <div class="home_index" style="min-width: 1200px">
        <div class="body" style="background-image:url('/banner/images/chanpin-bg.png');background-size: 100% 100%;position: fixed;height: 100%; width:100%;z-index: -999">

        </div>
        <div style="height: 100px;position: fixed;width: calc(100% - 80px);padding:0px 40px;">
            <div style="float:left">
                <iframe id="iframe1" style="display: none;" allowtransparency="true" frameborder="0" width="180"
                        height="36" scrolling="no"
                        src="//tianqi.2345.com/plugin/widget/index.htm?s=3&z=2&t=0&v=0&d=3&bd=0&k=000000&f=ffffff&ltf=ffffff&htf=ffffff&q=1&e=1&a=0&c=61073&w=180&h=36&align=center"></iframe>
                <img style="display: none;" id="img1" alt="2345天气预报"
                     src="http://tianqi.2345.com/theme2/img/logo160722.png">
                <!--<iframe style="position: absolute;left:10px;" allowtransparency="true" frameborder="0" width="180"
                        height="30" scrolling="no"
                        src="//tianqi.2345.com/plugin/widget/index.htm?s=3&amp;z=2&amp;t=0&amp;v=0&amp;d=3&amp;bd=0&amp;k=&amp;f=ffffff&amp;ltf=ffffff&amp;htf=ffffff&amp;q=1&amp;e=1&amp;a=1&amp;c=54511&amp;w=180&amp;h=30&amp;align=center"></iframe>-->
            </div>
            <div style="float:right;margin-top: 10px;color:#fff;">
        <span style="font-size: 12px;">
            <i aria-hidden="true" class="v-icon notranslate mdi mdi-account theme--dark"
               style="color: rgb(3, 183, 201); margin-top: -2px;"></i>
            欢迎您，<span id="username"></span>
        </span>
                <span onclick="window.location='/login'" class="exit"
                      style="font-size: 12px;margin-left: 10px;cursor: pointer;">
                        <i aria-hidden="true" class="v-icon notranslate mdi mdi-power theme--dark"
                           style="color: rgb(3, 183, 201); margin-top: -2px;"></i>
            退出
        </span>
            </div>
        </div>
        <div class="top-nav">
            <span>油气运销部管道动态监测管理系统</span>
        </div>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide slide1">
                    <a href="/banner/liaojie-yunxing.html" class="inner">
                        <img src="/banner/images/chanpin-zong01.png" class="ani img s0" swiper-animate-effect="bounceInRight">
                        <span class="ani img s1 en" swiper-animate-effect="bounceInRight">Pipeline dynamic monitoring and management system of oil and gas transportation and sales department</span>
                        <span class="ani img dazi" swiper-animate-effect="bounceInRight">油气运销部管道动态监测管理系统</span>
                        <img style="    top: 300px;" src="/banner/images/hengxian-faguang.png" class="ani img s3"
                             swiper-animate-effect="bounceInRight">
                        <span class="ani img xiaozi" swiper-animate-effect="bounceInRight">一步到位的全周期一体化管网综合管理平台</span>

                    </a>
                </div>
                <div class="swiper-slide slide1">
                    <a href="/" class="inner">
                        <img src="/banner/images/chanpin-banner-dtjk.png" class="ani img dtjcimg"
                             swiper-animate-effect="bounceInRight">
                        <span class="ani img dtjcen" swiper-animate-effect="bounceInRight" swiper-animate-duration="1s"
                              swiper-animate-delay="0s">Pipeline operation</span>
                        <span class="ani img dtjcdazi" swiper-animate-effect="bounceInRight">动态监测</span>
                        <img src="/banner/images/hengxian-faguang.png" class="ani img dtjcguangbiao"
                             swiper-animate-effect="bounceInRight">
                        <span class="ani img dtjcxiaozi" swiper-animate-effect="bounceInRight">多参量监控综合管网管理分析</span>
                        <!--<img src="images/liaojie.png" class="ani img dtjcliaojie" swiper-animate-effect="fadeInUp"
                             swiper-animate-duration="2s" swiper-animate-delay=".2s">-->
                    </a>
                </div>
                <div class="swiper-slide slide1">
                    <a href="/banner/liaojie-yingji.html" class="inner">
                        <img src="/banner/images/chanpin-banner02.png" class="ani img dtjcimg"
                             swiper-animate-effect="bounceInRight">
                        <span class="ani img dtjcen" swiper-animate-effect="bounceInRight">Emergency command</span>
                        <span class="ani img dtjcdazi" swiper-animate-effect="bounceInRight">应急指挥</span>
                        <img src="/banner/images/hengxian-faguang.png" class="ani img dtjcguangbiao"
                             swiper-animate-effect="bounceInRight">
                        <span class="ani img dtjcxiaozi" swiper-animate-effect="bounceInRight">综合应急调度，快速事故处置</span>
                        <!--<img src="images/liaojie.png" class="ani img dtjcliaojie" swiper-animate-effect="zoomInDown"
                             swiper-animate-duration="2s" swiper-animate-delay=".2s">-->
                    </a>
                </div>
                <div class="swiper-slide slide1">
                    <a href="/banner/liaojie-wanzhengxing.html" class="inner">
                        <img src="/banner/images/chanpin-banner03.png" class="ani img dtjcimg"
                             swiper-animate-effect="bounceInRight">
                        <span class="ani img wxxen" swiper-animate-effect="bounceInRight">Integrity management</span>
                        <span class="ani img wzxdazi" swiper-animate-effect="bounceInRight">完整性管理</span>
                        <img src="/banner/images/hengxian-faguang.png" class="ani img dtjcguangbiao"
                             swiper-animate-effect="bounceInRight">
                        <span class="ani img dtjcxiaozi" swiper-animate-effect="bounceInRight">六部循环监控，安全风险评估</span>
                        <!--<img src="images/liaojie.png" class="ani img dtjcliaojie" swiper-animate-effect="zoomInDown"
                             swiper-animate-duration="2s" swiper-animate-delay=".2s">-->
                    </a>
                </div>
                <div class="swiper-slide slide1">
                    <a href="/banner/liaojie-jichu.html" class="inner">
                        <img src="/banner/images/chanpin-banner04.png" class="ani img jcxximg"
                             swiper-animate-effect="bounceInRight">
                        <span class="ani img jcxxen"
                              swiper-animate-effect="bounceInRight">Basic information system</span>
                        <span style="    right: 134px;" class="ani img jcxxdazi"
                              swiper-animate-effect="bounceInRight">基础信息</span>
                        <img src="/banner/images/hengxian-faguang.png" class="ani img dtjcguangbiao"
                             swiper-animate-effect="bounceInRight">
                        <span class="ani img dtjcxiaozi" swiper-animate-effect="bounceInRight">全生命周期基础信息管理系统</span>
                        <!--<img src="images/liaojie.png" class="ani img dtjcliaojie" swiper-animate-effect="zoomInDown"
                             swiper-animate-duration="2s" swiper-animate-delay=".2s">-->
                    </a>
                </div>
            </div>
            <div class="pagination">
            </div>
        </div>
        <div class="bottom_nav">
            <div class="nav_s">
                <div @click="toLink('/base')" class="nav_c" data-num="1">
                    <i class="fa fa-file-text" aria-hidden="true"></i>
                </div>
                <div class="nav_f">基础信息</div>
            </div>
            <div class="nav_s">
                <div @click="toLink1('/')" class="nav_c" data-num="2">
                    <i class="fa fa-crosshairs" aria-hidden="true"></i>
                </div>
                <div class="nav_f">动态监测</div>
            </div>
            <div class="nav_s">
                <div @click="toLink('/product')" class="nav_c" data-num="3">
                    <i class="fa fa-random" aria-hidden="true"></i>
                </div>
                <div class="nav_f">生产运行</div>
            </div>
            <div class="nav_s">
                <div @click="toLink('/ai')" class="nav_c" data-num="4">
                    <i class="fa fa-puzzle-piece" aria-hidden="true"></i>
                </div>
                <div class="nav_f">隐患治理</div>
            </div>
            <div class="nav_s">
                <div @click="toLink('/pi')" class="nav_c" data-num="5">
                    <i class="fa fa-share-alt" aria-hidden="true"></i>
                </div>
                <div class="nav_f">完整性管理</div>
            </div>
            <div class="nav_s">
                <div @click="toLink('/cm')" class="nav_c" data-num="6">
                    <i class="fa fa-random" aria-hidden="true"></i>
                </div>
                <div class="nav_f">应急指挥</div>
            </div>
            <div class="nav_s">
                <div class="nav_c" data-num="7">
                    <i class="fa fa-ils" aria-hidden="true"></i>
                </div>
                <div class="nav_f">模拟仿真</div>
            </div>
            <div class="nav_s">
                <div class="nav_c" data-num="8">
                    <i class="fa fa-sort-numeric-asc"></i>
                </div>
                <div class="nav_f">数字管理</div>
            </div>
        </div>
    </div>
</template>

<script>
    import '@/static/banner/css/idangerous.swiper2.7.6.css'
    import '@/static/banner/css/animate.min.css'
    import '@/static/banner/css/style.css'
    import '@/static/banner/css/font.css'
    import '@/static/banner/css/font-awesome.css'
    import '@/static/banner/css/brands.css'
    import '@/static/banner/css/solid.css'
    import apiService from "@/services/apiService"

    import $ from 'jquery'
    export default {
        name: "index",
        asyncData(){
            let p = process.env['properties'] || {}
            let address_around = p['address_around']
            return { address_around: address_around}
        },
        mounted() {
            // const datas = apiService.configJson()
            // this.address_around = datas['address_around']

            var mySwiper = new Swiper('.swiper-container', {
                pagination: '.pagination',
                paginationClickable: true,
                autoplay: 5000,
                loop: true,
                speed: 1,
                autoplayDisableOnInteraction: false,
                //autoplayDisableOnInteraction : false,

                onInit: function (swiper) { //Swiper2.x的初始化是onFirstInit
                    swiperAnimateCache(swiper); //隐藏动画元素
                    setTimeout(function(){ //2s后开始运行动画（移动端总是没加载完图片就开始动画了。。。。。）
                        swiperAnimate(swiper); //初始化完成开始动画
                    },0)
                },
                onSlideChangeEnd: function (swiper) {
                    swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
                }
            })

            //用户名
            var username = 'admin'
            var user = this.getCookie('user')
            if (user) {
                user = JSON.parse(user)
                username = user['userName']
            }
            $('#username').text(username)


            $('#img1').attr('src', 'http://tianqi.2345.com/theme2/img/logo160722.png?' + new Date().getTime())
            $('#img1').on('load', function () {
                $('#iframe1').css('display', 'block')
            })

            $('.nav_c').hover(function () {
                var cnum = $(this).data('num')
                $('.nav_c').each(function (c) {
                    var num = $(this).data('num')
                    var cha = Math.abs(cnum - num)
                    if (cha == 7) {
                        $(this).css('transform', 'scale(0.3) translateY(-5%)')
                        $(this).css('background-image', 'url("/images/lanzhuan.png")')
                        return
                    }
                    if (cha == 0) {
                        $(this).css('transform', 'scale(1.0) translateY(-30%) rotate(180deg)')
                        $(this).css('background-image', 'url("/images/hongzhuan.png")')
                    } else {
                        var size = 1 - (cha * 0.1)
                        var ty = 30 - (cha * 5)
                        $(this).css('transform', 'scale(' + size + ') translateY(-' + ty + '%)')
                        $(this).css('background-image', 'url("/images/lanzhuan.png")')

                    }

                })
            }, function () {
            })
        },
        methods:{
            getCookie(c_name){
                if (document.cookie.length > 0) {
                    var c_start = document.cookie.indexOf(c_name + "=")
                    if (c_start != -1) {
                        c_start = c_start + c_name.length + 1
                        var c_end = document.cookie.indexOf(";", c_start)
                        if (c_end == -1)
                            c_end = document.cookie.length
                        return unescape(document.cookie.substring(c_start, c_end))
                    }
                }
                return ""
            },
            toLink(a){
                window.location=this.address_around + a
            },
            toLink1(a){
                window.location=a
            }
        },
        data(){
            return{
                // address_around:''
            }
        }
    }
</script>

<style scoped lang="scss">
    .home_index {
        .v-icon {
            align-items: center;
            display: inline-flex;
            font-feature-settings: "liga";
            font-size: 24px;
            justify-content: center;
            letter-spacing: normal;
            line-height: 1;
            text-indent: 0;
            transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
            vertical-align: middle;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        .mdi-account::before {
            content: "\F004";
        }

        .mdi:before, .mdi-set {
            display: inline-block;
            font: normal normal normal 24px/1 "Material Design Icons";
            font-size: inherit;
            text-rendering: auto;
            line-height: inherit;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        .exit:hover {
            color: rgb(2, 203, 205);
        }
        .bottom_nav {
            margin-top: 160px !important;
            margin-bottom: 40px !important;
            color: #fff;
            display: flex;
            width: 1000px;
            margin: auto;
            justify-content: space-around;
        }

        .nav_f {
            font-size: 16px;
        }

        .nav_s {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .nav_c {
            font-size: 20px;
            height: 50px;
            width: 50px;
            transition: all .6s;
            background-image: url("/images/lanzhuan.png");
            background-size: 100% 100%;
            text-align: center;
            line-height: 50px;
            cursor: pointer;
            transform: scale(0.8) translateY(-10%)
        }
    }
</style>
<style lang="scss">
    .v-application {
        background: none !important;
    }
</style>
