<template>
    <div class="footer-container">
        <footer class="footer-warpper">
            <ul class="footer-item">
                <li>资源</li>
                <li> <a href="#/struct-data" target="">知识图谱</a>
                </li>
                <li><a href="#/data-analysis" target="">数据标注</a></li>
                <li><a href="#/data-analysis" target="">数据管理</a></li>
                <li><a href="#/document" target="">文档</a></li>
            </ul>
            <ul class="footer-item">
                <li>帮助</li>
                <li>文档</li>
                <li>
                    <a href="https://github.com/suanzi-yi/Struct-Data-Analyse-System.git" target="_blank">
                        <svg t="1657152865382" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="3109" height="16px">
                            <path
                                d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9 23.5 23.2 38.1 55.4 38.1 91v112.5c0.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"
                                p-id="3110" fill="#fff"></path>
                        </svg>
    
                        GitHub Issues</a>
                </li>
            </ul>
            <ul class="footer-item">
                <li>联系我们</li>
                <li>地址:北京市海淀区信息路48号北京体育大学</li>
                <li>电话:010 62989496</li>
                <li>邮编:3306</li>
            </ul>
        </footer>
        <div class="beian">
            京ICP备2022028231号
        </div>
    </div>
</template>
 
 
<script lang='ts' setup>
import { ref, reactive } from 'vue'


</script>
 
<style scoped lang="less">
.footer-container{
    background-color: rgba(0, 0, 0, 0.9);
}
.footer-warpper {
    display: flex;
    justify-content: space-evenly;
    padding-top: 5%;
    .footer-item {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 25%;
        padding-left: 20px;

        li {

            text-align: center;
            margin: 12px 0;
            font-size: 14px;
            line-height: 1.5;
            color: #fff;

            &:first-child {
                color: #fff;
                margin-bottom: 24px;
                font-size: 18px;
                font-weight: 500;
            }

            &:hover:not(&:first-child) {
                color: #0069c2;
            }

        }

        .icon {
            vertical-align:middle;
            margin-right: 2px;
        }
    }
}
.beian{
    &::before{
        content: "";
        height:1px;
        width: 95%;
        background: #fff;
        display: block;
        margin:0 auto;
        margin-bottom: 10px;
    }
    text-align: center;
    padding-top: 10px;
    min-height:60px;
}
</style>