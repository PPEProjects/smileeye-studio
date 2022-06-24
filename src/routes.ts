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
    component: () => import('./pages/payment/index.vue')
  },
  {
    path: '/payment/:id',
    component: () => import('./pages/payment/id/index.vue'),
    meta: {
      collapse: true
    }
  },
  {
    path: '/coupon',
    component: () => import('./pages/coupon/index.vue'),
    meta: {
      title: 'coupon.label'
    }
  },
  // User List
  {
    path: '/users',
    component: () => import('./pages/users/index.vue')
  },
  {
    path: '/users/:id(\\d+)',
    component: () => import('./pages/users/id/index.vue'),
    redirect: (to) => {
      return {
        name: 'users-id-goals',
        params: { id: to.params.id }
      }
    },
    children: [
      {
        path: '/users/:id(\\d+)/goals',
        component: () => import('./pages/users/id/goals.vue')
      },
      {
        path: '/users/:id(\\d+)/goals/:goalID(\\d+)/posts',
        component: () => import('./pages/users/id/posts.vue')
      },
      {
        path: '/users/:id(\\d+)/goals/:goalID(\\d+)/detail',
        component: () => import('./pages/users/id/detail.vue')
      }
    ]
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
  },

  // Cài đặt
  {
    path: '/settings',
    component: () => import('./pages/settings/index.vue'),
    meta: {
      title: 'settings.title'
    }
  },
  // Anh Tiến,
  {
    path: '/workspace',
    component: () => import('./pages/workspace/index.vue')
  }
]

// Tạo router name, deep loop
const extendRoutes = (_routes: RouteRecordRaw[]) => {
  _routes.forEach((record) => {
    // tạo router name, xoá '/' ở đầu và thay thế còn lại = '-'
    record.name = record.path
      .replace(/\//, '')
      .replaceAll('/', '-')
      .replaceAll(new RegExp(/\([^)]*\)/, 'g'), '')
      .replaceAll(new RegExp(/:/, 'g'), '')

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
