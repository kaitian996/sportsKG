import { annotationProjectStore } from "@/store/annotationProject"
import { labels, useCreateAnnotationData } from "./useCreateAnnotationData"

type DownloadOptions = {
    pID: number
    tID: number
    fileName: string
    type: string
    label?: {
        format: string
        isWholeLabel: boolean
    }
    connection?: {
        format: string
    }
    all?: {
        format: string
        isWholeLabel: boolean
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
        const isWholeLabel = options.label?.isWholeLabel!
        const outPutLabels: labels[] = [...annotationData.labels].sort(
            (a, b) => a.startIndex - b.startIndex
        )
        let index = 0
        for (let i = 0; i < outPutLabels.length; i++) {
            //取到标签
            const _label = annotationData.labelCategories.find(
                (item) => item.id === outPutLabels[i].categoryId
            )?.text
            //取到实体
            const _entity = annotationData.content.slice(
                outPutLabels[i].startIndex,
                outPutLabels[i].endIndex
            )
            if (isWholeLabel) {
                //在实体上面判断
                if (_entity.length === 1) {
                    if (_entity !== "\n" && _entity !== "\r") {
                        const label = "B-" + _label
                        const entity = _entity
                        const line: string = eval(format)
                        lineContent.push(line + "\n")
                        index++
                    }
                } else if (_entity.length === 2) {
                    if (_entity[0] !== "\n" && _entity[0] !== "\r") {
                        const label = "B-" + _label
                        const entity = _entity[0]
                        const line: string = eval(format)
                        lineContent.push(line + "\n")
                        index++
                    }
                    if (_entity[1] !== "\n" && _entity[1] !== "\r") {
                        const label = "E-" + _label
                        const entity = _entity[1]
                        const line: string = eval(format)
                        lineContent.push(line + "\n")
                        index++
                    }
                } else if (_entity.length >= 3) {
                    const length = _entity.length
                    //第一位
                    if (
                        _entity.slice(0, 1) !== "\n" &&
                        _entity.slice(0, 1) !== "\r"
                    ) {
                        const label = "B-" + _label
                        const entity = _entity.slice(0, 1)
                        const line: string = eval(format)
                        lineContent.push(line + "\n")
                        index++
                    }
                    //中间
                    if (
                        _entity.slice(1, length - 1) !== "\n" &&
                        _entity.slice(1, length - 1) !== "\r"
                    ) {
                        const label = "I-" + _label
                        const entity = _entity.slice(1, length - 1)
                        const line: string = eval(format)
                        lineContent.push(line + "\n")
                        index++
                    }
                    //末尾
                    if (
                        _entity.slice(length - 1, length) !== "\n" &&
                        _entity.slice(length - 1, length) !== "\r"
                    ) {
                        const label = "E-" + _label
                        const entity = _entity.slice(length - 1, length)
                        const line: string = eval(format)
                        lineContent.push(line + "\n")
                        index++
                    }
                }
            } else {
                if (_entity !== "\n" && _entity !== "\r") {
                    const label = _label
                    const entity = _entity
                    const line: string = eval(format)
                    lineContent.push(line + "\n")
                }
            }
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
            if (
                startEntity !== "\n" &&
                endEntity !== "\n" &&
                startEntity !== "\r" &&
                endEntity !== "\r"
            ) {
                const line: string = eval(format)
                lineContent.push(line + "\n")
            }
        }
    } else if (type === "all") {
        const format = options.all?.format!
        const autoFill = options.all?.autoFill
        const isWholeLabel = options.all?.isWholeLabel!
        const outPutLabels: labels[] = [...annotationData.labels]
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
            outPutLabels.push(...result)
        }
        const afterFillLabels = outPutLabels.sort(
            (a, b) => a.startIndex - b.startIndex
        )
        let index = 0
        for (let i = 0; i < afterFillLabels.length; i++) {
            const isFillLabel = afterFillLabels[i].id === -1 ? true : false
            //取到标签
            const _label = annotationData.labelCategories.find(
                (item) => item.id === afterFillLabels[i].categoryId
            )?.text
            //取到实体
            const _entity = annotationData.content.slice(
                afterFillLabels[i].startIndex,
                afterFillLabels[i].endIndex
            )
            if (isWholeLabel && !isFillLabel) {
                //在实体上面判断
                if (_entity.length === 1) {
                    if (_entity !== "\n" && _entity !== "\r") {
                        const label = "B-" + _label
                        const entity = _entity
                        const line: string = eval(format)
                        lineContent.push(line + "\n")
                        index++
                    }
                } else if (_entity.length === 2) {
                    if (_entity[0] !== "\n" && _entity[0] !== "\r") {
                        const label = "B-" + _label
                        const entity = _entity[0]
                        const line: string = eval(format)
                        lineContent.push(line + "\n")
                        index++
                    }
                    if (_entity[1] !== "\n" && _entity[1] !== "\r") {
                        const label = "E-" + _label
                        const entity = _entity[1]
                        const line: string = eval(format)
                        lineContent.push(line + "\n")
                        index++
                    }
                } else if (_entity.length >= 3) {
                    const length = _entity.length
                    //第一位
                    if (
                        _entity.slice(0, 1) !== "\n" &&
                        _entity.slice(0, 1) !== "\r"
                    ) {
                        const label = "B-" + _label
                        const entity = _entity.slice(0, 1)
                        const line: string = eval(format)
                        lineContent.push(line + "\n")
                        index++
                    }
                    //中间
                    if (
                        _entity.slice(1, length - 1) !== "\n" &&
                        _entity.slice(1, length - 1) !== "\r"
                    ) {
                        const label = "I-" + _label
                        const entity = _entity.slice(1, length - 1)
                        const line: string = eval(format)
                        lineContent.push(line + "\n")
                        index++
                    }
                    //末尾
                    if (
                        _entity.slice(length - 1, length) !== "\n" &&
                        _entity.slice(length - 1, length) !== "\r"
                    ) {
                        const label = "E-" + _label
                        const entity = _entity.slice(length - 1, length)
                        const line: string = eval(format)
                        lineContent.push(line + "\n")
                        index++
                    }
                }
            } else {
                if (_entity !== "\n" && _entity !== "\r") {
                    const label = _label
                    const entity = _entity
                    const line: string = eval(format)
                    lineContent.push(line + "\n")
                }
            }
        }
    }
    console.log(lineContent)

    return lineContent
}

export const useCreateLink = (fileName: string, lineContent: string[]) => {
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
