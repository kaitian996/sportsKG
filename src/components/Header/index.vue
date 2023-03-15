<template>
  <header class="top-header">
    <div class="top-container">
      <div class="top-left-container">
        <a href="">
          <img :src="props.isWhiteImage?  imgList[0]:imgList[1]" alt="logo">
        </a>
        <span>
        </span>
        <h2 :style="{color:props.isWhiteText}">
          知识图谱
        </h2>
      </div>
      <nav class="top-nav-container">
        <ul class="menus">
          <li :class="currentPath === '/' ? 'isCurrent' : ''" @click="navigate.push('/')"><span>首页</span></li>
          <li :class="currentPath === '/search' ? 'isCurrent' : ''" @click="navigate.push('/search')">
            <span>数据知识图谱</span>
          </li>
          <li :class="currentPath === '/chat' ? 'isCurrent' : ''" @click="navigate.push('/chat')">
            <span>聊天机器人</span>
          </li>
          <li :class="currentPath === '/annotation' ? 'isCurrent' : ''" @click="navigate.push('/annotation')">
            <span>数据标注</span>
          </li>
          <li :class="currentPath === '/document' ? 'isCurrent' : ''" @click="navigate.push('/document')">
            <span>文档</span>
          </li>
          <li class="top-right-container">
            <a href="https://github.com/suanzi-yi/Struct-Data-Analyse-System.git" target="_blank">
              <svg t="1657152865382" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="3109" width="30" height="30">
                <path
                  d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9 23.5 23.2 38.1 55.4 38.1 91v112.5c0.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"
                  p-id="3110"></path>
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>

</template>
 
 
<script lang='ts' setup>
import { useRoute, useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
import { ref, reactive, onMounted } from 'vue'
const props = defineProps<{
  isWhiteImage: boolean,
  isWhiteText: string,
}>()
const imgList = [
  require('../../assets/logo/logo.png'),
  require('../../assets/logo/logo2.png'),
]
const navigate = useRouter()
const router = useRoute()
const currentPath: string = router.path


</script>
 
<style scoped lang="less">
//header的菜单颜色
@menusColor: #0069c2;

.top-header {
  width: 100%;
}

.top-container {
  display: flex;
  height: 64px;
  align-items: center;
  justify-content: space-between;
  // line-height: 64px;
  margin: 0 40px;
  color: #697b8c;
  // font-size: 18px;

  //左侧容器
  .top-left-container {
    height: 100%;
    line-height: 64px;
    text-align: center;
    display: flex;
    justify-items: center;
    align-items: center;

    img {
      vertical-align: middle;
      width: 75%;
      // color: black;
    }

    &>span {
      margin: 0 20px;
      background-color: @menusColor;
      width: 2px;
      height: 24px;
      display: inline-block;
      vertical-align: middle;
    }

    &>h2 {
      font-size: 18px;
      margin: 0;
      color: #fff;
      white-space: nowrap;
    }
  }

  //导航栏容器
  .top-nav-container {
    display: flex;
    align-items: center;

    .menus {
      display: flex;
      justify-content: center;
      align-items: center;

      // 根据路径激活菜单
      .isCurrent {
        color: @menusColor;
      }

      li {
        font-size: 18px;
        display: block;
        margin-right: 28px;
        position: relative;
        cursor: pointer;

        &:hover {
          color: @menusColor;
        }

        span {
          display: block;

          &:hover::after {
            background-color: @menusColor;
            content: "";
            display: block;
            height: 5px;
            position: absolute;
            bottom: -40%;
            width: 100%;
          }
        }
      }
    }
  }

  .top-right-container {
    display: flex;
    align-items: center;
    justify-content: center;

    a {
      display: block;
      height: 100%;

      .icon {
        vertical-align: middle;
        position: relative;
        top: 0;
        fill: #697b8c;

        &:hover {
          path {
            fill: @menusColor;
          }
        }
      }
    }

  }
}
</style>