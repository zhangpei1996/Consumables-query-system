<template>
    <div class="index">
        <el-col class="index-left">
            <router-view class="menu" name="menu"></router-view>
        </el-col>
        <el-col :class="['index-right',  $store.getters.getMenuIsCollapse ? 'pl_64' : 'pl_200']">
            <router-view name="main"></router-view>
        </el-col>
    </div>
</template>
<script>
export default {}
</script>
<style lang="less">
.index {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #22242d;
    height: 100%;
    .index-left {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 999;
        height: 100%;
        width: auto;
    }
    .index-right {
        background-color: #fff;
        height: 100%;
        &.pl_64 {
            padding-left: 64px;
        }
        &.pl_200 {
            padding-left: 150px;
        }
    }
}
</style>
