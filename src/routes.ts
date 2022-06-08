import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('./pages/index.vue'),
    meta: { layout: 'blank', public: true }
  },
  {
    path: '/dashboard',
    component: () => import('./pages/dashboard/index.vue'),
    meta: {
      disableBack: true,
      title: 'Dashboard'
    }
  },
  {
    path: '/payment',
    component: () => import('./pages/payment/index.vue')
  },
  {
    path: '/draggable',
    component: () => import('./pages/draggable/index.vue'),
    meta: {
      title: 'Draggable'
    }
  },
  {
    path: '/cropper',
    component: () => import('./pages/cropper/index.vue'),
    meta: {
      title: 'Cropper'
    }
  },
  {
    path: '/notifications',
    component: () => import('./pages/notifications/index.vue'),
    meta: {
      title: 'Notifications'
    }
  }
]

routes.forEach((record) => {
  // tạo router name, xoá '/' ở đầu và thay thế còn lại = '-'
  record.name = record.path.replace(/\//, '').replaceAll('/', '-')
})

// 404 Handle
routes.push({
  path: '/:pathMatch(.*)*',
  component: () => import('./pages/error/index.vue'),
  meta: {
    title: 'Not Found'
  }
})

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
