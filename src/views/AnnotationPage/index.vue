<template>
    <main class="annotation-page-contanier">
        <!-- 左侧菜单 -->
        <section class="annotation-menus">
            <!-- 开关按钮 -->
            <div class="open-icon" @click="isCollapse=!isCollapse">
                <el-icon :color="'#dcdfe6'" :size="25" v-if="!isCollapse" class="icon-item">
                    <Fold />
                </el-icon>
                <el-icon :color="'#dcdfe6'" :size="25" v-if="isCollapse" class="icon-item">
                    <Expand />
                </el-icon>
            </div>

            <el-menu router default-active="home" class="menus-wapper" :collapse="isCollapse">
                <el-menu-item index="home">
                    <el-icon>
                        <Document />
                    </el-icon>
                    <template #title>
                        首页
                    </template>
                </el-menu-item>
                <el-menu-item index="annotation-project">
                    <el-icon>
                        <Setting />
                    </el-icon>
                    <template #title>项目管理</template>
                </el-menu-item>
                <el-menu-item index="text-annotation">
                    <el-icon>
                        <Location />
                    </el-icon>
                    <template #title>文本标注</template>
                </el-menu-item>
                <el-menu-item index="annotation-database">
                    <el-icon>
                        <IconMenu />
                    </el-icon>
                    <template #title>数据管理</template>
                </el-menu-item>
            </el-menu>
        </section>
        <!--右侧路由展示 -->
        <section class="annotation-content">
            <router-view></router-view>
        </section>
    </main>
</template>
 
 
<script lang='ts' setup>
import { Document, Menu as IconMenu, Location, Setting, Fold, Expand, ArrowDown } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
//是否折叠
const isCollapse = ref<boolean>(false)

</script>
 
<style scoped lang="less">
.annotation-page-contanier {
    display: flex;
    box-sizing: border-box;
}

.annotation-menus {
    padding-top: 40px;
    position: sticky;
    top: 0;
    height: 100vh;
    box-sizing: border-box;
    border-right: solid 1px #dcdfe6;
    .open-icon {
        position: absolute;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        top: 0;
        width: 100%;
        z-index: 5;
        border-bottom: solid 1px #dcdfe6;

        &:hover {
            background: rgba(0, 0, 0, .025);
        }
    }

    .menus-wapper {
        font-size: 25px;
        border: none;
        &:not(.el-menu--collapse) {
            width: 200px;
            min-height: 400px;
        }
    }
}

.annotation-content {
    flex-grow: 1;
    max-height: 100vh;
    overflow: auto;
}
</style>