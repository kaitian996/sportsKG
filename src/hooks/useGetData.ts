import { getEntity, getNodes } from '@/api/getFromCndb'
import { getEntity as getEntityOT, getNodes as getNodesOT } from '@/api/getFromOwnThink'
/**
 * @des 返回所有实体型
 * @param mention 实体型
 * @returns 返回所有的实体型数组
 */
export const useGetEntity = async (mention: any) => {
    const temp: string[] = await getEntity(mention)
    const temp1: string[] = await getEntityOT(mention)
    /**其它接口 */
    console.log('实体', temp);

    return [...temp, ...temp1]
}

/**
 * @des 获得所有接口的三元组，返回最多的边和点
 * @param mention 实体型
 * @returns 返回具有最多的节点和边和desc
 */
export const useGetEntityData = async (mention: any) => {
    /**其它接口 */
    const data1 = await getNodes(mention)
    const data2 = await getNodesOT(mention)
    //排序
    const maxData = [data1, data2].sort((a, b) => a.nodes.length - b.nodes.length)

    console.log('entity', maxData);
    // 返回最大的nodes
    return {
        nodes: maxData.slice(-1)[0].nodes,
        edges: maxData.slice(-1)[0].edges,
        desc: maxData.slice(-1)[0].desc,
        tuple: maxData.slice(-1)[0].tuple,
    }
}