import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('./pages/index.vue'),
        meta: {
            layout: 'blank',
            public: true
        }
    },
    {
        path: '/dashboard',
        component: () => import('./pages/dashboard/index.vue'),
        meta: {}
    },
    {
        path: '/draggable',
        component: () => import('./pages/draggable/index.vue')
    },
    {
        path: '/cropper',
        component: () => import('./pages/cropper/index.vue')
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
