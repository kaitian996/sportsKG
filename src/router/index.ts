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
    component: () => import('../views/AnnotationPage/index.vue'),
    redirect: '/annotation/home',
    children: [
      {
        path: 'home',
        component: () => import('../views/AnnotationPage/pages/Home/index.vue')
      },
      {
        path: 'annotation-project',
        component: () => import('../views/AnnotationPage/pages/AnnotationProject/index.vue')
      },
      {
        path: 'annotation-database',
        component: () => import('../views/AnnotationPage/pages/DataBase/index.vue')
      },
      {
        path: 'text-annotation',
        component: () => import('../views/AnnotationPage/pages/TextAnnotation/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


export default router
