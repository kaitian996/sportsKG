type methods = 'readAsBinaryString' | 'readAsDataURL' | 'readAsText'
type handleOnloadHook = (result: string) => void
/**
 * @des 此hook封装FileReader对象，实现传入方法、文件、支持完成时回调
 * @param method 方法非必须
 * @param handleOnload  文件读取完成时回调 必须
 * @param file 需要读取的文件
 * @returns 文件内容
 */
export const useFileReader = (file: any, handleOnload: handleOnloadHook, method: methods = 'readAsText') => {
    const reader = new FileReader()
    reader.onload = e => {
        let result = e.target?.result as string;
        handleOnload(result)
    }
    reader[method](file)

}
