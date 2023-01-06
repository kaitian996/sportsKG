export type labelCategories = {
    id?: number
    text: string
    color: string
    borderColor?: string
}
export type connectionCategories = {
    id?: number
    text: string
}
export type labels = {
    id: number
    categoryId: number
    startIndex: number
    endIndex: number
}
export type connections = {
    id: number
    categoryId: number
    fromId: number
    toId: number
}
/**
 *
 * @param content
 * @param labelCategories
 * @param connectionCategories
 * @param labels
 * @param connections
 * @returns
 */
export const useCreateAnnotationData = (
    content: string = "",
    labelCategories: labelCategories[] = [],
    connectionCategories: connectionCategories[] = [],
    labels: labels[] = [],
    connections: connections[] = []
) => {
    //标注的数据格式

    const annotationDataObject = {
        content,
        labelCategories,
        labels,
        connectionCategories,
        connections,
    }

    return annotationDataObject
}
