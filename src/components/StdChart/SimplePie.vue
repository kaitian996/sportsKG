<template>
    <div ref="currentChartComponentRef" class="currentChartComponent"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue"
import { useWindowResize } from "@/hooks/useWindowResize"
import * as echarts from "echarts"
const props = defineProps<{
    seriesData: { name: string; value: number }[]
    title: string
}>()

const currentChartComponentRef = ref<HTMLElement>()
let currentChartInstance: echarts.ECharts
const drawChart = () => {
    if (!currentChartInstance) {
        currentChartInstance = echarts.init(
            currentChartComponentRef.value as HTMLElement
        )
    }
    const option = {
        title: {
            text: props.title,
            left: "center",
        },
        tooltip: {
            trigger: "item",
        },
        legend: {
            orient: "vertical",
            left: "left",
            type: "scroll",
            right: 25,
            top: 20,
            bottom: 10,
        },
        series: [
            {
                type: "pie",
                radius: "50%",
                data: props.seriesData,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: "rgba(0, 0, 0, 0.5)",
                    },
                },
            },
        ],
    }

    currentChartInstance.setOption(option)
}
useWindowResize(() => {
    if (
        !currentChartComponentRef.value ||
        !currentChartComponentRef.value.scrollWidth ||
        !currentChartComponentRef.value.scrollHeight
    )
        return
    if (currentChartInstance) currentChartInstance.resize()
}, 100)
onMounted(() => {
    drawChart()
})
watch(
    () => props.seriesData,
    () => {
        drawChart()
    }
)
</script>

<style scoped lang="less">
.currentChartComponent {
    height: 100%;
    width: 100%;
}
</style>
