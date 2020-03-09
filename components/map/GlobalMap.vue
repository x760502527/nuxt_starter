<template>
    <div class="viewer" >
        <vc-viewer @ready="ready" :timeline="true" :animation="true" :shouldAnimate="true" :fullscreenButton="true" :infoBox="false" :selectionIndicator="false"
                   ref="viewer">
            <div class="cesium-viewer-toolbar" style="z-index: 9999">
                <button @click="mapSet=!mapSet" type="button" class="cesium-button cesium-toolbar-button"
                        title="选择地图">
                    <img :src="cMapImg"
                        draggable="false" class="cesium-baseLayerPicker-selected">
                </button>
                <div v-show="mapSet" class="cesium-baseLayerPicker-dropDown cesium-baseLayerPicker-dropDown-visible"
                     data-bind="css: { &quot;cesium-baseLayerPicker-dropDown-visible&quot; : dropDownVisible }"
                     style="max-height: 781px;">
                    <div class="cesium-baseLayerPicker-sectionTitle"
                         data-bind="visible: imageryProviderViewModels.length > 0">地图
                    </div>
                    <div class="cesium-baseLayerPicker-section" >
                        <div class="cesium-baseLayerPicker-category">
                            <div class="cesium-baseLayerPicker-categoryTitle">在线</div>
                            <div class="cesium-baseLayerPicker-choices">
                                <div class="cesium-baseLayerPicker-item"
                                     :class="{'cesium-baseLayerPicker-selectedItem':selectMap=='GDWX'}"
                                     title="Bing Maps standard road maps, provided by Cesium ion">
                                        <img class="cesium-baseLayerPicker-itemIcon"
                                        draggable="false"
                                        @click="clickGDWX"
                                        title="高德卫星"
                                        src="/images/map/gdwx.jpg">
                                    <div class="cesium-baseLayerPicker-itemLabel">高德卫星
                                    </div>
                                </div>

                                <div class="cesium-baseLayerPicker-item"
                                     :class="{'cesium-baseLayerPicker-selectedItem':selectMap=='GDLW'}"
                                     @click="clickGDLW"
                                     title="高德路网"><img class="cesium-baseLayerPicker-itemIcon" draggable="false"
                                       src="/images/map/gdlk.jpg">
                                    <div class="cesium-baseLayerPicker-itemLabel" data-bind="text: name">高德路网</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cesium-baseLayerPicker-sectionTitle"
                         data-bind="visible: terrainProviderViewModels.length > 0">地形
                    </div>
                    <div class="cesium-baseLayerPicker-section" data-bind="foreach: _terrainProviders">
                        <div class="cesium-baseLayerPicker-category">
                            <div class="cesium-baseLayerPicker-categoryTitle" data-bind="text: name">在线</div>
                            <div class="cesium-baseLayerPicker-choices" data-bind="foreach: providers">
                                <div class="cesium-baseLayerPicker-item"
                                     :class="{'cesium-baseLayerPicker-selectedItem':selectTerrain=='WGS84'}"
                                     @click="clickWGS84"
                                     title="WGS84平面地形"><img
                                        class="cesium-baseLayerPicker-itemIcon" data-bind="attr: { src: iconUrl }"
                                        draggable="false"
                                        src="/images/map/WGS84.jpg">
                                    <div class="cesium-baseLayerPicker-itemLabel" data-bind="text: name">WGS84平面地形
                                    </div>
                                </div>
                                <div class="cesium-baseLayerPicker-item"
                                     @click="clickCesium"
                                     :class="{'cesium-baseLayerPicker-selectedItem':selectTerrain=='cesium'}"
                                     title="Cesium世界地形">
                                    <img class="cesium-baseLayerPicker-itemIcon" data-bind="attr: { src: iconUrl }"
                                         draggable="false"
                                         src="/images/map/cesium.jpg">
                                    <div class="cesium-baseLayerPicker-itemLabel" data-bind="text: name">Cesium世界地形
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <vc-layer-imagery :alpha="alpha" :brightness="brightness" :contrast="contrast">
                <!--<vc-provider-imagery-bingmaps
                        url="https://dev.virtualearth.net"
                        bmKey="AgcbDCAOb9zMfquaT4Z-MdHX4AsHUNvs7xgdHefEA5myMHxZk87NTNgdLbG90IE-"
                        mapStyle="Aerial"
                ></vc-provider-imagery-bingmaps>-->


                <!--地图-->
                <!--地图标注-->
                <vc-provider-imagery-urltemplate :url="urlText"
                                                 :maximumLevel="13"></vc-provider-imagery-urltemplate>
                <!--                <vc-provider-imagery-wms :url="url" :layers="layers" :parameters="parameters"></vc-provider-imagery-wms>-->
            </vc-layer-imagery>
            <vc-layer-imagery v-if="urlText1 || urlText1!=''" :alpha="alpha" :brightness="brightness" :contrast="contrast">
                <vc-provider-imagery-urltemplate :url="urlText1"
                                                 :maximumLevel="13"></vc-provider-imagery-urltemplate>
            </vc-layer-imagery>
            <vc-provider-terrain-cesium  v-if="selectTerrain=='cesium'" ref="terrain" :requestVertexNormals="true" :requestWaterMask="true"></vc-provider-terrain-cesium>
            <vc-navigation ref="navigation" :options="options"></vc-navigation>

            <!--管道-->
            <!--            <vc-primitive v-for="(item,index) in pipelines" :key="index" v-if="layer['pipelines']" :id="item.id"-->
            <!--                          :appearance="appearance" :geometryInstances.sync="geometryInstances">-->
            <!--                <vc-instance-geometry>-->
            <!--                    <vc-geometry-polyline :positions="item.positions" :colors="item.colors"-->
            <!--                                          :width="4"></vc-geometry-polyline>-->
            <!--                </vc-instance-geometry>-->
            <!--            </vc-primitive>-->
            <!--<vc-entity  v-for="(item,index) in realTimePipelines" :key="index" v-if="layer['pipelines']" :id="item.id">
                <vc-graphics-polyline :positions="toPP(item.positions)" :material="material1" :width="10.0" ></vc-graphics-polyline>
                &lt;!&ndash;<vc-graphics-corridor :positions="positions1" :shape="shape1"
                                             :material="material1"></vc-graphics-corridor>&ndash;&gt;
            </vc-entity>-->
            <vc-entity v-for="(item,index) in pipelines" :key="index" v-if="layer['pipelines']" :id="item.id">
                <vc-graphics-polyline :positions="item.positions" :material="material1"
                                      :width="10.0"></vc-graphics-polyline>
            </vc-entity>
            <!--设备-->
            <vc-collection-primitive-billboard v-if="layer['equipments']"
                                               :billboards="equipments"></vc-collection-primitive-billboard>
            <!--标志物-->
            <vc-collection-primitive-billboard v-if="layer['markers']"
                                               :billboards="markers"></vc-collection-primitive-billboard>
            <!--标志物-->
            <vc-collection-primitive-billboard v-if="layer['alarms']"
                                               :billboards="alarms"></vc-collection-primitive-billboard>
            <!--文字标注-->
            <vc-collection-primitive-label v-if="layer['text']" :labels="labels"></vc-collection-primitive-label>
            <!--线段-->
            <!--                        <vc-entity ref="entity1" name="你好" description="的撒">-->
            <!--                            <vc-graphics-polyline-->
            <!--                                    :positions="positions1"-->
            <!--                                    :material="pipelinesMaterial"-->
            <!--                                    :width="20"-->
            <!--                                    :clampToGround="true"-->
            <!--                                    heightPositions-->
            <!--                            ></vc-graphics-polyline>-->
            <!--                        </vc-entity>-->
            <!--            <vc-primitive v-for="(item,index) in pipelines" :key="index" v-if="layer['pipelines']" :id="item.id"-->
            <!--                          :appearance="appearance" :geometryInstances.sync="geometryInstances">-->
            <!--                <vc-instance-geometry>-->
            <!--                    <vc-geometry-polyline :positions="item.positions" :colors="item.colors"-->
            <!--                                          :width="4"></vc-geometry-polyline>-->
            <!--                </vc-instance-geometry>-->
            <!--            </vc-primitive>-->
            <!--            <vc-primitive :appearance="appearance" :geometryInstances.sync="geometryInstances">
                            <vc-instance-geometry>0
                                <vc-geometry-polyline :positions="positions" :width="4" :colors="colors"></vc-geometry-polyline>
                            </vc-instance-geometry>
                        </vc-primitive>-->
        </vc-viewer>
        <div class="map_tooltip" v-show="tooltip_show"
             :style="{top:tooltip_top,left:tooltip_left,transform:tooltip_tansform}">
            <v-card
                    max-width="344"
                    :color="tooltip_color"
                    class="mx-auto dxcr-card" :class="tooltip_class">
                <v-card-text  v-html="tooltip_content">

                </v-card-text>
            </v-card>
           <!-- <div class="popup_container">
                &lt;!&ndash;<div class="popup_title">
                <span>
                    {{tooltip_title}}
                </span>
                </div>&ndash;&gt;
                <div class="popup_content" v-html="tooltip_content">

                </div>
                <div class="close" @click="tooltip_show=false">
                    <v-btn x-small text icon color="white">
                        <v-icon x-small>close</v-icon>
                    </v-btn>
                </div>
            </div>-->
        </div>
    </div>
</template>

<script>
    import CesiumUtil from '@/util/CesiumUtil'
    import {getDictionary} from '@/util/getDictionaryName'
    import apiService from "../../services/apiService"
    import {mapState} from 'vuex'

    export default {
        name: "globalMap",
        props: {
            realTimePipelines: {
                default: () => {
                    return []
                }
            },
        },
        data() {
            return {
                /*实时报警*/
                tooltip_color:'blue',
                tooltip_class:{},
                realTimeAlarms:[],
                /*标志物*/
                selectMap:'GDWX',
                selectTerrain:'WGS84',
                cMapImg:'/images/map/gdwx.jpg',
                mapSet:false,
                equipments: [],
                markers: [],
                labels: [],
                pipelines: [],
                positions1: [

                    {lng: 100, lat: 29.999999999999993},
                    {lng: 105, lat: 29.999999999999993},
                    {lng: 110, lat: 25.999999999999993}
                ],
                pipelinesMaterial: {},
                /*弹出框*/
                tooltip_show: false,
                tooltip_title: '标题',
                tooltip_content: '',
                tooltip_top: '10000px',
                tooltip_left: 0,
                tooltip_tansform: "translate(-50%, -103%)",
                /*几何学多段线*/
                appearance: null,
                geometry: null,
                geometryInstances: null,
                colors: [],
                /*图层*/
                terrainUrl: '',
                cesiumUrl:'https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer',
                urlText: 'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
                urlText1: 'http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8',
                gouldRoadUrl: 'http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
                gouldMarkUrl: 'http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8',
                gouldSatelliteUrl: 'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',

                /*urlText: 'http://10.0.75.1:3000/maptile/{z}/{x}/{y}.png',*/
                url: 'http://114.115.141.215:7777/geoserver/gwc/service/wms',
                layers: 'HAGFrame:chinabig',
                parameters: {
                    format: 'image/png',
                    Srs: "EPSG:4326"
                },
                alpha: 1,
                brightness: 1,
                contrast: 1,
                center:[109.79, 30.39],
                /*camera: {
                    position: {
                        lng: 105,
                        lat: 29.999999999999993,
                        height: 190598.497290563
                    },
                    heading : this._Cesium.Math.toRadians(0),
                    pitch : this._Cesium.Math.toRadians(-0),
                    roll : this._Cesium.Math.toRadians(0)
                },*/
                polylineVolume1: {},

                shape1: [],
                material1: '',
                options: {
                    // 用于在使用重置导航重置地图视图时设置默认视图控制。接受的值是经纬度{lng: number, lat: number, height: number}或者 rectangle{west: number,south: number,east: number,north: number}
                    defaultResetView: {lng: 109.79, lat: 30.39, height: 195680.497290563},
                    // 用于启用或禁用罗盘。true是启用罗盘，false是禁用罗盘。默认值为true。如果将选项设置为false，则罗盘将不会添加到地图中。
                    enableCompass: true,
                    // 用于启用或禁用缩放控件。true是启用，false是禁用。默认值为true。如果将选项设置为false，则缩放控件将不会添加到地图中。
                    enableZoomControls: true,
                    // 用于启用或禁用距离图例。true是启用，false是禁用。默认值为true。如果将选项设置为false，距离图例将不会添加到地图中。
                    enableDistanceLegend: true,
                    // 用于启用或禁用指南针外环。true是启用，false是禁用。默认值为true。如果将选项设置为false，则该环将可见但无效。
                    enableCompassOuterRing: true
                },
                myCesium: null,
                /*解决ready执行两次*/
                called: false
            }
        },
        mounted() {
            this.getRealTimeAlarm()
        },
        methods: {
            setMapCenter(){
                this.myCesium.viewer.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(this.center[0], this.center[1], 50000),
                    duration: 1,
                    orientation: {
                        heading: Cesium.Math.toRadians(0),
                        pitch: Cesium.Math.toRadians(-90),
                        roll: Cesium.Math.toRadians(0)
                    }
                });
            },
            clickGDLW($event){
                this.urlText=this.gouldRoadUrl;
                this.urlText1='';
                this.cMapImg='/images/map/gdlk.jpg'
                this.selectMap='GDLW'
            },
            clickGDWX($event){
                this.urlText=this.gouldSatelliteUrl;
                this.urlText1=this.gouldMarkUrl;
                this.cMapImg='/images/map/gdwx.jpg'
                this.selectMap='GDWX'
            },
            clickWGS84($event){
                this.terrainUrl = null
                this.cMapImg='/images/map/WGS84.jpg'
                this.selectTerrain='WGS84'
            },
            clickCesium($event){
                this.terrainUrl = this.cesiumUrl
                this.cMapImg='/images/map/cesium.jpg'
                this.selectTerrain='cesium'
            },
            //初始化地图 这个方法会执行两次原因未知
            ready(cesiumInstance) {
                if (this.called) {
                    return
                }
                this.called = false
                const {Cesium, viewer} = cesiumInstance
                // this.material1= Cesium.Color.RED.withAlpha(0.5)

                let mapViewer = this.$refs['viewer']

                this.material1 = new Cesium.PolylineGlowMaterialProperty({
                    glowPower: 0.2,
                    color: Cesium.Color.ORANGE
                })

                this.pipelinesMaterial = new Cesium.PolylineArrowMaterialProperty(Cesium.Color.PURPLE)
                this.appearance = new Cesium.PolylineMaterialAppearance()
                let myCesium = new CesiumUtil(cesiumInstance)
                this.myCesium = myCesium
                /*will be*/
                this.shape1 = this.computeCircle(3000.0)

                /*add lines*/
                this.setPipelineCoordinate()

                /*add equipments*/
                this.setEquipmentMarker()
                /*add markers*/
                this.setMarkers()
                /*实时数据 再watch里监听*/
                // this.setRealTimePipelines()


                //动画事件
                myCesium.readyAnimation()

                //鼠标左键事件
                let cartesian = null
                myCesium.leftClick((movement, scene) => {
                    this.tooltip_show = false
                    //位置
                    let pick = scene.pick(movement.position);
                    //这个位置有对象
                    if (Cesium.defined(pick)) {

                        //世界坐标
                        // cartesian = scene.globe.pick(viewer.camera.getPickRay(position), scene);
                        cartesian = pick.primitive.position
                        if (!cartesian) {
                            return
                        }

                        //世界坐标转换经纬度
                        var ellipsoid = viewer.scene.globe.ellipsoid;
                        var cartographic = ellipsoid.cartesianToCartographic(cartesian);
                        var lat = Cesium.Math.toDegrees(cartographic.latitude);
                        var lng = Cesium.Math.toDegrees(cartographic.longitude);
                        var alt = cartographic.height;

                        //设置弹出框
                        // let position = movement.position
                        let position = Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, cartesian);
                        if (position.y < 300) {
                            this.tooltip_tansform = "translate(-50%, 10%)"
                        } else {
                            this.tooltip_tansform = "translate(-50%, -110%)"
                        }

                        //对象
                        let id = pick.id['id']

                        if (pick.id['type'] === 'pipelines') {
                            viewer.camera.flyTo({
                                //镜头的经纬度、高度。镜头默认情况下，在指定经纬高度俯视（pitch=-90）地球
                                destination: Cesium.Cartesian3.fromDegrees(lng, lat, 50000),
                                orientation: {},
                                duration: .5, //动画持续时间
                                complete: () => { //飞行完毕后执行的动作

                                }
                            });
                            this.setPipeline(id).then(() => {
                                this.$nextTick(() => {
                                    this.tooltip_show = true
                                    this.tooltip_left = position['x'] + 'px'
                                    this.tooltip_top = position['y'] + 'px'
                                })
                            })

                        } else if (pick.id['type'] === 'equipment') {
                            viewer.camera.flyTo({
                                //镜头的经纬度、高度。镜头默认情况下，在指定经纬高度俯视（pitch=-90）地球
                                destination: Cesium.Cartesian3.fromDegrees(lng, lat, 10000),
                                orientation: {},
                                duration: .5, //动画持续时间
                                complete: () => { //飞行完毕后执行的动作

                                }
                            });
                            this.setEquipment(id).then(() => {
                                this.tooltip_color="light-blue"
                                this.$nextTick(() => {
                                    setTimeout(() => {
                                        this.tooltip_show = true
                                        this.tooltip_left = position['x'] + 'px'
                                        this.tooltip_top = position['y'] + 'px'
                                    }, 0)

                                })
                            })

                        } else if (pick.id['type'] === 'marker') {
                            viewer.camera.flyTo({
                                //镜头的经纬度、高度。镜头默认情况下，在指定经纬高度俯视（pitch=-90）地球
                                destination: Cesium.Cartesian3.fromDegrees(lng, lat, 10000),
                                orientation: {},
                                easingFunction: Cesium.EasingFunction.LINEAR_NONE,
                                duration: .5, //动画持续时间
                                complete: () => { //飞行完毕后执行的动作

                                }
                            });
                            this.setMarker(id).then(() => {
                                this.tooltip_color="blue-grey"
                                setTimeout(() => {
                                    this.tooltip_show = true
                                    this.tooltip_left = position['x'] + 'px'
                                    this.tooltip_top = position['y'] + 'px'
                                }, 0)
                            })

                        } else if (pick.id['type'] === 'alarm') {
                            this.tooltip_color="red accent-4"
                            //写道这里了
                            viewer.camera.flyTo({
                                //镜头的经纬度、高度。镜头默认情况下，在指定经纬高度俯视（pitch=-90）地球
                                destination: Cesium.Cartesian3.fromDegrees(lng, lat, 10000),
                                orientation: {},
                                duration: .5, //动画持续时间
                                complete: () => { //飞行完毕后执行的动作

                                }
                            })

                            this.setAlarm(id).then(() => {
                                setTimeout(() => {
                                    this.tooltip_show = true
                                    this.tooltip_left = position['x'] + 'px'
                                    this.tooltip_top = position['y'] + 'px'
                                }, 0)
                            })

                        } else if (pick.id['type'] === 'text') {
                            this.tooltip_show = false
                        }
                    }
                })

                myCesium.mouseMove((movement, scene) => {
                    let pick = scene.pick(movement.endPosition);
                    if (Cesium.defined(pick) && (pick.id['type'] === 'pipelines')) {
                        document.getElementsByTagName("*").item(0).style.cursor = "pointer"
                    } else if (Cesium.defined(pick) && (pick.id['type'] === 'equipment')) {
                        document.getElementsByTagName("*").item(0).style.cursor = "pointer"
                    } else if (Cesium.defined(pick) && (pick.id['type'] === 'marker')) {
                        document.getElementsByTagName("*").item(0).style.cursor = "pointer"
                    } else if (Cesium.defined(pick) && (pick.id['type'] === 'alarm')) {
                        document.getElementsByTagName("*").item(0).style.cursor = "pointer"
                    } else {
                        document.getElementsByTagName("*").item(0).style.cursor = "default"
                    }
                })

                viewer.scene.postRender.addEventListener((e) => {
                    let newPostion = Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, cartesian);
                    if (newPostion) {
                        this.tooltip_left = newPostion['x'] + 'px'
                        this.tooltip_top = newPostion['y'] + 'px'
                    }
                });

                setTimeout(()=>{
                    viewer.camera.flyTo({
                        destination: Cesium.Cartesian3.fromDegrees(this.center[0], this.center[1], 50000),
                        duration: 2,
                        orientation: {
                            heading: Cesium.Math.toRadians(0),
                            pitch: Cesium.Math.toRadians(-90),
                            roll: Cesium.Math.toRadians(0)
                        }
                    });
                },2000)

            },
            setRealTimePipelines() {
                if (this.myCesium) {
                    for (let item of this.realTimePipelines) {
                        this.myCesium.addEntityAnimation(item.positions, 0, 0, 0)
                        // this.myCesium.addEntityAnimation(item.positions,0,0,1)
                        // this.myCesium.addEntityAnimation(item.positions,0,0,2)
                        // this.myCesium.addEntityAnimation(item.positions,0,0,3)
                        // this.myCesium.addEntityAnimation(item.positions,0,0,4)

                    }
                    // this.myCesium.removeLinesById(['123'])
                    // this.myCesium.addLines(this.realTimePipelines);


                } else {
                    setTimeout(() => {
                        this.setRealTimePipelines()
                    }, 100)
                }
            },
            async setAlarm(id) {
                let {data} = await apiService.getAlarmById({}, id)
                let {alarmStateName, typeName, name, ppLoc, fibLoc, endTime,alarmValue} = data
                endTime = endTime.slice(0,19)
                if(alarmStateName == '报警'){
                    this.tooltip_color='red accent-4'
                }else if(alarmStateName == '预警'){
                    this.tooltip_color='orange accent-4'
                }else{
                    this.tooltip_color='grey'
                }
                this.tooltip_content = `<div class="dxcr-title">
                                    ${alarmStateName}
                                  </div>
                                  <div class="dxcr-content">
                                报警类型：${typeName}<br/>
                                 报警等级：${name}<br/>
                管道位置：${ppLoc}<br/>
                光纤位置：${fibLoc}<br/>
                报警值：${alarmValue}<br/>
                报警时间：${endTime}<br/>`
            },
            //设置设备
            async setEquipmentMarker() {
                let equipments = await apiService.getMarkerEquip()
                let arr = []
                for (let item of equipments) {
                    let lat = item['EQ_LAT']
                    let lon = item['EQ_LON']
                    let type = item['EQ_SUB_TYPE_ID']
                    let state = item['EQ_STATUS']
                    let id = item['EQ_ID']
                    let equipment = {}

                    //设置图片
                    let img = '/images/marker/dvs.png'

                    if ("01080102" == type) {

                        //根据状态设置图片
                        if (state == 0) {
                            img = '/images/marker/dvs_offline.png'
                        } else {
                            img = '/images/marker/dvs.png'
                        }
                    } else if ("01080101" == type) {
                        //根据状态设置图片
                        if (state == 0) {
                            img = '/images/marker/dts_offline.png'
                        } else {
                            img = '/images/marker/dts.png'
                        }

                    } else if ("01080103" == type) {
                        if (state == 0) {
                            img = '/images/marker/dtss_offline.png'
                        } else {
                            img = '/images/marker/dtss.png'
                        }
                    }
                    equipment.position = {lng: lon, lat: lat, height: 100}
                    equipment.image = img
                    equipment.scale = 1
                    equipment.width = 30
                    equipment.height = 30
                    equipment.id = {
                        id: id,
                        type: 'equipment'
                    }
                    arr.push(equipment)
                }
                this.equipments = arr
            },
            //设置标志物
            async setMarkers() {
                let markers = await apiService.getMarker()
                let arr = []
                for (let item of markers) {
                    let lat = item['M_LAT']
                    let id = item['M_ID']
                    let lon = item['M_LON']
                    let type = item['M_TYPE_ID']
                    let name = item['M_NAME']
                    let marker = {}

                    let img = '/images/marker/bsz.png'
                    let height = 2
                    if (type == '01080101') {
                        img = '/images/marker/dts.png'
                        height = 3
                    } else if (type == '01080102') {
                        img = '/images/marker/dvs.png'
                        height = 4
                    } else if (type == '01080103') {
                        img = '/images/marker/dtss.png'
                        height = 5
                    } else if (type == '010306') {
                        img = '/images/marker/home.png'
                        height = 1
                    } else if (type == '01030601') {
                        img = '/images/marker/home2.png'
                        height = 1
                    } else if (type == '01030701') {
                        //文字标注
                        let label = {}
                        label.position = {lng: lon, lat: lat}
                        label.text = name
                        label.font = '12px Microsoft YaHei'
                        label.fillColor = this.myCesium.toCesiumColor({r: 255, g: 255, b: 255, a: 1})
                        label.id = {
                            id: id,
                            type: 'text'
                        }
                        this.labels.push(label)
                        continue
                    }
                    marker.position = {lng: lon, lat: lat}
                    marker.image = img
                    marker.scale = 1
                    marker.width = 30
                    marker.height = 30
                    marker.id = {
                        id: id,
                        type: 'marker'
                    }
                    arr.push(marker)
                }
                this.markers = arr
            },
            //设置管道拐点坐标
            async setPipelineCoordinate() {
                let value = await apiService.listPipelineInflexCoordinate()
                let lines = []
                let Cesium = this.myCesium.Cesium

                for (let item of value) {
                    let coordinates = item['PP_INFLEXCOORDINATE']
                    let id = item['PP_INFO'][0]
                    let arr = []
                    let colors = []
                    let object = {}
                    for (let item1 of coordinates) {
                        let jsonArray = JSON.parse(item1)
                        let x = jsonArray[0]
                        let y = jsonArray[1]

                        let ob = {
                            lng: x,
                            lat: y,
                            height: 1
                        }
                        arr.push(ob)
                        // colors.push(new Cesium.Color(1,1,0,1))

                        // arr.push(x)
                        // arr.push(y)
                    }
                    object['positions'] = arr
                    // object['colors'] = colors
                    /* object['id'] = {
                         id: id,
                         type: 'pipelines'
                     }*/
                    object['id'] = id
                    lines.push(object)
                }
                this.pipelines = lines


                lines.forEach((item) => {
                    let pps = []
                    item['positions'].forEach((val) => {
                        pps.push(val['lng'])
                        pps.push(val['lat'])
                    })
                    this.myCesium.addEntityAnimation(pps)
                })


                // this.myCesium.addLines(lines);
                // this.pipelines = lines;
                //example
                /*myCesium.addLines(
                    [{
                        positions: [
                            -124.5, 40,
                            -123.0, 40,
                            -123.0, 39
                        ],
                        colors: [{r: 255, g: 0, b: 155}, {r: 0, g: 200, b: 155}, {r: 33, g: 22, b: 155}]
                    }]
                );*/

            },
            //实时报警
            async getRealTimeAlarm() {
                let data = await apiService.getRealTimeAlarm()
                this.realTimeAlarms.push(...data)
                // this.realTimeAlarms = data
                setTimeout(()=>{
                    this.getRealTimeAlarm()
                },5000)
            },
            computeCircle(radius) {
                let positions = []
                for (let i = 0; i < 360; i++) {
                    let radians = Cesium.Math.toRadians(i)
                    positions.push({x: radius * Math.cos(radians), y: radius * Math.sin(radians)})
                }
                return positions
            },
            async setPipeline(id) {
                const {data} = await apiService.getPipelineInfo({}, id)
            },
            async setEquipment(id) {
                const {data} = await apiService.getEqiupmentInfo({}, id)
                const name = data['EQ_NAME']
                const eqid = data['EQ_ID']
                const type = data['EQ_SUB_TYPE_NAME']
                const pps = data['PP_START_LOC']
                const ppe = data['PP_END_LOC']
                const lon = data['EQ_LON'].toFixed(3)
                const lat = data['EQ_LAT'].toFixed(3)
                const content = `
                                <div class="dxcr-title">
                                    ${name}
                                  </div>
                                  <div class="dxcr-subTitle">
                                    设备
                                  </div>
                                  <div class="dxcr-content">
                                设备类型：${type}<br/>
                                经度：${lon}<br/>
                                维度：${lat}
                                </div>`
                this.tooltip_content = content

            },
            async setMarker(id) {
                const {data} = await await apiService.getMarkerInfo({}, id)
                const name = data['M_NAME']
                const lat = data['M_LAT'].toFixed(3)
                const lon = data['M_LON'].toFixed(3)
                const content = `
                                <div class="dxcr-title">
                                    ${name}
                                  </div>
                                  <div class="dxcr-subTitle">
                                    标志物
                                  </div>
                                  <div class="dxcr-content">
                                经度：${lon}<br/>
                                维度：${lat}
                                </div>`
                this.tooltip_content = content
            },
            isShowPipelines() {
                let p = this.myCesium.scene.primitives
                for (let i = 0; i < p.length; i++) {
                    let ob = p.get(i)
                    if (ob && ob['id'] == 'pipelines') {
                        ob.show = this.showPipelines
                    }
                }
            },
            toPP(pos) {
                let arr = []
                for (let i = 0; i < pos.length / 2; i++) {
                    let x = pos[i * 2]
                    let y = pos[i * 2 + 1]

                    let ob = {
                        lng: x,
                        lat: y
                    }
                    arr.push(ob)
                }
                return arr
            }
        },
        watch: {
            realTimePipelines() {
                // this.setRealTimePipelines()
            },
            showPipelines() {
                this.isShowPipelines()
            }
        },
        computed: {
            // 滚动区高度
            mapHeight() {
                //执行环境是浏览器
                if (process.client) {
                    return (window.innerHeight - 40) + 'px';
                }
            },
            alarms() {
                let arr = []
                for (let alarm of this.realTimeAlarms) {
                    let {latLon, id, levelId, alarmStateName} = alarm

                    latLon = latLon || [0,0]
                    let img = '/images/alarm/'
                    img += getDictionary(levelId.substring(0, 6), alarmStateName).img
                    let ob = {}
                    ob.position = {lng: latLon[0], lat: latLon[1],height:3}
                    ob.image = img
                    ob.scale = 1
                    ob.width = 30
                    ob.height = 30
                    ob.zIndex = 9999
                    ob.id = {
                        id: id,
                        type: 'alarm'
                    }
                    arr.push(ob)
                }
                return arr
            },
            ...mapState([
                'layer'
            ]),
            showPipelines() {
                return this.$store.state.layer['pipelines']
            },
        }
    }
</script>

<style lang="scss" scoped>
    .viewer {
        width: 100%;
        height: 100%;
    }

    .popup_container {
        border-radius: 5px;
        width: 12rem;
        background: rgba(255, 0, 5, .8);
        border: 2px solid rgba(255, 255, 0, .8);
        color: #ffffff;
    }

    .popup_content {
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
        right: 2px;
        top: 5px;
    }


</style>
<style lang="scss">
    .dxcr-card{
        cursor: default;
    }
    .dxcr-title{
        font-size:20px!important;
        font-weight: bolder;
        color: rgb(255,255,255);
    }

    .dxcr-subTitle{
        font-size:12px!important;
        color: rgba(255,255,255,.7);
    }

    .dxcr-content{
        margin-top:10px;
        font-size:14px!important;
        color: rgba(255,255,255,1);
    }

    #cesiumContainer {
        .navigation {
            .list {
                padding-left: 0 !important;
            }
        }
    }

    .cesium-viewer-bottom {
        display: none !important;
    }

    .navigation-control-icon-reset {
        fill: #fff;
    }

    .navigation-controls {
        background: #2f353c;
        cursor: pointer;
    }

    .map_tooltip {
        position: absolute;
    }

    .cesium-viewer-animationContainer {
        display: none;
    }

    .cesium-viewer-timelineContainer {
        display: none;
    }
</style>
