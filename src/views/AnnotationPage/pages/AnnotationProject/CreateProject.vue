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
                        <el-button type="primary" plain :disabled="activeStep!==3">保存</el-button>
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

                    </div>
                    <!-- connection设置 -->
                    <div class="connection-setting">

                    </div>
                    <!-- 文件导入导出设置 -->
                    <div class="file-setting">

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
                    <el-button type="info" @click="activeStep++" v-if="activeStep!==3">
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
import { UploadFilled, Back, Right } from '@element-plus/icons-vue'

import { UploadFile, UploadFiles } from 'element-plus';
import { ref, reactive, inject, watch } from 'vue'
const openDialog = inject('openDialog')
const activeStep = ref<number>(0)
//项目数据
const projectData = reactive({
    name: '',
    description: '',
    data: [] as { fileName: string; fileContent: string }[]

})
const formRule = reactive({
    name: [
        { required: true, message: '请输入项目名称', trigger: 'blur' },
    ]
})

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
</script>
 
<style scoped lang="less">
.step-warpper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: solid 1px #dcdfe6;

    .step-container {
        width: 60%;
    }
}

.content-wapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    .project-name {
        width: 30%;

        .form-item ::v-deep .el-form-item__label {
            font-size: 18px;
        }
    }

    .project-config {
        box-sizing: border-box;
        padding: 0 2%;
        height: 500px;
        width: 80%;
        border-left: 1px solid #3c64c1;
        border-right: 1px solid #3c64c1;

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
        }
        .connection-setting{
            &::before {
                content: "关系设置";
                display: block;
                font-size: 20px;
                font-weight: 500px;
                border-bottom: 1px solid #000;
                width: 100%;
                padding-bottom: 10px;
            }
        }
        .file-setting{
            &::before {
                content: "文件导出设置";
                display: block;
                font-size: 20px;
                font-weight: 500px;
                border-bottom: 1px solid #000;
                width: 100%;
                padding-bottom: 10px;
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