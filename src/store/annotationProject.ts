import {
    connectionCategories,
    connections,
    labelCategories,
    labels,
} from "@/hooks/useCreateAnnotationData"
import { defineStore } from "pinia" // 定义容器
export type annotationDataType = {
    content: string
    labelCategories: labelCategories[]
    labels: labels[]
    connectionCategories: connectionCategories[]
    connections: connections[]
}
export type annotationProject = {
    name: string
    description: string
    date: string
    data: {
        fileName: string
        fileContent: string
        labels: labels[]
        connections: connections[]
        state: string
    }[]
    labelCategories: labelCategories[]
    connectionCategories: connectionCategories[]
    autoKey?: { text: string; begin: number; inner: number; end: number }[]
}
export const annotationProjectStore = defineStore("annotationProjectStore", {
    state: () => {
        return {
            annotationProject: [] as annotationProject[],
        }
    },
    getters: {},
    actions: {
        createAnnotationProject(projectData: annotationProject) {
            this.annotationProject.push(projectData)
        },
    },
    persist: true
})
