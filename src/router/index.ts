import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('../views/HomePage/index.vue')
  },
  {
    path: '/document',
    component: () => import('../views/DocumentPage/index.vue')
  },
  {
    path: '/search',
    component: () => import('../views/SearchPage/index.vue')
  },
  {
    path: '/annotation',
    component: () => import('../views/AnnotationPage/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


export default router
