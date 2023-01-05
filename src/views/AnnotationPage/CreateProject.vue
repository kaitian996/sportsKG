<template>
    <main class="create-project">
        <el-dialog
            v-model="openDialog"
            :close-on-click-modal="true"
            :show-close="false"
            width="95%"
            top="40px"
        >
            <!-- 头部 -->
            <template #header="{ close, titleId, titleClass }">
                <div class="step-warpper">
                    <div class="left-title">Create Project</div>
                    <div class="step-content">
                        <div
                            @click="activeStepSet(0)"
                            class="step-item"
                            :class="activeStep === 0 ? 'item-active' : ''"
                        >
                            项目名称
                        </div>
                        <div
                            @click="activeStepSet(1)"
                            class="step-item"
                            :class="activeStep === 1 ? 'item-active' : ''"
                        >
                            数据导入
                        </div>
                        <div
                            @click="activeStepSet(2)"
                            class="step-item"
                            :class="activeStep === 2 ? 'item-active' : ''"
                        >
                            项目配置
                        </div>
                    </div>
                    <div class="right-button">
                        <el-button>取消</el-button>
                        <el-button>保存</el-button>
                    </div>
                </div>
            </template>
            <!-- 内容 -->
            <div class="content-wapper">
                <!-- 项目名称 -->
                <div class="project-name" v-if="activeStep == 0">
                    <el-form
                        :model="projectData"
                        :rules="formRule"
                        label-width="120px"
                        label-position="top"
                        size="large"
                    >
                        <el-form-item
                            label="项目名称"
                            class="form-item"
                            prop="name"
                        >
                            <el-input v-model="projectData.name" />
                        </el-form-item>
                        <el-form-item label="项目描述" class="form-item">
                            <el-input
                                placeholder="输入相关的项目描述"
                                v-model="projectData.description"
                                type="textarea"
                                :rows="4"
                            />
                        </el-form-item>
                    </el-form>
                </div>
                <!-- 数据导入 -->
                <div class="project-data" v-if="activeStep == 1">
                    <!-- 拖拽上传 -->
                    <el-upload
                        class="upload-box"
                        drag
                        :auto-upload="false"
                        action=""
                        multiple
                        :show-file-list="false"
                        :on-change="loadTextFromFile"
                    >
                        <el-icon class="el-icon--upload">
                            <upload-filled />
                        </el-icon>
                        <div class="el-upload__text">
                            拖拽文件至此或 <em>点击上传</em>
                        </div>
                        <template #tip>
                            <div class="el-upload__tip">
                                请上传可解析文本内容文件
                            </div>
                        </template>
                    </el-upload>
                    <!-- 已上传文件列表 -->
                    <div class="file-list">
                        <el-table
                            :data="projectData.data"
                            style="width: 100%"
                            height="300"
                        >
                            <el-table-column prop="fileName" label="文件名" />
                            <el-table-column
                                prop="fileContent"
                                label="文本内容"
                                show-overflow-tooltip
                            />
                            <el-table-column label="操作">
                                <template #default="scope">
                                    <el-button
                                        size="small"
                                        type="danger"
                                        @click="handleFileDelete(scope.$index)"
                                        >删除文件
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <!-- 项目配置 -->
                <div class="project-config" v-if="activeStep == 2">
                    <div class="left-menu">
                        <div class="set-area">
                            <div class="set-title">
                                {{ areaIndx === 0 ? "标签域" : "关系域" }}
                            </div>
                            <div class="set-content">
                                <div
                                    @click="setAreaIndx(0)"
                                    class="set-item"
                                    :class="
                                        areaIndx === 0 ? 'set-item-active' : ''
                                    "
                                >
                                    labelCategories
                                </div>
                                <div
                                    @click="setAreaIndx(1)"
                                    class="set-item"
                                    :class="
                                        areaIndx === 1 ? 'set-item-active' : ''
                                    "
                                >
                                    connectionCategories
                                </div>
                            </div>
                        </div>
                        <!-- 标签域 -->
                        <div class="label-area" v-if="areaIndx === 0">
                            <!-- 设置标签域 -->
                            <div class="set-label-block">
                                <!-- 左侧输入框 -->
                                <div class="left-input">
                                    <div class="label-title">标签添加</div>
                                    <!-- 从已有添加的添加 -->
                                    <div class="add-from-old">
                                        <div class="add-old">从已有添加</div>
                                        <el-select
                                            multiple
                                            collapse-tags
                                            collapse-tags-tooltip
                                            placeholder="从已有标签中选择"
                                            style="width: 240px"
                                            v-model="
                                                projectData.labelCategories
                                            "
                                            value-key="text"
                                        >
                                            <el-option
                                                v-for="item in defaultLabelCategories"
                                                :key="item.text"
                                                :label="item.text"
                                                :value="item"
                                            />
                                        </el-select>
                                    </div>
                                    <div class="add-from-new">
                                        <div class="add-new">新建标签</div>
                                        <el-input
                                            v-model="newLabel"
                                            type="textarea"
                                            :rows="4"
                                            class="new-input"
                                            placeholder="输入标签"
                                        />
                                        <el-button
                                            @click="addNewLabel"
                                            class="new-button"
                                            >添加</el-button
                                        >
                                    </div>
                                </div>
                                <!-- 右侧展示表 -->
                                <div class="right-show">
                                    <div class="show-title">
                                        标签设置({{
                                            projectData.labelCategories.length
                                        }})
                                    </div>
                                    <div class="show-content">
                                        <div
                                            class="show-item"
                                            v-for="(
                                                item, index
                                            ) in projectData.labelCategories"
                                        >
                                            <div
                                                class="header-show"
                                                :style="{
                                                    backgroundColor: item.color,
                                                }"
                                            ></div>
                                            <div
                                                @click="
                                                    setLabelColor(
                                                        `color-picker-${item.text}`
                                                    )
                                                "
                                                class="content-show"
                                                :style="`--color:${
                                                    item.color
                                                };--background:${
                                                    item.color + 26
                                                }`"
                                            >
                                                <input
                                                    :class="`color-picker-${item.text}`"
                                                    type="color"
                                                    style="opacity: 0"
                                                    v-model="item.color"
                                                />
                                                <span class="label-code">
                                                    {{ item.text }}
                                                </span>
                                            </div>
                                            <div
                                                class="remove-show"
                                                @click="removeLabel(index)"
                                            >
                                                <svg
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 14 14"
                                                    fill="none"
                                                    stroke="red"
                                                    stroke-width="2"
                                                    stroke-linecap="square"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M2 12L12 2"></path>
                                                    <path d="M12 12L2 2"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="connect-area" v-if="areaIndx === 1"></div>
                    </div>
                    <div class="right-content">
                        <div class="ui-title">UI预览</div>
                        <div class="ui-view">
                            <div class="view-tags">
                                <div
                                    class="tag-item"
                                    v-for="item in computedAnnotationData.labelCategories"
                                >
                                    <div
                                        class="tag-head"
                                        :style="`--color:${item.color}`"
                                    ></div>
                                    <div
                                        class="tag-content"
                                        :style="`--color:${item.color + 26}`"
                                    >
                                        <span class="tag-text">{{
                                            item.text
                                        }}</span>
                                        <span class="tag-hotkey">1</span>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="view-content"
                                ref="annotationContainer"
                            ></div>
                            <div class="view-data">
                                <div class="data-title">标注结果</div>
                                <div class="data-list">
                                    <div class="label-list">
                                        <div
                                            class="empty-list"
                                            v-if="
                                                computedAnnotationData.labels
                                                    .length === 0
                                            "
                                        >
                                            暂无标注
                                        </div>
                                        <div
                                            class="lablei-list-item"
                                            v-for="(
                                                item, index
                                            ) in computedAnnotationData.labels"
                                        >
                                            <div class="item-id">
                                                {{ index }}
                                            </div>
                                            <div class="item-type">
                                                {{
                                                    computedAnnotationData.labelCategories.filter(
                                                        (label) =>
                                                            label.id ===
                                                            item.categoryId
                                                    )[0].text
                                                }}
                                            </div>
                                            <div class="item-content">
                                                {{
                                                    computedAnnotationData.content.slice(
                                                        item.startIndex,
                                                        item.endIndex
                                                    )
                                                }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="connect-list"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-dialog>
    </main>
</template>

<script lang="ts" setup>
import { useFileReader } from "@/hooks/useFileReader "
import {
    UploadFilled,
    Back,
    Right,
    Plus,
    Delete,
} from "@element-plus/icons-vue"
import { ElMessage, UploadFile, ElNotification } from "element-plus"
import {
    ref,
    reactive,
    inject,
    watch,
    Ref,
    computed,
    onMounted,
    nextTick,
} from "vue"
import { annotationProjectStore } from "@/store/annotationProject"
import { useCreateAnnotationData } from "@/hooks/useCreateAnnotationData"
import { Annotator, Action } from "poplar-annotation"

const openDialog = inject("openDialog") as Ref<boolean>
const activeStep = ref<number>(0)
const activeStepSet = (index: number) => {
    activeStep.value = index
}
//项目数据
const projectData = reactive({
    name: "",
    description: "",
    date: "",
    data: [] as { fileName: string; fileContent: string }[],
    labelCategories: [] as { text: string; color: string }[],
    connectionCategories: [] as { text: string }[],
})
const formRule = reactive({
    name: [{ required: true, message: "请输入项目名称", trigger: "blur" }],
})
/**
 * 项目设置
 */
const areaIndx = ref(0)
const setAreaIndx = (index: number) => {
    areaIndx.value = index
}
const defaultLabelCategories = [
    {
        text: "B-LOC",
        color: "#95e1d3",
    },
    {
        text: "I-LOC",
        color: "#eaffd0",
    },
    {
        text: "E-LOC",
        color: "#fce38a",
    },
    {
        text: "B-ORG",
        color: "#fcbad3",
    },
    {
        text: "I-ORG",
        color: "#aa96da",
    },
    {
        text: "E-ORG",
        color: "#ffffd2",
    },
    {
        text: "B-PER",
        color: "#ff7e67",
    },
    {
        text: "I-PER",
        color: "#a7ff83",
    },
    {
        text: "E-PER",
        color: "#ff5335",
    },
    {
        text: "B-LEAGUE",
        color: "#f25d9c",
    },
    {
        text: "I-LEAGUE",
        color: "#b61aae",
    },
    {
        text: "E-LEAGUE",
        color: "#590d82",
    },
    {
        text: "B-TEAM",
        color: "#d4a5a5",
    },
    {
        text: "I-TEAM",
        color: "#ff6464",
    },
    {
        text: "E-TEAM",
        color: "#ffbd39",
    },
    {
        text: "B-RANK",
        color: "#f1c40f",
    },
    {
        text: "I-RANK",
        color: "#0245a3",
    },
    {
        text: "E-RANK",
        color: "#7e80ff",
    },
    {
        text: "O",
        color: "#757a79",
    },
]
const newLabel = ref("")
const addNewLabel = () => {
    if (!newLabel.value) return
    const isExisted = projectData.labelCategories.findIndex(
        (item) => item.text === newLabel.value
    )
    if (isExisted !== -1) {
        ElMessage.info(`已添加${newLabel.value}标签`)
    } else {
        projectData.labelCategories.push({
            text: newLabel.value,
            color: "#757a79",
        })
    }
    newLabel.value = ""
}
const removeLabel = (index: number) => {
    projectData.labelCategories.splice(index, 1)
}
const setLabelColor = (className: string) => {
    const input = document.querySelector(`.${className}`) as HTMLInputElement
    input.click()
}
const defaultConnectionCategories = [
    {
        text: "某种关系1",
    },
    {
        text: "某种关系2",
    },
    {
        text: "某种关系3",
    },
    {
        text: "某种关系4",
    },
]
const newConnection = ref<string>("")
const addConnection = (index: number, add: boolean = false) => {
    if (add === false) {
        const isExisted = projectData.connectionCategories.findIndex(
            (item) => item.text === defaultConnectionCategories[index].text
        )
        if (isExisted === -1) {
            projectData.connectionCategories.unshift({
                text: defaultConnectionCategories[index].text,
            })
        } else {
            ElMessage.info("已存在此关系,请勿重复添加！")
        }
    } else {
        if (newConnection.value === "") return
        const isExisted = projectData.connectionCategories.findIndex(
            (item) => item.text === newConnection.value
        )
        if (isExisted === -1) {
            projectData.connectionCategories.unshift({
                text: newConnection.value,
            })
            newConnection.value = ""
        } else {
            ElMessage.info("已存在此关系,请勿重复添加！")
        }
    }
}
const deleteLabelOrConnection = (index: number, con: boolean = false) => {
    if (con) {
        projectData.connectionCategories.splice(index, 1)
    } else {
        projectData.labelCategories.splice(index, 1)
    }
}
/**
 * 上传功能
 */
const loadTextFromFile = (uploadFile: UploadFile) => {
    //读取文件内容
    const file = uploadFile.raw
    if (!file) return
    setImmediate(() => {
        useFileReader(file, (r: string) =>
            projectData.data.push({
                fileName: file.name,
                fileContent: r,
            })
        )
    })
}
const handleFileDelete = (index: number) => {
    projectData.data.splice(index, 1)
}
//UI 预览
const letter = ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt voluptatem blanditiis perspiciatis molestiae autem magni corrupti nobis vitae reprehenderit accusantium itaque quam nemo, repellat, quia perferendis quidem, et dolore velit.`
const computedAnnotationData = computed(() => {
    return useCreateAnnotationData(
        letter,
        projectData.labelCategories.map((item, index) => {
            return {
                id: index,
                text: item.text,
                color: item.color,
                borderColor: "a38671",
            }
        }),
        projectData.connectionCategories.map((item, index) => {
            return {
                id: index,
                text: item.text,
            }
        })
    )
})
const annotationContainer = ref<HTMLElement>()
let annotator: Annotator
const textSelector = reactive({
    startIndex: -1,
    endIndex: -1,
})
const registerAnnotator = () => {
    console.log("genxin annoto")

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
        textSelector.startIndex = startIndex
        textSelector.endIndex = endIndex
    })
    annotator.on("labelRightClicked", (id: number) => {
        annotator.applyAction(Action.Label.Delete(id))
    })
}

watch(
    [
        () => computedAnnotationData.value.labelCategories.length,
        () => computedAnnotationData.value.labelCategories.length,
    ],
    (newValue) => {
        if (newValue[0] !== 0 || newValue[1] !== 0) {
            registerAnnotator()
        }
    }
)
watch(activeStep, (newValue, oldValue) => {
    if (
        newValue === 2 &&
        (projectData.labelCategories.length === 0 ||
            projectData.labelCategories.length === 0)
    ) {
        nextTick(() => {
            projectData.labelCategories.push(
                ...defaultLabelCategories.slice(0, 3)
            )
        })
    }
})
//保存项目
const projectStore = annotationProjectStore()
const saveProject = () => {
    const nowDate = new Date()
    projectData.date = `${nowDate.getFullYear()}-${
        nowDate.getMonth() + 1
    }-${nowDate.getDate()} ${nowDate.getHours()}:${nowDate.getMinutes()}`
    projectStore.createAnnotationProject(projectData)
    ;(openDialog as Ref<boolean>).value = false
    ElNotification.success({
        title: "项目创建",
        message: "成功创建项目",
    })
    // 清除数据
    projectData.name = ""
    projectData.data = []
    projectData.description = ""
    projectData.connectionCategories = []
    projectData.labelCategories = []
    activeStep.value = 0
}
</script>

<style scoped lang="less">
.create-project {
    ::v-deep .el-dialog {
        margin-bottom: 0;
        border-radius: 10px;
        .el-dialog__header {
            padding: 0;
            margin-right: 0;
        }
        .el-dialog__body {
            padding-top: 0;
            padding-bottom: 0;
            // height: 100%;
        }
    }
}

.step-warpper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: solid 1px #dcdfe6;
    justify-content: space-between;
    box-sizing: content-box;
    min-height: 40px;
    padding: 16px 40px;
    cursor: pointer;
    .left-title {
        font-size: 20px;
        margin-bottom: 0;
        font-weight: 500;
        margin-top: 0;
        width: 20%;
    }
    .step-content {
        width: 40%;
        height: 34px;
        background: rgba(0, 0, 0, 0.05);
        border-radius: 8px;
        box-shadow: inset 0 1px 0 rgb(0 0 0 / 5%),
            inset 0 0 0 1px rgb(0 0 0 / 5%);
        display: flex;
        align-items: center;
        justify-content: space-around;
        .step-item {
            flex: 1;
            text-align: center;
            margin: 0 5px;
            border-radius: 4px;
            padding: 2px 16px;
            color: rgba(0, 0, 0, 0.6);
        }
        .item-active {
            background: #fff;
            box-shadow: 0 1px 0 rgb(0 0 0 / 10%), 0 0 0 1px rgb(0 0 0 / 2%),
                0 5px 10px rgb(0 0 0 / 15%);
            color: #000;
        }
    }
    .right-button {
        width: 20%;
        display: flex;
        justify-content: flex-end;
    }
}

.content-wapper {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
    box-sizing: border-box;
    height: 80vh;
    overflow: auto;

    .project-name {
        width: 30%;
        margin-top: 50px;
        .form-item ::v-deep .el-form-item__label {
            font-size: 18px;
        }
    }

    .project-config {
        box-sizing: border-box;
        padding: 0 2%;
        width: 100%;
        display: flex;
        height: 100%;
        .left-menu {
            height: 100%;
            width: 45%;
            box-sizing: border-box;
            padding: 10px;
            padding-bottom: 0%;
            flex: 1;
            border-right: 1px solid #dcdfe6;
            color: #000;
            .set-area {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                padding-bottom: 20px;
                .set-title {
                    font-size: 20px;
                    font-weight: 400;
                }
                .set-content {
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 60%;
                    height: 34px;
                    background: rgba(0, 0, 0, 0.05);
                    border-radius: 8px;
                    box-shadow: inset 0 1px 0 rgb(0 0 0 / 5%),
                        inset 0 0 0 1px rgb(0 0 0 / 5%);
                    .set-item {
                        font-size: 1em;
                        flex: 1;
                        text-align: center;
                        margin: 0 5px;
                        border-radius: 4px;
                        padding: 4px 16px;
                        color: rgba(0, 0, 0, 0.6);
                    }
                    .set-item-active {
                        background: #fff;
                        box-shadow: 0 1px 0 rgb(0 0 0 / 10%),
                            0 0 0 1px rgb(0 0 0 / 2%),
                            0 5px 10px rgb(0 0 0 / 15%);
                        color: #000;
                    }
                }
            }
            .label-area {
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                height: 360px;
                padding-bottom: 20px;
                .set-label-block {
                    display: flex;
                    box-sizing: border-box;
                    .left-input {
                        flex: 1;
                        box-sizing: border-box;
                        .label-title {
                            margin: 20px 0;
                            margin-bottom: 20px;
                            font-size: 20px;
                            font-weight: 400;
                        }
                        .add-from-old {
                            margin: 20px 0;
                            width: 100%;
                            box-sizing: border-box;
                            .add-old {
                                font-size: 16px;
                                margin: 20px 0;
                            }
                        }
                        .add-from-new {
                            margin: 10px 0px;
                            width: 100%;
                            box-sizing: border-box;
                            .add-new {
                                font-size: 16px;
                                margin: 10px 0;
                            }
                            .new-input {
                                width: 70%;
                                margin-bottom: 20px;
                            }
                            .new-button {
                                display: block;
                                margin: 10px 0;
                            }
                        }
                    }
                    .right-show {
                        flex: 1;
                        box-sizing: border-box;
                        .show-title {
                            margin: 10px 0;
                            margin-bottom: 20px;
                            font-size: 20px;
                            font-weight: 400;
                            padding-left: 30px;
                        }
                        .show-content {
                            box-sizing: border-box;
                            padding-right: 20px;
                            max-height: 300px;
                            overflow: auto;

                            .show-item {
                                cursor: pointer;
                                display: flex;
                                margin-top: 8px;
                                height: 22px;
                                &:hover {
                                    .header-show {
                                        width: 15px;
                                    }
                                }
                                .header-show {
                                    width: 5px;
                                    transition: all 0.2s ease-in-out;
                                    margin: 0 0 0 auto;
                                    border-radius: 3px 0 0 3px;
                                }
                                .content-show {
                                    width: 80%;
                                    position: relative;
                                    border-radius: 0 4px 4px 0;
                                    background-color: var(--background);
                                    .label-code {
                                        position: absolute;
                                        left: 50%;
                                        top: 50%;
                                        transform: translate(-50%, -50%);
                                        opacity: 1;
                                    }
                                }
                                .remove-show {
                                    margin-right: 5px;
                                    border-radius: 0 4px 4px 0;
                                    padding: 2px 6px;

                                    // width: 10px;
                                    svg {
                                        vertical-align: middle;
                                    }
                                    &:hover {
                                        background: rgba(255, 0, 0, 0.133);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        .right-content {
            box-sizing: border-box;
            padding: 16px;
            height: 100%;
            flex: 1;
            width: 45%;
            background-color: #fafafa;
            color: #000;
            .ui-title {
                font-size: 20px;
                margin: 8px 0 16px;
                font-weight: 500;
            }
            .ui-view {
                .view-tags {
                    display: flex;
                    flex-wrap: wrap;
                    max-height: 100px;
                    overflow: auto;
                    .tag-item {
                        display: flex;
                        margin-right: 5px;
                        margin-bottom: 5px;
                        cursor: pointer;
                        .tag-head {
                            width: 3px;
                            background: var(--color);
                            border-radius: 3px 0 0 3px;
                        }
                        .tag-content {
                            background: var(--color);
                            padding: 0 5px;
                            border-radius: 0 4px 4px 0;

                            .tag-text {
                                margin-right: 5px;
                            }
                            .tag-hotkey {
                                color: rgba(0, 0, 0, 0.4);
                            }
                        }
                    }
                }
                .view-content {
                    margin: 20px 0;
                    min-height: 30px;
                }
                .view-data {
                    background: #fff;
                    .data-title {
                        font-size: 20px;
                        font-weight: 500;
                        box-shadow: 0 1px 0 rgb(0 0 0 / 10%);
                        padding: 16px;
                    }
                    .data-list {
                        .empty-list {
                            color: rgba(0, 0, 0, 0.6);
                            font-size: 14px;
                            padding: 16px;
                        }
                    }
                }
            }
        }
    }

    .project-data {
        width: 60%;
        margin-top: 50px;
        .upload-box {
            width: 100%;
        }
    }
}
</style>
