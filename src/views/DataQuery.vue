<template>
    <div class="data-query">
        <PNV :pathnav="pathNavigation"></PNV>
        <el-card class="box-card search-box">
            <el-form :model="queryFrom" :inline="true" size="mini" ref="queryFrom" label-width="76px" class="queryFrom">
                <el-form-item label="开始时间:">
                    <el-date-picker
                        v-model="startTime"
                        type="date"
                        placeholder="选择起始日期"
                        @focus="startTime = ''">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间:">
                    <el-date-picker
                        v-model="endTime"
                        type="date"
                        placeholder="选择结束日期"
                        @focus="endTime = ''">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="唯一标识:">
                    <el-input v-model="queryFrom.id"></el-input>
                </el-form-item>
                <el-form-item label="存货编码:">
                    <el-input v-model="queryFrom.itemcode"></el-input>
                </el-form-item>
                <el-form-item label="病人ID:">
                    <el-input v-model="queryFrom.patient_id"></el-input>
                </el-form-item>
                <el-form-item label="病人姓名:">
                    <el-input v-model="queryFrom.name"></el-input>
                </el-form-item>
                <el-form-item label="日志状态:" class="search-form">
                    <el-select v-model="queryFrom.flag" @change="queryFrom.pageNum = 1;getData(queryFrom)" size="mini" placeholder="请选择状态">
                        <el-option label="成功" :value="1"></el-option>
                        <el-option label="失败" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="float: right;">
                    <el-button @click="submitForm(queryFrom)" size="mini" icon="el-icon-search" type="primary">查询</el-button>
                    <el-button @click="resetForm('queryFrom')" size="mini" icon="el-icon-remove-outline">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <div class="float-right-box">
            <div class="btns">
                <el-button @click="getYesterdayData" type="info" size="mini" icon="el-icon-back">昨天</el-button>
                <el-button @click="exportExcel(queryFrom)" :loading="btnLoading" type="success" size="mini" icon="el-icon-download">导出</el-button>
                <el-button size="mini" type="danger" :disabled="deleteBtn" @click="deleteHClogs(hcLogsDataIdsArr)" icon="el-icon-delete">批量删除</el-button>
            </div>
            <div class="pagination">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-size="queryFrom.pageSize"
                    :current-page="queryFrom.pageNum"
                    :total="totalPages"
                    @current-change="pagination">
                </el-pagination>
            </div>
        </div>
        <el-tabs v-model="activeName" type="border-card" class="data-tabs" @tab-click="queryFrom.pageNum = 1;getData(queryFrom)">
            <el-tab-pane name="outpatientDepartment">
                <span slot="label">门诊 <span v-show="activeName === 'outpatientDepartment'"> (正: {{clincPositiveQuantity}},负: {{clincNegativeQuantity}}) </span></span>
            </el-tab-pane>
            <el-tab-pane name="inpatientDepartment">
                <span slot="label">住院 <span v-show="activeName === 'inpatientDepartment'"> (正: {{inpatientPositiveQuantity}},负: {{inpatientNegativeQuantity}}) </span></span>
            </el-tab-pane>
            <el-table
                id="rebateSetTable"
                :data="hcLogsList"
                :height="tabHeight"
                border
                v-loading="loading"
                @selection-change="SelectTheLogToDelete">
                <el-table-column
                    type="selection"
                    width="45">
                </el-table-column>
                <el-table-column
                    label="序号"
                    header-align="center"
                    align="center"
                    sortable
                    :sort-orders="['ascending', 'descending']"
                    width="77">
                    <template slot-scope="scope">
                        <div>
                            {{ scope.$index + 1 + (queryFrom.pageNum - 1) * queryFrom.pageSize }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="id"
                    label="唯一标识"
                    sortable
                    :sort-orders="['ascending', 'descending']"
                    header-align="center"
                    width="150">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top">
                            <span>{{ scope.row.id }}</span>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.id }}</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="itemcode"
                    label="存货编码"
                    sortable
                    :sort-orders="['ascending', 'descending']"
                    header-align="center"
                    width="150">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top">
                            <span>{{ scope.row.itemcode }}</span>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.itemcode }}</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="item_name"
                    label="存货名称"
                    sortable
                    :sort-orders="['ascending', 'descending']"
                    header-align="center"
                    width="150">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top">
                            <span>{{ scope.row.item_name }}</span>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.item_name }}</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="item_spec"
                    label="规格型号"
                    sortable
                    :sort-orders="['ascending', 'descending']"
                    header-align="center"
                    width="150">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top">
                            <span>{{ scope.row.item_spec }}</span>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.item_spec }}</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="suppliercode"
                    label="条码号"
                    sortable
                    :sort-orders="['ascending', 'descending']"
                    header-align="center"
                    width="150">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top">
                            <span>{{ scope.row.suppliercode }}</span>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.suppliercode }}</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="emp_no"
                    label="登记人工号"
                    sortable
                    :sort-orders="['ascending', 'descending']"
                    header-align="center"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="zxys"
                    label="登记人姓名"
                    sortable
                    :sort-orders="['ascending', 'descending']"
                    header-align="center"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="instoragedate"
                    label="登记时间"
                    sortable
                    align="center"
                    :sort-orders="['ascending', 'descending']"
                    header-align="center"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="instoragername"
                    label="登记科室仓库"
                    sortable
                    :sort-orders="['ascending', 'descending']"
                    header-align="center"
                    width="150">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top">
                            <span>{{ scope.row.instoragername }}</span>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.instoragername }}</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="innumber"
                    label="登记数量"
                    sortable
                    align="right"
                    :sort-orders="['ascending', 'descending']"
                    header-align="center"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="units"
                    label="单位"
                    sortable
                    :sort-orders="['ascending', 'descending']"
                    header-align="center"
                    width="95">
                </el-table-column>
                <el-table-column
                    prop="unitprice"
                    label="单价"
                    sortable
                    :sort-orders="['ascending', 'descending']"
                    header-align="center"
                    align="right"
                    width="130">
                </el-table-column>
                <el-table-column
                    prop="patient_id"
                    label="患者ID"
                    sortable
                    :sort-orders="['ascending', 'descending']"
                    header-align="center"
                    width="130">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="患者姓名"
                    sortable
                    :sort-orders="['ascending', 'descending']"
                    header-align="center"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="uploaddate"
                    label="上传时间"
                    sortable
                    align="center"
                    :sort-orders="['ascending', 'descending']"
                    header-align="center"
                    width="180">
                </el-table-column>
                <el-table-column
                    v-if="queryFrom.flag === 0"
                    prop="error"
                    label="错误记录"
                    header-align="center"
                    width="120">
                </el-table-column>
                <el-table-column
                    v-if="queryFrom.flag === 0"
                    prop="error"
                    label="操作"
                    header-align="center"
                    width="100">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="deleteHClogs([(scope.row.id).toString()])" icon="el-icon-delete">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-tabs>
    </div>
</template>
<script>
import PNV from '../components/PathNavgation.vue';
import moment from 'moment';
export default {
    data () {
        return {
            pathNavigation: [
                { path: '/', pathname: '数据查询' }
            ],
            btnLoading: false,
            loading: false,
            clinicalData: [],
            hospitalizationData: [],
            totalPages: 0,
            startTime: '',
            endTime: '',
            queryFrom: {
                id: '',
                itemcode: '',
                patient_id: '',
                name: '',
                startTime: '',
                endTime: '',
                pageNum: 1,
                pageSize: 200,
                type: '',
                flag: 0
            },
            activeName: 'outpatientDepartment',
            clincPositiveQuantity: 0,
            clincNegativeQuantity: 0,
            inpatientPositiveQuantity: 0,
            inpatientNegativeQuantity: 0,
            hcLogsList: [],
            hcLogsDataSelection: [],
            hcLogsDataIdsArr: [],
            deleteBtn: true
        }
    },
    methods: {
        resetForm (formName) { // 重置查询表单
            this.$refs[formName].resetFields();
            this.startTime = '';
            this.endTime = '';
        },
        submitForm (queryFrom) { // 提交查询表单
            this.queryFrom.pageNum = 1;
            if (this.startTime && this.endTime) {
                this.queryFrom.startTime = moment(this.startTime).format('YYYYMMDD');
                this.queryFrom.endTime = moment(this.endTime).format('YYYYMMDD');
            } else {
                this.queryFrom.startTime = '';
                this.queryFrom.endTime = '';
            }
            this.getData(this.queryFrom);
        },
        exportExcel (queryFrom) { // 导出excel
            this.btnLoading = true;
            this.$axios({
                url: 'create_excel',
                method: 'get',
                params: queryFrom,
                responseType: 'blob'
            })
            .then(res => {
                console.log(res)
                let blob = new Blob([res.data], { type: 'application/ms-excel;charset=utf-8' });
                let downloadElement = document.createElement('a');
                let href = window.URL.createObjectURL(blob); // 创建下载的链接
                downloadElement.href = href;
                downloadElement.download = '耗材.xls'; // 下载后文件名
                document.body.appendChild(downloadElement);
                downloadElement.click(); // 点击下载
                document.body.removeChild(downloadElement); // 下载完成移除元素
                window.URL.revokeObjectURL(href); // 释放掉blob对象
                this.btnLoading = false;
            })
            .catch(err => {
                console.log(err);
                this.$message.error('导出失败!');
                this.btnLoading = false;
            });
        },
        getYesterdayData () { // 获取昨天的数据
            this.loading = true;
            this.queryFrom.pageNum = 1;
            const today = Date.now();
            const vorgestern = today - (24 * 60 * 60 * 1000) * 2;
            this.queryFrom.startTime = moment(vorgestern).format('YYYYMMDD');
            this.queryFrom.endTime = moment(today).format('YYYYMMDD');
            this.startTime = vorgestern;
            this.endTime = today;
            this.getData(this.queryFrom);
        },
        getTodayData () { // 获取今天的数据
            const today = Date.now();
            const tomorrow = today + 24 * 60 * 60 * 1000;
            const yesterday = today - 24 * 60 * 60 * 1000;
            this.queryFrom.startTime = moment(yesterday).format('YYYYMMDD');
            this.queryFrom.endTime = moment(tomorrow).format('YYYYMMDD');
            this.startTime = yesterday;
            this.endTime = tomorrow;
            this.getData(this.queryFrom);
        },
        getData (queryFrom) { // 获取后台数据数据
            this.loading = true;
            queryFrom.type = this.activeName === 'outpatientDepartment' ? 'mz' : this.activeName === 'inpatientDepartment' ? 'zy' : '';
            this.$axios({
                url: `/hclog`,
                method: 'get',
                params: queryFrom,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(res => {
                const { data, maxRow } = res.data;
                if (data <= 0) {
                    this.$message.warning('当前筛选条件，取得数据为空！');
                }
                if (this.activeName === 'outpatientDepartment') {
                    this.clincPositiveQuantity = res.data.PositiveRecordMZ;
                    this.clincNegativeQuantity = res.data.NegativeRecordMZ;
                } else if (this.activeName === 'inpatientDepartment') {
                    this.inpatientPositiveQuantity = res.data.PositiveRecordZY;
                    this.inpatientNegativeQuantity = res.data.NegativeRecordZY;
                }
                this.hcLogsList = data;
                this.totalPages = Math.ceil(maxRow / queryFrom.pageSize);
                this.loading = false;
            })
            .catch(err => {
                console.log(err);
                this.$message.error('获取数据失败!');
                this.hcLogsList = [];
                this.totalPages = 0;
                this.clincPositiveQuantity = 0;
                this.clincNegativeQuantity = 0;
                this.inpatientPositiveQuantity = 0;
                this.inpatientNegativeQuantity = 0;
                this.loading = false;
            });
        },
        pagination (val) { // 分页查询
            this.loading = true;
            this.queryFrom.pageNum = val;
            this.getData(this.queryFrom);
        },
        SelectTheLogToDelete (val) { // 选择要删除的上传失败的记录
            this.hcLogsDataSelection = val;
            const len = this.hcLogsDataSelection.length;
            this.deleteBtn = len >= 2 ? false : true;
            this.hcLogsDataIdsArr = [];
            this.hcLogsDataSelection.forEach(item => {
                !this.hcLogsDataIdsArr.includes(item.id) && this.hcLogsDataIdsArr.push(item.id);
            });
        },
        deleteHClogs (idList) { // 删除上传错误的日志记录
            this.$confirm('此操作将彻底删除数据，是否确认?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios({
                    url: '/hclog',
                    method: 'delete',
                    params: { idList: JSON.stringify(idList) }
                }).then(res => {
                    this.$message.success('删除成功!');
                    this.getData(this.queryFrom);
                }).catch(err => {
                    console.log(err);
                    this.$message.error('删除失败!');
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    },
    created () {
        this.getTodayData();
    },
    components: {
        PNV
    },
    computed: {
        tabHeight: function () {
            return window.innerHeight - 175;
        }
    }
}
</script>
<style lang="less">
.data-query {
    padding: 0 10px 0;
    height: 100%;
    .el-button {
        padding: 5px;
        span {
            font-size: 12px;
            margin-left: 3px;
        }
        & + .el-button {
            margin-left: 5px;
        }
    }
    .float-right-box{
        position: absolute;
        right: 18px;
        top: 128px;
        z-index: 1200;
        .btns, .pagination {
            display: inline-block;
        }
    }
    .box-card {
        .el-card__body {
            padding: 5px;
        }
        &.search-box {
            margin-bottom: 10px;
            background-color: #E4E7ED;
            padding: 0;
            .el-form-item {
                margin-bottom: 0;
            }
            .el-date-editor.el-input, .el-date-editor.el-input__inner {
                width: 150px;
            }
            .el-input.el-input--mini {
                width: 150px;
            }
        }
    }
    .count {
        color: #409EFF;
        font-size: 15px;
        span {
            margin: 0 6px;
        }
    }
    .loading {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, .7);
        z-index: 999999;
        .el-progress {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
    .el-table {
        .cell {
            text-overflow:ellipsis;
            white-space:nowrap;
            overflow:hidden;
        }
        &.el-table td, &.el-table th {
            padding: 0;
        }
        &.el-table--border, &.el-table--group {
            border: none;
        }
    }
    .el-popover {
        padding: 0 0 0 12px;
    }
    .name-wrapper {
        text-overflow:ellipsis;
        white-space:nowrap;
        overflow:hidden;
        .el-tag {
            border-color: none;
            background-color: #fff;
            color: #606266;
            border-width: none;
            border-style: none;
            border-radius: 0;
        }
    }
    .data-tabs {
        .el-tabs__content {
            padding: 0;
        }
    }
}
</style>
