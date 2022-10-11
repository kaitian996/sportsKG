import axios from 'axios'
import { node, edge } from '@/hooks/useGraphData'

//cndb接口
//返回所有的实体型
export const getEntity = async (mention: string) => {
    let url: string = `http://shuyantech.com/api/cndbpedia/ment2ent?q=${mention}`
    try {
        let { data } = await axios.get(url)
        if (data.status === 'ok') {
            return data.ret
        }
    } catch (error) {
        console.error(error);
    }
}

//请求的三元组，并结构化为需要的数据类型
export const getNodes = async (mention: string) => {
    let url: string = `http://shuyantech.com/api/cndbpedia/avpair?q=${mention}`
    let tempData: string[][] = []
    try {
        let { data } = await axios.get(url)
        if (data.status === 'ok' && data.ret.length > 0) {
            tempData = data.ret
        }
    } catch (error) {

    }
    //结构化为需要的数据
    let nodes: node[] = []
    let edges: edge[] = []
    //找到desc
    let descIndex: number = tempData.findIndex(item => item[0] === 'DESC')

    let desc: string = descIndex !== -1 ? tempData[descIndex][1] : '未收录'
    //找到二元组
    let tuple: string[][] = tempData
    //插入中心节点
    nodes.push({
        id: 'index',
        label: mention,
    })
    //裁剪desc
    tempData.splice(descIndex, 1)
    tempData.forEach((item, index) => {
        let node: node = {
            id: String(index),
            label: item[1]
        }
        let edge: edge = {
            source: 'index',
            target: String(index),
            label: item[0]
        }
        nodes.push(node)
        edges.push(edge)
    });
    return {
        nodes,
        edges,
        desc,
        tuple
    }
}
