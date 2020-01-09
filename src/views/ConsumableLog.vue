<template>
    <div class="error_log">
        <PNV :pathnav="pathNavigation"></PNV>
        <el-card class="box-card search-box">
            <el-form ref="serachForm" :inline="true" size="mini" :model="serachForm" label-width="80px">
                <el-form-item label="时间范围:">
                    <el-date-picker
                        v-model="serachForm.dateTime"
                        type="datetimerange"
                        :picker-options="pickerOptions"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="查询内容:">
                    <el-input v-model="serachForm.serachText"></el-input>
                </el-form-item>
                <el-form-item style="float: right;">
                    <el-button @click="onSubmit" size="mini" icon="el-icon-search" type="primary">查询</el-button>
                    <el-button @click="resetForm('serachForm')" size="mini" icon="el-icon-remove-outline">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="box-card err_list">

        </el-card>
    </div>
</template>
<script>
import PNV from '../components/PathNavgation.vue';
export default {
    data () {
        return {
            pathNavigation: [
                { path: '/consumable_log', pathname: '耗材日志' }
            ],
            toolbars: {
                bold: true, // 粗体
                italic: true, // 斜体
                header: true, // 标题
                underline: true, // 下划线
                strikethrough: true, // 中划线
                mark: true, // 标记
                superscript: true, // 上角标
                subscript: true, // 下角标
                quote: true, // 引用
                ol: true, // 有序列表
                ul: true, // 无序列表
                link: true, // 链接
                imagelink: true, // 图片链接
                code: true, // code
                table: true, // 表格
                fullscreen: true, // 全屏编辑
                readmodel: true, // 沉浸式阅读
                htmlcode: true, // 展示html源码
                help: true, // 帮助
                /* 1.3.5 */
                undo: true, // 上一步
                redo: true, // 下一步
                trash: true, // 清空
                save: true, // 保存（触发events中的save事件）
                /* 1.4.2 */
                navigation: true, // 导航目录
                /* 2.1.8 */
                alignleft: true, // 左对齐
                aligncenter: true, // 居中
                alignright: true, // 右对齐
                /* 2.2.1 */
                subfield: true, // 单双栏模式
                preview: true, // 预览
                scrollStyle: true
            },
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick (picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick (picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick (picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            serachForm: {
                dateTime: [],
                serachText: ''
            }
        }
    },
    methods: {
        onSubmit () {},
        resetForm (formName) {
            this.serachForm = { dateTime: [], serachText: '' };
        }
    },
    created () {},
    components: {
        PNV
    },
    computed: {
        listHeight: function () {
            return window.innerHeight - 220 + 'px';
        }
    }
}
</script>
<style lang="less">
.error_log {
    padding: 0 10px 0;
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
    .v-note-wrapper {
        width: 100%;
        height: 100%;
    }
    .box-card {
        .el-card__body {
            padding: 5px;
        }
        &.search-box {
            margin-bottom: 10px;
            background-color: #E4E7ED;
            padding: 2px 5px;
        }
        &.err_list {

        }
        .item {
            padding: 0;
        }
        .el-form-item {
            margin-bottom: 0;
        }
    }
}
</style>
