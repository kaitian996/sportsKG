import { useCreateAnnotationData } from "@/hooks/useCreateAnnotationData";
import { defineStore } from "pinia" // 定义容器
type annotationDataType = {
    content: string;
    labelCategories: {
        id: number;
        text: string;
        color: string;
        borderColor: string;
    }[];
    labels: { id: number; categoryId: number; startIndex: number; endIndex: number }[];
    connectionCategories: {
        id: number;
        text: string;
    }[];
    connections: { id: number; categoryId: number; fromId: number; toId: number }[];
}
type annotationProject = {
    name: string;
    description: string;
    date: string;
    data: {
        fileName: string;
        fileContent: string;
        annotationData: annotationDataType
    }[];
    labelCategories: {
        text: string;
        color: string;
    }[];
    connectionCategories: {
        text: string;
    }[];
}
export const annotationProjectStore = defineStore('annotationProjectStore', {
    state: () => {
        return {
            annotationProject: [] as annotationProject[]
        }
    },
    getters: {

    },
    actions: {
        createAnnotationProject(projectData: {
            name: string;
            description: string;
            date: string;
            data: {
                fileName: string;
                fileContent: string;
            }[];
            labelCategories: {
                text: string;
                color: string;
            }[];
            connectionCategories: {
                text: string;
            }[];
        }) {

            const data = projectData.data.map((item) => {
                const labelCategories = projectData.labelCategories.reverse().map((item, index) => {
                    return {
                        id: index,
                        text: item.text,
                        color: item.color,
                        borderColor: '#a38671'
                    }
                })
                const connectionCategories = projectData.connectionCategories.reverse().map((item, index) => {
                    return {
                        id: index,
                        text: item.text
                    }
                })
                return {
                    fileName: item.fileName,
                    fileContent: item.fileContent,
                    annotationData: useCreateAnnotationData(item.fileContent, labelCategories, connectionCategories)
                }
            })
            this.annotationProject.push({
                name: projectData.name,
                description: projectData.description,
                date: projectData.date,
                data: data,
                labelCategories: projectData.labelCategories.reverse(),
                connectionCategories: projectData.connectionCategories.reverse(),
            })
        }
    }
})