/**
 * Cesium - https://github.com/AnalyticalGraphicsInc/cesium
 *
 * Copyright 2011-2017 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/AnalyticalGraphicsInc/cesium/blob/master/LICENSE.md for full licensing details.
 */

function PolylineTrailLinkMaterialProperty(color, duration) {

    this._definitionChanged = new Cesium.Event();

    this._color = undefined;

    this._colorSubscription = undefined;

    this.color = color;

    this.duration = duration;

    this._time = (new Date()).getTime();

}


PolylineTrailLinkMaterialProperty.prototype.getType = function (time) {

    return 'PolylineTrailLink';

}

PolylineTrailLinkMaterialProperty.prototype.getValue = function (time, result) {

    if (!Cesium.defined(result)) {

        result = {};

    }

    result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.WHITE, result.color);

    result.image = Cesium.Material.PolylineTrailLinkImage;

    result.time = (((new Date()).getTime() - this._time) % this.duration) / this.duration;

    return result;

}

PolylineTrailLinkMaterialProperty.prototype.equals = function (other) {

    return this === other ||

        (other instanceof PolylineTrailLinkMaterialProperty &&

            Cesium.Property.equals(this._color, other._color))

}

Cesium.PolylineTrailLinkMaterialProperty = PolylineTrailLinkMaterialProperty;

Cesium.Material.PolylineTrailLinkType = 'PolylineTrailLink';

Cesium.Material.PolylineTrailLinkImage = "../images/alarm.png";

Cesium.Material.PolylineTrailLinkSource = `czm_material czm_getMaterial(czm_materialInput materialInput)

{

                                                           czm_material material = czm_getDefaultMaterial(materialInput);

                                                           vec2 st = materialInput.st;

                                                           vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));

                                                           material.alpha = colorImage.a * color.a;

                                                           material.diffuse = (colorImage.rgb+color.rgb)/2.0;

                                                           return material;

}`;

Cesium.Material._materialCache.addMaterial(Cesium.Material.PolylineTrailLinkType, {

    fabric: {

        type: Cesium.Material.PolylineTrailLinkType,

        uniforms: {

            color: new Cesium.Color(0.0, 0.0, 0.0, 0.5),

            image: Cesium.Material.PolylineTrailLinkImage,

            time: 0

        },

        source: Cesium.Material.PolylineTrailLinkSource

    },

    translucent: function (material) {

        return true;

    }

});


Cesium.defineProperties(PolylineTrailLinkMaterialProperty.prototype, {

    isConstant: {

        get: function () {

            return false;

        }

    },

    definitionChanged: {

        get: function () {

            return this._definitionChanged;

        }

    },

    color: Cesium.createPropertyDescriptor('color')

});

