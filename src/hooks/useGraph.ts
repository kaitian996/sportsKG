import G6, { Graph, GraphData, Item } from "@antv/g6"
/**
 * @des 返回图实例对象
 * @returns 图实例对象
 */
export default (currentNode: any) => {
    //全局动画配置
    const animateCfg = { duration: 200, easing: "easeCubic" }
    //默认配置
    const defaultOptions = {
        defaultNode: {
            type: "circle",
            size: 30,
            style: {
                fill: "#5B8FF9",
                lineWidth: 1,
                shadowOffsetX: 10,
                shadowOffsetY: 10,
                shadowColor: "#ccc",
                shadowBlur: 10,
                opacity: 0.8,
            },
            labelCfg: {
                style: {
                    fill: "#000",
                    fontSize: 5,
                },
            },
        },
        defaultEdge: {
            style: {
                stroke: "#5B8FF9",
                endArrow: false,
            },
        },
        modes: {
            default: [
                "zoom-canvas",
                "drag-node",
                "activate-relations",
                "drag-canvas",
            ], // 允许拖拽画布、放缩画布、拖拽节点
        },
        fitView: true, //是否自适应
        fitViewPadding: 20,
        layout: {}, //布局
        animate: false, //动画
        nodeStateStyles: {
            hover: {
                fill: "lightsteelblue",
            },
            // 鼠标点击节点，即 click 状态为 true 时的样式
            click: {
                stroke: "#000",
                lineWidth: 3,
            },
        }, //交互时的点样式
        edgeStateStyles: {
            // 鼠标点击边，即 click 状态为 true 时的样式
            click: {
                stroke: "steelblue",
            },
        }, //交互时边样式
    }
    const graph = new G6.Graph({
        container: currentNode.value, // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
        width: currentNode.value.scollWidth, // Number，必须，图的宽度
        height: currentNode.value.scollHeight, // Number，必须，图的高度
        ...defaultOptions,
    })

    //绑定事件
    // 鼠标进入节点
    graph.on("node:mouseenter", (e) => {
        const nodeItem = e.item // 获取鼠标进入的节点元素对象
        graph.setItemState(nodeItem as any, "hover", true) // 设置当前节点的 hover 状态为 true
    })

    // 鼠标离开节点
    graph.on("node:mouseleave", (e) => {
        const nodeItem = e.item // 获取鼠标离开的节点元素对象
        graph.setItemState(nodeItem as any, "hover", false) // 设置当前节点的 hover 状态为 false
    })
    graph.on("edge:click", (e) => {
        const edgeItem = e.item as Item // 获取被点击的边元素对象
        graph.focusItem(edgeItem, true, animateCfg)
    })
    return graph
}
