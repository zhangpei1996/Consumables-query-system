import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        menuIsCollapse: true,
        nickname: ''
    },
    mutations: {
        setMenuIsCollapse (state, flag) {
            state.menuIsCollapse = flag
        },
        setNickname (state, nickname) {
            state.nickname = nickname
        }
    },
    getters: {
        getMenuIsCollapse: state => state.menuIsCollapse,
        getNickname: state => state.nickname
    }
})
