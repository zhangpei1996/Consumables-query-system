<template>
    <div class="login">
        <vue-particles
            :particleOpacity="0.7"
            :particlesNumber="80"
            shapeType="circle"
            :particleSize="4"
            linesColor="#dedede"
            :linesWidth="1"
            :lineLinked="true"
            :lineOpacity="0.4"
            :linesDistance="150"
            :moveSpeed="3"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="true"
            clickMode="push">
        </vue-particles>
        <el-card class="box-card login-box">
            <div slot="header" class="clearfix header">
                <span>耗材查询系统</span>
            </div>
            <div class="text item">
                <el-form :model="loginForm" :status-icon="true" :rules="rules" ref="loginForm" label-width="66px" class="demo-loginForm">
                    <el-form-item label="用户名" prop="username" :error="errMsg">
                        <el-input v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password" :error="errMsg">
                        <el-input @keyup.enter.native="submitForm('loginForm')" v-model="loginForm.password" type="password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="small" type="primary" @click="submitForm('loginForm')">登录</el-button>
                        <el-button size="small" @click="resetForm('loginForm')">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>
<script>
import qs from 'qs';
export default {
    data () {
        return {
            loginForm: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            },
            errMsg: ''
        }
    },
    methods: {
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.login();
                } else {
                    return false;
                }
            });
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
        },
        login () {
            this.$axios({
                url: `/login`,
                method: 'post',
                data: qs.stringify(this.loginForm)
            })
            .then(res => {
                if (res.data.ISLOGIN) {
                    this.$store.commit('setNickname', res.data.nickname);
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('nickname', res.data.nickname);
                    this.$router.push({ path: '/' });
                } else {
                    this.errMsg = res.data.message
                }
            })
            .catch(err => {
                console.log(err);
                this.$message.error('连接服务器失败');
            });
        }
    }
}
</script>
<style lang="less">
.login {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('../assets/login_background.png') no-repeat;
    background-size: cover;
    #particles-js {
        height: 98%;
    }
    .text {
        font-size: 14px;
    }
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
    .box-card {
        width: 480px;
        color: #fff;
        border: 1px solid rgba(255, 255, 255, .3);
        .el-card__header {
            border-bottom: 1px solid rgba(255, 255, 255, .3);
        }
        .header {
            font-family: '楷体';
            font-size: 24px;
        }
    }
    .login-box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, .1);
        .el-form {
            .el-form-item__label {
                color: #fff;
            }
            .el-input__inner {
                background-color: rgba(0, 0, 0, .1);
                border: 1px solid rgba(255, 255, 255, .3);
                color: #fff;
            }
            .el-form-item:last-of-type {
                margin-bottom: 0;
            }
        }
    }
}
</style>
