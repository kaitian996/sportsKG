/**
 * 
 * @param elem HTML元素
 * @returns 元素的文档坐标
 */
export const useGetElementPosition = (elem: HTMLElement) => {
    let box = elem.getBoundingClientRect();
    console.log('BOX',box.top);
    console.log( window.scrollY);
    
    return {
        top: box.top + window.scrollY,
        right: box.right + window.scrollX,
        bottom: box.bottom + window.scrollY,
        left: box.left + window.scrollX
    }
}