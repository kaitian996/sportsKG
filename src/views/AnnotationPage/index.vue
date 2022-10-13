<template>
  <main class="annotation-project-container">
    <!-- 头部的条 -->
    <div class="project-header">
      <!-- 左侧 -->
      <div class="left">
        <div class="title">
          项目总览
        </div>
      </div>
      <!-- 右侧 -->
      <div class="right">
        <el-button type="primary" @click="createAnnotationProject">创建项目</el-button>
      </div>
    </div>
    <!-- 项目主体 -->
    <div class="project-content">
      <!-- 项目主体卡片 -->
      <div class="project-item" v-for="item,index in projectStore.annotationProject">
        <!-- 上部 -->
        <div class="top-content">
          <div class="item-title">
            <div class="item-name">
              {{item.name}}
            </div>
            <div class="item-btn" @click="openMenu=!openMenu">
              <el-icon size="20px">
                <More />
              </el-icon>
            </div>
            <div class="btn-container" v-if="openMenu">
              <div class="btn" @click="toDetail">
                详情
              </div>
              <div class="btn" @click="deleteProject(index)">
                删除项目
              </div>
            </div>
          </div>
          <div class="item-info">

          </div>
        </div>
        <!-- 下部 -->
        <div class="buttom-content">
          <div class="item-description">
            {{item.description}}
          </div>
          <div class="item-date">
            {{item.date}}
          </div>
        </div>
      </div>
    </div>
    <el-empty description="暂无项目,请点击右上角创建项目" v-if="projectStore.annotationProject.length===0" />
    <!-- 创建项目的遮罩层 -->
    <CreateProject></CreateProject>
  </main>
</template>
 
 
<script lang='ts' setup>
import CreateProject from './CreateProject.vue'
import { More } from '@element-plus/icons-vue'
import { ref, reactive, provide } from 'vue'
import { annotationProjectStore } from '@/store/annotationProject'
import { ElNotification } from 'element-plus';
const projectStore = annotationProjectStore()
const createAnnotationProject = () => {
  openDialog.value = true
  openMenu.value = !openMenu.value
}
const openDialog = ref<boolean>(false)
provide('openDialog', openDialog)

// 
const openMenu = ref<boolean>(false)
const toDetail = () => {

}
const deleteProject = (index: number) => {
  projectStore.annotationProject.splice(index, 1)
  ElNotification.success({
    title: '删除项目',
    message: '删除项目成功'
  })
  openMenu.value = !openMenu.value
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
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  padding: 0 2%;
  background: #fff;
}

.project-content {
  display: flex;
  justify-content: flex-start;
  padding: 2% 1%;
  flex-wrap: wrap;
  margin: 0 auto;

  .project-item {
    margin: 2% 1%;
    height: 150px;
    width: 300px;
    border: 1px solid #dcdfe6;
    border-radius: 3px;
    transition: all 0.3s ease-in-out;
    background: #fff;
    box-sizing: border-box;
    padding: 1%;

    .top-content {
      height: 60px;
      border-bottom: solid 1px #dcdfe6;

      .item-title {
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        position: relative;

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
          width: 10%;
          flex: none;
          text-align: center;
          vertical-align: middle;
          position: relative;


        }

        .btn-container {
          text-align: left;
          font-size: 13px;
          position: absolute;
          // width: 60px;
          // height: 40px;
          right: 30px;
          top: 0;
          box-sizing: border-box;
          padding: 2px;
          border: 1px solid #dcdfe6;

          .btn {
            cursor: pointer;
            margin: 5px;

            &:hover {
              background: #dcdfe6;
            }
          }
        }
      }
    }

    .buttom-content {
      position: relative;
      box-sizing: border-box;
      max-height: 90px;
      color: #7b7b7e;

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