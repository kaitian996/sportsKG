<template>
    <main class="project-settings">
        <!-- 头部 -->
        <header class="setting-header">
            <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item :to="{ path: '/annotation' }">项目管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: `/projectDetail`, query: { pID } }">{{ currentProject.name
                }}</el-breadcrumb-item>
                <el-breadcrumb-item>{{
                    menuList[currentMenuIndex]
                }}</el-breadcrumb-item>
            </el-breadcrumb>
        </header>
        <!-- 中间 -->
        <section class="project-settings-content">
            <!-- 左侧 -->
            <nav class="menus">
                <div class="menu-item" :class="
                    currentMenuIndex === index ? 'menu-item-active' : ''
                " @click="currentMenuIndex = index" v-for="(item, index) in menuList">
                    {{ item }}
                </div>
            </nav>
            <main class="settings-content">
                <!-- 项目名称 -->
                <div class="content-project-name" v-if="currentMenuIndex === 0">
                    <el-form :model="currentProject" :rules="formRule" label-width="120px" label-position="top"
                        size="large">
                        <el-form-item label="项目名称" class="form-item" prop="name">
                            <el-input v-model="currentProject.name" />
                        </el-form-item>
                        <el-form-item label="项目描述" class="form-item">
                            <el-input placeholder="输入相关的项目描述" v-model="currentProject.description" type="textarea"
                                :rows="4" />
                        </el-form-item>
                    </el-form>
                </div>
                <!-- 标注设置 -->
                <div class="content-project-label" v-show="currentMenuIndex === 1">
                    <div class="left-menu">
                        <div class="set-area">
                            <div class="set-title">
                                {{
                                    areaIndex === 0
                                    ? "实体标签域"
                                    : "实体关系域"
                                }}
                            </div>
                            <div class="set-content">
                                <div @click="setareaIndex(0)" class="set-item" :class="
                                    areaIndex === 0 ? 'set-item-active' : ''
                                ">
                                    labelCategories
                                </div>
                                <div @click="setareaIndex(1)" class="set-item" :class="
                                    areaIndex === 1 ? 'set-item-active' : ''
                                ">
                                    connectionCategories
                                </div>
                            </div>
                        </div>
                        <!-- 标签域 -->
                        <div class="label-area" v-if="areaIndex === 0">
                            <!-- 设置标签域 -->
                            <div class="set-label-block">
                                <!-- 左侧输入框 -->
                                <div class="left-input">
                                    <div class="label-title">实体标签添加</div>
                                    <!-- 从已有添加的添加 -->
                                    <div class="add-from-new">
                                        <div class="add-new">新建实体标签</div>
                                        <el-input v-model="newLabel" type="textarea" :rows="4" class="new-input"
                                            placeholder="输入实体标签" />
                                        <el-button @click="addNewLabel" class="new-button">添加</el-button>
                                    </div>
                                </div>
                                <!-- 右侧展示表 -->
                                <div class="right-show">
                                    <div class="show-title">
                                        实体标签设置({{
                                            currentProject.labelCategories
                                                .length
                                        }})
                                    </div>
                                    <div class="show-content">
                                        <div class="show-item" v-for="(
                                                    item, index
                                                ) in currentProject.labelCategories">
                                            <div class="header-show" :style="{
                                                backgroundColor: item.color,
                                            }"></div>
                                            <div @click="
                                                setLabelColor(
                                                    `color-picker-${item.text}`
                                                )
                                            " class="content-show" :style="`--color:${item.color
    };--background:${item.color + 26
    }`">
                                                <input :class="`color-picker-${item.text}`" type="color" style="opacity: 0"
                                                    v-model="item.color" />
                                                <span class="label-code">
                                                    {{ item.text }}
                                                </span>
                                            </div>
                                            <div class="remove-show" @click="removeLabel(index)">
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="red"
                                                    stroke-width="2" stroke-linecap="square"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2 12L12 2"></path>
                                                    <path d="M12 12L2 2"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="connect-area" v-show="areaIndex === 1">
                            <div class="set-label-block">
                                <!-- 左侧输入框 -->
                                <div class="left-input">
                                    <div class="label-title">实体关系添加</div>

                                    <div class="add-from-new">
                                        <div class="add-new">新建实体关系</div>
                                        <el-input v-model="newConnection" type="textarea" :rows="4" class="new-input"
                                            placeholder="输入实体关系" />
                                        <el-button @click="addNewConnection" class="new-button">添加</el-button>
                                    </div>
                                </div>
                                <!-- 右侧展示表 -->
                                <div class="right-show">
                                    <div class="show-title">
                                        实体关系设置({{
                                            currentProject.connectionCategories
                                                .length
                                        }})
                                    </div>
                                    <div class="show-content">
                                        <div class="show-item" v-for="(
                                                    item, index
                                                ) in currentProject.connectionCategories">
                                            <div class="header-show" :style="'background:orange'"></div>
                                            <div class="content-show" :style="'--background:#ffa50026'">
                                                <span class="label-code">
                                                    {{ item.text }}
                                                </span>
                                            </div>
                                            <div class="remove-show" @click="removeConnection(index)">
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="red"
                                                    stroke-width="2" stroke-linecap="square"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2 12L12 2"></path>
                                                    <path d="M12 12L2 2"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 自动补全设置 -->
                        <div class="auto-complete-area" v-if="areaIndex === 0">
                            <div class="auto-title">
                                自动补全标签
                                <span class="auto-add" @click="openAutoKey = true">
                                    增加
                                </span>
                            </div>
                            <!-- 增加autokey -->
                            <el-dialog v-model="openAutoKey" title="新增自动补全标签" width="30%">
                                <div class="add-auto-key">
                                    <div class="auto-key-item">
                                        <span class="title"> 标签名称 </span>
                                        <el-input class="input" v-model="autoKeyData.text" placeholder="输入标签名称" />
                                    </div>
                                    <div class="auto-key-item">
                                        <span class="title"> begin </span>
                                        <el-select v-model="autoKeyData.begin" class="input" placeholder="选择 begin">
                                            <el-option v-for="item in computedAnnotationData.labelCategories" :key="item.id"
                                                :label="item.text" :value="item.id" />
                                        </el-select>
                                    </div>
                                    <div class="auto-key-item">
                                        <span class="title"> inner </span>
                                        <el-select v-model="autoKeyData.inner" class="input" placeholder="选择 inner">
                                            <el-option v-for="item in computedAnnotationData.labelCategories" :key="item.id"
                                                :label="item.text" :value="item.id" />
                                        </el-select>
                                    </div>
                                    <div class="auto-key-item">
                                        <span class="title"> end </span>
                                        <el-select v-model="autoKeyData.end" class="input" placeholder="选择 end">
                                            <el-option v-for="item in computedAnnotationData.labelCategories" :key="item.id"
                                                :label="item.text" :value="item.id" />
                                        </el-select>
                                    </div>
                                </div>
                                <template #footer>
                                    <span class="dialog-footer">
                                        <el-button @click="openAutoKey = false">取消</el-button>
                                        <el-button type="primary" @click="addAutoKey">
                                            确定
                                        </el-button>
                                    </span>
                                </template>
                            </el-dialog>
                            <!-- autokey列表 -->
                            <div class="auto-key-list">
                                <el-table :data="computedAnnotationData.autoKey" style="width: 100%" height="300">
                                    <el-table-column label="标签" min-width="10">
                                        <template #default="scope">
                                            {{ scope.row.text }}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="begin" min-width="10">
                                        <template #default="scope">
                                            {{
                                                computedAnnotationData.labelCategories.find(
                                                    (item) => {
                                                        return (
                                                            item.id ===
                                                            Number(
                                                                scope.row.begin
                                                            )
                                                        )
                                                    }
                                                )?.text
                                            }}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="inner" min-width="10">
                                        <template #default="scope">
                                            {{
                                                computedAnnotationData.labelCategories.find(
                                                    (item) => {
                                                        return (
                                                            item.id ===
                                                            Number(
                                                                scope.row.inner
                                                            )
                                                        )
                                                    }
                                                )?.text
                                            }}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="end" min-width="10">
                                        <template #default="scope">
                                            {{
                                                computedAnnotationData.labelCategories.find(
                                                    (item) => {
                                                        return (
                                                            item.id ===
                                                            Number(
                                                                scope.row.end
                                                            )
                                                        )
                                                    }
                                                )?.text
                                            }}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="删除" min-width="10">
                                        <template #default="scope">
                                            <span class="delete-auto" @click="
                                                removeAutoKey(scope.$index)
                                            ">
                                                删除
                                            </span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </div>
                    <!-- 右侧 -->
                    <div class="right-content">
                        <div class="ui-title">UI预览</div>
                        <div class="ui-view">
                            <div class="view-tags-box">
                                <!-- 自动补全标签tags -->
                                <div class="view-tags tags-auto" v-if="
                                    areaIndex === 0 &&
                                    computedAnnotationData.autoKey?.length! > 0
                                ">
                                    <div class="tag-item" :style="`--color:green`" v-for="(
                                                item, index
                                            ) in computedAnnotationData.autoKey" @click="currentSelectLabel = item.text!">
                                        <div class="tag-head" :style="`--color:green`"></div>
                                        <div class="tag-content" :style="`--color:#00800026`">
                                            <span class="tag-text">{{
                                                item.text
                                            }}</span>
                                            <span class="tag-hotkey">
                                                {{
                                                    keyboardMap["autoKey"][
                                                        index
                                                    ].ref
                                                }}</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 普通标签tags -->
                                <div class="view-tags" v-if="areaIndex === 0">
                                    <div class="tag-item" :style="`--color:${item.color}`" v-for="(
                                                item, index
                                            ) in computedAnnotationData.labelCategories"
                                        @click="currentSelectLabel = item.id!">
                                        <div class="tag-head" :style="`--color:${item.color}`"></div>
                                        <div class="tag-content" :style="`--color:${item.color + 26
                                            }`">
                                            <span class="tag-text">{{
                                                item.text
                                            }}</span>
                                            <span class="tag-hotkey">{{
                                                keyboardMap["signalKey"][index]
                                                    .ref
                                            }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="view-tags" v-if="areaIndex === 1">
                                    <div class="tag-item" :style="`--color:orange`" v-for="(
                                                item, index
                                            ) in computedAnnotationData.connectionCategories" @click="
                                                currentSelectConnection = item.id!
                                            ">
                                        <div class="tag-head" :style="`--color:orange`"></div>
                                        <div class="tag-content" :style="`--color:#ffa50026`">
                                            <span class="tag-text">{{
                                                item.text
                                            }}</span>
                                            <span class="tag-hotkey">{{
                                                keyboardMap["connectKey"][index]
                                                    .ref
                                            }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="view-content" ref="annotationContainer"></div>
                            <div class="view-data">
                                <div class="data-title">
                                    {{
                                        areaIndex === 0
                                        ? "Labels标注结果"
                                        : "Connections标注结果"
                                    }}
                                </div>
                                <div class="data-list">
                                    <div class="label-list" v-if="areaIndex === 0">
                                        <el-table height="200" :data="
                                            onceAnnotationData.onceLabels
                                        " style="width: 100%">
                                            <el-table-column label="ID" min-width="100">
                                                <template #default="scope">
                                                    {{ scope.$index }}
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="标签名称" min-width="100">
                                                <template #default="scope">
                                                    {{
                                                        computedAnnotationData.labelCategories.find(
                                                            (item) =>
                                                                item.id ===
                                                                Number(
                                                                    scope.row
                                                                        .categoryId
                                                                )
                                                        )?.text
                                                    }}
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="实体内容" min-width="100">
                                                <template #default="scope">
                                                    {{
                                                        computedAnnotationData.content.slice(
                                                            scope.row
                                                                .startIndex,
                                                            scope.row.endIndex
                                                        )
                                                    }}
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                    <div class="connect-list" v-if="areaIndex === 1">
                                        <el-table height="200" :data="
                                            onceAnnotationData.onceConnections
                                        " style="width: 100%">
                                            <el-table-column label="ID" min-width="100">
                                                <template #default="scope">
                                                    {{ scope.$index }}
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="起始实体" min-width="100">
                                                <template #default="scope">
                                                    {{
                                                        computedAnnotationData.content.slice(
                                                            onceAnnotationData.onceLabels.find(
                                                                (label) =>
                                                                    label.id ===
                                                                    scope.row
                                                                        .fromId
                                                            )?.startIndex,
                                                            onceAnnotationData.onceLabels.find(
                                                                (label) =>
                                                                    label.id ===
                                                                    scope.row
                                                                        .fromId
                                                            )?.endIndex
                                                        )
                                                    }}
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="实体关系" min-width="100">
                                                <template #default="scope">
                                                    {{
                                                        computedAnnotationData.connectionCategories.find(
                                                            (item) =>
                                                                item.id ===
                                                                Number(
                                                                    scope.row
                                                                        .categoryId
                                                                )
                                                        )?.text
                                                    }}
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="终止实体" min-width="100">
                                                <template #default="scope">
                                                    {{
                                                        computedAnnotationData.content.slice(
                                                            onceAnnotationData.onceLabels.find(
                                                                (label) =>
                                                                    label.id ===
                                                                    scope.row
                                                                        .toId
                                                            )?.startIndex,
                                                            onceAnnotationData.onceLabels.find(
                                                                (label) =>
                                                                    label.id ===
                                                                    scope.row
                                                                        .toId
                                                            )?.endIndex
                                                        )
                                                    }}
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 删除项目 -->
                <div class="content-project-delete" v-if="currentMenuIndex === 2">
                    <div class="delete-title">
                        <strong>警告：</strong>
                        删除此项目会同时删除项目中所包含的所有文件，并且删除所有标注数据、关系数据、标注配置等且无法恢复。
                    </div>
                    <div class="delete-btn">
                        <el-switch v-model="canDelete" />
                        <el-button type="danger" :disabled="!canDelete" @click="removeProject">删除</el-button>
                    </div>
                </div>
            </main>
        </section>
    </main>
</template>

<script lang="ts" setup>
import {
    ref,
    reactive,
    watch,
    toRaw,
    computed,
    nextTick,
    isReactive,
    onMounted,
} from "vue"
import { useRoute, useRouter } from "vue-router"
import { ArrowRight } from "@element-plus/icons-vue"
import {
    annotationDataType,
    annotationProjectStore,
} from "@/store/annotationProject"
import {
    connections,
    labels,
    useCreateAnnotationData,
} from "@/hooks/useCreateAnnotationData"
import { Annotator, Action } from "poplar-annotation"
import { ElMessage, ElMessageBox, ElNotification } from "element-plus"
import { useKeyToKeyboard } from "@/hooks/useKeyToKeyboard"
import { trimEnter } from "../.."
const useProjection = annotationProjectStore()
const pID = Number(useRoute().query.pID)
const currentProject = useProjection.annotationProject[pID]
const menuList = ["项目设置", "标注设置", "删除项目"]
const currentMenuIndex = ref(0)

//项目设置
const formRule = {
    name: [{ required: true, message: "请输入项目名称", trigger: "blur" }],
}
//标签设置
const areaIndex = ref(0)
const setareaIndex = (index: number) => {
    areaIndex.value = index
}
//实体增加
const newLabel = ref("")
const addNewLabel = () => {
    if (!newLabel.value) return
    const isExisted = currentProject.labelCategories.findIndex(
        (item) => item.text === newLabel.value
    )
    if (isExisted !== -1) {
        ElMessage.info(`已添加${newLabel.value}标签`)
    } else {
        //降序排列
        let max = [...currentProject.labelCategories].sort(
            (a, b) => b.id! - a.id!
        )[0]?.id
        if (max === undefined) max = -1
        currentProject.labelCategories.push({
            id: max + 1,
            text: trimEnter(newLabel.value),
            color: "#757a79",
            borderColor: "++a38671",
        })
    }
    newLabel.value = ""
}
//实体删除
const removeLabel = (index: number) => {
    //TODO 这里有需要做的工作
    /**
     * 1、找到这个index所代表的id，然后在这个项目里，找labels和这个项目有关的标注，删除
     * 2、将auto与这个有关的id删除
     * 3、将connect与这个有关的id删除
     */
    ElMessageBox.confirm(
        "删除已有标签会同时删除与该标签有关的标注、三元组、自动补全标签,且无法恢复",
        "警告",
        {
            confirmButtonText: "确认删除",
            cancelButtonText: "取消",
            type: "warning",
            autofocus: false,
        }
    )
        .then(() => {
            const deleteTarget = currentProject.labelCategories[index].id
            const data = currentProject.data
            let count = 0
            //循环删除data中有关数据:label 和
            data.forEach((item) => {
                for (let i = 0; i < item.labels.length; i++) {
                    const label = item.labels[i]
                    if (label.categoryId === deleteTarget) {
                        item.labels.splice(i--, 1)
                        count++
                    }
                }
                //删除connection
                for (let i = 0; i < item.connections.length; i++) {
                    const connection = item.connections[i]
                    if (
                        connection.fromId === deleteTarget ||
                        connection.fromId === deleteTarget
                    ) {
                        item.connections.splice(i--, 1)
                        count++
                    }
                }
            })
            //删除autokey
            for (let i = 0; i < currentProject.autoKey!.length; i++) {
                const autokey = currentProject.autoKey![i]
                if (
                    autokey.begin === deleteTarget ||
                    autokey.inner === deleteTarget ||
                    autokey.end === deleteTarget
                ) {
                    currentProject.autoKey?.splice(i--, 1)
                    count++
                }
            }
            // 再删除这个标签
            currentProject.labelCategories.splice(index, 1)
            ElMessage({
                type: "success",
                message: `已全部删除,影响条目 ${count}`,
            })
        })
        .catch(() => {
            ElMessage({
                type: "info",
                message: "已取消删除",
            })
        })
}
const setLabelColor = (className: string) => {
    const input = document.querySelector(`.${className}`) as HTMLInputElement
    input.click()
}
//关系增加
const newConnection = ref<string>("")
const addNewConnection = () => {
    if (!newConnection.value) return
    const isExisted = currentProject.connectionCategories.findIndex(
        (item) => item.text === newConnection.value
    )
    if (isExisted !== -1) {
        ElMessage.info(`已添加${newConnection.value}关系`)
    } else {
        const max =
            [...currentProject.connectionCategories].sort(
                (a, b) => b.id! - a.id!
            )[0]?.id || -1
        currentProject.connectionCategories.push({
            id: max + 1,
            text: trimEnter(newConnection.value),
        })
    }
    newConnection.value = ""
}
const removeConnection = (index: number) => {
    /**
     * 1、找到index所代表的id
     * 2、删除对应的connect的对象
     */
    ElMessageBox.confirm(
        "删除已有关系会同时删除与该关系有关的三元组，且无法恢复",
        "警告",
        {
            confirmButtonText: "确认删除",
            cancelButtonText: "取消",
            type: "warning",
            autofocus: false,
        }
    )
        .then(() => {
            const deleteTarget = currentProject.connectionCategories[index].id
            const data = currentProject.data
            let count = 0
            //循环删除data中有关数据:connection
            data.forEach((item) => {
                //删除connection
                for (let i = 0; i < item.connections.length; i++) {
                    const connection = item.connections[i]
                    if (connection.categoryId === deleteTarget) {
                        item.connections.splice(i--, 1)
                        count++
                    }
                }
            })
            // 再删除这个标签
            currentProject.connectionCategories.splice(index, 1)
            ElMessage({
                type: "success",
                message: `已全部删除,影响条目 ${count}`,
            })
        })
        .catch(() => {
            ElMessage({
                type: "info",
                message: "已取消删除",
            })
        })
}
//autoKey 自动补全
const openAutoKey = ref(false)
const autoKeyData = reactive({
    text: "",
    begin: null,
    inner: null,
    end: null,
})
const addAutoKey = () => {
    if (
        autoKeyData.text &&
        autoKeyData.begin !== null &&
        autoKeyData.end !== null &&
        autoKeyData.inner !== null
    ) {
        currentProject.autoKey?.push({
            text: autoKeyData.text,
            begin: Number(autoKeyData.begin),
            inner: Number(autoKeyData.inner),
            end: Number(autoKeyData.end),
        })
        openAutoKey.value = false
        ElMessage.success("添加自动补全标签成功")
        autoKeyData.text = ""
        autoKeyData.begin = null
        autoKeyData.end = null
        autoKeyData.inner = null
    } else {
        ElMessage.error("请填写正确格式")
    }
}
const removeAutoKey = (index: number) => {
    currentProject.autoKey?.splice(index, 1)
}
//UI 预览
const defaultLabelCategories = [
    {
        text: "LOC",
        color: "#95e1d3",
    },
    {
        text: "ORG",
        color: "#fcbad3",
    },
    {
        text: "PER",
        color: "#ff7e67",
    },
    {
        text: "LEAGUE",
        color: "#f25d9c",
    },
    {
        text: "TEAM",
        color: "#d4a5a5",
    },
    {
        text: "RANK",
        color: "#f1c40f",
    },
    {
        text: "O",
        color: "#757a79",
    },
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
]
const defaultConnectionCategories = [
    {
        text: "名词",
    },
    {
        text: "实词",
    },
    {
        text: "代词",
    },
    {
        text: "形容词",
    },
]
const onceAnnotationData = reactive({
    onceLabels: [] as labels[],
    onceConnections: [] as connections[],
})
const letter = ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt voluptatem blanditiis perspiciatis molestiae autem magni corrupti nobis vitae reprehenderit accusantium itaque quam nemo, repellat, quia perferendis quidem, et dolore velit.`
const computedAnnotationData = computed(() => {
    const data: annotationDataType & {
        autoKey?: { text: string; begin: number; inner: number; end: number }[]
    } = useCreateAnnotationData(
        letter,
        currentProject.labelCategories,
        currentProject.connectionCategories,
        [],
        []
    )
    data.autoKey = currentProject.autoKey
    return data
})
//增加键盘热键
//增加标注功能
const keyboardMap = computed(() => {
    return {
        autoKey: useKeyToKeyboard(
            computedAnnotationData.value.autoKey!,
            "autoKey"
        ),
        signalKey: useKeyToKeyboard(
            computedAnnotationData.value.labelCategories,
            "signalKey"
        ),
        connectKey: useKeyToKeyboard(
            computedAnnotationData.value.connectionCategories,
            "connectKey"
        ),
    }
})
onMounted(() => {
    window.addEventListener("keyup", (e: KeyboardEvent) => {
        const key = e.key
        const autokey = keyboardMap.value.autoKey.find(
            (item) => item.ref === key
        )
        if (autokey) {
            currentSelectLabel.value = autokey.value
            return
        }
        const signalkey = keyboardMap.value.signalKey.find(
            (item) => item.ref === key
        )
        if (signalkey) {
            currentSelectLabel.value = signalkey.value
            return
        }
        const connectkey = keyboardMap.value.connectKey.find(
            (item) => item.ref === key
        )
        if (connectkey) {
            currentSelectConnection.value = connectkey.value as number
        }
    })
})
const annotationContainer = ref<HTMLElement>()
let annotator: Annotator
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
                annotator.applyAction(
                    Action.Label.Create(
                        currentSelectLabel.value as number,
                        textSelector.startIndex,
                        textSelector.endIndex
                    )
                )
                onceAnnotationData.onceLabels = annotator.store.json.labels
            }
        }
    } else if (typeof newValue === "string") {
        if (textSelector.startIndex !== -1 && textSelector.endIndex !== -1) {
            const { begin, inner, end } =
                computedAnnotationData.value.autoKey?.find(
                    (item) => item.text === newValue
                )!

            if (annotator) {
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
            }
            onceAnnotationData.onceLabels = annotator.store.json.labels
        }
    }
    //重置状态
    currentSelectLabel.value = -1
    textSelector.startIndex = -1
    textSelector.endIndex = -1
})
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
            onceAnnotationData.onceConnections =
                annotator.store.json.connections
        }
        //重置状态
        currentSelectConnection.value = -1
        labelSelector.fromId = -1
        labelSelector.toId = -1
    }
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
        onceAnnotationData.onceLabels = annotator.store.json.labels
    })
    //关系增加删除
    annotator.on("twoLabelsClicked", (fromId: number, toId: number) => {
        labelSelector.fromId = fromId
        labelSelector.toId = toId
    })
    annotator.on("connectionRightClicked", (id: number) => {
        annotator.applyAction(Action.Connection.Delete(id))
        onceAnnotationData.onceConnections = annotator.store.json.connections
    })
}
watch(
    [
        () => computedAnnotationData.value.labelCategories.length,
        () => computedAnnotationData.value.connectionCategories.length,
        computedAnnotationData.value.labelCategories,
    ],
    (newValue) => {
        if (newValue[0] !== 0) {
            onceAnnotationData.onceLabels.length = 0
            onceAnnotationData.onceConnections.length = 0
            registerAnnotator()
        }
    }
)
let first = true
watch(currentMenuIndex, (newValue, oldValue) => {
    nextTick(() => {
        if (newValue === 1 && currentProject.labelCategories.length === 0) {
            currentProject.labelCategories.push(
                ...defaultLabelCategories.slice(0, 3).map((item, index) => {
                    return {
                        id: index,
                        text: item.text,
                        color: item.color,
                        borderColor: "++a38671",
                    }
                })
            )
        }
        if (
            newValue === 1 &&
            first &&
            currentProject.labelCategories.length !== 0
        ) {
            registerAnnotator()
            first = false
        }
    })
})

//删除界面
const canDelete = ref(false)
const router = useRouter()
const removeProject = () => {
    useProjection.annotationProject.splice(pID, 1)
    router.push("/annotation")
    ElNotification.success({
        title: "项目删除",
        message: "成功删除项目",
    })
}
</script>

<style scoped lang="less">
.project-settings {
    height: 100vh;

    .setting-header {
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        box-sizing: border-box;
        padding: 0 2%;
        background: #fff;
    }

    .project-settings-content {
        display: flex;
        align-items: flex-start;

        .menus {
            height: calc(100vh - 50px);
            background: #fff;
            width: 240px;
            overflow: auto;
            border-right: 1px solid rgba(0, 0, 0, 0.1);
            box-sizing: border-box;
            padding: 8px;

            .menu-item {
                box-sizing: border-box;
                border-radius: 3px;
                color: rgba(0, 0, 0, 0.6);
                cursor: pointer;
                font-family: Roboto;
                font-size: 16px;
                height: 48px;
                padding: 0 13px;
                padding-left: 40px;
                line-height: 48px;

                &:hover {
                    background-color: rgba(0, 0, 0, 0.04);
                    color: #000;
                }
            }

            .menu-item-active {
                background-color: rgba(0, 0, 0, 0.08);
                color: #000;
            }
        }

        .settings-content {
            height: calc(100vh - 50px);
            background: #fff;
            width: 70%;
            flex: 1;
            overflow: auto;

            .content-project-name {
                padding: 32px 40px;
                width: 70%;
            }

            .content-project-label {
                box-sizing: border-box;
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

                    .label-area,
                    .connect-area {
                        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                        // height: 360px;
                        padding-bottom: 20px;
                        height: 250px;

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
                                    margin: 20px 0;

                                    font-size: 20px;
                                    font-weight: 400;
                                    padding-left: 30px;
                                }

                                .show-content {
                                    box-sizing: border-box;
                                    padding-right: 20px;
                                    max-height: 200px;
                                    overflow: auto;
                                    min-height: 150px;

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
                                                transform: translate(-50%,
                                                        -50%);
                                                opacity: 1;
                                            }
                                        }

                                        .remove-show {
                                            margin-right: 5px;
                                            border-radius: 0 4px 4px 0;
                                            padding: 2px 6px;

                                            // width: 10px;
                                            svg {
                                                // vertical-align: middle;
                                                position: relative;
                                                top: -2px;
                                            }

                                            &:hover {
                                                background: rgba(255,
                                                        0,
                                                        0,
                                                        0.133);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    .auto-complete-area {
                        max-height: 500px;
                        overflow: auto;
                        min-height: 300px;

                        .auto-title {
                            margin: 20px 0;
                            margin-bottom: 20px;
                            font-size: 20px;
                            font-weight: 400;

                            .auto-add {
                                margin-left: 10px;
                                font-size: 14px;
                                cursor: pointer;
                                color: #406eff;
                            }
                        }

                        .add-auto-key {
                            .auto-key-item {
                                display: flex;
                                box-sizing: border-box;
                                margin-bottom: 10px;
                                justify-content: flex-start;

                                .title {
                                    width: 40%;
                                    display: flex;
                                    align-items: center;
                                }

                                .input {
                                    flex: 1;
                                }
                            }
                        }

                        .auto-key-list {
                            .delete-auto {
                                font-size: 12px;
                                cursor: pointer;
                                color: #406eff;
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
                        .view-tags-box {
                            max-height: 200px;
                            overflow: auto;

                            .view-tags {
                                display: flex;
                                flex-wrap: wrap;

                                .tag-item {
                                    display: flex;
                                    margin-right: 5px;
                                    margin-bottom: 5px;
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

                                        .tag-text {
                                            margin-right: 5px;
                                        }

                                        .tag-hotkey {
                                            color: rgba(0, 0, 0, 0.4);
                                        }
                                    }
                                }
                            }

                            .tags-auto {
                                margin-bottom: 5px;
                                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                            }
                        }

                        .view-content {
                            margin: 20px 0;
                            min-height: 30px;
                            max-height: 150px;
                            overflow: auto;
                        }

                        .view-data {
                            background: #fff;

                            .data-title {
                                font-size: 20px;
                                font-weight: 500;
                                border-bottom: 1px solid rgb(0 0 0 / 10%);
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

            .content-project-delete {
                width: 50%;
                padding: 30px 20px;

                .delete-btn {
                    margin-top: 50px;

                    .el-button {
                        margin-left: 40px;
                    }
                }
            }
        }
    }
}
</style>
