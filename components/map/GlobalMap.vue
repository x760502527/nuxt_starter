<template>
    <div class="viewer" :style="{height:mapHeight}">
        <vc-viewer @ready="ready">
            <vc-layer-imagery :alpha="alpha" :brightness="brightness" :contrast="contrast">
                <!--<vc-provider-imagery-bingmaps
                        url="https://dev.virtualearth.net"
                        bmKey="AgcbDCAOb9zMfquaT4Z-MdHX4AsHUNvs7xgdHefEA5myMHxZk87NTNgdLbG90IE-"
                        mapStyle="Aerial"
                ></vc-provider-imagery-bingmaps>-->
                <!--地图-->
                <vc-provider-imagery-urltemplate :url="urlText"></vc-provider-imagery-urltemplate>
                <!--                <vc-provider-imagery-wms :url="url" :layers="layers" :parameters="parameters"></vc-provider-imagery-wms>-->
            </vc-layer-imagery>
            <!--<vc-provider-terrain-arcgis-tiled-elevation :url="terrainUrl"></vc-provider-terrain-arcgis-tiled-elevation>-->
            <vc-navigation ref="navigation" :options="options"></vc-navigation>
            <!--vc-entity :polylineVolume.sync="polylineVolume1">
                <vc-graphics-polyline-volume :positions="positions1" :shape="shape1"
                                             :material="material1"></vc-graphics-polyline-volume>
            </vc-entity>-->

            <!--设备-->
            <vc-collection-primitive-billboard v-if="layer['equipments']"
                                               :billboards="equipments"></vc-collection-primitive-billboard>
            <!--标志物-->
            <vc-collection-primitive-billboard v-if="layer['markers']"
                                               :billboards="markers"></vc-collection-primitive-billboard>
            <!--文字标注-->
            <vc-collection-primitive-label v-if="layer['text']" :labels="labels"></vc-collection-primitive-label>
            <!--            <vc-primitive :appearance="appearance" :geometryInstances.sync="geometryInstances">
                            <vc-instance-geometry>0
                                <vc-geometry-polyline :positions="positions" :width="4" :colors="colors"></vc-geometry-polyline>
                            </vc-instance-geometry>
                        </vc-primitive>-->
        </vc-viewer>
        <div class="map_tooltip" v-show="tooltip_show"
             :style="{top:tooltip_top,left:tooltip_left,transform:tooltip_tansform}">
            <div class="popup_container">
                <!--<div class="popup_title">
                <span>
                    {{tooltip_title}}
                </span>
                </div>-->
                <div class="popup_content">
                    {{tooltip_content}}
                </div>
                <div class="close" @click="tooltip_show=false">
                    <v-btn x-small text icon color="white">
                        <v-icon x-small>close</v-icon>
                    </v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CesiumUtil from '@/util/CesiumUtil'
    import apiService from "../../services/apiService"
    import {mapState} from 'vuex'

    export default {
        name: "map",
        data() {
            return {
                /*标志物*/
                equipments: [],
                markers: [],
                labels: [],
                /*弹出框*/
                tooltip_show: false,
                tooltip_title: '标题',
                tooltip_content: '内容',
                tooltip_top: '10000px',
                tooltip_left: 0,
                tooltip_tansform: "translate(-50%, -103%)",
                /*几何学多段线*/
                appearance: null,
                geometry: null,
                geometryInstances: null,
                positions: [
                    {lng: 102.1, lat: 29.5},
                    {lng: 106.2, lat: 29.5},
                    {lng: 106.2, lat: 33.5},
                    {lng: 108.2, lat: 35.5},
                    {lng: 102.1, lat: 33.5}
                ],
                pipelines: [],
                colors: [],
                /*图层*/
                terrainUrl: 'https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer',
                urlText: 'http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
                /*urlText: 'http://10.0.75.1:3000/maptile/{z}/{x}/{y}.png',*/
                /*urlText: 'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}&lang=zh_cn',*/
                url: 'http://114.115.141.215:7777/geoserver/gwc/service/wms',
                layers: 'HAGFrame:chinabig',
                parameters: {
                    format: 'image/png',
                    Srs: "EPSG:4326"
                },
                alpha: 1,
                brightness: 1,
                contrast: 1,
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
                positions1: [

                    {lng: 100, lat: 29.999999999999993},
                    {lng: 105, lat: 29.999999999999993},
                    {lng: 110, lat: 25.999999999999993}
                ],
                shape1: [],
                material1: 'RED',
                options: {
                    // 用于在使用重置导航重置地图视图时设置默认视图控制。接受的值是经纬度{lng: number, lat: number, height: number}或者 rectangle{west: number,south: number,east: number,north: number}
                    defaultResetView: {lng: 105, lat: 89.999999999999993, height: 19059568.497290563},
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
        methods: {
            //初始化地图 这个方法会执行两次原因未知
            ready(cesiumInstance) {
                if (this.called) {
                    return
                }
                this.called = true
                const {Cesium, viewer} = cesiumInstance
                let myCesium = new CesiumUtil(cesiumInstance)
                this.myCesium = myCesium
                let c = this
                /*add lines*/
                this.setPipelineCoordinate()

                /*add equipments*/
                this.setEquipment()
                /*add markers*/
                this.setMarkers()

                //鼠标左键事件
                let cartesian = null
                myCesium.leftClick((movement, scene) => {
                    //位置
                    let pick = scene.pick(movement.position);
                    //这个位置有对象
                    if (Cesium.defined(pick)) {
                        //设置弹出框
                        let position = movement.position
                        if (position.y < 300) {
                            this.tooltip_tansform = "translate(-50%, 3%)"
                        } else {
                            this.tooltip_tansform = "translate(-50%, -103%)"
                        }
                        //世界坐标
                        cartesian = scene.globe.pick(viewer.camera.getPickRay(position), scene);

                        //世界坐标转换经纬度
                        var ellipsoid = viewer.scene.globe.ellipsoid;
                        var cartographic = ellipsoid.cartesianToCartographic(cartesian);
                        var lat = Cesium.Math.toDegrees(cartographic.latitude);
                        var lng = Cesium.Math.toDegrees(cartographic.longitude);
                        var alt = cartographic.height;

                        this.tooltip_show = true
                        this.tooltip_left = position['x'] + 'px'
                        this.tooltip_top = position['y'] + 'px'

                        if (pick.id['type'] === 'line') {
                            viewer.camera.flyTo({
                                //镜头的经纬度、高度。镜头默认情况下，在指定经纬高度俯视（pitch=-90）地球
                                destination: Cesium.Cartesian3.fromDegrees(lng, lat, 50000),
                                orientation: {},
                                duration: 1, //动画持续时间
                                complete: function () { //飞行完毕后执行的动作

                                }
                            });
                        } else if (pick.id['type'] === 'equipment') {
                            viewer.camera.flyTo({
                                //镜头的经纬度、高度。镜头默认情况下，在指定经纬高度俯视（pitch=-90）地球
                                destination: Cesium.Cartesian3.fromDegrees(lng, lat, 10000),
                                orientation: {},
                                duration: 1, //动画持续时间
                                complete: function () { //飞行完毕后执行的动作

                                }
                            });
                        } else if (pick.id['type'] === 'marker') {
                            viewer.camera.flyTo({
                                //镜头的经纬度、高度。镜头默认情况下，在指定经纬高度俯视（pitch=-90）地球
                                destination: Cesium.Cartesian3.fromDegrees(lng, lat, 10000),
                                orientation: {},
                                duration: 1, //动画持续时间
                                complete: function () { //飞行完毕后执行的动作

                                }
                            });
                        }else if (pick.id['type'] === 'text') {
                            this.tooltip_show = false
                        }
                    }
                })

                myCesium.mouseMove((movement, scene) => {
                    let pick = scene.pick(movement.endPosition);
                    if (Cesium.defined(pick) && (pick.id['type'] === 'line')) {
                        document.getElementsByTagName("*").item(0).style.cursor = "pointer"
                    } else if (Cesium.defined(pick) && (pick.id['type'] === 'equipment')) {
                        document.getElementsByTagName("*").item(0).style.cursor = "pointer"
                    } else if (Cesium.defined(pick) && (pick.id['type'] === 'marker')) {
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

                /*will be delete*/
                this.shape1 = this.computeCircle(3000.0)
                viewer.camera.setView({
                    destination: Cesium.Cartesian3.fromDegrees(111.07, 39.05, 10000000),
                    orientation: {
                        heading: Cesium.Math.toRadians(0),
                        pitch: Cesium.Math.toRadians(-90),
                        roll: Cesium.Math.toRadians(0)
                    }
                });
            },
            //设置设备
            async setEquipment() {
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
                    console.log(item)
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
                        label.fillColor = this.myCesium.toCesiumColor({r:255,g:0,b:0})
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
                for (let item of value) {
                    let coordinates = item['PP_INFLEXCOORDINATE']
                    let id = item['PP_INFO'][0]
                    let arr = []
                    let ob = {}
                    for (let item1 of coordinates) {
                        let jsonArray = JSON.parse(item1)
                        let x = jsonArray[0]
                        let y = jsonArray[1]
                        arr.push(x)
                        arr.push(y)
                    }
                    ob['positions'] = arr
                    ob['id'] = id
                    lines.push(ob)
                }

                this.myCesium.addLines(lines);

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
            computeCircle(radius) {
                let positions = []
                for (let i = 0; i < 360; i++) {
                    let radians = Cesium.Math.toRadians(i)
                    positions.push({x: radius * Math.cos(radians), y: radius * Math.sin(radians)})
                }
                return positions
            },
            isShowPipelines() {
                let p = this.myCesium.scene.primitives
                console.log(p)
                for (let i = 0; i < p.length; i++) {
                    let ob = p.get(i)
                    if (ob && ob['id'] == 'pipelines') {
                        ob.show = this.showPipelines
                    }
                }
            }
        },
        watch: {
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
            showPipelines() {
                return this.$store.state.layer['pipelines']
            },
            ...mapState([
                'layer'
            ])
        }
    }
</script>

<style lang="scss" scoped>
    .viewer {
        width: 100%;
        height: auto;
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
<style>
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
</style>
