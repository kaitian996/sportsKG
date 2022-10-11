<template>
    <main class="create-project">
        <el-dialog v-model="openDialog" :close-on-click-modal="true" :show-close="false" fullscreen>
            <!-- 头部 -->
            <template #header="{ close, titleId, titleClass }">
                <div class="step-warpper">
                    <div class="title">
                        创建项目
                    </div>
                    <el-steps :active="activeStep" finish-status="success" align-center space="60%"
                        class="step-container">
                        <el-step title="项目名称" />
                        <el-step title="项目配置" />
                        <el-step title="数据导入" />
                    </el-steps>
                    <div class="btn-group">
                        <el-button type="danger" plain @click="close">取消</el-button>
                        <el-button type="primary" plain :disabled="activeStep!==3" @click="saveProject">保存</el-button>
                    </div>
                </div>
            </template>
            <!-- 内容 -->
            <div class="content-wapper">
                <!-- 项目名称 -->
                <div class="project-name" v-if="activeStep==0">
                    <el-form :model="projectData" :rules="formRule" label-width="120px" label-position="top"
                        size="large">
                        <el-form-item label="项目名称" class="form-item" prop="name">
                            <el-input v-model="projectData.name" />
                        </el-form-item>
                        <el-form-item label="项目描述" class="form-item">
                            <el-input v-model="projectData.description" type="textarea" :rows="4" />
                        </el-form-item>
                    </el-form>
                </div>
                <!-- 项目配置 -->
                <div class="project-config" v-if="activeStep==1">
                    <!-- 标签设置 -->
                    <div class="label-setting">
                        <!-- 单体标签 -->
                        <div class="single-label">
                            <div class="left-area">
                                <el-table :data="defaultLabelCategories" style="width: 100%" height="200">
                                    <el-table-column label="ID">
                                        <template #default="scope">
                                            {{scope.$index}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="text" label="标签名" />
                                    <el-table-column label="标签颜色">
                                        <template #default="scope">
                                            <div :style="{width: '25px',height:'25px',background:scope.row.color}">
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="使用">
                                        <template #default="scope">
                                            <el-button :icon="Plus" circle @click="addLabel(scope.$index)">
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <div class="label-input">
                                    <!-- 标题 -->
                                    <div class="input-title">
                                        新标签
                                    </div>
                                    <!-- 输入框 -->
                                    <el-input v-model="newLabel" placeholder="输入新标签" />
                                    <!-- 按钮 -->
                                    <el-button plain @click="addLabel(0,true)">添加</el-button>
                                </div>
                            </div>
                            <div class="right-area">
                                <el-table :data="projectData.labelCategories" style="width: 100%" height="200">
                                    <el-table-column label="ID">
                                        <template #default="scope">
                                            {{scope.$index}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="text" label="标签名" />
                                    <el-table-column label="标签颜色">
                                        <template #default="scope">
                                            <el-color-picker v-model="scope.row.color" />
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作">
                                        <template #default="scope">
                                            <el-button :icon="Delete" circle
                                                @click="deleteLabelOrConnection(scope.$index)" />
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </div>
                    <!-- connection设置 -->
                    <div class="connection-setting">
                        <div class="connection-title">
                            <div class="title">
                                关系设置
                            </div>
                            <div class="open-connection">
                                <el-button @click="showConnectionSetting=!showConnectionSetting" :icon="Plus" circle />
                            </div>
                        </div>
                        <div class="single-connection" v-if="showConnectionSetting">
                            <!-- 左侧 -->
                            <div class="left-area-connection">
                                <el-table :data="defaultConnectionCategories" style="width: 100%" height="200">
                                    <el-table-column label="ID">
                                        <template #default="scope">
                                            {{scope.$index}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="text" label="关系名称" />
                                    <el-table-column label="使用">
                                        <template #default="scope">
                                            <el-button :icon="Plus" circle @click="addConnection(scope.$index)">
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <div class="connection-input">
                                    <!-- 标题 -->
                                    <div class="input-title">
                                        新关系
                                    </div>
                                    <!-- 输入框 -->
                                    <el-input v-model="newConnection" placeholder="输入新关系" />
                                    <!-- 按钮 -->
                                    <el-button plain @click="addConnection(0,true)">添加</el-button>
                                </div>
                            </div>
                            <!-- 右侧 -->
                            <div class="right-area-connection">
                                <el-table :data="projectData.connectionCategories" style="width: 100%" height="250">
                                    <el-table-column label="ID">
                                        <template #default="scope">
                                            {{scope.$index}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="text" label="关系名称" />
                                    <el-table-column label="操作">
                                        <template #default="scope">
                                            <el-button :icon="Delete" circle
                                                @click="deleteLabelOrConnection(scope.$index,true)" />
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 数据导入 -->
                <div class="project-data" v-if="activeStep==2">
                    <!-- 拖拽上传 -->
                    <el-upload class="upload-box" drag :auto-upload="false" action="" multiple :show-file-list="false"
                        :on-change="loadTextFromFile">
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
                        <el-table :data="projectData.data" style="width: 100%" height="200">
                            <el-table-column prop="fileName" label="文件名" />
                            <el-table-column prop="fileContent" label="文本内容" show-overflow-tooltip />
                            <el-table-column label="操作">
                                <template #default="scope">
                                    <el-button size="small" type="danger" @click="handleFileDelete(scope.$index)">删除文件
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <!-- 完成配置 -->
                <div class="project-ready" v-if="activeStep==3">
                    已完成所有配置,请保存！
                </div>
                <!-- 步骤 -->
                <div class="to-left">
                    <el-button type="info" @click="activeStep--" v-if="activeStep!==0">
                        <el-icon class="el-icon--right" :size="25">
                            <Back />
                        </el-icon>
                    </el-button>
                </div>
                <div class="to-right">
                    <el-button type="info" @click="activeStepAdd" v-if="activeStep!==3">
                        <el-icon class="el-icon--right" :size="25">
                            <Right />
                        </el-icon>
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </main>
</template>
 
<script lang='ts' setup>
import { useFileReader } from '@/hooks/useFileReader '
import { UploadFilled, Back, Right, Plus, Delete } from '@element-plus/icons-vue'
import { ElMessage, UploadFile, ElNotification } from 'element-plus';
import { ref, reactive, inject, watch, Ref } from 'vue'
import { annotationProjectStore } from '@/store/annotationProject'
const openDialog = inject('openDialog')
const activeStep = ref<number>(0)
const activeStepAdd = () => {
    if (activeStep.value === 2 && projectData.name === '') {
        // 校验
        ElMessage.error('请设置项目名称')
    } else {
        activeStep.value++
    }

}
//项目数据
const projectData = reactive({
    name: '',
    description: '',
    date: '',
    data: [] as { fileName: string; fileContent: string }[],
    labelCategories: [] as { text: string; color: string }[],
    connectionCategories: [] as { text: string }[]

})
const formRule = reactive({
    name: [
        { required: true, message: '请输入项目名称', trigger: 'blur' },
    ]
})
/**
 * 项目设置
 */
const defaultLabelCategories = [
    {
        "text": "B-LOC",
        "color": "#95e1d3",
    },
    {
        "text": "I-LOC",
        "color": "#eaffd0",
    },
    {
        "text": "E-LOC",
        "color": "#fce38a",
    },
    {
        "text": "B-ORG",
        "color": "#fcbad3",
    },
    {
        "text": "I-ORG",
        "color": "#aa96da",
    },
    {
        "text": "E-ORG",
        "color": "#ffffd2",
    },
    {
        "text": "B-PER",
        "color": "#ff7e67",
    },
    {
        "text": "I-PER",
        "color": "#a7ff83",
    },
    {
        "text": "E-PER",
        "color": "#ff5335",
    },
    {
        "text": "B-LEAGUE",
        "color": "#f25d9c",
    },
    {
        "text": "I-LEAGUE",
        "color": "#b61aae",
    },
    {
        "text": "E-LEAGUE",
        "color": "#590d82",
    },
    {
        "text": "B-TEAM",
        "color": "#d4a5a5",
    },
    {
        "text": "I-TEAM",
        "color": "#ff6464",
    },
    {
        "text": "E-TEAM",
        "color": "#ffbd39",
    },
    {
        "text": "B-RANK",
        "color": "#f1c40f",
    },
    {
        "text": "I-RANK",
        "color": "#0245a3",
    },
    {
        "text": "E-RANK",
        "color": "#7e80ff",
    },
    {
        "text": "O",
        "color": "#757a79",
    }
]
const defaultConnectionCategories = [
    {
        text: "某种关系1"
    },
    {
        text: "某种关系2"
    },
    {
        text: "某种关系3"
    },
    {
        text: "某种关系4"
    },
]
const newLabel = ref<string>('')
const addLabel = (index: number, add: boolean = false) => {
    if (!add) {
        const isExisted = projectData.labelCategories.findIndex(item => item.text === defaultLabelCategories[index].text)
        if (isExisted === -1) {
            projectData.labelCategories.push({
                text: defaultLabelCategories[index].text,
                color: defaultLabelCategories[index].color
            })
        } else {
            ElMessage.info('已存在此标签,请勿重复添加！')
        }
    } else {
        if (newLabel.value === '') return
        const isExisted = projectData.labelCategories.findIndex(item => item.text === newLabel.value)
        if (isExisted === -1) {
            projectData.labelCategories.push({
                text: newLabel.value,
                color: '#95e1d3'
            })
            newLabel.value = ''
        } else {
            ElMessage.info('已存在此标签,请勿重复添加！')
        }
    }
}
const showConnectionSetting = ref<boolean>(false)
const newConnection = ref<string>('')
const addConnection = (index: number, add: boolean = false) => {
    if (add === false) {
        const isExisted = projectData.connectionCategories.findIndex(item => item.text === defaultConnectionCategories[index].text)
        if (isExisted === -1) {
            projectData.connectionCategories.push({
                text: defaultConnectionCategories[index].text,
            })
        } else {
            ElMessage.info('已存在此关系,请勿重复添加！')
        }
    } else {
        if (newConnection.value === '') return
        const isExisted = projectData.connectionCategories.findIndex(item => item.text === newConnection.value)
        if (isExisted === -1) {
            projectData.connectionCategories.push({
                text: newConnection.value
            })
            newConnection.value = ''
        } else {
            ElMessage.info('已存在此关系,请勿重复添加！')
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
const loadTextFromFile = (uploadFile: UploadFile) => { //读取文件内容
    const file = uploadFile.raw
    if (!file) return;
    setImmediate(() => {
        useFileReader(file, (r: string) => projectData.data.push({
            fileName: file.name,
            fileContent: r
        }))
    })
}
const handleFileDelete = (index: number) => {
    projectData.data.splice(index, 1)
}

//保存项目
const projectStore = annotationProjectStore()
const saveProject = () => {
    const nowDate = new Date()
    projectData.date = `${nowDate.getFullYear()}-${nowDate.getMonth() + 1}-${nowDate.getDate()} ${nowDate.getHours()}:${nowDate.getMinutes()}`
    projectStore.createAnnotationProject(projectData);
    (openDialog as Ref<boolean>).value = false
    ElNotification.success({
        title: '项目创建',
        message: '成功创建项目',
    })
    // 清除数据
    projectData.name = ''
    projectData.data = []
    projectData.description = ''
    projectData.connectionCategories = []
    projectData.labelCategories = []
    activeStep.value = 0
}
</script>
 
<style scoped lang="less">
.create-project {
    ::v-deep .el-dialog {
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
    position: sticky;
    top: 0;

    .step-container {
        width: 60%;
    }
}

.content-wapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    max-height: 100%;
    overflow: auto;

    .project-name {
        width: 30%;

        .form-item ::v-deep .el-form-item__label {
            font-size: 18px;
        }
    }

    .project-config {
        box-sizing: border-box;
        padding: 0 2%;
        width: 80%;
        border-left: 1px solid #dcdfe6;
        border-right: 1px solid #dcdfe6;

        .label-setting {
            &::before {
                content: "标签设置";
                display: block;
                font-size: 20px;
                font-weight: 500px;
                border-bottom: 1px solid #000;
                width: 100%;
                padding-bottom: 10px;
            }

            .single-label {
                display: flex;
                box-sizing: border-box;
                justify-content: space-between;
                margin-top: 2%;

                .left-area {
                    width: 50%;

                    &::before {
                        content: "添加默认标签或输入新标签";
                        display: block;
                        font-size: 15px;
                        font-weight: 500px;
                        width: 100%;
                        padding-bottom: 10px;
                    }

                    .label-input {
                        margin-top: 20px;
                        display: flex;
                        align-items: center;
                        box-sizing: border-box;

                        .input-title {
                            font-size: 18px;
                            font-weight: 500;
                            margin-right: 5%;
                        }

                        .el-input {
                            width: 50%;
                            margin-right: 5%;
                        }
                    }
                }

                .right-area {
                    width: 40%;

                    &::before {
                        content: "已添加标签";
                        display: block;
                        font-size: 15px;
                        font-weight: 500px;
                        width: 100%;
                        padding-bottom: 10px;
                    }
                }
            }
        }

        .connection-setting {
            margin-top: 2%;

            .connection-title {
                display: flex;
                box-sizing: border-box;
                font-size: 20px;
                font-weight: 500px;
                border-bottom: 1px solid #000;
                width: 100%;
                padding-bottom: 10px;

                .title {
                    margin-right: 2%;
                }

                .open-connection {
                    .el-button {
                        height: 80%;
                        width: 80%;
                    }
                }
            }

            .single-connection {

                display: flex;
                box-sizing: border-box;
                justify-content: space-between;
                margin-top: 2%;

                .left-area-connection {
                    width: 50%;

                    .connection-input {
                        margin-top: 20px;
                        display: flex;
                        align-items: center;
                        box-sizing: border-box;

                        .input-title {
                            font-size: 18px;
                            font-weight: 500;
                            margin-right: 5%;
                        }

                        .el-input {
                            width: 50%;
                            margin-right: 5%;
                        }
                    }
                }

                .right-area-connection {
                    width: 40%;

                    &::before {
                        content: "已添加关系";
                        display: block;
                        font-size: 15px;
                        font-weight: 500px;
                        width: 100%;
                        padding-bottom: 10px;
                    }
                }
            }

        }
    }

    .project-data {
        width: 60%;

        .upload-box {
            width: 100%;
        }
    }

    .to-left {
        position: fixed;
        top: 50%;
        left: 5%;
        width: 65px;
        height: 65px;

        .el-button {
            height: 100%;
            width: 100%;
        }
    }

    .to-right {
        position: fixed;
        top: 50%;
        right: 5%;
        width: 65px;
        height: 65px;

        .el-button {
            height: 100%;
            width: 100%;
        }
    }
}
</style>