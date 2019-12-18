<template>
    <div v-show="value">
        <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card color="rgba(21,88,155,.8)">
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
                                            hint="*必填"
                                    ></v-select>
                                </v-col>
                                <v-col>
                                    <v-select
                                            :items="['报警', '温度']"
                                            label="查询类型"
                                            placeholder="请选择类型"
                                            dense
                                            outlined
                                            required
                                            persistent-hint
                                            hint="*查询类型为报警或温度"
                                    ></v-select>
                                </v-col>
                                <v-col cols="6">
                                    <v-select
                                            :items="targets"
                                            label="选择报警级别"
                                            placeholder="请选择级别"
                                            dense
                                            outlined
                                            required
                                    ></v-select>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                            label="开始时间"
                                            persistent-hint
                                            required
                                            dense
                                            outlined
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                            label="结束时间"
                                            persistent-hint
                                            dense
                                            outlined
                                            required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                            label="管道开始位置"
                                            persistent-hint
                                            required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                            label="管道结束位置"
                                            persistent-hint
                                            required
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                        <small>* 表示必须填写</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialog = false">关闭</v-btn>
                        <v-btn color="blue darken-1" @click="dialog = false">查询</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>

<script>
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
        data() {
            return {
                dialog: false,
                targets: [{
                    text: "测试1",
                    value: "ceshi1"
                }]
            }
        },
        methods: {
            close(){
                this.dialog = false
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
            }
        }
    }
</script>

<style lang="scss" scoped>
    .close {
        position: absolute;
        right:5px;
        top: 3px;
    }
</style>
