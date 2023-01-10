<template>
    <main class="annotation-project-container">
        <!-- 头部的条 -->
        <div class="project-header">
            <!-- 左侧 -->
            <div class="left">
                <div class="title">项目</div>
            </div>
            <!-- 右侧 -->
            <div class="right">
                <el-button type="primary" @click="createAnnotationProject"
                    >创建项目</el-button
                >
            </div>
        </div>
        <!-- 项目主体 -->
        <div class="project-content">
            <!-- 项目主体卡片 -->
            <div
                class="project-item"
                @click="toDetail(index)"
                v-for="(item, index) in projectStore.annotationProject"
            >
                <!-- 上部 -->
                <div class="top-content">
                    <div class="item-title">
                        <div class="item-name">
                            {{ item.name }}
                        </div>
                        <div
                            class="item-btn"
                            :class="
                                openMenuIndex === index ? 'item-btn-active' : ''
                            "
                            @click.stop="openMenu(index)"
                        >
                            <el-icon size="20px"><MoreFilled /></el-icon>
                        </div>
                        <div
                            class="btn-container"
                            v-if="openMenuIndex === index"
                        >
                            <div class="btn" @click.stop="toSetting(index)">
                                项目设置
                            </div>
                        </div>
                    </div>
                    <div class="item-info">
                        <div class="info-task">
                            {{
                                item.data.filter(
                                    (data) => data.state !== "pending"
                                ).length
                            }}
                            /
                            {{ item.data.length }}
                        </div>
                        <div class="info-detail">
                            <div class="detail-item">
                                <svg
                                    width="12"
                                    height="9"
                                    viewBox="0 0 12 9"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    tag="[object Object]"
                                    color="#64bf00"
                                >
                                    <path
                                        d="M2 4l3 3 5-5"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="square"
                                    ></path>
                                </svg>
                                {{
                                    item.data.filter(
                                        (data) => data.state === "resolve"
                                    ).length
                                }}
                            </div>
                            <div class="detail-item">
                                <svg
                                    width="10"
                                    height="2"
                                    viewBox="0 0 10 2"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    tag="[object Object]"
                                    color="red"
                                >
                                    <path
                                        opacity="0.9"
                                        d="M1 1h8"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="square"
                                    ></path>
                                </svg>
                                {{
                                    item.data.filter(
                                        (data) => data.state === "reject"
                                    ).length
                                }}
                            </div>
                            <div class="detail-item">
                                <svg
                                    width="10"
                                    height="12"
                                    viewBox="0 0 10 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    tag="[object Object]"
                                    color="#07f"
                                >
                                    <path
                                        opacity="0.9"
                                        d="M4 11h2M3 8c0-2-1.5-2.5-1.5-4s1-3 3.5-3 3.5 1.5 3.5 3S7 6 7 8"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="square"
                                    ></path>
                                </svg>
                                {{
                                    item.data.filter(
                                        (data) => data.state === "pending"
                                    ).length
                                }}
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 下部 -->
                <div class="buttom-content">
                    <div class="item-description">
                        {{ item.description }}
                    </div>
                    <div class="item-date">
                        {{ item.date }}
                    </div>
                </div>
            </div>
        </div>
        <el-empty
            description="暂无项目,请点击右上角创建项目"
            v-if="projectStore.annotationProject.length === 0"
        />
        <!-- 创建项目的遮罩层 -->
        <CreateProject></CreateProject>
    </main>
</template>

<script lang="ts" setup>
import CreateProject from "./CreateProject.vue"
import { More, MoreFilled } from "@element-plus/icons-vue"
import { ref, reactive, provide } from "vue"
import { annotationProjectStore } from "@/store/annotationProject"
import { useRouter } from "vue-router"
import { ElNotification } from "element-plus"
const projectStore = annotationProjectStore()
const openDialog = ref<boolean>(false)
provide("openDialog", openDialog)
const createAnnotationProject = () => {
    openDialog.value = true
}
//打开项目菜单
const openMenuIndex = ref<number>(-1)
const openMenu = (index: number) => {
    if (openMenuIndex.value === index) {
        openMenuIndex.value = -1
    } else {
        openMenuIndex.value = index
    }
}
document.addEventListener("click", () => {
    openMenuIndex.value = -1
})
const router = useRouter()
const toDetail = (index: number) => {
    router.push(`/projectDetail?pID=${index}`)
}
const toSetting = (index: number) => {
    openMenuIndex.value = -1
    router.push(`/projectSetting?pID=${index}`)
}
</script>

<style scoped lang="less">
.annotation-project-container {
    // background: #bfa;
    background: #f7f7f7;
    height: 100vh;
    overflow: auto;
    box-sizing: border-box;
}

.project-header {
    position: sticky;
    top: 0;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    padding: 0 2%;
    background: #fff;
    .left {
        .title {
            font-size: 18px;
            font-weight: 500;
        }
    }
}

.project-content {
    display: flex;
    justify-content: flex-start;
    padding: 2% 4%;
    flex-wrap: wrap;
    margin: 0 auto;
    max-height: calc(100% - 50px);
    overflow: auto;
    .project-item {
        margin: 1% 1%;
        height: 150px;
        width: 300px;
        border-radius: 3px;
        transition: all 0.3s ease-in-out;
        background: #fff;
        box-sizing: border-box;
        padding: 1%;
        background: #fff;
        border-radius: 4px;
        box-shadow: 0 1px 2px rgb(0 0 0 / 15%);

        .top-content {
            height: 60px;
            border-bottom: solid 1px #dcdfe6;

            .item-title {
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;
                position: relative;
                margin-bottom: 5px;
                .item-name {
                    width: 80%;
                    overflow: hidden;
                    flex: none;
                    font-size: 16px;
                    font-weight: 500;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .item-btn {
                    width: 38px;
                    height: 24px;
                    flex: none;
                    text-align: center;
                    box-sizing: border-box;
                    border-radius: 5px;
                    // vertical-align: middle;
                    position: relative;
                    opacity: 0.5;
                    &:hover {
                        box-shadow: 0 2px 4px rgb(0 0 0 / 5%),
                            inset 0 -1px 0 rgb(0 0 0 / 10%),
                            inset 0 0 0 1px rgb(0 0 0 / 20%);
                    }
                    i {
                        vertical-align: middle;
                        position: relative;
                        top: -2px;
                    }
                }
                .item-btn-active {
                    box-shadow: 0 2px 4px rgb(0 0 0 / 5%),
                        inset 0 -1px 0 rgb(0 0 0 / 10%),
                        inset 0 0 0 1px rgb(0 0 0 / 20%);
                }

                .btn-container {
                    position: absolute;
                    font-size: 16px;
                    z-index: 2;
                    background: #fff;
                    right: 40px;
                    top: 0;
                    box-sizing: border-box;
                    box-shadow: 0 5px 20px rgb(0 0 0 / 20%);
                    font-family: Roboto;
                    border-radius: 4px;
                    .btn {
                        height: 48px;
                        line-height: 48px;
                        cursor: pointer;
                        padding: 0 13px;
                        text-align: center;
                        box-sizing: border-box;
                        color: rgba(0, 0, 0, 0.6);
                        &:hover {
                            background: #dcdfe6;
                            color: rgba(0, 0, 0, 0.9);
                        }
                    }
                }
            }
            .item-info {
                display: flex;
                align-items: center;
                justify-content: space-between;
                .info-task {
                    opacity: 0.6;
                }
                .info-detail {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .detail-item:not(:last-child) {
                        margin-right: 16px;
                        display: flex;
                        align-items: center;
                        svg {
                            margin-right: 10px;
                            flex: none;
                        }
                    }
                }
            }
        }

        .buttom-content {
            position: relative;
            box-sizing: border-box;
            max-height: 90px;
            color: rgba(0, 0, 0, 0.4);

            .item-description {
                box-sizing: border-box;
                padding: 2% 0;
                height: 40px;
                font-size: 16px;
                overflow: hidden;
            }
        }
    }
}
</style>
