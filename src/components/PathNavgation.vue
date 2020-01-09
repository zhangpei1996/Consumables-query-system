<template>
    <div class="path-navigation">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">耗材查询系统</el-breadcrumb-item>
            <el-breadcrumb-item v-for="item in pathnav" :to="item.path" :key="item.path">{{ item.pathname }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<script>
export default {
    props: ['pathnav']
}
</script>
<style lang="less" scoped>
.path-navigation {
    padding: 3px;
    border-radius: 4px;
    position: absolute;
    z-index: 9999;
    top: 6px;
    left: 50px;
}
</style>
