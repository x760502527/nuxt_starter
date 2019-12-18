class CesiumUtil {
    cesiumInstance = null
    Cesium = null
    viewer = null
    scene = null
    static color = {r: 255, g: 0, b: 0}
    constructor(cesiumInstance) {
        this.cesiumInstance = cesiumInstance
        this.Cesium = cesiumInstance.Cesium
        this.viewer = cesiumInstance.viewer
        this.scene = this.viewer.scene;
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
        return new Cesium.Color(color.r / 255, color.g / 255, color.b / 255, color.a || 1)
    }

    toCesiumColors(colors) {
        let arr = []
        for (let color of colors) {
            arr.push(this.toCesiumColor(color))
        }
        return arr
    }

    line({
        colorsPerVertex=false,
        colors=[],
        positions,
        id,
        width=5
    }={}) {
        if(colorsPerVertex){
            if(colors.length!=positions.length/2) {
                for (let i = colors.length; i < positions.length; i++) {
                    colors[i] = CesiumUtil.color
                }
            }
        }else{
            if(colors.length!=positions.length/2-1) {
                for (let i = colors.length; i < positions.length -1; i++) {
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

    addLines(arrays) {

        const Cesium = this.Cesium
        var scene = this.viewer.scene;
        let primitives = []

        for (let item of arrays) {
            let primitive = this.line(item)
            primitives.push(primitive)
        }
        var primitive = new Cesium.Primitive({
            geometryInstances: primitives,
            appearance: new Cesium.PolylineColorAppearance({
                translucent: false
            })
        });
        primitive.id = 'pipelines'
        scene.primitives.add(primitive);
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
