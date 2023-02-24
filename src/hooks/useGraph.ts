import G6, { Graph, GraphData, INode, Item } from "@antv/g6"
/**
 * @des 返回图实例对象
 * @returns 图实例对象
 */
export default (currentNode: any) => {
    //默认配置
    const defaultOptions = {
        defaultNode: {
            type: "circle",
            size: 10,
            style: {
                fill: "#0069c2",
                lineWidth: 0,
            },
            labelCfg: {
                style: {
                    fill: "#fff",
                    fontSize: 4,
                },
                position: "top",
            },
        },
        defaultEdge: {
            style: {
                stroke: "#fff",
            },
            labelCfg: {
                style: {
                    fontSize: 3,
                    fill: "#fff",
                },
            },
        },
        modes: {
            default: ["zoom-canvas", "drag-node", "drag-canvas"], // 允许拖拽画布、放缩画布、拖拽节点
        },
        fitView: true, //是否自适应
        fitViewPadding: 20,
        animate: false, //动画
        nodeStateStyles: {
            hover: {
                fill: "lightsteelblue",
                lineWidth: 1,
            },
            // 鼠标点击节点，即 click 状态为 true 时的样式
            click: {
                stroke: "#000",
                lineWidth: 1,
            },
        }, //交互时的点样式
        edgeStateStyles: {
            // 鼠标点击边，即 click 状态为 true 时的样式
            hover: {
                stroke: "#4b5cc4",
            },
        }, //交互时边样式
    }
    const graph = new G6.Graph({
        container: currentNode.value, // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
        width: currentNode.value.scollWidth, // Number，必须，图的宽度
        height: currentNode.value.scollHeight, // Number，必须，图的高度
        ...defaultOptions,
        layout: {
            type: "force",
            preventOverlap: true,
            linkDistance: 100, // 设置边长为 100
        },
    })

    //绑定事件
    graph.on("edge:mouseenter", (e) => {
        const nodeItem = e.item // 获取鼠标进入的节点元素对象
        graph.setItemState(nodeItem as any, "hover", true) // 设置当前节点的 hover 状态为 true
    })
    graph.on("edge:mouseout", (e) => {
        const nodeItem = e.item // 获取鼠标进入的节点元素对象
        graph.setItemState(nodeItem as any, "hover", false) // 设置当前节点的 hover 状态为 true
    })
    // 鼠标进入节点
    graph.on("node:mouseenter", (e) => {
        const nodeItem = e.item as INode // 获取鼠标进入的节点元素对象
        nodeItem.getInEdges().forEach((edgeItem) => {
            graph.setItemState(edgeItem as any, "hover", true) // 设置当前节点的 hover
        })
        graph.setItemState(nodeItem as any, "hover", true) // 设置当前节点的 hover 状态为 true
    })
    // 鼠标离开节点
    graph.on("node:mouseleave", (e) => {
        const nodeItem = e.item as INode // 获取鼠标离开的节点元素对象
        nodeItem.getInEdges().forEach((edgeItem) => {
            graph.setItemState(edgeItem as any, "hover", false) // 设置当前节点的 hover
        })
        graph.setItemState(nodeItem as any, "hover", false) // 设置当前节点的 hover 状态为 false
    })
    graph.on("node:dragstart", function (e) {
        graph.layout()
        refreshDragedNodePosition(e)
    })
    graph.on("node:drag", function (e) {
        const forceLayout = graph.get("layoutController").layoutMethods[0]
        forceLayout.execute()
        refreshDragedNodePosition(e)
    })
    graph.on("node:dragend", function (e) {
        //@ts-ignore
        e.item.get("model").fx = null
        //@ts-ignore
        e.item.get("model").fy = null
    })
    return graph
}
function refreshDragedNodePosition(e: any) {
    const model = e.item.get("model")
    model.fx = e.x
    model.fy = e.y
}
