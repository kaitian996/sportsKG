<template>
    <main class="text-annotation">
        <!-- 头部 -->
        <header class="annotation-header">
            <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item :to="{ path: '/annotation' }"
                    >项目管理</el-breadcrumb-item
                >
                <el-breadcrumb-item
                    :to="{ path: `/projectDetail`, query: { pID } }"
                    >{{ currentProject.name }}</el-breadcrumb-item
                >
                <el-breadcrumb-item>{{
                    currentProject.data[tID].fileName
                }}</el-breadcrumb-item>
                <el-breadcrumb-item>标注</el-breadcrumb-item>
            </el-breadcrumb>
        </header>
        <!-- 中间 -->
        <section class="annotation-content">
            <!-- 左右菜单开关 -->
            <div
                class="left-open"
                v-show="!leftOpen"
                @click="leftOpen = !leftOpen"
            >
                <svg
                    width="22"
                    height="22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M13.5 12.732c1.333-.77 2-1.155 2-1.732s-.667-.962-2-1.732l-2.25-1.3c-1.333-.769-2-1.154-2.5-.865-.5.288-.5 1.058-.5 2.598v2.598c0 1.54 0 2.31.5 2.598.5.289 1.167-.096 2.5-.866l2.25-1.299z"
                        fill="currentColor"
                    ></path>
                </svg>
            </div>
            <div
                class="right-open"
                v-show="!rightOpen"
                @click="rightOpen = !rightOpen"
            >
                <svg
                    width="22"
                    height="22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M9.417 12.552c-1.334-.77-2-1.154-2-1.732 0-.577.666-.962 2-1.732l2.25-1.299c1.333-.77 2-1.155 2.5-.866.5.289.5 1.059.5 2.598v2.598c0 1.54 0 2.31-.5 2.598-.5.289-1.167-.096-2.5-.866l-2.25-1.299z"
                        fill="currentColor"
                    ></path>
                </svg>
            </div>
            <!-- 左侧标注数据 -->
            <div class="data-label-area" :class="leftOpen ? '' : 'data-close'">
                <div class="data-header">
                    <!-- 描述 -->
                    <div class="data-desc">
                        <div class="title">标注实体</div>
                        <div class="tooltip" @click="leftOpen = !leftOpen">
                            <svg
                                width="22"
                                height="22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9.417 12.552c-1.334-.77-2-1.154-2-1.732 0-.577.666-.962 2-1.732l2.25-1.299c1.333-.77 2-1.155 2.5-.866.5.289.5 1.059.5 2.598v2.598c0 1.54 0 2.31-.5 2.598-.5.289-1.167-.096-2.5-.866l-2.25-1.299z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                        </div>
                    </div>
                    <div class="data-order"></div>
                </div>
                <el-table
                    :data="computedAnnotationData.labels"
                    style="width: 100%"
                    height="80vh"
                    stripe
                >
                    <el-table-column
                        label="标签名称"
                        min-width="50"
                        show-overflow-tooltip
                    >
                        <template #default="scope">
                            {{
                                computedAnnotationData.labelCategories.find(
                                    (item) =>
                                        item.id === Number(scope.row.categoryId)
                                )?.text
                            }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="标签内容"
                        min-width="50"
                        show-overflow-tooltip
                    >
                        <template #default="scope">
                            {{
                                computedAnnotationData.content.slice(
                                    scope.row.startIndex,
                                    scope.row.endIndex
                                )
                            }}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 中间标注区域 -->
            <div class="annotator-area">
                <!-- 头部标签域 -->
                <div class="tags-box-area">
                    <!-- auto key -->
                    <div class="view-tags">
                        <div
                            class="tag-item"
                            :style="`--color:green`"
                            @click="currentSelectLabel = String(item.text)"
                            v-for="(
                                item, index
                            ) in computedAnnotationTags.autoKey"
                        >
                            <div
                                class="tag-head"
                                :style="`--color:green`"
                            ></div>
                            <div
                                class="tag-content"
                                :style="`--color:#00800026`"
                            >
                                <span class="tag-text">{{ item.text }}</span>
                                <span class="tag-hotkey">{{
                                    keyboardMap["autoKey"][index].ref
                                }}</span>
                            </div>
                        </div>
                    </div>
                    <!-- singal key -->
                    <div class="view-tags">
                        <div
                            class="tag-item"
                            :style="`--color:${item.color}`"
                            @click="currentSelectLabel = Number(item.id)"
                            v-for="(
                                item, index
                            ) in computedAnnotationTags.labelCategories"
                        >
                            <div
                                class="tag-head"
                                :style="`--color:${item.color}`"
                            ></div>
                            <div
                                class="tag-content"
                                :style="`--color:${item.color + 26}`"
                            >
                                <span class="tag-text">{{ item.text }}</span>
                                <span class="tag-hotkey">{{
                                    keyboardMap["signalKey"][index].ref
                                }}</span>
                            </div>
                        </div>
                    </div>
                    <!-- conncetion key -->
                    <div class="view-tags">
                        <div
                            class="tag-item"
                            :style="`--color:orange`"
                            @click="currentSelectConnection = Number(item.id)"
                            v-for="(
                                item, index
                            ) in computedAnnotationTags.connectionCategories"
                        >
                            <div
                                class="tag-head"
                                :style="`--color:orange`"
                            ></div>
                            <div
                                class="tag-content"
                                :style="`--color:#ffa50026`"
                            >
                                <span class="tag-text">{{ item.text }}</span>
                                <span class="tag-hotkey">{{
                                    keyboardMap["connectKey"][index].ref
                                }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 标注内容域 -->
                <div class="content-box-area" ref="annotationContainer"></div>
            </div>
            <!-- 右侧关系区域 -->
            <div
                class="data-conncetion-area"
                :class="rightOpen ? '' : 'data-close'"
            >
                <div class="data-header">
                    <div class="data-desc">
                        <div class="tooltip" @click="rightOpen = !rightOpen">
                            <svg
                                width="22"
                                height="22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M13.5 12.732c1.333-.77 2-1.155 2-1.732s-.667-.962-2-1.732l-2.25-1.3c-1.333-.769-2-1.154-2.5-.865-.5.288-.5 1.058-.5 2.598v2.598c0 1.54 0 2.31.5 2.598.5.289 1.167-.096 2.5-.866l2.25-1.299z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                        </div>
                        <div class="title">标注三元组</div>
                    </div>
                    <div class="data-order"></div>
                </div>
                <el-table
                    :data="computedAnnotationData.connections"
                    style="width: 100%"
                    height="80vh"
                    stripe
                >
                    <el-table-column
                        label="起始实体"
                        min-width="50"
                        show-overflow-tooltip
                    >
                        <template #default="scope">
                            {{
                                computedAnnotationData.content.slice(
                                    computedAnnotationData.labels.find(
                                        (label) => label.id === scope.row.fromId
                                    )?.startIndex,
                                    computedAnnotationData.labels.find(
                                        (label) => label.id === scope.row.fromId
                                    )?.endIndex
                                )
                            }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="实体关系"
                        min-width="50"
                        show-overflow-tooltip
                    >
                        <template #default="scope">
                            {{
                                computedAnnotationData.connectionCategories.find(
                                    (item) =>
                                        item.id === Number(scope.row.categoryId)
                                )?.text
                            }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="终止实体"
                        min-width="50"
                        show-overflow-tooltip
                    >
                        <template #default="scope">
                            {{
                                computedAnnotationData.content.slice(
                                    computedAnnotationData.labels.find(
                                        (label) => label.id === scope.row.toId
                                    )?.startIndex,
                                    computedAnnotationData.labels.find(
                                        (label) => label.id === scope.row.toId
                                    )?.endIndex
                                )
                            }}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </section>
    </main>
</template>

<script lang="ts" setup>
import {
    ref,
    reactive,
    computed,
    watch,
    onMounted,
    nextTick,
    onUnmounted,
} from "vue"
import { useRoute } from "vue-router"
import { annotationProjectStore } from "@/store/annotationProject"
import { ArrowRight } from "@element-plus/icons-vue"
import { Annotator, Action } from "poplar-annotation"
import { useCreateAnnotationData } from "@/hooks/useCreateAnnotationData"
import { ElMessage } from "element-plus"
import { useElementResize, useWindowResize } from "@/hooks/useWindowResize"
import { useKeyToKeyboard } from "@/hooks/useKeyToKeyboard"
//路由参数
const useProjection = annotationProjectStore()
const pID = Number(useRoute().query.pID)
const tID = Number(useRoute().query.tID)
const currentProject = useProjection.annotationProject[pID]
const currentTask = currentProject.data[tID]
//左右侧菜单展开
const leftOpen = ref(true)
const rightOpen = ref(true)
//tags列表
const computedAnnotationTags = computed(() => {
    return {
        autoKey: currentProject.autoKey,
        labelCategories: currentProject.labelCategories,
        connectionCategories: currentProject.connectionCategories,
    }
})
//增加标注功能
const keyboardMap = {
    autoKey: useKeyToKeyboard(computedAnnotationTags.value.autoKey!, "autoKey"),
    signalKey: useKeyToKeyboard(
        computedAnnotationTags.value.labelCategories,
        "signalKey"
    ),
    connectKey: useKeyToKeyboard(
        computedAnnotationTags.value.connectionCategories,
        "connectKey"
    ),
}
onMounted(() => {
    window.addEventListener("keyup", (e: KeyboardEvent) => {
        const key = e.key
        const autokey = keyboardMap.autoKey.find((item) => item.ref === key)
        if (autokey) {
            currentSelectLabel.value = autokey.value
            return
        }
        const signalkey = keyboardMap.signalKey.find((item) => item.ref === key)
        if (signalkey) {
            currentSelectLabel.value = signalkey.value
            return
        }
        const connectkey = keyboardMap.connectKey.find(
            (item) => item.ref === key
        )
        if (connectkey) {
            currentSelectConnection.value = connectkey.value as number
        }
    })
})
//标注功能
const annotationContainer = ref<HTMLElement>()
let annotator: Annotator
const computedAnnotationData = computed(() => {
    return useCreateAnnotationData(
        currentTask.fileContent,
        currentProject.labelCategories,
        currentProject.connectionCategories,
        currentTask.labels,
        currentTask.connections
    )
})
const registerAnnotator = () => {
    if (annotator) {
        annotator.remove()
    }
    annotator = new Annotator(
        computedAnnotationData.value,
        annotationContainer.value as HTMLElement,
        { contentEditable: false }
    )
    //标签增加删除
    annotator.on("textSelected", (startIndex: number, endIndex: number) => {
        currentSelectLabel.value = -1
        textSelector.startIndex = startIndex
        textSelector.endIndex = endIndex
    })
    annotator.on("labelRightClicked", (id: number) => {
        annotator.applyAction(Action.Label.Delete(id))
        currentTask.labels = annotator.store.json.labels
    })
    //关系增加删除
    annotator.on("twoLabelsClicked", (fromId: number, toId: number) => {
        labelSelector.fromId = fromId
        labelSelector.toId = toId
    })
    annotator.on("connectionRightClicked", (id: number) => {
        annotator.applyAction(Action.Connection.Delete(id))
        currentTask.labels = annotator.store.json.labels
    })
}
onMounted(() => {
    registerAnnotator()
})
//标签标注
const textSelector = reactive({
    startIndex: -1,
    endIndex: -1,
})
const currentSelectLabel = ref<number | string>(-1)
watch(currentSelectLabel, (newValue) => {
    if (typeof newValue === "number") {
        if (
            newValue !== -1 &&
            textSelector.startIndex !== -1 &&
            textSelector.endIndex !== -1
        ) {
            //只有在三者不为初始条件时，才增加
            if (annotator) {
                //防止跨段落标注
                const text = computedAnnotationData.value.content.slice(
                    textSelector.startIndex,
                    textSelector.endIndex
                )
                if (text.includes("\r")) {
                    ElMessage.error("禁止跨段落标注")
                    return
                }
                annotator.applyAction(
                    Action.Label.Create(
                        currentSelectLabel.value as number,
                        textSelector.startIndex,
                        textSelector.endIndex
                    )
                )
                currentTask.labels = annotator.store.json.labels
            }
        }
    } else if (typeof newValue === "string") {
        if (textSelector.startIndex !== -1 && textSelector.endIndex !== -1) {
            const { begin, inner, end } =
                computedAnnotationTags.value.autoKey?.find(
                    (item) => item.text === newValue
                )!

            if (annotator) {
                const text = computedAnnotationData.value.content.slice(
                    textSelector.startIndex,
                    textSelector.endIndex
                )
                if (text.includes("\r")) {
                    ElMessage.error("禁止跨段落标注")
                    return
                }
                //增加头
                annotator.applyAction(
                    Action.Label.Create(
                        begin,
                        textSelector.startIndex,
                        textSelector.startIndex + 1
                    )
                )
                //增加中间
                annotator.applyAction(
                    Action.Label.Create(
                        inner,
                        textSelector.startIndex + 1,
                        textSelector.endIndex - 1
                    )
                )
                //增加尾
                annotator.applyAction(
                    Action.Label.Create(
                        end,
                        textSelector.endIndex - 1,
                        textSelector.endIndex
                    )
                )
                currentTask.labels = annotator.store.json.labels
            }
        }
    }
    //重置状态
    currentSelectLabel.value = -1
    textSelector.startIndex = -1
    textSelector.endIndex = -1
})
//关系标注
const labelSelector = reactive({
    fromId: -1,
    toId: -1,
})
const currentSelectConnection = ref(-1)
watch(currentSelectConnection, (newValue) => {
    if (
        newValue !== -1 &&
        labelSelector.fromId !== -1 &&
        labelSelector.toId !== -1
    ) {
        //只有在三者不为初始条件时，才增加
        if (annotator) {
            annotator.applyAction(
                Action.Connection.Create(
                    currentSelectConnection.value,
                    labelSelector.fromId,
                    labelSelector.toId
                )
            )
            currentTask.connections = annotator.store.json.connections
        }
        //重置状态
        currentSelectConnection.value = -1
        labelSelector.fromId = -1
        labelSelector.toId = -1
    }
})

//左右菜单改变时需要重新注册
watch([leftOpen, rightOpen], () => {
    console.log("reload")
    nextTick(registerAnnotator)
})

//离开页面，更新时间
onUnmounted(() => {
    const nowDate = new Date()
    const date = `${nowDate.getFullYear()}-${
        nowDate.getMonth() + 1
    }-${nowDate.getDate()} ${nowDate.getHours()}:${nowDate.getMinutes()}`
    currentTask.changeDate = date
})
</script>

<style scoped lang="less">
.text-annotation {
    height: 100vh;
    .annotation-header {
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        box-sizing: border-box;
        padding: 0 2%;
        background: #fff;
    }
    .annotation-content {
        display: flex;
        justify-content: flex-start;
        box-sizing: border-box;
        position: relative;
        .left-open,
        .right-open {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 24px;
            height: 20%;
            top: 50%;
            transform: translateY(-50%);
            border-radius: 0 4px 4px 0;
            background: rgba(65, 60, 74, 0.08);
            transition: all 0.5 ease-in;
            cursor: pointer;

            svg {
                color: #898098;
            }
            &:hover {
                background-color: rgba(9, 109, 217, 0.16);
            }
        }
        .left-open {
            left: 0;
        }
        .right-open {
            right: 0;
        }
        .data-label-area {
            box-sizing: border-box;
            height: calc(100vh - 50px);
            overflow: auto;
            width: 200px;
            border-right: 1px solid rgba(0, 0, 0, 0.1);
            .data-header {
                height: 50px;
                .data-desc {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 4px 0 4px 12px;
                    background-color: #f2f2f2;
                    color: rgba(0, 0, 0, 0.5);
                    font-size: 13px;
                    font-weight: 700;
                    .title,
                    .tooltip {
                        flex: none;
                        cursor: pointer;
                    }
                    .tooltip {
                        &:hover {
                            background-color: rgba(9, 109, 217, 0.16);
                        }
                        position: relative;
                        svg {
                            position: relative;
                            top: 2px;
                        }
                    }
                }
            }
        }

        .annotator-area {
            flex: 1;
            height: calc(100vh - 50px);
            margin: 0 25px;
            .tags-box-area {
                min-height: 100px;
                max-height: 200px;
                overflow: auto;
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                .view-tags {
                    display: flex;
                    flex-wrap: wrap;
                    margin: 15px 0;
                    .tag-item {
                        border-radius: 3px;
                        display: flex;
                        margin: 0 8px 8px 0;
                        cursor: pointer;
                        &:hover {
                            background: var(--color);
                            border-radius: 4px;
                        }
                        .tag-head {
                            width: 3px;
                            background: var(--color);
                            border-radius: 3px 0 0 3px;
                        }
                        .tag-content {
                            background: var(--color);
                            padding: 0 5px;
                            border-radius: 0 4px 4px 0;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            .tag-text {
                                flex: 1;
                                min-width: 60px;
                                margin-right: 5px;
                            }
                            .tag-hotkey {
                                color: rgba(0, 0, 0, 0.4);
                            }
                        }
                    }
                }
            }
            .content-box-area {
                height: 500px;
                max-height: 500px;
                overflow: auto;
                background-color: #fafafa;
                margin-top: 20px;
                & > svg {
                    width: 100%;
                }
            }
        }
        .data-conncetion-area {
            width: 300px;
            border-left: 1px solid rgba(0, 0, 0, 0.1);
            height: calc(100vh - 50px);
            overflow: auto;
            box-sizing: border-box;

            .data-header {
                height: 50px;
                .data-desc {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 4px 12px 4px 0;
                    background-color: #f2f2f2;
                    color: rgba(0, 0, 0, 0.5);
                    font-size: 13px;
                    font-weight: 700;
                    .title,
                    .tooltip {
                        flex: none;
                        cursor: pointer;
                    }
                    .tooltip {
                        &:hover {
                            background-color: rgba(9, 109, 217, 0.16);
                        }
                        position: relative;
                        svg {
                            position: relative;
                            top: 2px;
                        }
                    }
                }
            }
        }
        .data-close {
            width: 0;
        }
    }
}
</style>
