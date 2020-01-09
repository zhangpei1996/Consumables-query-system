<template>
    <div class="mirth-menu">
        <el-menu
        :collapse="$store.getters.getMenuIsCollapse"
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        router
        background-color="#22242d"
        text-color="#fff"
        active-text-color="#ffd04b">
            <el-menu-item index="/">
                <i class="el-icon-s-data"></i>
                <span>数据查询</span>
            </el-menu-item>
            <!-- <el-menu-item index="/to_upload">
                <i class="el-icon-upload"></i>
                <span slot="title">待上传数据</span>
            </el-menu-item>
            <el-menu-item index="/consumable_log">
                <i class="el-icon-tickets"></i>
                <span slot="title">日志</span>
            </el-menu-item> -->
        </el-menu>
    </div>
</template>
<script>
export default {
    data () {
        return {

        }
    },
    methods: {}
}
</script>
<style lang="less">
.mirth-menu {
    height: 100%;
    .el-menu {
        border: none;
        height: 100%;
        &.el-menu-vertical-demo:not(.el-menu--collapse) {
            width: 150px;
            min-height: 400px;
        }
        .el-menu-item, .el-submenu__title {
            height: 40px !important;
            line-height: 40px !important;
        }
    }
}
</style>
