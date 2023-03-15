export type ChatList = {
    theme: string
    messages: {
        role: "user" | "assistant"
        content: string
    }[]
}
