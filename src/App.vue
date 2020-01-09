<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    created () {
        if (!this.$store.getters.getNickname) this.$store.commit('setNickname', localStorage.getItem('nickname'));
    }
}
</script>
<style lang="less">

</style>
