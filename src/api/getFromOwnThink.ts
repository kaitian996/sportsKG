import axios from 'axios'
import { node, edge } from '@/hooks/useGraphData'

//cndb接口
//返回所有的实体型
export const getEntity = async (mention: string) => {
    const url: string = `https://api.ownthink.com/kg/ambiguous?mention=${mention}`
    try {
        let { data } = await axios.get(url)
        if (data.message === 'success') {
            return data.data.map((item: string[]) => item[0])
        }
    } catch (error) {
        console.error(error);
    }
}

//请求的三元组，并结构化为需要的数据类型
export const getNodes = async (mention: string) => {
    let url: string = `https://api.ownthink.com/kg/knowledge?entity=${mention}`
    let tempData: { entity: string; desc: string; avp: string[][] } = {
        entity: '', desc: '', avp: []
    }
    try {
        let { data } = await axios.get(url)
        if (data.message === 'success' && Object.keys(data.data).length > 0) {
            tempData = data.data
        }
    } catch (error) {

    }
    //结构化为需要的数据
    let nodes: node[] = []
    let edges: edge[] = []
    //找到desc
    let desc: string = tempData.desc ?? '未收录'
    //找到二元组
    let tuple: string[][] = tempData.avp
    //插入中心节点
    nodes.push({
        id: 'index',
        label: mention,
    })

    tempData.avp.forEach((item, index) => {
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

