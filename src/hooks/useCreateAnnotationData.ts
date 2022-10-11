/**
 * 
 * @param fileContent 传入的文本内容
 * @returns 返回annotationDataObject格式对象
 */
export const useCreateAnnotationData = (fileContent: string) => {
    //标注的数据格式
    let annotationDataObject = {
        content: '',
        labelCategories: [
            {
                "id": 0,
                "text": "B-LOC",
                "color": "#95e1d3",
                "borderColor": "#a38671"
            },
            {
                "id": 1,
                "text": "I-LOC",
                "color": "#eaffd0",
                "borderColor": "#436db2"
            },
            {
                "id": 2,
                "text": "E-LOC",
                "color": "#fce38a",
                "borderColor": "#6d43b2"
            },
            {
                "id": 3,
                "text": "B-ORG",
                "color": "#fcbad3",
                "borderColor": "#b26d43"
            },
            {
                "id": 4,
                "text": "I-ORG",
                "color": "#aa96da",
                "borderColor": "#b26d43"
            },
            {
                "id": 5,
                "text": "E-ORG",
                "color": "#ffffd2",
                "borderColor": "#b26d43"
            },
            {
                "id": 6,
                "text": "B-PER",
                "color": "#ff7e67",
                "borderColor": "#b26d43"
            },
            {
                "id": 7,
                "text": "I-PER",
                "color": "#a7ff83",
                "borderColor": "#b26d43"
            },
            {
                "id": 8,
                "text": "E-PER",
                "color": "#ff5335",
                "borderColor": "#b26d43"
            },
            {
                "id": 9,
                "text": "B-LEAGUE",
                "color": "#f25d9c",
                "borderColor": "#b26d43"
            },
            {
                "id": 10,
                "text": "I-LEAGUE",
                "color": "#b61aae",
                "borderColor": "#b26d43"
            },
            {
                "id": 11,
                "text": "E-LEAGUE",
                "color": "#590d82",
                "borderColor": "#b26d43"
            },
            {
                "id": 12,
                "text": "B-TEAM",
                "color": "#d4a5a5",
                "borderColor": "#b26d43"
            },
            {
                "id": 13,
                "text": "I-TEAM",
                "color": "#ff6464",
                "borderColor": "#b26d43"
            },
            {
                "id": 14,
                "text": "E-TEAM",
                "color": "#ffbd39",
                "borderColor": "#b26d43"
            },
            {
                "id": 15,
                "text": "B-RANK",
                "color": "#f1c40f",
                "borderColor": "#b26d43"
            },
            {
                "id": 16,
                "text": "I-RANK",
                "color": "#0245a3",
                "borderColor": "#b26d43"
            },
            {
                "id": 17,
                "text": "E-RANK",
                "color": "#7e80ff",
                "borderColor": "#b26d43"
            },
            {
                "id": 18,
                "text": "O",
                "color": "#757a79",
                "borderColor": "#b26d43"
            }
        ],
        labels: [] as { id: number; categoryId: number; startIndex: number; endIndex: number }[],
        connectionCategories: [
            {
                "id": 0,
                "text": "某种关系"
            },
        ],
        connections: [] as { id: number; categoryId: number; fromId: number; toId: number }[],
    }
    annotationDataObject.content = fileContent
    return annotationDataObject
}