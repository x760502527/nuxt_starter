<template>
    <div style="height: 100%;width: 100%;padding:10px;" class="equipmentImg">
        <img v-show="data == 'DTS'" src="/images/equipment/dts.png" alt="">
        <img v-show="data == 'DVS'" src="/images/equipment/dvs.png" alt="">
        <img v-show="data == 'DTSS'" src="/images/equipment/dtss.png" alt="">
        <img v-show="data == 'DAS'" src="/images/equipment/das.png" alt="">
    </div>
</template>

<script>
    export default {
        name: "EquipmentImg",
        props: {
            data: {
                default: ()=>{
                    return 'DTS'
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .equipmentImg{
        img{
            width: 100%;
            position: relative;
            top:50%;
            transform: translateY(-50%);
        }
    }
</style>
