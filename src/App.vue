<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component v-if="route.meta && route.meta.keepAlive" :is="Component" />
    </keep-alive>
    <component v-if="!(route.meta.keepAlive)" :is="Component" />
  </router-view>
</template>
 
 
<script lang='ts' setup>
import { useRoute } from "vue-router";
const route = useRoute();
</script>
 
<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}

body,
html {
  width: 100%;
  height: 100%;
  font-family: Avenir, -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  scroll-behavior: smooth;
}
</style>