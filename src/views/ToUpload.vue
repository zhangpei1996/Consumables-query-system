<template>
    <div class="to-upload">
        <PNV :pathnav="pathNavigation"></PNV>
        <el-card class="box-card search-box">
            <el-form :model="queryFrom" :inline="true" size="mini" ref="queryFrom" label-width="72px" class="queryFrom">
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
                <el-form-item label="病人姓名:">
                    <el-input v-model="queryFrom.name"></el-input>
                </el-form-item>
                <el-form-item style="float: right;">
                    <el-button @click="submitForm(queryFrom)" size="mini" icon="el-icon-search" type="primary">查询</el-button>
                    <el-button @click="resetForm('queryFrom')" size="mini" icon="el-icon-remove-outline">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <div class="float-right-box">
            <div class="btns">
                <!-- <el-button @click="queryBox = true;" type="primary" size="mini" icon="el-icon-search">查询</el-button> -->
                <!-- <el-button @click="exportExcel(queryData)" :loading="btnLoading" type="success" size="mini" icon="el-icon-download">导出</el-button> -->
            </div>
            <!-- <div class="pagination">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-size="queryFrom.pageSize"
                    :current-page="currentPage"
                    :total="totalPages"
                    @current-change="pagination">
                </el-pagination>
            </div> -->
        </div>
        <el-tabs v-model="activeName" @tab-click="getData(queryFrom)" type="border-card" class="data-tabs">
            <el-tab-pane name="outpatientDepartment">
                <span slot="label">门诊</span>
                <el-table
                    id="rebateSetTable"
                    :data="clinicalData"
                    :height="tabHeight"
                    border
                    v-loading="loading">
                    <el-table-column
                    label="序号"
                    header-align="center"
                    align="center"
                    sortable
                    :sort-orders="['ascending', 'descending']"
                    width="77">
                        <template slot-scope="scope">
                            <div>
                                {{ scope.$index + 1 }}
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
                    prop="innumber"
                    label="登记数量"
                    sortable
                    align="right"
                    :sort-orders="['ascending', 'descending']"
                    header-align="center"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="batchid"
                    label="BATCHID"
                    sortable
                    align="right"
                    :sort-orders="['ascending', 'descending']"
                    header-align="center"
                    width="88">
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
                    prop="instoragedate"
                    label="登记时间"
                    sortable
                    align="center"
                    :sort-orders="['ascending', 'descending']"
                    header-align="center"
                    width="180">
                    <template slot-scope="scope">
                        {{ scope.row.instoragedate | dateFormat }}
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="dept"
                    label="DEPT"
                    sortable
                    align="center"
                    :sort-orders="['ascending', 'descending']"
                    header-align="center"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="outstorage"
                    label="OUTSTORAGE"
                    sortable
                    align="center"
                    :sort-orders="['ascending', 'descending']"
                    header-align="center"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="ordered_by"
                    label="ORDERED_BY"
                    sortable
                    align="center"
                    :sort-orders="['ascending', 'descending']"
                    header-align="center"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="performed_by"
                    label="PERFORMED_BY"
                    sortable
                    align="center"
                    :sort-orders="['ascending', 'descending']"
                    header-align="center"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="NAME"
                    sortable
                    :sort-orders="['ascending', 'descending']"
                    header-align="center"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="inp_no"
                    label="INP_NO"
                    sortable
                    :sort-orders="['ascending', 'descending']"
                    header-align="center"
                    width="120">
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
                </el-table>
            </el-tab-pane>
            <el-tab-pane name="inpatientDepartment">
                <span slot="label">住院</span>
                <el-table
                    id="rebateSetTable"
                    :data="hospitalizationData"
                    :height="tabHeight"
                    border
                    v-loading="loading">
                    <el-table-column
                    label="序号"
                    header-align="center"
                    align="center"
                    sortable
                    :sort-orders="['ascending', 'descending']"
                    width="77">
                        <template slot-scope="scope">
                            <div>
                                {{ scope.$index + 1 }}
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
                    prop="innumber"
                    label="登记数量"
                    sortable
                    align="right"
                    :sort-orders="['ascending', 'descending']"
                    header-align="center"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="batchid"
                    label="BATCHID"
                    sortable
                    align="right"
                    :sort-orders="['ascending', 'descending']"
                    header-align="center"
                    width="88">
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
                    prop="instoragedate"
                    label="登记时间"
                    sortable
                    align="center"
                    :sort-orders="['ascending', 'descending']"
                    header-align="center"
                    width="180">
                    <template slot-scope="scope">
                        {{ scope.row.instoragedate | dateFormat }}
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="dept"
                    label="DEPT"
                    sortable
                    align="center"
                    :sort-orders="['ascending', 'descending']"
                    header-align="center"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="outstorage"
                    label="OUTSTORAGE"
                    sortable
                    align="center"
                    :sort-orders="['ascending', 'descending']"
                    header-align="center"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="ordered_by"
                    label="ORDERED_BY"
                    sortable
                    align="center"
                    :sort-orders="['ascending', 'descending']"
                    header-align="center"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="performed_by"
                    label="PERFORMED_BY"
                    sortable
                    align="center"
                    :sort-orders="['ascending', 'descending']"
                    header-align="center"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="NAME"
                    sortable
                    :sort-orders="['ascending', 'descending']"
                    header-align="center"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="inp_no"
                    label="INP_NO"
                    sortable
                    :sort-orders="['ascending', 'descending']"
                    header-align="center"
                    width="120">
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
                </el-table>
            </el-tab-pane>
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
                { path: '/to_upload', pathname: '待上传数据' }
            ],
            activeName: 'outpatientDepartment',
            clinicalData: [],
            hospitalizationData: [],
            selectionList: [],
            loading: false,
            queryFrom: {
                id: '',
                itemcode: '',
                name: '',
                startTime: '',
                endTime: '',
                pageNum: 1,
                pageSize: 200,
                type: ''
            },
            startTime: '',
            endTime: ''
        }
    },
    methods: {
        resetForm (formName) { // 重置查询表单
            this.$refs[formName].resetFields();
        },
        submitForm (queryFrom) { // 提交查询表单
            this.queryFrom.pageNum = 1;
            this.queryFrom.startTime = moment(this.startTime).format('YYYYMMDD');
            this.queryFrom.endTime = moment(this.endTime).format('YYYYMMDD');
            this.getData(this.queryFrom);
        },
        getTodayData () { // 获取今天的数据
            const today = Date.now();
            const tomorrow = today + 24 * 60 * 60 * 1000;
            const yesterday = today - 24 * 60 * 60 * 1000;
            this.queryFrom.startTime = moment(yesterday).format('YYYYMMDD');
            this.queryFrom.endTime = moment(tomorrow).format('YYYYMMDD');
            this.getData(this.queryFrom);
        },
        getData (queryFrom) { // 获取后台数据数据
            this.loading = true;
            queryFrom.type = this.activeName === 'outpatientDepartment' ? 'mz' : this.activeName === 'inpatientDepartment' ? 'zy' : '';
            if (queryFrom.type === '') return this.$message.warning('请正确提交查询参数!');
            this.$axios({
                url: `/hcupload`,
                method: 'get',
                params: queryFrom,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(res => {
                const { hcupload } = res.data;
                if (hcupload <= 0) {
                    this.loading = false;
                    this.$message.warning('当前筛选条件，取得数据为空！');
                }
                if (this.activeName === 'outpatientDepartment') {
                    this.clinicalData = hcupload;
                } else if (this.activeName === 'inpatientDepartment') {
                    this.hospitalizationData = hcupload;
                }
                this.loading = false;
            })
            .catch(err => {
                console.log(err);
                this.$message.error('获取数据失败');
                this.clinicalData = [];
                this.hospitalizationData = [];
                this.loading = false;
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
            return window.innerHeight - 145;
        }
    },
    filters: {
        dateFormat: function (date) {
            return moment(date).format('YYYY-MM-DD');
        }
    }
}
</script>
<style lang="less">
.to-upload {
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
        right: 15px;
        top: 100px;
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
                width: 125px;
            }
            .el-input--prefix .el-input__inner {
                padding-left: 20px;
            }
            .el-input--suffix .el-input__inner {
                padding-right: 20px;
            }
            .el-input__prefix {
                left: -1px;
            }
            .el-input__suffix {
                right: 1px;
            }
            .el-input.el-input--mini {
                width: 125px;
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
