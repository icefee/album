import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login/index.vue'
import Index from '../views/Index'
import Home from '../views/Home/index.vue'
import User from '../views/User'
import Map from '../views/Map/index.vue'

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/home',
            name: 'index',
            component: Index,
            children: [
                {
                    path: '',
                    name: 'home',
                    component: Home,
                    meta: {
                        title: '主页'
                    }
                },
                {
                    path: 'map',
                    name: 'map',
                    component: Map,
                    meta: {
                        title: '地图'
                    }
                },
                {
                    path: 'user',
                    name: 'user',
                    component: User,
                    meta: {
                        title: '用户'
                    }
                }
            ]
        }
    ],
})
