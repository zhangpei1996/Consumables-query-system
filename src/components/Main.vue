<template>
    <div class="main">
        <nav class="nav">
            <el-button @click="$store.commit('setMenuIsCollapse', !$store.getters.getMenuIsCollapse)" class="icon-button" :icon="$store.getters.getMenuIsCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></el-button>
            <div class="block">
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                        <div class="img"></div>
                        <span class="username">{{ $store.getters.getNickname }}</span>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="logoutBox = true;" icon="el-icon-circle-close">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
            </div>
        </nav>
        <div class="mian-box">
            <router-view></router-view>
            <el-dialog
                :visible.sync="logoutBox"
                width="20%"
                class="logout">
                <div slot="title">
                    <span class="el-icon-warning-outline" style="color: #E6A23C;"></span> 退出登录
                </div>
                <span>您确定要退出登录吗？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button size="mini" @click="logoutBox = false">取 消</el-button>
                    <el-button size="mini" type="primary" @click="logout">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            logoutBox: false
        }
    },
    methods: {
        logout () { // 退出登录
            this.$axios({
                url: '/logout',
                method: 'get'
            })
            .then(res => {})
            .catch(err => {
                console.log(err)
            });
            this.logoutBox = false;
            this.$store.commit('setNickname', '');
            localStorage.removeItem('token');
            localStorage.removeItem('nickname');
            this.$router.push({ path: '/login' });
        }
    }
}
</script>
<style lang="less">
.main {
    height: 100%;
    position: relative;
    padding-top: 42px;
    box-sizing: border-box;
    .nav {
        width: 100%;
        height: 32px;
        position: absolute;
        top: 0;
        right: 0;
        background-color: #ddd;
        .icon-button {
            margin: 5px 0 0 10px;
            padding: 0;
            border: none;
            i {
                font-size: 22px;
            }
        }
        .block {
            position: absolute;
            top: 0;
            right: 12px;
            cursor: pointer;
            .img {
                display: inline-block;
                width: 28px;
                height: 28px;
                font-size: 0;
                border-radius: 50%;
                overflow: hidden;
                vertical-align: bottom;
                background: url('../assets/timg.jpg') no-repeat;
                background-size: cover;
            }
            .username {
                font-size: 16px;
                font-family: '楷体';
                margin-left: 8px;
                color: #409EFF;
            }
        }
    }
    .mian-box {
        height: 100%;
    }
}
</style>
