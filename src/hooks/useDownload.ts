import { annotationProjectStore } from "@/store/annotationProject"
import { labels, useCreateAnnotationData } from "./useCreateAnnotationData"

type DownloadOptions = {
    pID: number
    tID: number
    fileName: string
    type: string
    label?: {
        format: string
    }
    connection?: {
        format: string
    }
    all?: {
        format: string
        autoFill: null | {
            id?: number | undefined
            text: string
            color: string
            borderColor?: string | undefined
        }
    }
}
const store = annotationProjectStore()
export const useDownload = (options: DownloadOptions) => {
    const { pID, tID, fileName, type } = options
    // 创建标注的数据
    const annotationData = useCreateAnnotationData(
        store.annotationProject[pID].data[tID].fileContent,
        store.annotationProject[pID].labelCategories,
        store.annotationProject[pID].connectionCategories,
        store.annotationProject[pID].data[tID].labels,
        store.annotationProject[pID].data[tID].connections
    )

    const lineContent: string[] = []
    if (type === "label") {
        const format = options.label?.format!
        for (let i = 0; i < annotationData.labels.length; i++) {
            const index = i
            //取到标签
            const label = annotationData.labelCategories.find(
                (item) => item.id === annotationData.labels[i].categoryId
            )?.text
            //取到实体
            const entity = annotationData.content.slice(
                annotationData.labels[i].startIndex,
                annotationData.labels[i].endIndex
            )
            const line = eval(format)
            lineContent.push(line)
        }
    } else if (type === "connection") {
        const format = options.connection?.format!
        for (let i = 0; i < annotationData.connections.length; i++) {
            const index = i
            //取到开始标签
            const {
                startIndex: SstartIndex,
                endIndex: SendIndex,
                categoryId: ScategoryId,
            } = annotationData.labels.find(
                (item) => item.id === annotationData.connections[i].fromId
            )!
            const startEntity = annotationData.content.slice(
                SstartIndex,
                SendIndex
            )
            const startLabel = annotationData.labelCategories.find(
                (item) => item.id === ScategoryId
            )?.text
            //取到结束标签
            const {
                startIndex: EstartIndex,
                endIndex: EendIndex,
                categoryId: EcategoryId,
            } = annotationData.labels.find(
                (item) => item.id === annotationData.connections[i].toId
            )!
            const endEntity = annotationData.content.slice(
                EstartIndex,
                EendIndex
            )
            const endLabel = annotationData.labelCategories.find(
                (item) => item.id === EcategoryId
            )?.text
            //拿到关系
            const connection = annotationData.connectionCategories.find(
                (item) => item.id === annotationData.connections[i].categoryId
            )?.text
            const line = eval(format)
            lineContent.push(line)
        }
    } else if (type === "all") {
        const format = options.all?.format!
        const autoFill = options.all?.autoFill
        if (autoFill) {
            const result: labels[] = []
            for (let i = 0; i < annotationData.content.length; i++) {
                // 判断是否标注
                const isAlreadyAnnotate =
                    annotationData.labels.findIndex((item) => {
                        return i >= item.startIndex && i <= item.endIndex - 1
                    }) === -1
                        ? false
                        : true
                if (!isAlreadyAnnotate) {
                    //如果没有标注
                    result.push({
                        id: -1,
                        categoryId: autoFill.id as number,
                        startIndex: i,
                        endIndex: i + 1,
                    })
                }
            }
            const allLabels = [...result, ...annotationData.labels].sort(
                (a, b) => a.startIndex - b.startIndex
            )
            for (let i = 0; i < allLabels.length; i++) {
                const index = i
                //取到标签
                const label = annotationData.labelCategories.find(
                    (item) => item.id === allLabels[i].categoryId
                )?.text
                //取到实体
                const entity = annotationData.content.slice(
                    allLabels[i].startIndex,
                    allLabels[i].endIndex
                )
                const line = eval(format)
                lineContent.push(line)
            }
        } else {
            for (let i = 0; i < annotationData.labels.length; i++) {
                const index = i
                //取到标签
                const label = annotationData.labelCategories.find(
                    (item) => item.id === annotationData.labels[i].categoryId
                )?.text
                //取到实体
                const entity = annotationData.content.slice(
                    annotationData.labels[i].startIndex,
                    annotationData.labels[i].endIndex
                )
                const line = eval(format)
                lineContent.push(line)
            }
        }
    }
    //下载
    const blob = new Blob(lineContent, { type: "text/plain,charset=UTF-8" })
    const downloadElement = document.createElement("a")
    // 创建下载链接
    const href = window.URL.createObjectURL(blob)
    downloadElement.href = href
    // 下载文件名
    downloadElement.download = `${fileName}.txt`
    document.body.appendChild(downloadElement)
    downloadElement.click()
    // 移除元素
    document.body.removeChild(downloadElement)
    // 释放blob对象
    window.URL.revokeObjectURL(href)
}
