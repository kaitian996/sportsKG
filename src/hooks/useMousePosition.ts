import { onBeforeUnmount, onMounted, ref } from "vue";
/**
 * 
 * @returns 鼠标点击时的坐标
 */
export const useMousePosition= ()=> {
    const x = ref<number>(0)
    const y = ref<number>(0)

    // 鼠标点击操作函数回调
    const clickHandler = (event:any) => {
        x.value = event.screenX
        y.value = event.screenY

    }

    // 页面加载完毕，再进行点击操作
    onMounted(() => {
        window.addEventListener('mousemove', clickHandler)
    })

    // 页面卸载前给他删了
    onBeforeUnmount(() => {
        window.removeEventListener('mousemove', clickHandler)
    })

    return {
        x, y
    }
}
