import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Index from './views/Index.vue';
import Menu from './components/Menu.vue';
import Main from './components/Main.vue';
import DataQuery from './views/DataQuery.vue';
import ToUpload from './views/ToUpload.vue';
import ConsumableLog from './views/ConsumableLog.vue';
import Login from './views/Login.vue';

Vue.use(Router)

NProgress.configure({ showSpinner: false }); // 关闭进度条的进度环

const router = new Router({
    routes: [
        { path: '/login', component: Login, meta: { isLogin: false } },
        {
            path: '/',
            component: Index,
            children: [{
                path: '/',
                components: {
                    menu: Menu,
                    main: Main
                },
                children: [
                    { path: '/', component: DataQuery, meta: { isLogin: true } },
                    { path: '/to_upload', component: ToUpload, meta: { isLogin: true } },
                    { path: '/consumable_log', component: ConsumableLog, meta: { isLogin: true } }
                ]
            }
        ] }
    ]
});

// 全局导航守卫
router.beforeEach((to, from, next) => { // 路由跳转之前执行
    NProgress.start(); // 开启进度条
    if (to.meta.isLogin) {
        const token = localStorage.getItem('token');
        if (!token) {
            return router.push('/login');
        } else {
            next();
        }
    } else {
        next();
    }
    next();
});
router.afterEach(() => { // 路由跳转之后执行
    NProgress.done(); // 关闭进度条
});

export default router;
