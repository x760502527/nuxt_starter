<template>
    <div v-show="value">
        <v-form ref="form" v-model="valid">
            <v-row justify="center">
                <v-dialog v-model="dialog" persistent max-width="600px">
                    <v-card color="rgba(24,103,192,.8)">
                        <v-card-title>
                            <span class="headline">查询</span>
                            <div class="close" @click="close()">
                                <v-btn small text icon color="#fff">
                                    <v-icon small>close</v-icon>
                                </v-btn>
                            </div>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="6">
                                        <v-select
                                                :items="['管道', '设备']"
                                                label="查询目标"
                                                placeholder="请选择"
                                                dense
                                                height="40"
                                                outlined
                                                required
                                                persistent-hint
                                                hint="*查询目标为管道或设备"
                                                v-model="targetType"
                                                :rules="[v => !!v || '该字段必须填写']"
                                        ></v-select>

                                    </v-col>
                                    <v-col cols="6">
                                        <v-select
                                                :items="targets"
                                                label="选择管道"
                                                placeholder="请选择目标"
                                                dense
                                                outlined
                                                required
                                                persistent-hint
                                                v-model="target"
                                                offset-y
                                        ></v-select>
                                    </v-col>
                                    <v-col>
                                        <v-select
                                                :items="['报警', '数据']"
                                                label="查询类型"
                                                placeholder="请选择类型"
                                                dense
                                                outlined
                                                required
                                                persistent-hint
                                                hint="*查询类型为报警或数据"
                                                offset-y
                                                v-model="type"
                                                :rules="[v => !!v || '该字段必须填写']"
                                        ></v-select>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-select
                                                :items="levels"
                                                label="选择报警级别"
                                                placeholder="请选择级别"
                                                dense
                                                outlined
                                                required
                                                v-model="level"
                                                offset-y
                                        ></v-select>
                                    </v-col>
                                    <v-col cols="6">
                                        <date-time-picker :value.sync="startTime" label="开始时间">
                                        </date-time-picker>
                                        <!--                                    <v-text-field-->
                                        <!--                                            label="开始时间"-->
                                        <!--                                            persistent-hint-->
                                        <!--                                            required-->
                                        <!--                                            dense-->
                                        <!--                                            outlined-->
                                        <!--                                    ></v-text-field>-->
                                    </v-col>
                                    <v-col cols="6">
                                        <date-time-picker :value.sync="endTime" label="结束时间">
                                        </date-time-picker>
                                        <!--<v-text-field
                                                label="结束时间"
                                                persistent-hint
                                                dense
                                                outlined
                                                required
                                        ></v-text-field>-->
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field
                                                label="开始位置"
                                                persistent-hint
                                                required
                                                v-model="startLocation"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field
                                                label="结束位置"
                                                persistent-hint
                                                required
                                                v-model="endLocation"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">关闭</v-btn>
                            <v-btn color="blue darken-1" @click="search">查询</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
        </v-form>
    </div>
</template>

<script>
    import DateTimePicker from '../a/DateTimePicker'
    import apiService from '../../services/apiService'
    import moment from 'moment'

    export default {
        name: "SearchWindow",
        model: {
            prop: 'value',
            event: 'showChange'
        },
        props: {
            value: {
                type: Boolean,
                default: false
            },
        },
        mounted() {
            this.startTime = moment().subtract(1, 'd').format('YYYY-MM-DD HH:mm')
            this.endTime = moment().format('YYYY-MM-DD HH:mm')
        },
        data() {
            return {
                rules: [],
                valid: false,
                startTime: moment().subtract(1, 'd').format('YYYY-MM-DD HH:mm'),
                endTime: moment().format('YYYY-MM-DD HH:mm'),
                dialog: false,
                targets: [],
                levels: [],
                targetType: '',
                target: '',
                type: '',
                level: '',
                startLocation: '',
                endLocation: ''
            }
        },
        methods: {
            close() {
                this.dialog = this.false
            },
            search() {
                if (!this.$refs.form.validate()) {
                    return
                }

                this.dialog = false
                let ob = {
                    targetType: this.targetType,
                    target: this.target,
                    type: this.type,
                    level: this.level,
                    startTime: this.startTime,
                    endTime: this.endTime,
                    startLocation: this.startLocation,
                    endLocation: this.endLocation
                }
                this.$emit('search', ob);
            }
        },
        watch: {
            dialog() {
                this.$store.commit('changePopupState', "")
            },
            value() {
                if (this.$store.state['popupState'] === 'search') {
                    this.dialog = true
                }
            },
            async targetType(value) {
                if (value == '管道') {
                    const datas = await apiService.getPipelines()
                    const pipelines = datas['rows']

                    this.targets = pipelines.map((pip) => {
                        let ob = {text: pip['PP_NAME'], value: pip['PP_ID']}
                        return ob
                    })
                    this.target = this.targets[0]['value']
                } else if (value == '设备') {
                    const datas = await apiService.getMarkerEquip()
                    this.targets = datas.map((pip) => {
                        let ob = {text: pip['EQ_NAME'], value: pip['EQ_ID']}
                        return ob
                    })
                    this.target = this.targets[0]['value']
                }
            },
            async type(value) {
                if (value == '报警') {
                    const {data} = await apiService.getAlarmTypes()
                    this.levels = data.map((data) => {
                        return {
                            text: data['value'],
                            value: data['code']
                        }
                    })
                    this.level = this.levels[0]['value']
                } else if (value == '数据') {
                    const {data} = await apiService.getDataTypes()
                    this.levels = data.map((data) => {
                        return {
                            text: data['value'],
                            value: data['code']
                        }
                    })
                    this.level = this.levels[0]['value']
                }
            }
        },
        components: {
            DateTimePicker
        }
    }
</script>

<style lang="scss" scoped>
    .close {
        position: absolute;
        right: 5px;
        top: 3px;
    }
</style>
