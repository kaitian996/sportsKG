import { ChatList } from "@/views/ChatPage/type"
import { defineStore } from "pinia" // 定义容器

export const chatGptStore = defineStore("chatgpt", {
    state() {
        return {
            chatList: [] as ChatList[],
        }
    },
    persist: true,
})
