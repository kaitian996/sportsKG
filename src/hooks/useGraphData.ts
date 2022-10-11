//创建图数据的hook
export interface node {
    /**
     *  节点的唯一标识
     */
    id: string;
    /**
    * 节点x坐标
    */
    x?: number;
    /**
     * 节点y坐标
     */
    y?: number;
    /**
     * 坐标标签
     */
    label?: string;
    /**
     * 其他属性
     */
    [propname: string]: any;
}
export interface edge {
    source: string, // 起始点 id
    target: string, // 目标点 id
    label?: string; //, // 边的文本
    [propname: string]: any; //其它内容
}
import { reactive } from 'vue';
/**
 * @des 返回节点的的reactive对象
 * @param nodes 节点数组
 * @param edges 边数组
 * @returns reactive的对象
 */
export default (nodes: node[], edges: edge[]) => {
    return reactive({
        nodes,
        edges
    })
}