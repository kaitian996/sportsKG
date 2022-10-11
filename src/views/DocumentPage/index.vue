<template>
  <div>
    <Header :isWhiteImage="false" :isWhiteText="'#0069c2'" class="head-wapper"></Header>
    <main class="content-wapper">
      <section class="left-menus">
        <el-menu default-active="0" :default-openeds="['0']" @select="handleSelectMenu" class="menus-wapper">
          <el-menu-item index="0">
            <el-icon>
              <location />
            </el-icon>
            <span>知识图谱</span>
          </el-menu-item>
          <el-menu-item index="1">
            <el-icon>
              <icon-menu />
            </el-icon>
            <span>数据标注</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon>
              <document />
            </el-icon>
            <span>待补充</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon>
              <setting />
            </el-icon>
            <span>待补充</span>
          </el-menu-item>
        </el-menu>
      </section>
      <section class="article-content-wapper">
        <div class="article-item-wapper" v-if="currentArticleIndex===0">
          <!-- 实体 -->
          <section class="article-content" :ref="trackPointRef">
            <h1>实体</h1>
            <p style="height:500px"></p>
          </section>
          <!-- 关系-->
          <section class="article-content" :ref="trackPointRef">
            <h1>关系</h1>
            <p style="height:500px"></p>

          </section>
          <!-- 三元组-->
          <section class="article-content" :ref="trackPointRef">
            <h1>三元组</h1>
            <p style="height:500px"></p>

          </section>
          <!-- 知识图谱-->
          <section class="article-content" :ref="trackPointRef">
            <h1>知识图谱</h1>
            <p style="height:500px"></p>

          </section>
          <!-- 应用领域-->
          <section class="article-content" :ref="trackPointRef">
            <h1>应用领域</h1>
            <p style="height:500px"></p>

          </section>
        </div>
        <div class="article-item-wapper" v-if="currentArticleIndex===1">
          <!-- 实体抽取 -->
          <section class="article-content" :ref="trackPointRef">
            <h1>实体抽取</h1>
            <p style="height:500px"></p>
          </section>
          <!-- 关系抽取 -->
          <section class="article-content" :ref="trackPointRef">
            <h1>关系抽取</h1>
            <p style="height:500px"></p>

          </section>
          <!-- 建立三元组 -->
          <section class="article-content" :ref="trackPointRef">
            <h1>建立三元组</h1>
            <p style="height:500px"></p>

          </section>
        </div>
        <footer class="article-footer" style="height:500px"></footer>
      </section>
      <section class="right-menus">
        <!-- 导航 -->
        <div class="article-navigate">
          <li :class="pointIsActiveIndex===index? 'point-item-active':null" class="point-item"
            v-for="(item,index) in navigateList[currentArticleIndex]" :key="index" @click="toArticlePointView(index)">{{
            item }}</li>
        </div>
      </section>
    </main>
  </div>
</template>
 
 
<script lang='ts' setup>
import Header from '@/components/Header/index.vue'
import {Document,Menu as IconMenu,Location,Setting} from '@element-plus/icons-vue'
import { ref, reactive, watch, nextTick, onMounted, onUnmounted } from 'vue'
//索引
const currentArticleIndex=ref<number>(0)
const handleSelectMenu=(index: string)=>{
  currentArticleIndex.value=Number(index)
}
watch(()=>currentArticleIndex.value,()=>{
  //清空articlePointRef
  articlePointRef.value.length=0
  //回到顶部
  window.scrollTo({
    top:0,
    behavior:'auto'
  })
  
})
//收集文章的articleref
const articlePointRef=ref<HTMLElement[]>([])
const trackPointRef=(el:any)=>{
  if(el!==null) {
    articlePointRef.value.push(el)
  }
  console.log('收集dom');
  
}
//跳转到此锚点
const toArticlePointView = (index: number) => {
  if(!articlePointRef.value[index]) return
  articlePointRef.value[index].scrollIntoView()  
}
//导航激活状态
const pointIsActiveIndex=ref<number>(0)
//导航列表
const navigateList: string[][]=[
  ['实体','关系','三元组','知识图谱','应用领域'],
  ['实体抽取','关系抽取','建立三元组']
  ]
//监听滚动事件+防抖
let timeInter: any
const whenScroller = () => {
  clearTimeout(timeInter)
  timeInter = setTimeout(() => {
    articlePointRef.value.forEach((item, index) => {
      if (item.getBoundingClientRect().top <= 0 && item.getBoundingClientRect().top > -item.offsetHeight) {
        pointIsActiveIndex.value = index
      }
    })
    if (articlePointRef.value[0].getBoundingClientRect().top > 0) {
      pointIsActiveIndex.value = 0
    }
    if(articlePointRef.value.slice(-1)[0].getBoundingClientRect().top<-articlePointRef.value.slice(-1)[0].offsetHeight) {
      pointIsActiveIndex.value = articlePointRef.value.length-1
    }
    console.log('index',pointIsActiveIndex.value);
    
  }, 50)
}
onMounted(() => {
  window.addEventListener('scroll', whenScroller)
})
onUnmounted(() => {
  window.removeEventListener('scroll', whenScroller)
})
</script>
 
<style scoped lang="less">
.head-wapper {
  box-shadow: 0 2px 8px #f0f1f2;
}

.content-wapper {
  display: flex;
  box-sizing: border-box;
  margin-top: 24px;
  align-items: flex-start;
  justify-content: space-between;
}

.left-menus {
  width: 20%;
  box-sizing: border-box;
  height: 100vh;
  position: sticky;
  top: 0;

  .menus-wapper {
    height: 100%;
  }
}

.article-content-wapper {
  width: 60%;
  box-sizing: border-box;
  padding-top: 48px;

  .article-item-wapper {
    min-height: 100vh;
    width: 100%;
    box-sizing: border-box;

    .article-content {
      box-sizing: border-box;
      width: 100%;

      h1 {
        margin: 0 0 32px;
        font-size: 39px;
      }
    }
  }
}

.right-menus {
  width: 15%;
  box-sizing: border-box;
  height: 100vh;
  position: sticky;
  top: 0;

  .article-navigate {
    box-sizing: border-box;
    padding-right: 50px;

    .point-item {
      display: block;
      height: 30px;
      cursor: pointer;
      font-size: 14px;
      position: relative;
      padding: 10px 10px;
      border-left: solid 2px #dcdfe6;
      line-height: 30px;
    }

    .point-item-active {
      background: #0085f230;
      border-left: solid 2px #0069c2;
      font-weight: 600;
      color: #1b1b1b;
    }
  }
}
</style>