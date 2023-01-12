<template></template>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
    beforeRouteEnter(to, from, next) {
        if (from.path === "/textAnnotation") {
            const query = to.query
            next((vm) => {
                vm.$router.replace({
                    path: "/textAnnotation",
                    query: query,
                })
            })
        }
    },
})
</script>

<style scoped></style>
