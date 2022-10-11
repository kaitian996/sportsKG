<template>
    <main class="search-home-container">
        <Header :isWhiteImage="false" :isWhiteText="'#0069c2'" class="head-wapper"></Header>
        <!-- 视频背景 -->
        <video class="background_video" autoplay loop muted playbackRate="1">
            <source src="./video/bg.mp4" type="video/mp4">
        </video>
        <!-- 输入框 -->
        <div class="input-warpper">
            <!-- 背景标题 -->
            <p class="animate__animated animate__fadeInDown">知识图谱搜索</p>
            <!-- 输入框 -->
            <div class="input-box animate__animated animate__fadeIn">
                <input type="text" placeholder="输入搜索词或主题" v-model="inputSearch" @keyup.enter="getSearchEntity">
                <span @click="inputSearch = ''" class="delete-icon"><svg t="1657855668772" class="icon"
                        viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5125">
                        <path
                            d="M547.2 512l416-416c9.6-9.6 9.6-25.6 0-35.2s-25.6-9.6-35.2 0l-416 416-416-416c-9.6-9.6-25.6-9.6-35.2 0s-9.6 25.6 0 35.2l416 416-416 416c-9.6 9.6-9.6 25.6 0 35.2s25.6 9.6 35.2 0l416-416 416 416c9.6 9.6 25.6 9.6 35.2 0s9.6-25.6 0-35.2L547.2 512z"
                            p-id="5126"></path>
                    </svg></span>
                <span @click="getSearchEntity" class="search-icon">
                    <svg t="1657855408940" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="2263">
                        <path
                            d="M511.975892 191.296945a23.234661 23.234661 0 1 0 0 46.934014 202.315808 202.315808 0 0 1 202.315808 202.315808 23.234661 23.234661 0 0 0 46.934015 0 249.191736 249.191736 0 0 0-249.249823-249.249822z"
                            fill="#515151" p-id="2264"></path>
                        <path
                            d="M1009.313805 958.389268l-172.807789-172.807789a475.032638 475.032638 0 1 0-54.369106 53.555893l173.214395 173.214396a38.16293 38.16293 0 1 0 53.9625-53.9625z m-533.11929-90.03431a393.072373 393.072373 0 1 1 393.943672-392.0849 393.072373 393.072373 0 0 1-393.943672 392.0849z"
                            fill="#515151" p-id="2265"></path>
                    </svg></span>
            </div>
            <!-- 示例 -->
                <h2 class="search-example">搜索示例:</h2>
                <ul class="input-example animate__animated animate__bounce">
                    <li @click="inputSearch = item" v-for="(item, index) in inputExample" :key="index">{{ item }}</li>
                </ul>
        </div>
    </main>
</template>
 
 
<script lang='ts' setup>
import Header from '@/components/Header/index.vue'
import { ref, reactive, onMounted } from 'vue'
//输入逻辑块
const inputSearch = ref<string | number>('')
const inputExample = reactive<string[]>(['梅西', '内马尔', '马拉多纳', '罗纳尔多', '贝克汉姆', '贝利', '安德雷斯', '韦恩'])
const getSearchEntity = () => {
}
</script>
 
<style scoped lang="less">
.search-home-container {
    position: relative;
    height: 100vh;
    width: 100vw;
}

.background_video {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    // top: 0;
    min-width: 100vw;
    min-height: 100vh;
    height: 100vh;
    width: 100vw;
    filter: grayscale(30%);
    z-index: -11;
    object-fit: cover;

    source {
        min-width: 100vw;
        min-height: 100vh;
        height: auto;
        width: auto;
    }
}

.input-warpper {
    width: 100%;
    height: 550px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding-top: 72px;
    color: #fff;

    p {
        font-size: 44px;
        font-weight: 600;
        line-height: 56px;
        letter-spacing:2px;
        padding: 0 40px 40px;
        width: 535px;
        color: #fff;
        text-align: center;
    }

    .input-box {
        min-width: 50%;
        height: 56px;
        border-radius: 30px;
        display: flex;
        align-items: center;
        background: #fff;
        z-index: 1;
        box-shadow: 0 0 0 1px rgb(0 0 0 / 5%), 0 2px 4px 1px rgb(0 0 0 / 9%);
        border-left: 1px solid transparent;
        border-right: none;
        border-top: 1px solid transparent;
        border-bottom: 1px solid transparent;

        &:hover,
        &:focus-within {
            box-shadow: 0 0 0 1px rgb(0 0 0 / 10%), 0 2px 4px 1px rgb(0 0 0 / 18%);
            border-left: 1px solid transparent;
            border-right: none;
            border-top: 1px solid transparent;
            border-bottom: 1px solid transparent;

            .delete-icon {
                visibility: visible;
            }
        }

        input {
            height: 100%;
            width: 80%;
            border: none;
            outline: none;
            font-size: 18px;
            padding: 0 30px;
            border-top-left-radius: 30px;
            border-bottom-left-radius: 30px;
            color: rgb(113, 109, 109);
            background: #fff;
            opacity: .7;
        }

        .span-style() {
            display: block;
            height: 100%;
            width: 5%;
            z-index: 1;
            border-top-right-radius: 30px;
            border-bottom-right-radius: 30px;
            text-align: center;
            line-height: 50px;
            padding-right: 5px;
            margin-right: 3%;

            .icon {
                height: 40%;

                vertical-align: middle;
            }
        }

        .delete-icon {
            visibility: hidden;
            .span-style;
        }

        .search-icon {
            .span-style;
        }
    }
    
    .search-example {
        margin-top: 10px;
    }

    .input-example {
        display: flex;
        flex-wrap: wrap;
        max-width: 50%;
        margin-top: 50px;

        li {
            display: block;
            border: 1px solid #fff;
            min-width: 70px;
            min-height: 30px;
            text-align: center;
            border-radius: 30px;
            margin-left: 5px;
            margin-top: 5px;
            line-height: 30px;
            padding: 0 5px;
            cursor: pointer;
        }
    }
}
</style>