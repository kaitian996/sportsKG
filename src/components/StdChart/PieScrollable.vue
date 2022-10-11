<template>
    <div ref="currentChartComponentRef" class="currentChartComponent">
    </div>
</template>
 
 
<script lang='ts' setup>
import { ref, onMounted, watch } from 'vue'
import { useWindowResize } from '@/hooks/useWindowResize'
import * as echarts from 'echarts'
const props = defineProps<{
    legendData: string[],
    seriesData: { name: string; value: number }[]
}>()

const currentChartComponentRef = ref<HTMLElement>()
let currentChartInstance: echarts.ECharts
const drawChart = () => {
    if (!currentChartInstance) {
        currentChartInstance = echarts.init(currentChartComponentRef.value as HTMLElement)
    }
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 25,
            top: 20,
            bottom: 10,
            data: props.legendData
        },
        series: [
            {
                name: '关系名称',
                type: 'pie',
                radius: '55%',
                center: ['40%', '50%'],
                data: props.seriesData,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
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
watch(() => props.seriesData, () => {
    drawChart()
})

</script>
 
<style scoped lang="less">
.currentChartComponent {
    height: 100%;
    width: 100%;
}
</style>