import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import Axios from 'axios';
import VueParticles from 'vue-particles';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import { Message } from 'element-ui'
import qs from 'qs';

Vue.use(VueParticles);
Vue.use(mavonEditor);

// 请求拦截器
Axios.interceptors.request.use(function (config) {
    if (!config.url.endsWith('/login')) {
        config.headers['token'] = localStorage.getItem('token');
    } else {
        delete config.headers['token'];
    }
    if (config.method === 'delete') { // 解决 params 传递数组会导致参数后面带上[]的问题
        config.paramsSerializer = function (params) {
            return qs.stringify(params, { arrayFormat: 'repeat' })
        }
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});
// 响应拦截器
Axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    const errRes = error && error.response;
    if (errRes) {
        if (errRes.status === 401 || errRes.status === 407) {
            Message.error(errRes.data.message)
            store.commit('setNickname', '');
            localStorage.removeItem('token');
            localStorage.removeItem('nickname');
            router.push({ path: '/login' });
        }
    }
    return Promise.reject(error);
});

// 设置公共请求路径
// Axios.defaults.baseURL = 'http://172.16.201.68:8080/hc/hc';
// Axios.defaults.baseURL = 'http://172.31.5.55:8080/hc/hc';
// Axios.defaults.baseURL = 'http://192.168.137.220:8082/hc';
// Axios.defaults.baseURL = 'http://172.31.8.49:8080/hc';
Axios.defaults.baseURL = 'http://192.168.137.185:8080/hc';

Vue.config.productionTip = false
Vue.prototype.$axios = Axios;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
