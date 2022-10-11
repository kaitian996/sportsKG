<template>
    <div ref="currentChartComponentRef" class="currentChartComponent">
    </div>
</template>
 
 
<script lang='ts' setup>
import { ref, reactive, onMounted, watch, nextTick } from 'vue'
import { useWindowResize } from '@/hooks/useWindowResize'
import * as echarts from 'echarts'
import { SVGRenderer } from 'echarts/renderers';
echarts.use([SVGRenderer as any])
const props = defineProps<{
    yAxis: string[],
    series: number[],
}>()
const currentChartComponentRef = ref<HTMLElement>()
let currentChartInstance: echarts.ECharts
const drawChart = () => {
    if (!currentChartInstance) {
        currentChartInstance = echarts.init(currentChartComponentRef.value as HTMLElement, undefined, { renderer: 'svg' })
    }
    const option = {
        title: {
            text: '实体同名关系统计',
            x: 'center'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
        },
        yAxis: {
            type: 'category',
            data: props.yAxis
        },
        series: [
            {
                type: 'bar',
                data: props.series
            },
        ]
    };
    currentChartInstance.setOption(option)
}
useWindowResize(() => {
    if (!currentChartComponentRef.value || !currentChartComponentRef.value.scrollWidth || !currentChartComponentRef.value.scrollHeight) return
    if (currentChartInstance) currentChartInstance.resize()
}, 100)
onMounted(() => {
    drawChart()
})
watch([() => props.series, () => props.yAxis], () => {
    nextTick(() => {
        currentChartInstance.resize()
        drawChart()
    })
})
</script>
 
<style scoped lang="less">
.currentChartComponent {
    height: 100%;
    width: 100%;
}
</style>