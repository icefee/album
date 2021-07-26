import { createRouter, createWebHashHistory } from 'vue-router'

import Login from '../views/Login/index.vue'
import Index from '../views/Index'
import Home from '../views/Home/index.vue'
import User from '../views/User/index.vue'

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
                },
                {
                    path: 'user',
                    name: 'user',
                    component: User
                }
            ]
        }
    ],
})
