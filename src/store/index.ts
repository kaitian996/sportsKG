type annotationDataType = {
  content: string;
  labelCategories: {
    id: number;
    text: string;
    color: string;
    borderColor: string;
  }[];
  labels: { id: number; categoryId: number; startIndex: number; endIndex: number }[];
  connectionCategories: {
    id: number;
    text: string;
  }[];
  connections: { id: number; categoryId: number; fromId: number; toId: number }[];
}
import { node, edge } from '@/hooks/useGraphData'
import { defineStore } from "pinia" // 定义容器
/**
 * @des 使用标注的状态管理
 */
export const useAnnotation = defineStore('useAnnotation', {
  /**
   * 存储全局状态
   * 1.必须是箭头函数: 为了在服务器端渲染的时候避免交叉请求导致数据状态污染
   * 和 TS 类型推导
  */
  state: () => {
    return {
      fileName: [] as string[], // name of the file name
      fileNameContent: [] as string[], // content of the file
      annotationData: [] as annotationDataType[], //annotationData of the annotation
      alReadyAnnotationData: [] as { id: number; text: string; type: string; start: number }[][], //annotationData of the annotation
      alReadyAnnotationDataIndex: [] as { start: number; end: number }[][],//annotationData of the annotation
      alReadyAnnotationConnection: [] as { id: number; fromId: number; toId: number; type: string }[][],//annotationConnections of the annotation
    }
  },
  getters: {
    /**
     * 
     * @param state 
     * @returns 文件选择菜单
     */
    getFileIndexSelectOptions(state) {
      let temp: { value: number; label: string }[] = []
      state.fileName.forEach((item, index) => {
        temp.push({
          value: index,
          label: item
        })
      })
      return temp
    },
    /**
     * 
     * @param state 
     * @returns 实体类型选择菜单
     */
    getEntityTypeSelectOptions(state) {
      const temp: { value: number; label: string }[] = []
      //push 6 个总标签
      temp.push({ value: -1, label: 'LOC--Auto-地点' })
      temp.push({ value: -2, label: 'ORG--Auto-组织' })
      temp.push({ value: -3, label: 'PER--Auto-人物' })
      temp.push({ value: -4, label: 'LEAGUE--Auto-联盟' })
      temp.push({ value: -5, label: 'TEAM--Auto-团队' })
      temp.push({ value: -6, label: 'RANK--Auto-排名' })
      state.annotationData[0].labelCategories.forEach((item) => {
        switch (item.text) {
          case "B-LOC":
            temp.push({
              value: item.id,
              label: item.text + '--地点'
            })
            break;
          case "I-LOC":
            temp.push({
              value: item.id,
              label: item.text + '--地点'
            })
            break;
          case "E-LOC":
            temp.push({
              value: item.id,
              label: item.text + '--地点'
            })
            break;
          case "B-ORG":
            temp.push({
              value: item.id,
              label: item.text + '--组织'
            })
            break;
          case "I-ORG":
            temp.push({
              value: item.id,
              label: item.text + '--组织'
            })
            break;
          case "E-ORG":
            temp.push({
              value: item.id,
              label: item.text + '--组织'
            })
            break;
          case "B-PER":
            temp.push({
              value: item.id,
              label: item.text + '--人物'
            })
            break;
          case "I-PER":
            temp.push({
              value: item.id,
              label: item.text + '--人物'
            })
            break;
          case "E-PER":
            temp.push({
              value: item.id,
              label: item.text + '--人物'
            })
            break;
          case "B-LEAGUE":
            temp.push({
              value: item.id,
              label: item.text + '--联盟'
            })
            break;
          case "I-LEAGUE":
            temp.push({
              value: item.id,
              label: item.text + '--联盟'
            })
            break;
          case "E-LEAGUE":
            temp.push({
              value: item.id,
              label: item.text + '--联盟'
            })
            break;
          case "B-TEAM":
            temp.push({
              value: item.id,
              label: item.text + '--团队'
            })
            break;
          case "I-TEAM":
            temp.push({
              value: item.id,
              label: item.text + '--团队'
            })
            break;
          case "E-TEAM":
            temp.push({
              value: item.id,
              label: item.text + '--团队'
            })
            break;
          case "B-RANK":
            temp.push({
              value: item.id,
              label: item.text + '--排名'
            })
            break;
          case "I-RANK":
            temp.push({
              value: item.id,
              label: item.text + '--排名'
            })
            break;
          case "E-RANK":
            temp.push({
              value: item.id,
              label: item.text + '--排名'
            })
            break;
          case "O":
            temp.push({
              value: item.id,
              label: item.text + '--其它'
            })
            break;
        }
      })
      return temp
    },
    /**
     * 
     * @param state 
     * @returns 实体类型关系选择菜单
     */
    getConnectionTypeSlectOptions(state) {
      return (fileIndex: number) => {
        let temp: { value: number; label: string }[] = []
        state.annotationData[fileIndex].connectionCategories.forEach((item) => {
          temp.push({
            value: item.id,
            label: item.text
          })
        })
        return temp
      }
    },
    /**
     * 
     * @param state 
     * @returns 返回索引所代表的的标签值
     */
    getCurrentEntityType(state) {
      return (index: number) => {
        return state.annotationData[0].labelCategories[index].text
      }
    },
    getIsAnnotation(state) {
      return (fileIndex: number, index: number) => {
        const isAnnotation = state.alReadyAnnotationDataIndex[fileIndex].findIndex(item => {
          return index >= item.start && index <= item.end - 1
        })
        return isAnnotation === -1 ? false : true
      }
    },
    /**
     * 
     * @param state 
     * @returns 返回索引所代表的关系值
     */
    getCurrentConnnectionType(state) {
      return (index: number, fileIndex: number) => {
        return state.annotationData[fileIndex].connectionCategories[index].text
      }
    },
    /**
     * 
     * @param state 
     * @returns 返回 entity connect entity 对象
     */
    getTriplet(state) {
      return (fileIndex: number) => {
        let triplet: { id: number; start: string; connection: string; end: string }[] = []
        state.alReadyAnnotationConnection[fileIndex].forEach((item) => {
          let temp: { id: number; start: string; connection: string; end: string } = {
            id: -1,
            start: '',
            connection: '',
            end: '',
          }
          for (let index = 0; index < state.alReadyAnnotationData[fileIndex].length; index++) {
            if (item.fromId === state.alReadyAnnotationData[fileIndex][index].id) {
              temp.start = state.alReadyAnnotationData[fileIndex][index].text
              break
            }
          }
          for (let index = 0; index < state.alReadyAnnotationData[fileIndex].length; index++) {
            if (item.toId === state.alReadyAnnotationData[fileIndex][index].id) {
              temp.end = state.alReadyAnnotationData[fileIndex][index].text
              break
            }
          }
          temp.connection = item.type
          temp.id = item.id
          triplet.push(temp)
        })
        return triplet
      }
    },
    getGraphData(state) {
      return (fileIndex: number) => {
        let currentNodes: node[] = []
        state.alReadyAnnotationData[fileIndex].forEach((item) => {
          currentNodes.push({
            id: String(item.id),
            label: item.text
          })
        })
        let currentEdges: edge[] = []
        state.alReadyAnnotationConnection[fileIndex].forEach((item) => {
          currentEdges.push({
            source: String(item.fromId),
            target: String(item.toId),
            label: item.type
          })
        })
        return {
          nodes: currentNodes,
          edges: currentEdges
        }
      }
    },
    getChartDataPie(state) {
      return (fileIndex: number, triplet: boolean = false) => {
        const temp: { value: number; name: string }[] = []
        if (!triplet) {
          state.alReadyAnnotationData[fileIndex].forEach((annotationDataItem) => {
            temp.findIndex(item => item.name === annotationDataItem.type) === -1 ? temp.push({ value: 1, name: annotationDataItem.type }) : temp[temp.findIndex(item => item.name === annotationDataItem.type)].value++
          })
        }
        else {
          this.getTriplet(fileIndex).forEach((tripletItem) => {
            temp.findIndex(item => item.name === tripletItem.connection) === -1 ? temp.push({ value: 1, name: tripletItem.connection }) : temp[temp.findIndex(item => item.name === tripletItem.connection)].value++
          })
        }
        return temp
      }
    }
  },
  actions: {
    /**
     * 
     * @param name 文件名
     */
    addFileName(name: string) {
      this.fileName.push(name);
    },
    /**
     * 
     * @param content 文本内容
     */
    addFileNameContent(content: string) {
      this.fileNameContent.push(content)
    },
    /**
     * 
     * @param annotationDataObject 传入的annotationData对象
     */
    addAnnotationData(annotationDataObject: any) {
      this.annotationData.push(annotationDataObject)
    },
    /**
     * 
     * @param alReadyannotationData 传入的标注实体对象
     */
    addAlReadyAnnotationData(alReadyannotationData: { id: number; text: string; type: string; start: number }[]) {
      this.alReadyAnnotationData.push(alReadyannotationData)
    },
    addAlReadyAnnotationDataIndex(alReadyAnnotationDataIndex: { start: number; end: number }[]) {
      this.alReadyAnnotationDataIndex.push(alReadyAnnotationDataIndex)
    },
    /**
     * 
     * @param AlReadyAnnotationConnection 传入标注的关系对象
     */
    addAlReadyAnnotationConnection(AlReadyAnnotationConnection: { id: number; fromId: number; toId: number; type: string }[]) {
      this.alReadyAnnotationConnection.push(AlReadyAnnotationConnection)
    }
  }
})

type entityGraphDataType = {
  entityName: string;
  entityData: { nodes: node[]; edges: edge[] };
  entityDesc: string;
  entityDescExtraction?: string[]; //实体抽取
  entityTuple: string[][];
  entitySimilar:{name: string;percent:number}[]; //相似词语
}
export const useSearchEntity = defineStore('useSearchEntity', {
  state: () => {
    return {
      entityGraphData: [] as entityGraphDataType[],//实体数据
      currentEntityIndex: 0 as number, //实体数据索引
    }
  },
  getters: {
    getCurrentEntityStyle(state) {
      let nodeItem = state.entityGraphData[state.currentEntityIndex].entityData.nodes[0]
      let edgeItem = state.entityGraphData[state.currentEntityIndex].entityData.edges[0]
      return {
        nodeSize: nodeItem.size as number,
        nodeColor: nodeItem.style.fill as string,
        fontColor: nodeItem.labelCfg.style.fill as string,
        fontSize: nodeItem.labelCfg.style.fontSize as number,
        edgeColor: edgeItem.style.stroke as string,
        endArrow: edgeItem.style.endArrow as boolean,
      }
    }
  },
  actions: {
    addEntityGraphData(entityGraphData: entityGraphDataType) {
      let isExisted = this.entityGraphData.findIndex((item) => {
        return item.entityName === entityGraphData.entityName && item.entityDesc === entityGraphData.entityDesc
      })
      //不存在，插入，返回最后一个索引位置，存在，返回找到的位置
      if (isExisted === -1) {
        this.entityGraphData.push(entityGraphData)
        this.currentEntityIndex = this.entityGraphData.length - 1
      } else {
        this.currentEntityIndex = isExisted
      }
    },
    /**
     * 
     * @param customGraphDataStyle 收集用户的样式，然后设置点和边的样式
     */
    setGraphDataStyle(customGraphDataStyle: {
      nodeColor: string;
      nodeSize: number;
      fontColor: string;
      fontSize: number;
      edgeColor: string;
      endArrow: boolean;
    }) {
      this.entityGraphData[this.currentEntityIndex].entityData.nodes.forEach((item) => {
        item.size = customGraphDataStyle.nodeSize
        item.style.fill = customGraphDataStyle.nodeColor
        item.labelCfg.style.fill = customGraphDataStyle.fontColor
        item.labelCfg.style.fontSize = customGraphDataStyle.fontSize
      })
      this.entityGraphData[this.currentEntityIndex].entityData.edges.forEach((item) => {
        item.style.stroke = customGraphDataStyle.edgeColor
        item.style.endArrow = customGraphDataStyle.endArrow
      })
    }
  }
})