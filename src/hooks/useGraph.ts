import G6, { Graph, GraphData, Item } from '@antv/g6'
/**
 * @des 返回图实例对象
 * @returns 图实例对象
 */
export default (currentNode: any, props: any) => {
    //全局动画配置
    const animateCfg = { duration: 200, easing: 'easeCubic' }
    //默认配置
    const defaultOptions = {
        defaultNode: {
            type: "circle",
            size: 30,
            style: {
                fill: '#5B8FF9',
                lineWidth: 1,
                shadowOffsetX: 10,
                shadowOffsetY: 10,
                shadowColor: '#ccc',
                shadowBlur: 10,
                opacity: 0.8,
            },
            labelCfg: {
                style: {
                    fill: "#000",
                    fontSize: 5
                }
            }
        },
        defaultEdge: {
            style: {
                stroke: '#5B8FF9',
                endArrow: false
            }
        },
        modes: {
            default: ['zoom-canvas', 'drag-node', 'activate-relations', 'drag-canvas',
                {
                    type: 'tooltip', // 提示框
                    formatText(model: any) {
                        // 提示框文本内容
                        const text = '主体: ' + model.label;
                        return text;
                    },
                },
                {
                    type: 'edge-tooltip', // 边提示框
                    formatText(model: any) {
                        // 边提示框文本内容
                        const text =
                            'source: ' +
                            model.source +
                            '<br/> target: ' +
                            model.target +
                            '<br/> 关系: ' +
                            model.label
                        return text;
                    },
                },
            ], // 允许拖拽画布、放缩画布、拖拽节点
        },
        fitView: true, //是否自适应
        fitViewPadding: 20,
        layout: {}, //布局
        animate: false, //动画
        nodeStateStyles: {
            hover: {
                fill: 'lightsteelblue',
            },
            // 鼠标点击节点，即 click 状态为 true 时的样式
            click: {
                stroke: '#000',
                lineWidth: 3,
            },
        }, //交互时的点样式
        edgeStateStyles: {
            // 鼠标点击边，即 click 状态为 true 时的样式
            click: {
                stroke: 'steelblue',
            },
        } //交互时边样式
    }
    //默认插件
    const defaultPuling = {
        //小地图
        minimap: new G6.Minimap({
            size: props?.minimapszie ?? [100, 100],
            className: 'minimap',
            type: 'keyShape',
        }),
        //按钮栏
        toolbar: new G6.ToolBar({
            getContent: () => `
            <ul class='g6-component-toolbar'>
              <li  code='zoomOut'>
                <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                  <path d="M658.432 428.736a33.216 33.216 0 0 1-33.152 33.152H525.824v99.456a33.216 33.216 0 0 1-66.304 0V461.888H360.064a33.152 33.152 0 0 1 0-66.304H459.52V296.128a33.152 33.152 0 0 1 66.304 0V395.52H625.28c18.24 0 33.152 14.848 33.152 33.152z m299.776 521.792a43.328 43.328 0 0 1-60.864-6.912l-189.248-220.992a362.368 362.368 0 0 1-215.36 70.848 364.8 364.8 0 1 1 364.8-364.736 363.072 363.072 0 0 1-86.912 235.968l192.384 224.64a43.392 43.392 0 0 1-4.8 61.184z m-465.536-223.36a298.816 298.816 0 0 0 298.432-298.432 298.816 298.816 0 0 0-298.432-298.432A298.816 298.816 0 0 0 194.24 428.8a298.816 298.816 0 0 0 298.432 298.432z"></path>
                </svg>
              </li>
              <li code='zoomIn'>
                <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                  <path d="M639.936 416a32 32 0 0 1-32 32h-256a32 32 0 0 1 0-64h256a32 32 0 0 1 32 32z m289.28 503.552a41.792 41.792 0 0 1-58.752-6.656l-182.656-213.248A349.76 349.76 0 0 1 480 768 352 352 0 1 1 832 416a350.4 350.4 0 0 1-83.84 227.712l185.664 216.768a41.856 41.856 0 0 1-4.608 59.072zM479.936 704c158.784 0 288-129.216 288-288S638.72 128 479.936 128a288.32 288.32 0 0 0-288 288c0 158.784 129.216 288 288 288z" p-id="3853"></path>
                </svg>
              </li>
              <li code='realZoom'>
                <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="24">
                  <path d="M384 320v384H320V320h64z m256 0v384H576V320h64zM512 576v64H448V576h64z m0-192v64H448V384h64z m355.968 576H92.032A28.16 28.16 0 0 1 64 931.968V28.032C64 12.608 76.608 0 95.168 0h610.368L896 192v739.968a28.16 28.16 0 0 1-28.032 28.032zM704 64v128h128l-128-128z m128 192h-190.464V64H128v832h704V256z"></path>
                </svg>
              </li>
              <li code='autoZoom'>
                <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="24">
                  <path d="M684.288 305.28l0.128-0.64-0.128-0.64V99.712c0-19.84 15.552-35.904 34.496-35.712a35.072 35.072 0 0 1 34.56 35.776v171.008h170.944c19.648 0 35.84 15.488 35.712 34.432a35.072 35.072 0 0 1-35.84 34.496h-204.16l-0.64-0.128a32.768 32.768 0 0 1-20.864-7.552c-1.344-1.024-2.816-1.664-3.968-2.816-0.384-0.32-0.512-0.768-0.832-1.088a33.472 33.472 0 0 1-9.408-22.848zM305.28 64a35.072 35.072 0 0 0-34.56 35.776v171.008H99.776A35.072 35.072 0 0 0 64 305.216c0 18.944 15.872 34.496 35.84 34.496h204.16l0.64-0.128a32.896 32.896 0 0 0 20.864-7.552c1.344-1.024 2.816-1.664 3.904-2.816 0.384-0.32 0.512-0.768 0.768-1.088a33.024 33.024 0 0 0 9.536-22.848l-0.128-0.64 0.128-0.704V99.712A35.008 35.008 0 0 0 305.216 64z m618.944 620.288h-204.16l-0.64 0.128-0.512-0.128c-7.808 0-14.72 3.2-20.48 7.68-1.28 1.024-2.752 1.664-3.84 2.752-0.384 0.32-0.512 0.768-0.832 1.088a33.664 33.664 0 0 0-9.408 22.912l0.128 0.64-0.128 0.704v204.288c0 19.712 15.552 35.904 34.496 35.712a35.072 35.072 0 0 0 34.56-35.776V753.28h170.944c19.648 0 35.84-15.488 35.712-34.432a35.072 35.072 0 0 0-35.84-34.496z m-593.92 11.52c-0.256-0.32-0.384-0.768-0.768-1.088-1.088-1.088-2.56-1.728-3.84-2.688a33.088 33.088 0 0 0-20.48-7.68l-0.512 0.064-0.64-0.128H99.84a35.072 35.072 0 0 0-35.84 34.496 35.072 35.072 0 0 0 35.712 34.432H270.72v171.008c0 19.84 15.552 35.84 34.56 35.776a35.008 35.008 0 0 0 34.432-35.712V720l-0.128-0.64 0.128-0.704a33.344 33.344 0 0 0-9.472-22.848zM512 374.144a137.92 137.92 0 1 0 0.128 275.84A137.92 137.92 0 0 0 512 374.08z"></path>
                </svg>
              </li>
            </ul>`,
            handleClick: (code, graph) => {
                switch (code) {
                    case 'zoomOut':
                        graph.zoom(1.2, undefined, true, animateCfg);
                        break;
                    case 'zoomIn':
                        graph.zoom(0.8, undefined, true, animateCfg);
                        break;
                    case 'realZoom':
                        graph.zoomTo(1, undefined, true, animateCfg);
                        break;
                    case 'autoZoom':
                        graph.fitView(20, undefined, true, animateCfg);
                        break;
                }
            }
        })
    }
    // 取出props
    const options = {
        defaultNode: props.options?.defaultNode ?? defaultOptions.defaultNode,
        defaultEdge: props.options?.defaultEdge ?? defaultOptions.defaultEdge,
        modes: props.options?.modes ?? defaultOptions.modes,
        fitView: props.options?.layout ? false : defaultOptions.fitView,
        fitViewPadding: props.options?.layout ? 0 : defaultOptions.fitViewPadding,
        layout: props.options?.layout ?? defaultOptions.layout,
        animate: props.options?.animate ?? defaultOptions.animate,
        nodeStateStyles: props.options?.nodeStateStyles ?? defaultOptions.nodeStateStyles,
        edgeStateStyles: props.options?.edgeStateStyles ?? defaultOptions.edgeStateStyles
    }
    //取出puling
    const getPuling = () => {
        let puling = []
        if (props?.plugins?.includes('minimap')) {
            puling.push(defaultPuling.minimap)
        }
        if (props?.plugins?.includes('toolbar')) {
            puling.push(defaultPuling.toolbar)
        }
        console.log(puling);
        return puling
    }
    const graph = new G6.Graph({
        container: currentNode.value, // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
        width: currentNode.value.scollWidth, // Number，必须，图的宽度
        height: currentNode.value.scollHeight, // Number，必须，图的高度
        ...options,
        plugins: getPuling()
    });

    //绑定事件
    // 鼠标进入节点
    graph.on('node:mouseenter', (e) => {
        const nodeItem = e.item; // 获取鼠标进入的节点元素对象
        graph.setItemState(nodeItem as any, 'hover', true); // 设置当前节点的 hover 状态为 true
    });

    // 鼠标离开节点
    graph.on('node:mouseleave', (e) => {
        const nodeItem = e.item; // 获取鼠标离开的节点元素对象
        graph.setItemState(nodeItem as any, 'hover', false); // 设置当前节点的 hover 状态为 false
    });

    graph.on('node:click', e => {
        const nodeItem = e.item as Item; // 获取被点击的边元素对象
        graph.focusItem(nodeItem, true, animateCfg)
        // graph.setItemState(nodeItem, 'click', true); // 设置当前节点的 click 状态为 true
    })
    graph.on('edge:click', e => {
        const edgeItem = e.item as Item; // 获取被点击的边元素对象
        graph.focusItem(edgeItem, true, animateCfg)
        // graph.setItemState(edgeItem, 'click', true);
    })
    return graph
}