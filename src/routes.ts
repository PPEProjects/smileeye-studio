import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

let routes: RouteRecordRaw[] = [
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
    component: () => import('./pages/payment/index.vue'),
    meta: {
      title: 'payment.title'
    }
  },
  {
    path: '/coupon',
    component: () => import('./pages/coupon/index.vue'),
    meta: {
      title: 'coupon.title'
    }
  },
  // User List
  {
    path: '/users',
    component: () => import('./pages/users/index.vue'),
    children: [
      {
        path: '/users/supporters',
        component: () => import('./pages/users/supporters/index.vue')
      }
    ]
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

// Tạo router name, deep loop
const extendRoutes = (_routes: RouteRecordRaw[]) => {
  _routes.forEach((record) => {
    // tạo router name, xoá '/' ở đầu và thay thế còn lại = '-'
    record.name = record.path.replace(/\//, '').replaceAll('/', '-')
    // deep loop
    if (record.children) {
      record.children = extendRoutes(record.children)
    }
  })
  return _routes
}

routes = extendRoutes(routes)

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
