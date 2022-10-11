<template>
  <section class="tag-view">
    <span class="title">
      已搜索实体:
    </span>
    <ul class="tag-wapper">
      <li v-for="(item, index) in store.entityGraphData" :key="index" :ref="collectLiRef"
        :class="['tag-item', props.currentEntityIndex === index ? 'tag-item-active' : '']"
        @click="emit('update:currentEntityIndex', index)">
        <div class="left-point">
        </div>
        <p class="content">
          {{ item.entityName }}
        </p>
        <span class="right-click" @click.stop="removeCurrentIndex(index)">
          <el-icon>
            <Close />
          </el-icon>
        </span>
      </li>
    </ul>
  </section>
</template>
 
 
<script lang='ts' setup>
import { ref, reactive, nextTick, onMounted, inject } from 'vue'
import { Close } from '@element-plus/icons-vue'
import { useSearchEntity } from '@/store'
import { ElMessage } from 'element-plus';
const searchState = inject<{
  isNotSearch: boolean;
  isManyEntity: boolean;
  isSearched: boolean;
  isNotEntity: boolean;
}>('searchState', { isNotSearch: false, isManyEntity: false, isSearched: true, isNotEntity: false })
const store = useSearchEntity()
const props = defineProps<{
  currentEntityIndex: number
}>()
const emit = defineEmits<{
  (event: 'update:currentEntityIndex', currentEntityIndex: number): void
}>()
const removeCurrentIndex = (index: number) => {
  const delCurrentIndex = (index: number) => {
    //删除最后
    if (index === store.entityGraphData.length) {
      emit('update:currentEntityIndex', index - 1)
    }
  }
  const delOtherIndex = (index: number) => {
    //向前移动一位
    if (index < props.currentEntityIndex) {
      emit('update:currentEntityIndex', props.currentEntityIndex - 1)
    }
  }
  //直接删除选中索引
  if (store.entityGraphData.length > 1) {
    store.entityGraphData.splice(index, 1)
    //修改currentEntityIndex
    if (index === props.currentEntityIndex) {
      delCurrentIndex(index)
    } else if (index !== props.currentEntityIndex) {
      delOtherIndex(index)
    }
  }
  else if (store.entityGraphData.length === 1) {
    searchState.isSearched = false
    searchState.isNotSearch = true
    window.scrollTo(0, 0)
    ElMessage.info('已删除最后一个记录！')

  }
}
const LiRef = ref<HTMLElement[]>([])
const collectLiRef = (el: any) => {
  LiRef.value.push(el as HTMLElement)
}
onMounted(() => {
  setImmediate(() => {
    LiRef.value.slice(-1)[0].scrollIntoView()
  })
})
</script>
 
<style scoped lang="less">
.tag-view {
  height: 100%;
  width: 100%;
  background: #fff;
  display: flex;

  .title {
    text-align: center;
    font-size: 15px;
    font-weight: 550;
    width: 10%;
    vertical-align: middle;
    line-height: 64px;
  }

  .tag-wapper {
    height: 100%;
    width: 90%;
    display: flex;
    flex-wrap: nowrap;
    flex-flow: row;
    overflow-x: auto;
    justify-content: flex-start;
    align-items: center;

    /*滚动条样式*/
    &::-webkit-scrollbar {
      // width: 4px;
      height: 7px;
    }

    .tag-item {
      flex: none;
      width: 200px;
      display: flex;
      flex-wrap: nowrap;
      cursor: pointer;
      height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      align-items: center;
      justify-content: space-between;

      .left-point {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #fff;
        margin-right: 5px;
        display: none;
        flex: none;
      }

      .content {
        line-height: 26px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex-grow: 1;
      }

      .right-click {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        text-align: center;
        transition: all .3s cubic-bezier(.645, .045, .355, 1);
        transform-origin: 100% 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          background: #b4bccc;
        }

        .el-icon {
          vertical-align: 10px;
        }
      }
    }

    .tag-item-active {
      background-color: #42b983;
      color: #fff;
      border-color: #42b983;

      .left-point {
        display: block;
      }
    }
  }
}
</style>