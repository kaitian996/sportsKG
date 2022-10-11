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
      <div class="project-item" v-for="item in projectStore.annotationProject">
        <!-- 上部 -->
        <div class="top-content">
          {{item.name}}
        </div>
        <!-- 下部 -->
        <div class="buttom-content">
          {{item.description}}
          <br>
          {{item.date}}
        </div>
      </div>
    </div>
    <el-empty description="暂无项目,请点击右上角创建项目" v-if="projectStore.annotationProject.length===0"/>
    <!-- 创建项目的遮罩层 -->
    <CreateProject></CreateProject>
  </main>
</template>
 
 
<script lang='ts' setup>
import CreateProject from './CreateProject.vue'
import { ref, reactive, provide } from 'vue'
import { annotationProjectStore } from '@/store/annotationProject'
const projectStore = annotationProjectStore()
const createAnnotationProject = () => {
  openDialog.value = true
}
const openDialog = ref<boolean>(false)
provide('openDialog', openDialog)

</script>
 
<style scoped lang="less">
.annotation-project-container {
  // background: #bfa;
  background: #f7f7f7;
  height: 100%;
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
    box-shadow: 1px 1px 7px 2px #dcdfe6;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: all 0.3s ease-in-out;
    background: #fff;

    &:hover {
      transform: translateY(-8px)
    }

    .top-content {
      height: 50%;
      border-bottom: solid 1px #dcdfe6;

    }

    .buttom-content {}
  }
}
</style>