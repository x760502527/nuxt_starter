<template>
    <v-menu
            v-model="endPickerShow"
            :close-on-content-click="false"
            offset-y
            min-width="290px"
            :close-on-click="false"
    >
        <template v-slot:activator="{ on }">
            <v-text-field
                    :label="label"
                    persistent-hint
                    dense
                    outlined
                    :rules="rule"
                    v-model="datetime"
                    @focus="textClick"
                    @input="mInput"
                    ref="input"
            ></v-text-field>
        </template>
        <div ref="menu">
            <v-date-picker v-if="endDateFlag==0" locale="zh-ch" v-model="endDate"
                           @input="endDateFlag = 1"
                           @change="changeDate"
                           :max="max"
                           :min="min"
            ></v-date-picker>
            <v-time-picker v-if="endDateFlag==1" v-model="endTime" format="24hr"
                           @change="changeTime"
                           @click:minute="clickMinute"
                           :max="max"
                           :min="min"
            ></v-time-picker>
        </div>
    </v-menu>
</template>

<script>
    import moment from 'moment'

    export default {
        name: "DateTimePicker",
        model: {
            prop: 'value',
            event: 'showChange',

        },
        props: {
            value: {},
            label: {
                default: '请选择时间'
            },
            max: undefined,
            min: undefined,
            rule: [true]
        },
        data() {
            return {
                endDate: moment().format('YYYY-MM-DD'),
                endTime: moment().format('HH:mm'),
                endPickerShow: false,
                endDateFlag: 0,
                transition: 'scale-transition',
                datetime: '',
                odatetime: '',
            }
        },
        watch: {
            datetime() {
                this.$emit('update:value', this.datetime)
            },
        },
        computed: {
            endDateTime() {
                return `${this.endDate} ${this.endTime}`
            }
        },
        created() {
            // document.getElementsByClassName('v-dialog')[0].addEventListener('click',e => {
            //
            // })
            if (process.client) {

                document.addEventListener('click', this.clickL, true)
            }
            this.datetime = this.value
            this.endDate = moment(this.datetime).format('YYYY-MM-DD')
            this.endTime = moment(this.datetime).format('HH:mm')
            this.odatetime = this.datetime
        },
        destroy() {
            document.removeEventListener("click", this.clickL, true);
        },
        methods: {
            clickMinute() {
                this.endPickerShow = false
            },
            changeDate() {
                this.datetime = `${this.endDate} ${this.endTime}`
                this.odatetime = this.datetime
            },
            changeTime() {
                this.datetime = `${this.endDate} ${this.endTime}`
                this.odatetime = this.datetime
            },
            clickL(e) {
                if (!this.$refs.menu) {
                    return
                }

                //判断点击的坐标是否在输入框内
                let x = e['clientX']
                let y = e['clientY']

                function getElementPosition(e) {
                    var x = 0, y = 0;
                    var xx = e.offsetWidth
                    var yy = e.offsetHeight
                    while(e != null) {
                        x += e.offsetLeft;
                        y += e.offsetTop;
                        e = e.offsetParent;
                    }
                    return { x1: x, y1: y ,x2:x+xx,y2:y+yy };
                }
                let {x1,y1,x2,y2} =getElementPosition(this.$refs.input.$el)

                if(x > x1 && x<x2 && y>y1 && y<y2 ){
                    return
                }

                //判断点击的元素
                let a = this.$refs.menu.contains(e.target)
                let b = this.$refs.input.$el.contains(e.target)

                if (!a && !b) {
                    if (this.isParent(e.target, this.$refs.menu.$el)) {

                    } else {
                        this.endPickerShow = false
                        this.datetime = `${this.endDate} ${this.endTime}`
                    }
                }
            },
            isParent(obj, parentObj) {
                while (obj != undefined && obj != null && obj.tagName.toUpperCase() != "BODY") {
                    if (obj == parentObj) {
                        return true;
                    }
                    obj = obj.parentNode;
                }
                return false;
            },
            checkString(o, n) {
                for (let i = 0; i < o.length; i++) {
                    if (i > n.length - 1) {
                        return i
                    }
                    let oi = o[i]
                    let on = n[i]
                    if (oi != on) {
                        return i
                    }
                }
                return o.length
            },
            mInput(value) {
                let o = this.odatetime
                let n = this.datetime
                let diff = this.checkString(o, n)
                if (diff > 9) {
                    this.endDateFlag = 1
                } else {
                    this.endDateFlag = 0
                }

                let date = moment(value).format('YYYY-MM-DD')
                let time = moment(value).format('HH:mm')
                if (date != "Invalid date") {
                    this.endDate = date
                }

                if (time != "Invalid date") {
                    this.endTime = time
                }
                this.odatetime = this.datetime

            },
            textClick() {
                this.endDateFlag = 0
                this.endPickerShow = true
            }
        }
    }
</script>

<style scoped>

</style>
