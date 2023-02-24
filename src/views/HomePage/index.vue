<template>
    <main class="home-page-container">
        <!-- 中间图片 -->
        <section class="image-container">
            <!-- 头部组件 -->
            <Header isWhiteImage :isWhiteText="'#0069c2'"></Header>
            <!-- 功能区介绍 -->
            <ul class="top-show-warpper">
                <li class="icon-item">
                    <svg t="1665320495391" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="7170" width="50" height="50">
                        <path
                            d="M851.456 588.288c-13.312 0-25.6 2.048-37.888 5.12l-90.112-155.648 55.296-31.744c18.944 17.92 44.032 29.184 72.192 29.184 57.344 0 103.936-46.592 103.936-103.936s-46.592-103.936-103.936-103.936c-57.344 0-103.936 46.592-103.936 103.936 0 5.12 0.512 10.24 1.536 15.36l-58.368 33.792-82.944-143.872c26.112-25.088 41.984-59.904 41.984-98.816 0-75.776-61.44-137.216-137.216-137.216s-137.216 61.44-137.216 137.216c0 38.912 15.872 73.728 41.984 98.816l-84.992 146.944-56.832-32.768c1.024-6.144 2.048-12.8 2.048-19.456 0-57.344-46.592-103.936-103.936-103.936-57.344 0-103.936 46.592-103.936 103.936s46.592 103.936 103.936 103.936c26.624 0 51.2-10.24 69.12-26.624l56.32 32.768-88.064 152.576c-11.776-3.584-24.576-5.12-37.888-5.12-75.776 0-137.216 61.44-137.216 137.216s61.44 137.216 137.216 137.216c64.512 0 118.272-44.544 133.12-103.936h173.056v61.44c-40.96 13.824-70.656 52.736-70.656 98.816 0 57.344 46.592 103.936 103.936 103.936s103.936-46.592 103.936-103.936c0-46.08-29.696-84.48-70.656-98.816v-61.44h173.056c14.848 59.904 69.12 103.936 133.12 103.936 75.776 0 137.216-61.44 137.216-137.216s-61.44-137.728-137.216-137.728z m-410.112-450.048c0-38.912 31.744-70.656 70.656-70.656s70.656 31.744 70.656 70.656c0 13.824-4.096 26.624-10.752 37.376-12.288 19.456-33.28 32.256-57.856 33.28h-5.12c-24.576-1.024-45.568-13.824-57.856-33.28-6.144-10.752-9.728-24.064-9.728-37.376z m32.768 132.096c11.776 3.584 24.576 5.12 37.888 5.12s25.6-2.048 37.888-5.12l82.944 143.872-124.416 72.192-118.784-68.608 84.48-147.456z m-301.568 526.336c-38.912 0-70.656-31.744-70.656-70.656 0-38.912 31.744-70.656 70.656-70.656h2.56c24.576 1.024 45.568 13.824 57.856 33.28 1.024 1.536 1.536 2.56 2.56 4.096 5.12 9.728 8.192 20.992 8.192 33.28 0 11.776-3.072 23.552-8.192 33.28-12.288 22.016-35.84 37.376-62.976 37.376z m133.12-103.936c-6.144-25.6-19.456-48.128-37.888-65.536l88.064-152.576 122.88 70.656v146.944h-173.056z m239.616-151.552l120.832-69.632 90.112 155.648c-18.432 17.408-31.744 39.936-37.888 65.536h-173.056v-151.552z m306.176 255.488c-27.136 0-50.688-15.36-62.464-37.376-5.12-9.728-8.192-21.504-8.192-33.28 0-12.288 3.072-23.552 8.192-33.28 0.512-1.536 1.536-3.072 2.56-4.096 12.288-19.456 33.28-32.768 57.856-33.28h2.56c38.912 0 70.656 31.744 70.656 70.656-0.512 38.912-32.256 70.656-71.168 70.656z"
                            p-id="7171" fill="#fff"></path>
                    </svg>
                    <div class="description">
                        知识图谱
                    </div>
                </li>

                <li class="icon-item">
                    <svg t="1665318551446" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="4658" width="50" height="50">
                        <path
                            d="M482.728585 789.528976L860.55961 411.598049c1.698341-1.698341 2.497561-3.996098 2.297756-6.293854l-25.475122-301.105951c-0.699317-7.79239-6.793366-13.886439-14.585756-14.585756L521.690537 64.237268c-2.297756-0.199805-4.695415 0.599415-6.293854 2.297756L137.565659 444.366049c-3.096976 3.096976-3.096976 8.192 0 11.288975l333.873951 333.873952c3.096976 3.196878 8.192 3.196878 11.288975 0z m62.538927-651.064196l224.380878 18.981464 18.981464 224.380878L477.034146 693.322927 233.671805 450.060488l311.595707-311.595708z m60.100308 186.044317a47.953171 47.953171 0 1 0 67.813776-67.816773 47.953171 47.953171 0 1 0-67.813776 67.816773zM888.832 539.273366l-39.561366-39.461464c-3.096976-3.096976-8.192-3.096976-11.288975 0l-361.64683 360.947513-237.368195-236.768781c-3.096976-3.096976-8.192-3.096976-11.288975 0l-39.561366 39.461464c-3.096976 3.096976-3.096976 8.192 0 11.288975l242.962731 242.563122 39.561366 39.461464c3.096976 3.096976 8.192 3.096976 11.288976 0l406.902634-406.203318c3.096976-3.096976 3.096976-8.192 0-11.288975z"
                            p-id="4659" fill="#fff"></path>
                    </svg>
                    <div class="description">
                        数据标注
                    </div>
                </li>

                <li class="icon-item">
                    <svg t="1665318607422" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="6462" width="50" height="50">
                        <path
                            d="M512.064 824.192c-208.192 0-376.896-57.984-376.896-129.472L134.784 694.72l0 203.008L135.04 897.728C140.16 967.744 306.752 1024 511.68 1024c204.992 0 371.584-56.256 376.64-126.272l0.832 0 0-203.008-0.32 0C888.96 766.208 720.192 824.192 512.064 824.192z"
                            p-id="6463" fill="#fff"></path>
                        <path
                            d="M512.064 545.152c-208.192 0-376.896-57.984-376.896-129.472L134.784 415.68l0 203.008L135.04 618.688c5.056 70.016 171.712 126.272 376.64 126.272 204.992 0 371.584-56.256 376.64-126.272l0.832 0L889.152 415.616l-0.32 0C888.96 487.104 720.192 545.152 512.064 545.152z"
                            p-id="6464" fill="#fff"></path>
                        <path
                            d="M888.96 128.832c0 0.128-0.064 0.192-0.064 0.32C888.384 57.728 719.872 0 512.064 0S135.616 57.728 135.168 129.152c0-0.128-0.064-0.192-0.064-0.32L134.784 128.832l0 203.008L135.04 331.84C140.16 401.92 306.752 458.112 511.68 458.112c204.992 0 371.584-56.256 376.64-126.272l0.832 0L889.152 128.832 888.96 128.832zM512.064 219.456c-155.264 0-281.152-43.264-281.152-96.576s125.888-96.576 281.152-96.576c155.2 0 281.088 43.264 281.088 96.576C793.152 176.192 667.264 219.456 512.064 219.456z"
                            p-id="6465" fill="#fff"></path>
                    </svg>
                    <div class="description">
                        数据存储
                    </div>
                </li>
            </ul>
            <!-- 文字区 -->
            <div class="description-warpper">
                <div class="left-icon">

                </div>
                <div class="right-text">
                    <div class="title">
                        SportsKG
                    </div>
                    <div class="des">
                        体育知识图谱开放平台
                    </div>
                </div>
            </div>
        </section>

        <!-- 功能区 -->
        <section class="ablity-container">
            <!-- 卡片总容器 -->
            <div class="left-card-container">
                <div class="card-title">
                    平台特性
                </div>
                <!-- 卡片容器 -->
                <div class="left-card-warpper" @mouseenter="changeShow(0)">
                    <div class="card-box">
                        <div class="left-card-item">
                            <div class="title">
                                知识图谱查询
                            </div>
                            <div class="content">
                                提供知识图谱搜索引擎、查询、分析、可视化知识图谱
                                快速查询数据、知识图谱可视化、多维度分析与比较、数据关系简明易见。
                            </div>
                        </div>
                        <div class="left-card-item">

                        </div>
                    </div>
                </div>
                <div class="left-card-warpper" @mouseenter="changeShow(1)">
                    <div class="card-box">
                        <div class="left-card-item">
                            <div class="title">
                                数据标注
                            </div>
                            <div class="content">
                                提供数据标注平台、支持实体标注、关系标注、实体抽取、三元组导入导出、文件上传。
                            </div>
                        </div>
                        <div class="left-card-item">2</div>
                    </div>
                </div>
                <div class="left-card-warpper" @mouseenter="changeShow(2)">
                    <div class="card-box">
                        <div class="left-card-item">
                            <div class="title">
                                数据存储
                            </div>
                            <div class="content">
                                提供数据存储、一键连接数据库、neo4j、mysql,文件标注结果可一键上传，方便下次使用，登录查询已保存数据集。
                            </div>
                        </div>
                        <div class="left-card-item">2</div>
                    </div>
                </div>
            </div>
            <div class="right-description-container">
                <div class="description-title">
                    资源描述
                </div>
                <!-- 描述容器 -->
                <div class="right-description-warpper">
                    <div v-if="showIndex==0" class="description-item">
                        <div class="des-title">
                            知识图谱
                        </div>
                        <div class="des-content">
                            <strong>知识图谱（Knowledge Graph）</strong>，在图书、情报界称为知识域、可视化或知识领域
                            映射地图，是显示知识发展进程与结构关系的一系列各种不同的图形，用可视化技术描述
                            知识资源及其载体，挖掘、分析、构建 、绘制和显示知识及它们之间的相互联系。
                            <br>
                            <strong>中文名</strong>: 知识图谱
                            <br>
                            <strong>别称</strong>: 科学知识图谱
                            <br>
                            <strong>外文名</strong>: Knowledge Graph/Vault
                            <br>
                            <strong>应用</strong>: 理论与方法与计量学引文分析
                        </div>
                        <div class="des-btn">

                        </div>
                    </div>
                    <div v-if="showIndex==1" class="description-item">
                        <div class="des-title">
                            数据标注
                        </div>
                        <div class="des-content">
                            <strong>实体抽取</strong>，又称命名实体识别（Named Entities Recognition，NER），
                            主要任务是识别命名实体的文本范围，
                            并将其分类为预定义的类别，
                            学术上所涉及一般包含三大类，<strong>实体类、时间类、数字类</strong>和7个小类，
                            比如<strong>人、地名、时间、组织、日期、货币、百分比</strong>，是问答系统、翻译系统、知识图谱的基础，早期的NER的方法主要由语言学家手工构造规则模板，选用特定特征，包括统计信息、标点符号、指示词、方向词、中心词等，以模式与字符串相匹配为主要手段，但是此方法需要大量人力构建语言模型、系统周期较长、知识更新较慢、移植性较差。
                        </div>
                        <div class="des-btn">

                        </div>
                    </div>
                    <div v-if="showIndex==2 " class="description-item">
                        <div class="des-title">
                            数据存储
                        </div>
                        <div class="des-content">
                            <strong>数据存储对象</strong>包括数据流在加工过程中产生的临时文件或加工过程中需要查找的信息。数据以某种格式记录在计算机内部或外部存储介质上。数据存储要命名，这种命名要反映信息特征的组成含义。数据流反映了系统中流动的数据，表现出动态数据的特征；数据存储反映系统中静止的数据，表现出静态数据的特征。
                            <br><strong>中文名:</strong>数据存储
                            <br><strong>作用:</strong>反映系统中静止的数据
                            <br><strong>外文名:</strong>Data storage
                            <br><strong>领域:</strong>信息科学
                        </div>
                        <div class="des-btn">

                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- 底部 -->
        <Footer></Footer>
    </main>
</template>
 
 
<script lang='ts' setup>
import Header from '@/components/Header/index.vue'
import Footer from '@/components/Footer/index.vue'

import { ref, reactive } from 'vue'
const showIndex = ref<number>(0)
const changeShow = (index: number) => {
    showIndex.value = index
}


</script>
 
<style scoped lang="less">
.home-page-container {
    color: #fff;
}

.image-container {

    height: 750px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url('./image/bg2.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 60%;

    //功能按钮
    .top-show-warpper {
        display: flex;
        margin: 8% 0 3% 0;
        box-sizing: border-box;
        width: 100%;
        justify-content: center;
        align-items: center;

        .icon-item {
            display: flex;
            height: 70px;
            width: 70px;
            overflow: hidden;
            justify-content: flex-start;
            align-items: center;
            transition: width 0.5s ease-in-out;
            padding: 6px;
            border: 2px solid #fff;
            border-radius: 64px;
            box-sizing: border-box;
            margin-right: 2%;

            &:hover {
                width: 170px;
            }

            .icon {
                flex: none;
                margin-right: 20px;
                margin-left: 2px;
                text-align: center;
            }

            .description {
                flex: none;
                font-size: 18px;
                font-weight: 500;
                cursor: pointer;
            }
        }
    }

    //文字
    .description-warpper {

        .right-text {
            font-family: 'Lato', Verdana, Geneva, sans-serif;
            font-weight: 500;
            font-size: 2rem;
            letter-spacing: 1.5px;
            text-align: center;
            text-shadow: 4px 4px 2px black;

            .title {
                font-size: 2.5em;
            }

            .des {
                font-size: 1em;
            }
        }
    }

}

.ablity-container {
    color: rgb(0, 0, 0);
    background: #fff;
    padding: 0 5%;
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
    margin-bottom: 10%;

    .left-card-container {
        box-sizing: border-box;
        width: 50%;

        .card-title {
            font-size: 2em;
            color: rgb(53, 53, 53);
            margin-bottom: 0.8em;
            padding-bottom: 0.8em;
            border-bottom: 1px solid rgb(143, 143, 143);
        }

        .left-card-warpper {
            box-shadow: 0px 0px 0px 1px #d8d8d8;
            height: 200px;
            margin: 5% 0;
            overflow: hidden;

            .card-box {
                display: flex;
                height: 100%;
                transition: all 0.5s ease-out;
                box-sizing: border-box;

                .left-card-item {
                    flex: none;
                    height: 100%;
                    width: 100%;
                    box-sizing: border-box;
                    background: #fff;

                    //展示卡片
                    &:first-child {
                        border-right: 8px solid #0069c2;
                        padding: 2% 4%;
                        position: relative;

                        .title {
                            font-size: 25px;
                            font-weight: 500;
                        }

                        .content {
                            text-indent: 2em;
                            margin-top: 5%;
                        }
                    }

                    //滑动卡片
                    &:last-child {
                        border-left: 8px solid #0069c2;
                    }
                }
            }


            // &:hover {
            //     .card-box {
            //         transform: translateX(-100%);

            //         & .left-card-item {
            //             &:first-child {
            //                 border-right: none;
            //             }
            //         }
            //     }
            // }
        }
    }

    .right-description-container {
        box-sizing: border-box;
        width: 40%;

        .description-title {
            font-size: 2em;
            color: rgb(53, 53, 53);
            margin-bottom: 0.8em;
            padding-bottom: 0.8em;
            border-bottom: 1px solid rgb(143, 143, 143);
        }

        .right-description-warpper {
            box-shadow: 0 0 0 1px #d8d8d8;
            border-left: 8px solid #0069c2;

            @keyframes inout {
                0% {
                    opacity: 0;
                }

                50% {
                    opacity: .5;
                }

                100% {
                    opacity: 1;
                }
            }

            .description-item {
                display: flex;
                align-items: center;
                flex-direction: column;
                animation: 1s inout;
                padding-bottom: 0.8em;

                .des-title {
                    font-size: 25px;
                    color: rgb(53, 53, 53);
                    margin-bottom: 0.8em;
                    padding: 0.8em 0;
                    border-bottom: 1px solid rgb(143, 143, 143);
                }

                .des-content {
                    padding: 0 5%;
                    line-height: 30px;
                }
            }
        }
    }
}
</style>