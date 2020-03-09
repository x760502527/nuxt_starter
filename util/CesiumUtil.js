class CesiumUtil {
    cesiumInstance = null
    Cesium = null
    viewer = null
    scene = null
    static color = {r: 255, g: 0, b: 0}

    time=100
    constructor(cesiumInstance) {
        this.cesiumInstance = cesiumInstance
        this.Cesium = cesiumInstance.Cesium
        this.viewer = cesiumInstance.viewer
        this.scene = this.viewer.scene;
    }


    doTest(points) {

        let viewer = this.viewer
        let curLinePointsArr = this.generateCurve(points);
     //    viewer.entities.add({ // 背景线
     //        description: 'background-line',
     //        name: '测试流向',
     //        polyline: {
     //            width: 3,
     //            followSurface: true,
     //            positions: curLinePointsArr,
     //            /* material: new Cesium.PolylineGlowMaterialProperty({
     //                             color: new Cesium.Color(255 / 255, 249 / 255, 0, 0.5)
     //                         })*/
     //            material: new Cesium.PolylineDashMaterialProperty({
     //                color: new Cesium.Color(255 / 255, 249 / 255, 0, 0.5)
     //            })
     //        }
     //
     //    });
        // 尾迹线
        viewer.entities.add({
            description: 'trail-line',
            name: 'test',
            polyline: {
                width: 10,
                positions: curLinePointsArr,
                material: new Cesium.PolylineTrailLinkMaterialProperty(this.toCesiumColor({r:0,g:0,b:0,a:1}), 3000),
                zIndex: 9
            }
        });

        points.forEach(function (point) {
            // var cartesian = Cesium.Cartesian3.fromDegrees(point.x, point.y, point.z);
            // viewer.entities.add({
            //     position: cartesian,
            //     point: {
            //         color: Cesium.Color.Blue,
            //         pixelSize: 20,
            //         heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
            //     }
            // });
            /*  viewer.entities.add({
                            position: cartesian,
                            label: {
                                showBackground: false,
                                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                                fillColor: Cesium.Color.Blue,
                                text: "杆塔模型",
                                font: "8px sans-serif"
                            }
                        });*/
        });
    }

    generateCurve(points) {
        var cartesian3s = [];
        var times = [];
        var time = 0;
        points.forEach(function (point) {
            cartesian3s.push(Cesium.Cartesian3.fromDegrees(point.x, point.y, point.z));
            times.push(time);
            time += 0.1;
        });
        /*var arr=[];
                    for(var i=0;i<cartesian3s.length-1;i++){
                        arr.push(cartesian3s[i]);
                        var n =parseInt(Cesium.Cartesian3.distance(cartesian3s[i],cartesian3s[i+1]));
                        var a = new Cesium.Cartesian3();
                        for(var j=0;j<n;j++){
                            Cesium.Cartesian3.lerp(cartesian3s[i],cartesian3s[i+1],1,a);
                            arr.push(a);
                        }
                    }
                    arr.push(cartesian3s[cartesian3s.length-1]);
                    arr.forEach(function(o){
                        times.push(time);
                        time+=0.5;
                    });*/
        let spline = new Cesium.CatmullRomSpline({
            times: times,
            points: cartesian3s
        });
        let curvePointsArr = [];
        for (let i = 0, len = times.length; i < len; i++) {
            curvePointsArr.push(spline.evaluate(times[i]));
        }
        return curvePointsArr;
    }
    addEntities(json) {
        const Cesium = this.Cesium
        json = {
            id: "dasdsa",
            label: new Cesium.LabelGraphics({
                text: '撒大撒',
                font: '24px sans-serif',
                horizontalOrigin: 1,
                outlineColor: new Cesium.Color(0, 0, 0, 1),
                outlineWidth: 2,
                pixelOffset: new Cesium.Cartesian2(17, -5),
                style: Cesium.LabelStyle.FILL
            })
        }
        let entity = {
            id: '成都欢迎你',
            position: Cesium.Cartesian3.fromDegrees(104.06, 30.67, 100),
            billboard: new Cesium.BillboardGraphics({
                image: 'https://zouyaoji.top/vue-cesium/favicon.png',
                scale: 0.1
            }),
            label: new Cesium.LabelGraphics({
                text: 'Hello Cesium',
                font: '24px sans-serif',
                horizontalOrigin: 1,
                outlineColor: new Cesium.Color(0, 0, 0, 1),
                outlineWidth: 2,
                pixelOffset: new Cesium.Cartesian2(17, -5),
                style: Cesium.LabelStyle.FILL
            })
        }
        Object.assign(entity, json)

        this.viewer.entities.add(entity)
    }

    //添加折线 PolylineGeometry
    addLine(property) {
        const Cesium = this.Cesium
        var scene = this.viewer.scene;
        let primitive = this.line()
        scene.primitives.add(primitive);
    }

    toCesiumColor(color) {
        let r =color.r || 0
        let g =color.g || 0
        let b =color.b || 0
        return new Cesium.Color(r/255, g/255, b/255, color.a || .5)
    }

    toCesiumColors(colors) {
        let arr = []
        for (let color of colors) {
            arr.push(this.toCesiumColor(color))
        }
        return arr
    }

    line({
             colorsPerVertex = false,
             colors = [],
             positions,
             id,
             width = 5
         } = {}) {
        if (colorsPerVertex) {
            if (colors.length != positions.length / 2) {
                for (let i = colors.length; i < positions.length; i++) {
                    colors[i] = CesiumUtil.color
                }
            }
        } else {
            if (colors.length != positions.length / 2 - 1) {
                for (let i = colors.length; i < positions.length - 1; i++) {
                    colors[i] = CesiumUtil.color
                }
            }
        }

        let lineColors = this.toCesiumColors(colors)
        const Cesium = this.Cesium
        var primitive = new Cesium.GeometryInstance({
            geometry: new Cesium.PolylineGeometry({
                positions: Cesium.Cartesian3.fromDegreesArray(positions),//坐标必须两个和两个以上
                width: width,//线宽
                colorsPerVertex: colorsPerVertex,
                vertexFormat: Cesium.PolylineColorAppearance.VERTEX_FORMAT,
                colors: lineColors
            }),
            id: {
                type: 'line',
                id: id
            },
            attributes: {}
        })
        return primitive
    }

    readyAnimation() {
        // 起始时间
        let start = this.Cesium.JulianDate.fromDate(new Date(2017, 7, 11));
        // 结束时间
        let stop = this.Cesium.JulianDate.addSeconds(start, this.time, new Cesium.JulianDate());
        // 设置始时钟始时间
        this.viewer.clock.startTime = start.clone();
        // 设置时钟当前时间
        this.viewer.clock.currentTime = start.clone();
        // 设置始终停止时间
        this.viewer.clock.stopTime = stop.clone();
        // 时间速率，数字越大时间过的越快
        this.viewer.clock.multiplier = 1;
        // 时间轴
        this.viewer.timeline.zoomTo(start, stop);
        // 循环执行,即为2，到达终止时间，重新从起点时间开始
        this.viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;
    }

    addEntityAnimation(positions,delay,wait,each) {

// 起始时间
        let start = this.Cesium.JulianDate.fromDate(new Date(2017, 7, 11));
// 结束时间
        let stop = this.Cesium.JulianDate.addSeconds(start,  this.time, new Cesium.JulianDate());

        let data = []
        let arr = []
        for (let i = 0; i < positions.length/2; i++) {
            //单位时间
            let t = (this.time-wait - delay) / (positions.length/2) * i
            if(each > t){
                t = t - each + 5
            }else{
                t = t - each
            }


            let ob ={
                longitude: positions[i * 2],
                dimension: positions[i * 2 + 1],
                height: 3,
                time: t + delay
            }
            data.push(ob)
            arr.push({x: positions[i * 2],y:positions[i * 2 + 1],z:3})
        }
        // let data = [{
        //     longitude: 116.405419,
        //     dimension: 39.918034,
        //     height: 700000,
        //     time: 0
        // }, {
        //     longitude: 115.2821,
        //     dimension: 39.918145,
        //     height: 700000,
        //     time: 100
        // }];


        function computeFlight(source) {
            var property = new Cesium.SampledPositionProperty();
            for (var i = 0; i < source.length; i++) {
                var time = Cesium.JulianDate.addSeconds(start, source[i].time, new Cesium.JulianDate);
                var position = Cesium.Cartesian3.fromDegrees(source[i].longitude, source[i].dimension, source[i].height);
                // 添加位置，和时间对应
                property.addSample(time, position);
            }
            return property;
        }


        var property = computeFlight(data);
        this.doTest(arr)
        let pp=this.generateCurve(arr)
        var entity = this.viewer.entities.add({
            availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
                start: start,
                stop: stop
            })]),
            position: positions,
            // 根据所提供的速度计算模型的朝向
            orientation: new Cesium.VelocityOrientationProperty(property),
     //        polyline: {
     //            width: 3,
     //            // followSurface: true,
     //            positions: pp,
     //            /* material: new Cesium.PolylineGlowMaterialProperty({
     //                             color: new Cesium.Color(255 / 255, 249 / 255, 0, 0.5)
     //                         })*/
     //            material: new Cesium.PolylineDashMaterialProperty({
     //                color: new Cesium.Color(255 / 255, 249 / 255, 0, 0.5)
     //            })
     //        }
           /* box: {
                dimensions: new Cesium.Cartesian3(500, 500, 500),
                material: Cesium.Color.RED.withAlpha(0.5),
                outline: false,
                outlineColor: Cesium.Color.BLACK
            },*/
        });
        // entity.isAvailable = function (obj) {
        //     return function (currentTime) {
        //         console.log(currentTime)
        //         if (!Cesium.defined(currentTime)) {
        //             throw new Cesium.DeveloperError('time is required.');
        //         }
        //         var nMS = Cesium.JulianDate.toDate(currentTime).getTime() / animationObj.duration;
        //         var time = (nMS % _range + animationObj.stepsRange.start);
        //
        //         var trails = trails || 10;
        //             return true;
        //     }
        // }(entity)
        // console.log(this.viewer.entities)
    }


    //没写完
    removeLinesById(arr) {
        //删除
        let p = this.scene.primitives
        for (let i = 0; i < p.length; i++) {
            let ob = p.get(i)
            if (ob.id == 'pipelines') {
            }

        }
    }

    addLines(arrays) {
        const Cesium = this.Cesium
        let scene = this.viewer.scene;
        let primitives = []

        for (let item of arrays) {
            let primitive = this.line(item)
            primitives.push(primitive)
        }
        let primitiveCollection = new Cesium.Primitive({
            geometryInstances: primitives,
            appearance: new Cesium.PolylineColorAppearance({
                translucent: false
            }),

        });
        primitiveCollection.id = 'pipelines'
        scene.primitives.add(primitiveCollection);
    }

    leftClick(func) {
        const Cesium = this.Cesium
        var scene = this.viewer.scene;
        var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
        //设置单击事件的处理句柄
        handler.setInputAction(function (movement) {
            func(movement, scene)
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }

    mouseMove(func) {
        const Cesium = this.Cesium
        var scene = this.viewer.scene;
        var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
        //设置单击事件的处理句柄
        handler.setInputAction(function (movement) {
            func(movement, scene)
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    }
}

export default CesiumUtil
