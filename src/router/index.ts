import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        component: () => import("../views/HomePage/index.vue"),
    },
    {
        path: "/document",
        component: () => import("../views/DocumentPage/index.vue"),
    },
    {
        path: "/search",
        component: () => import("../views/SearchPage/index.vue"),
    },
    {
        path: "/annotation",
        component: () => import("../views/AnnotationPage/index.vue"),
    },
    {
        path: "/projectSetting",
        component: () =>
            import("../views/AnnotationPage/pages/ProjectSet/index.vue"),
    },
    {
        path: "/projectDetail",
        component: () =>
            import("../views/AnnotationPage/pages/ProjectDetail/index.vue"),
    },
    {
        path: "/textAnnotation",
        component: () =>
            import("../views/AnnotationPage/pages/TextAnnotation/index.vue"),
    },
    {
        path: "/refresh",
        component: () => import("../components/Refresh/index.vue"),
    },
    {
        path:"/chat",
        component:()=>import("../views/ChatPage/index.vue")
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export default router
