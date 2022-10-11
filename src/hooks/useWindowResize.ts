import { onMounted, onUnmounted } from "vue";
/**
 * 
 * @param callback 窗口尺寸改变时需要执行的回调
 * @param delay 延迟时间
 */
export const useWindowResize = (callback: () => void, delay: number) => {
    //调整窗口回调
    const reDraw = () => {
        let internalID: any = null
        return () => {
            clearTimeout(internalID);
            internalID = setTimeout(callback, delay)
        }
    }
    onMounted(() => {
        window.addEventListener("resize", reDraw())
    })
    onUnmounted(() => {
        window.removeEventListener("resize", reDraw())
    })
}