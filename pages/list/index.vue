<template>
    <div style="height: 100%;width: 100%;background: #fff" class="dxcr_list">
        <div class="dxcr_container">
            <div class="handle-box">
                <el-input  size="small" v-model="searchInfo" placeholder="输入任意信息" class="handle-input mr10"></el-input>
                <el-button size="small" type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button
                        size="small"
                        type="danger"
                        icon="el-icon-delete"
                        class="handle-del el-icon--right"
                        @click="delAllSelection"
                        style="float:right"
                >批量删除</el-button>
                <!--<el-button
                        type="success"

                        icon="el-icon-circle-plus-outline"
                        class="handle-del el-icon--right"
                        @click="handleAdd"
                        style="float:right"
                >新增</el-button>-->
            </div>
            <el-table
                    :data="tableDataR"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @row-click="handleRowClick"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column prop="id" label="序号" width="60"></el-table-column>
                <el-table-column prop="制定单位" label="制定单位"></el-table-column>
                <el-table-column prop="工作名称" label="工作名称"></el-table-column>
                <el-table-column prop="管线名称" label="管线名称"></el-table-column>
                <el-table-column prop="管段" label="管段"></el-table-column>
                <el-table-column prop="起始里程" label="起始里程"></el-table-column>
                <el-table-column prop="终止里程"  label="终止里程"></el-table-column>
                <el-table-column prop="计划识别开始时间"  label="计划识别开始时间"></el-table-column>
                <el-table-column prop="计划识别结束时间" label="计划识别结束时间"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :current-page="query.pageIndex"
                        :page-size="query.pageSize"
                        :total="pageTotal"
                        @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="140px">
                <el-form-item label="制定单位">
                    <el-input v-model="form.制定单位"></el-input>
                </el-form-item>
                <el-form-item label="工作名称">
                    <el-input v-model="form.工作名称"></el-input>
                </el-form-item>
                <el-form-item label="管线名称">
                    <el-input v-model="form.管线名称"></el-input>
                </el-form-item>
                <el-form-item label="管段">
                    <el-input v-model="form.管段"></el-input>
                </el-form-item>
                <el-form-item label="起始里程">
                    <el-input v-model="form.起始里程"></el-input>
                </el-form-item>
                <el-form-item label="终止里程">
                    <el-input v-model="form.终止里程"></el-input>
                </el-form-item>
                <el-form-item label="计划识别开始时间">
                    <el-input v-model="form.计划识别开始时间"></el-input>
                </el-form-item>
                <el-form-item label="计划识别结束时间">
                    <el-input v-model="form.计划识别结束时间"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 新增弹出框 -->
        <el-dialog title="新增" :visible.sync="addVisible" width="30%">
            <el-form ref="form" :model="addForm" label-width="140px">
                <el-form-item label="制定单位">
                    <el-input v-model="addForm.制定单位"></el-input>
                </el-form-item>
                <el-form-item label="工作名称">
                    <el-input v-model="addForm.工作名称"></el-input>
                </el-form-item>
                <el-form-item label="管线名称">
                    <el-input v-model="addForm.管线名称"></el-input>
                </el-form-item>
                <el-form-item label="起始里程">
                    <el-input v-model="addForm.起始里程"></el-input>
                </el-form-item>
                <el-form-item label="终止里程">
                    <el-input v-model="addForm.终止里程"></el-input>
                </el-form-item>
                <el-form-item label="计划识别开始时间">
                    <el-input v-model="addForm.计划识别开始时间"></el-input>
                </el-form-item>
                <el-form-item label="计划识别结束时间">
                    <el-input v-model="addForm.计划识别结束时间"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { fetchData } from '@/services/fetchData';
    export default {
        name: 'ghgqshjh',
        data() {
            return {
                query: {
                    address: '',
                    name: '',
                    pageIndex: 1,
                    pageSize: 10
                },
                tableData: [],
                tableDataR: [],
                multipleSelection: [],
                delList: [],
                editVisible: false,
                addVisible:false,
                pageTotal: 0,
                form: {},
                searchInfo:'',
                addForm:{},
                idx: -1,
                id: -1
            };
        },
        created() {
            this.getData();
        },
        methods: {
            // 获取 easy-mock 的模拟数据
            getData() {
                // fetchData(process.env.BASE_URL + '/高后果区识别计划.json',this.query).then(res => {
                //     console.log(res);
                //     this.tableData = res.list;
                //     this.tableDataR = res.list;
                //     this.pageTotal = res.pageTotal || 50;
                // });
            },
            handleAdd(){
                this.addVisible=true
            },
            // 触发搜索按钮
            handleSearch() {
                let c= this
                this.tableDataR=this.tableData.filter((item)=>{
                    for(let i in item){
                        if(item[i].toString().indexOf(c.searchInfo)!=-1){
                            return true
                        }
                    }
                    return false
                })
            },
            // 删除操作
            handleDelete(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                        this.$message.success('删除成功');
                        this.tableData.splice(index, 1);
                    })
                    .catch(() => {});
            },
            // 多选操作
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleRowClick(row,column,event){
                this.$refs.multipleTable.toggleRowSelection(row);
            },
            delAllSelection() {
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.tableData=this.tableData.filter(v =>{
                        return this.multipleSelection.every(x=>{
                            return v['id']!=x['id']
                        })
                    })
                    this.$message.success(`删除成功`);
                    this.multipleSelection = [];
                }).catch(() => {});

                // const length = this.multipleSelection.length;
                // console.log(this.multipleSelection)
                // let str = '';
                // this.delList = this.delList.concat(this.multipleSelection);
                // for (let i = 0; i < length; i++) {
                //     str += this.multipleSelection[i].name + ' ';
                // }

            },
            // 编辑操作
            handleEdit(index, row) {
                this.idx = index;
                this.form = Object.assign({},row);
                this.editVisible = true;
            },
            // 保存编辑
            saveEdit() {
                this.editVisible = false;
                this.$set(this.tableData, this.idx, this.form);
                this.$message.success(`修改成功`);
            },
            //保存新增
            saveAdd(){
                this.addForm['id']=parseInt(this.tableData[this.tableData.length-1]['id']) + 1
                this.tableData.push(Object.assign({},this.addForm))
                this.addVisible = false;
                this.$message.success('新增成功');
            },
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'pageIndex', val);
                this.getData();
            }
        }
    };
</script>

<style scoped>
    .dxcr_container{
        padding: 30px;
    }

    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .table {
        width: 100%;
        font-size: 14px;
    }
    .red {
        color: #ff0000;
    }
    .mr10 {
        margin-right: 10px;
    }
    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }
</style>
<style lang="scss">
    .dxcr_list{
        .el-pager{
            padding-left:0px;
        }
        .pagination{
            margin: 20px 0;
            text-align: right;
        }
    }
</style>
