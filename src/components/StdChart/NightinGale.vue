<template>
    <div ref="currentChartComponentRef" class="currentChartComponent">
    </div>
</template>
 
 
<script lang='ts' setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useWindowResize } from '@/hooks/useWindowResize'
import * as echarts from 'echarts'
const props = defineProps<{
    chartData: { value: number; name: string }[],
    chartTitle: string,
    toolbox?: {
        show: boolean;
        feature: {
            mark: {
                show: boolean;
            };
            saveAsImage: {
                show: boolean;
            };
        };
    }
}>()
const currentChartComponentRef = ref<HTMLElement>()
let currentChartInstance: echarts.ECharts
const drawChart = () => {
    if (!currentChartInstance) {
        currentChartInstance = echarts.init(currentChartComponentRef.value as HTMLElement)
    }
    const option = {
        title: {
            text: props.chartTitle,
            x: 'center'
        },
        legend: {
            top: 'bottom',
            type: 'scroll',
        },
        series: [
            {
                name: 'Nightingale Chart',
                type: 'pie',
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 8
                },
                data: props.chartData
            }
        ]
    };
    currentChartInstance.setOption(option)
}
useWindowResize(() => {
    if (!currentChartComponentRef.value || !currentChartComponentRef.value.scrollWidth || !currentChartComponentRef.value.scrollHeight) return;
    if (currentChartInstance) currentChartInstance.resize()
}, 100)
onMounted(() => {
    drawChart()
})
watch(() => props.chartData, () => {
    drawChart()
})
</script>
 
<style scoped lang="less">
.currentChartComponent {
    height: 100%;
    width: 100%;
}
</style>