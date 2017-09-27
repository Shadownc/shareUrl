/**
 * Created by Administrator on 2017/9/27.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Home from 'components/Home.vue'

export const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: Home,
            component: Home
        }
    ]
})