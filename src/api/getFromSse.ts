import axios from 'axios'
/**
 * 
 * @param mention 实体信息
 * @returns {entitySimilar} 相似实体数组
 */
export const getSimilarty = async (mention: string) => {
    //去除补充说明
    let word: string = ''
    if (mention.indexOf('(') !== -1) {
        word = mention.split('(')[0]
    }
    else if (mention.indexOf('（') !== -1) {
        word = mention.split('（')[0]
    }
    else if (mention.indexOf('[')) {
        word = mention.split('[')[0]
    }

    const url = `http://127.0.0.1:8888/similarity?word=${word}`
    let entitySimilar: { name: string; percent: number }[] = []
    
    try {
        const { data } = await axios.get(url)
        console.log('data', data);
        entitySimilar = data.similarEntity
    } catch (error) {
        console.log(error);
    }
    console.log('en', entitySimilar);
    entitySimilar = entitySimilar.map(item => {
        return { name: item.name, percent: Number((item.percent * 100).toFixed(2)) }
    })
    return entitySimilar
}
/**
 * 
 * @param content des信息
 * @returns des提取信息
 */
export const getDescEntiy = async (content: string) => {
    const url = 'https://'
    let descEntiy: string[] = []
    try {
        const { data } = await axios.get(url)
        data.length > 0 ? descEntiy = data.descEntiy : null

    } catch (error) {
        console.log(error);
    }
    return descEntiy
}
