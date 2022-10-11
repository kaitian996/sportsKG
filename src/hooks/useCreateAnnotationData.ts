type labelCategories = {
    id: number;
    text: string;
    color: string;
    borderColor: string;
}
type connectionCategories = {
    id: number;
    text: string;
}
/**
 * 
 * @param content 
 * @param labelCategories 
 * @param connectionCategories 
 * @returns 
 */
export const useCreateAnnotationData = (content: string, labelCategories: labelCategories[], connectionCategories: connectionCategories[]) => {
    //标注的数据格式

    const annotationDataObject = {
        content,
        labelCategories,
        labels: [] as { id: number; categoryId: number; startIndex: number; endIndex: number }[],
        connectionCategories,
        connections: [] as { id: number; categoryId: number; fromId: number; toId: number }[],
    }

    return annotationDataObject
}