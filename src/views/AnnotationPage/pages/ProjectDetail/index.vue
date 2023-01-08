<template>
    <main class="project-detail">
        <!-- 头部 -->
        <header class="detail-header">
            <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item :to="{ path: '/annotation' }"
                    >项目管理</el-breadcrumb-item
                >
                <el-breadcrumb-item
                    :to="{ path: `/projectSetting`, query: { pID } }"
                    >{{ currentProject.name }}</el-breadcrumb-item
                >
                <el-breadcrumb-item>详情</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="btn-group">
                <el-button
                    @click="
                        router.push({ path: `/projectSetting`, query: { pID } })
                    "
                    >项目设置</el-button
                >
                <el-button @click="openUploader = true">数据导入</el-button>
            </div>
        </header>
        <!-- 中间 -->
        <section class="detail-content">
            <el-table
                height="600"
                style="width: 100%"
                :data="showData"
                size="large "
            >
                <el-table-column label="ID" width="200">
                    <template #default="scope">
                        {{ scope.$index }}
                    </template>
                </el-table-column>
                <el-table-column label="文件名" width="200">
                    <template #default="scope">
                        <div style="font-weight: 600;">
                          {{ scope.row.fileName }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="状态" width="200">
                    <template #default="scope">
                        <!-- {{ scope.row.state }} -->
                        <el-popover
                            placement="top-start"
                            :width="200"
                            :visible="stateRef === Number(scope.$index)"
                        >
                            <template #reference>
                                <el-tag
                                    @click="
                                        stateRef === Number(scope.$index)
                                            ? (stateRef = -1)
                                            : (stateRef = Number(scope.$index))
                                    "
                                    :type="state[scope.row.state].type"
                                    trigger="click"
                                    style="cursor: pointer"
                                >
                                    {{ state[scope.row.state].info }}</el-tag
                                >
                            </template>
                            <div
                                class="state-select"
                                :style="`
                                    display: flex;
                                    justify-content: space-around;
                                    align-items: center;
                                    cursor: pointer
                                    `"
                            >
                                <el-tag
                                    class="tag"
                                    @click="setState(scope.$index, 'pending')"
                                    >进行中</el-tag
                                >
                                <el-tag
                                    class="tag"
                                    @click="setState(scope.$index, 'resolve')"
                                    type="success"
                                    >已完成</el-tag
                                >
                                <el-tag
                                    class="tag"
                                    @click="setState(scope.$index, 'reject')"
                                    type="danger"
                                    >已终止</el-tag
                                >
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip label="数据" width="400">
                    <template #default="scope">
                        {{ scope.row.fileContent }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width="100">
                    <template #default="scope">
                        <!-- {{ scope.row.showData }} -->
                        <el-button type="primary" :icon="Edit" />
                        <el-popover
                            placement="top-start"
                            title="删除该文件及其标注"
                            :visible="deleteRef === Number(scope.$index)"
                        >
                            <template #reference>
                                <el-button
                                    type="danger"
                                    :icon="Delete"
                                    @click="
                                        deleteRef === Number(scope.$index)
                                            ? (deleteRef = -1)
                                            : (deleteRef = Number(scope.$index))
                                    "
                                />
                            </template>
                            <!--  -->
                            <div>
                                <el-button
                                    plain
                                    type="danger"
                                    @click="deleteFile(Number(scope.$index))"
                                    >确认删除</el-button
                                >
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column type="expand" width="100">
                    <template #default="props">
                        <div class="task-detail"></div>
                    </template>
                </el-table-column>
            </el-table>
        </section>
    </main>
    <!-- 数据导入 -->
    <div class="uplaoder">
        <el-dialog
            v-model="openUploader"
            :close-on-click-modal="true"
            :show-close="false"
            width="95%"
            top="40px"
        >
            <template #header="{ close, titleId, titleClass }">
                <div class="step-warpper">
                    <div class="left-title">数据导入</div>
                    <div class="step-content">
                        <div class="step-item item-active">数据导入</div>
                    </div>
                    <div class="right-button">
                        <el-button @click="close">取消</el-button>
                        <el-button @click="saveUpload">保存</el-button>
                    </div>
                </div>
            </template>
            <div class="content-wapper">
                <!-- 数据导入 -->
                <div class="project-data">
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
                            :data="uploadFlieList"
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
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import {
    annotationDataType,
    annotationProjectStore,
} from "@/store/annotationProject"
import { ArrowRight, Edit, Delete, UploadFilled } from "@element-plus/icons-vue"
import { useFileReader } from "@/hooks/useFileReader "
import { ElNotification, UploadFile } from "element-plus"
import { connections, labels } from "@/hooks/useCreateAnnotationData"
const useProjection = annotationProjectStore()
const pID = Number(useRoute().query.pID)
const currentProject = useProjection.annotationProject[pID]
//头部导航栏
const router = useRouter()
//上传文件
const openUploader = ref(false)
const saveUpload = () => {
    currentProject.data.push(...uploadFlieList.value)
    uploadFlieList.value.length = 0
    openUploader.value = false
    ElNotification.success({
        title: "数据导入",
        message: "成功导入数据",
    })
}
const uploadFlieList = ref<
    {
        fileName: string
        fileContent: string
        labels: labels[]
        connections: connections[]
        state: string
    }[]
>([])
const loadTextFromFile = (uploadFile: UploadFile) => {
    //读取文件内容
    const file = uploadFile.raw
    if (!file) return
    setImmediate(() => {
        useFileReader(file, (r: string) =>
            uploadFlieList.value.push({
                fileName: file.name,
                fileContent: r,
                labels: [],
                connections: [],
                state: "pending",
            })
        )
    })
}
const handleFileDelete = (index: number) => {
    uploadFlieList.value.splice(index, 1)
}
//列表展示属性
const showData = computed(() => {
    return currentProject.data
})
//状态
const state: any = {
    pending: {
        type: "",
        info: "进行中",
    },
    resolve: {
        type: "success",
        info: "已完成",
    },
    reject: {
        type: "danger",
        info: "已终止",
    },
}
const stateRef = ref(-1)
const setState = (index: string, state: string) => {
    currentProject.data[Number(index)].state = state
    stateRef.value = -1
}
//删除项目
const deleteRef = ref(-1)
const deleteFile = (index: number) => {
    currentProject.data.splice(index, 1)
    deleteRef.value = -1
}
</script>

<style scoped lang="less">
.project-detail {
    height: 100vh;
    .detail-header {
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        box-sizing: border-box;
        padding: 0 2%;
        background: #fff;
    }
    .detail-content {
        max-height: calc(100vh - 100px);
        overflow: hidden;
        padding: 20px;
        :deep(.el-table__expanded-cell){
          background: #fafafa;
          padding: 0;
        }
        .task-detail {
            height: 300px;
            
        }
    }
}
.uplaoder {
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
                max-width: 30%;
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
        .project-data {
            width: 60%;
            margin-top: 50px;
            .upload-box {
                width: 100%;
            }
        }
    }
}
</style>
