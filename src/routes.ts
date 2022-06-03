import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

import Home from './pages/index.vue'
import Dashboard from './pages/dashboard/index.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'auth',
        component: Home,
        meta: {
            layout: 'blank',
            public: true
        }
    },
    {
        path: '/dashboard',
        component: Dashboard,
        meta: {}
    },
    {
        path: "/:pathMatch(.*)*",
        component: () => import('./pages/error/index.vue')
    }
]

routes.forEach((record, index) => {
    // tạo router name, xoá '/' ở đầu và thay thế còn lại = '-'
    if(index < routes.length - 1) {
        record.name = record.path.replace(/\//, '').replaceAll('/', '-')
    } else {
        record.name = 'error'
    }
})

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

// Global middleware
/*router.beforeEach(async (to, from, next) => {
    next()
})*/

export default router
