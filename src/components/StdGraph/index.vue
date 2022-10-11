<template>
    <div ref="currentNode" class="currentNode">
    </div>
</template>
 
 
<script lang='ts' setup>
import { Graph, GraphData } from '@antv/g6'
import { ref, reactive, onMounted, watch, toRaw, onUnmounted } from 'vue'
import useGraph from '@/hooks/useGraph'
import { useWindowResize } from '@/hooks/useWindowResize'

const currentNode = ref()
const props = defineProps({
    data: {
        required: true,
        type: Object,
    },
    options: {
        type: Object,
        required: false,
    },
    plugins: {
        required: false,
        type: Object,
    },
    minimapszie: {
        required: false,
        type: Array,
    },
    isStyleChanged: {
        type: Number,
        required: false,
    }
})

//绘图实例
let graph: Graph
//调整窗口回调
useWindowResize(() => {
    console.log('窗口尺寸改变,重新渲染');
    if (!currentNode.value || !currentNode.value.scrollWidth || !currentNode.value.scrollHeight) return;
    graph.destroy()
    graph = useGraph(currentNode, props)
    drawGraph(graph)
}, 500)
onMounted(() => {
    graph = useGraph(currentNode, props)
    console.log('注册图对象');
    drawGraph(graph);
})
// 渲染画图函数
const drawGraph = (graph: Graph) => {
    const tempData = toRaw(props.data)
    graph.data(tempData as GraphData)
    graph.render(); // 渲染图
}
//渲染更新
const reFreshGraph = (graph: Graph) => {
    graph.refresh()
}
// 改变数据时调用渲染函数
watch(() => props.data, () => {
    drawGraph(graph);
})
//改变样式时
watch(() => props.isStyleChanged, (newValue) => {
    if (newValue === 1) return;
    reFreshGraph(graph);
})
</script>
 
<style scoped lang="less">
.currentNode {
    height: 100%;
    width: 100%;
    position: relative;
}
</style>