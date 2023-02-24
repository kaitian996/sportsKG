<template>
    <main class="search-home-container">
        <Header :isWhiteImage="true" :isWhiteText="'#0069c2'" class="head-wapper"></Header>
        <!-- 输入框 -->
        <div class="input-warpper">
            <!-- 输入框 -->
            <div class="input-box animate__animated animate__fadeIn">
                <input type="text" placeholder="输入搜索词或主题" v-model="inputSearch" @keyup.enter="getSearchEntity" />
                <span @click="inputSearch = ''" class="delete-icon"><svg t="1657855668772" class="icon"
                        viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5125">
                        <path
                            d="M547.2 512l416-416c9.6-9.6 9.6-25.6 0-35.2s-25.6-9.6-35.2 0l-416 416-416-416c-9.6-9.6-25.6-9.6-35.2 0s-9.6 25.6 0 35.2l416 416-416 416c-9.6 9.6-9.6 25.6 0 35.2s25.6 9.6 35.2 0l416-416 416 416c9.6 9.6 25.6 9.6 35.2 0s9.6-25.6 0-35.2L547.2 512z"
                            p-id="5126"></path>
                    </svg></span>
                <span @click="getSearchEntity" class="search-icon">
                    <svg t="1657855408940" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="2263">
                        <path
                            d="M511.975892 191.296945a23.234661 23.234661 0 1 0 0 46.934014 202.315808 202.315808 0 0 1 202.315808 202.315808 23.234661 23.234661 0 0 0 46.934015 0 249.191736 249.191736 0 0 0-249.249823-249.249822z"
                            fill="#515151" p-id="2264"></path>
                        <path
                            d="M1009.313805 958.389268l-172.807789-172.807789a475.032638 475.032638 0 1 0-54.369106 53.555893l173.214395 173.214396a38.16293 38.16293 0 1 0 53.9625-53.9625z m-533.11929-90.03431a393.072373 393.072373 0 1 1 393.943672-392.0849 393.072373 393.072373 0 0 1-393.943672 392.0849z"
                            fill="#515151" p-id="2265"></path>
                    </svg></span>
            </div>
        </div>
        <!-- 词云框 -->
        <div class="wordcloud-wapper" @click="toGetEntity" v-show="searchState.isWordCloud">
            <canvas id="world-cloud-canvas" width="600" height="600" style="width: 70%; max-width: 700px">
            </canvas>
            <div style="display: none" id="weightTags"></div>
        </div>
        <!-- 图框 -->
        <div class="graph-wapper" v-show="searchState.isGraph">
            <div class="graph-instance" ref="graphInstanceRef">
            </div>
        </div>
        <!-- 底部 -->
        <Footer></Footer>
    </main>
</template>

<script lang="ts" setup>
import Header from "@/components/Header/index.vue"
import { ref, reactive, onMounted, watch, nextTick } from "vue"
//@ts-ignore
import tagCanvas from "tag-canvas"
import Footer from '@/components/Footer/index.vue'
import { useGetEntity, useGetEntityData } from "@/hooks/useGetData";
import type { Graph, GraphData, INode, Item } from "@antv/g6"
import useGraphData, { edge, node } from "@/hooks/useGraphData";
import useGraph from "@/hooks/useGraph";
import axios from "axios";

//输入逻辑块
const inputSearch = ref<string | number>("")
const getSearchEntity = async () => {
    if (inputSearch.value) {
        const entityList = await useGetEntity(inputSearch.value)
        const resultList = entityList.map(entity => ({ name: entity }))
        if (resultList.length > 1 || resultList.length === 0) {
            wordCloudMap.value.length = 0
            wordCloudMap.value.push(...resultList)
            searchState.isGraph = false
            searchState.isWordCloud = true
            nextTick(() => startWorldCloud(true))
        } else {
            //找三元组数据
            const result = await useGetEntityData(inputSearch.value)
            graphData.nodes.length = 0
            graphData.edges.length = 0
            updateColor(result.nodes)
            graphData.nodes.push(...result.nodes)
            graphData.edges.push(...result.edges)
            searchState.isWordCloud = false
            searchState.isGraph = true
            nextTick(() => {
                registerGraphInstance()
            })
        }
    }
}
//管理搜索的状态机
const searchState = reactive({
    isWordCloud: true,
    isGraph: false
})
//词云
const wordCloudMap = ref<{ name: string }[]>([
    { name: '梅西' },
    { name: '内马尔' },
    { name: '马拉多纳' },
    { name: '罗纳尔多' },
    { name: '贝克汉姆' },
    { name: '贝利' },
    { name: '安德雷斯' },
    { name: '韦恩' },
    { name: '斯蒂法诺' },
    { name: '加林查' },
    { name: '马尔蒂尼' },
    { name: '范巴斯滕' },
    { name: '齐达内' },
    { name: '普斯卡什' },
    { name: '克鲁伊夫' },
    { name: 'C罗' },
    { name: '济科' },
    { name: '罗马里奥' },
    { name: '雅辛' },
    { name: '尤西比奥' },
    { name: '罗纳尔迪尼奥' },
    { name: '瓦伦蒂诺-马佐拉' },
    { name: '苏格拉底' },
    { name: '曼努埃尔-莫雷诺' },
    { name: '保罗-罗西' },
    { name: '辛德拉尔' },
    { name: '斯奇亚菲诺' },
])
//启动词云
const startWorldCloud = (updateFlag: boolean) => {
    createTagListDom();
    const o = {
        maxSpeed: 0.04, // 添加最大的运动速度
        minSpeed: 0.02, // 添加最小的运动速度这样就可以保证一直运动，不会停止
        textHeight: 13,
        outlineMethod: "none", // tag hover 之后的 轮廓效果
        noTagsMessage: false,
        imageMode: "text",
        fadeIn: 800,
        outlineColour: "#fff456aa",
        outlineOffset: 0,
        depth: 0.5,
        wheelZoom: false,
        reverse: true, // 运动方向与鼠标移动方向相反
        shuffleTags: true,
        stretchX: 0.7, // Stretch or compress the cloud horizontally. 水平拉伸词云
        stretchY: 0.7,
        initial: [0.1, 0.1], // 给词云添加一个初始的运动方向
        textFont: null, // 字体设置为 null 就会继承 每个 tag的a 标签的字体
        textColour: null, // 字体颜色设置为 null 就会继承 每个 tag的a 标签的字体颜色
    }
    try {
        // 如果不是更新，说明是第一次渲染，就启动 tagcanvas, 否则就代表更新
        if (!updateFlag) {
            tagCanvas.Start("world-cloud-canvas", "weightTags", o)
        } else {
            tagCanvas.Update("world-cloud-canvas")
        }
    } catch (e) { }
}
function randomNum(minNum: any, maxNum: any) {
    switch (arguments.length) {
        case 1:
            return parseInt(String(Math.random() * minNum + 1), 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}
const colorList: string[] = ['#2D4DB6', '#04B67C', '#D1AF07', '#E27914', '#CB4A4D', '#B02690']
const createTagListDom = () => {
    const res = [...wordCloudMap.value]
    const fragment = new DocumentFragment();
    for (let i = 0; i < res.length; i++) {
        const a = document.createElement("a");
        // 字符串长度大于10就要换行
        if (res[i].name.length > 10) {
            let charArr = res[i].name.split("");
            charArr.splice(10, 0, "<br>");
            res[i].name = charArr.join("");
        }
        a.href = "javascript:void(0)";
        a.innerHTML = res[i].name;
        a.setAttribute("value", res[i].name)
        a.className = "tags-link"
        a.style.color = colorList[randomNum(0, colorList.length - 1)]
        //设置颜色和样式
        fragment.append(a);
    }
    // 更新 tagContainer中的 tag元素
    const tagsContainer = document.querySelector("#weightTags");
    tagsContainer!.innerHTML = "";
    tagsContainer!.append(fragment);
}
onMounted(() => {
    startWorldCloud(false);
})
//a标签的点击事件
const toGetEntity = (e: any) => {
    const entity: string = e.target.getAttribute("value")
    if (entity) {
        inputSearch.value = entity.replace("<br>", "")
        getSearchEntity()
    }
}

//展示的图
//图数据
const graphData = useGraphData([], [])
const graphInstanceRef = ref<HTMLElement>()
let graphInstance: Graph
const registerGraphInstance = () => {
    if (!graphInstance) {//没有实例就创建一个
        graphInstance = useGraph(graphInstanceRef)
        graphInstance.on("node:click", (e) => {
            const nodeItem = e.item as INode // 获取被点击的节点元素对象
            loadMoreEntity(nodeItem)
        })
        graphInstance.data(graphData)
        graphInstance.render()
    } else {
        graphInstance.changeData(graphData)
    }
}
//加载更多
const loadMoreEntity = async (item: INode) => {
    const { id, label } = item._cfg?.model!
    let startIndex = graphData.nodes.length - 1 //拿到开始递增的id

    //向后端要数据
    const result = await useGetEntityData(label)
    console.log(result);
    const url: string = `http://shuyantech.com/api/cndbpedia/avpair?q=${label}`
    let tempData: string[][] = []
    try {
        let { data } = await axios.get(url)
        if (data.status === 'ok' && data.ret.length > 0) {
            tempData = data.ret
        }
    } catch (error) {
    }

    if (tempData.length) {
        const descIndex: number = tempData.findIndex(item => item[0] === 'DESC')
        tempData.splice(descIndex, 1)
        //结构化为需要的数据
        const nodes: node[] = []
        const edges: edge[] = []
        tempData.forEach(item => {
            const node: node = {
                id: String(startIndex),
                label: item[1]
            }
            const edge: edge = {
                source: String(id),
                target: String(startIndex),
                label: item[0]
            }
            startIndex++
            nodes.push(node)
            edges.push(edge)
        })
        updateColor(nodes)
        graphData.nodes.push(...nodes)
        graphData.edges.push(...edges)
        if (graphInstance) {
            graphInstance.changeData(graphData)
        }
    }
}
const updateColor = (nodeList: node[]) => {
    nodeList.forEach(node => {
        if (!node.style) {
            node.style = {
                fill: colorList[randomNum(0, colorList.length - 1)]
            }
        }
    })
}
</script>

<style lang="less">
.search-home-container {
    position: relative;
    background-color: #11162a;

}

.input-warpper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-top: 72px;
    color: #fff;
    position: absolute;

    .input-box {
        min-width: 50%;
        height: 56px;
        border-radius: 30px;
        display: flex;
        align-items: center;
        background: #fff;
        z-index: 1;
        box-shadow: 0 0 0 1px rgb(0 0 0 / 5%), 0 2px 4px 1px rgb(0 0 0 / 9%);
        border-left: 1px solid transparent;
        border-right: none;
        border-top: 1px solid transparent;
        border-bottom: 1px solid transparent;

        &:hover,
        &:focus-within {
            box-shadow: 0 0 0 1px rgb(0 0 0 / 10%),
                0 2px 4px 1px rgb(0 0 0 / 18%);
            border-left: 1px solid transparent;
            border-right: none;
            border-top: 1px solid transparent;
            border-bottom: 1px solid transparent;

            .delete-icon {
                visibility: visible;
            }
        }

        input {
            height: 100%;
            width: 80%;
            border: none;
            outline: none;
            font-size: 18px;
            padding: 0 30px;
            border-top-left-radius: 30px;
            border-bottom-left-radius: 30px;
            color: rgb(0, 0, 0);
            background: #fff;
            opacity: 0.7;
        }

        .span-style() {
            display: block;
            height: 100%;
            width: 5%;
            z-index: 1;
            border-top-right-radius: 30px;
            border-bottom-right-radius: 30px;
            text-align: center;
            line-height: 50px;
            padding-right: 5px;
            margin-right: 3%;

            .icon {
                height: 40%;

                vertical-align: middle;
            }
        }

        .delete-icon {
            visibility: hidden;
            .span-style;
        }

        .search-icon {
            .span-style;
        }
    }

    .search-example {
        margin-top: 10px;
    }
}

.wordcloud-wapper {
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .tags-link {
        font-family: PingFangSC-Regular, "sans-serif", Microsoft YaHei;
    }
}

.graph-wapper {
    max-width: 100vw;
    box-sizing: border-box;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .graph-instance {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 99%;
        height: 100vh;
    }
}
</style>
