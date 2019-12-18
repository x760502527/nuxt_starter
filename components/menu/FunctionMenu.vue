<template>
    <div class="FunctionMenu">
        <div>
            <div @click="click('search')" class="btn_search"></div>
            <!-- popup -->
            <search-popup  v-model="searchPopupPopupModel"></search-popup>
        </div>
        <div>
            <div @click="click('layer')" class="btn_layer"></div>
            <!-- popup -->
            <layer-popup class="popup" v-model="layerPopupModel"></layer-popup>
        </div>
        <div>
            <div @click="click('target')" class="btn_choose"></div>
            <!-- popup -->
            <target-popup class="popup" v-model="targetPopupModel"></target-popup>
        </div>

    </div>
</template>

<script>
    import LayerPopup from '@/components/popup/LayerPopup.vue'
    import SearchPopup from '@/components/popup/SearchPopup.vue'
    import TargetPopup from '@/components/popup/TargetPopup.vue'

    export default {
        name: "FunctionMenu",
        methods: {
            click(name) {
                if(this.$store.state['popupState'] ===name){
                    this.$store.commit('changePopupState', "")
                    return
                }
                this.$store.commit('changePopupState', name)
            }
        },
        computed: {
            /* popupModel */
            layerPopupModel() {
                return this.$store.state['popupState'] === 'layer'
            },
            searchPopupPopupModel() {
                return this.$store.state['popupState'] === 'search'
            },
            targetPopupModel() {
                return this.$store.state['popupState'] === 'target'
            },
        },
        components: {
            LayerPopup,
            SearchPopup,
            TargetPopup,
        }
    }
</script>

<style lang="scss" scoped>
    %btn {
        width: 49px;
        height: 41px;
        background-size: 100% 100%;
        margin-top:5px;
        cursor: pointer;
        opacity: .8;
    }

    %btn:hover{
        opacity: 1;
    }

    .popup{
        margin-top: -41px;
        margin-left: 52px;
        position: absolute;
    }
    .btn_search{
        @extend %btn;
        background-image: url("/images/index_09.png");
    }
    .btn_layer{
        @extend %btn;
        background-image: url("/images/index_13.png");
    }
    .btn_choose{
        @extend %btn;
        background-image: url("/images/index_11.png");
    }
</style>
