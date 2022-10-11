/**
 * 
 * @param content 导出内容一维数组
 * @param name 导出名字
 */
export const useDownloadEntity = (content: { id: number; text: string; type: string; start: number }[], name: string) => {
        // 排序
        const sortArray = content.sort((a, b) => a.start - b.start)
        let temp: string[] = sortArray.map((item) => {
                return item.text + ' ' + item.type + '\n'
        })
        const blob = new Blob(temp, { type: 'text/plain,charset=UTF-8' });
        const downloadElement = document.createElement('a');
        // 创建下载链接
        const href = window.URL.createObjectURL(blob);
        downloadElement.href = href;
        // 下载文件名
        downloadElement.download = `${name}.txt`;
        document.body.appendChild(downloadElement);
        downloadElement.click();
        // 移除元素
        document.body.removeChild(downloadElement);
        // 释放blob对象
        window.URL.revokeObjectURL(href);
}
/**
 * 
 * @param content 导出内容一维数组
 * @param name 导出名字
 */
export const useDownloadConnection = (content: { id: number; start: string; connection: string; end: string }[], name: string) => {
        let temp: string[] = content.map((item) => {
                return item.start + ' ' + item.connection + ' ' + item.end + '\n'
        })
        const blob = new Blob(temp, { type: 'text/plain,charset=UTF-8' });
        const downloadElement = document.createElement('a');
        // 创建下载链接
        const href = window.URL.createObjectURL(blob);
        downloadElement.href = href;
        // 下载文件名
        downloadElement.download = `${name}.txt`;
        document.body.appendChild(downloadElement);
        downloadElement.click();
        // 移除元素
        document.body.removeChild(downloadElement);
        // 释放blob对象
        window.URL.revokeObjectURL(href);
}