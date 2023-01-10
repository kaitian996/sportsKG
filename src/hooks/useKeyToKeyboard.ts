const keyboardMap = {
    autoKey: "1234567890".split(""),
    signalKey: "qwertyuiopasdfghjklzxcvbnm".split(""),
    connectKey: "QWERTYUIOPASDFGHJKLZXCVBNM".split(""),
}

export const useKeyToKeyboard = (
    from: any[],
    type: "autoKey" | "signalKey" | "connectKey"
) => {
    const keyMap = keyboardMap[type]
    const output: {
        type: "autoKey" | "signalKey" | "connectKey"
        value: string | number
        ref: string
    }[] = []
    for (let i = 0; i < from.length; i++) {
        if (i < keyMap.length) {
            //如果有id
            if (from[i].id !== undefined) {
                output.push({
                    type,
                    value: from[i].id,
                    ref: keyMap[i],
                })
            } else {
                //没有id有text
                output.push({
                    type,
                    value: from[i].text,
                    ref: keyMap[i],
                })
            }
        } else {
            output.push({
                type,
                value: from[i].id,
                ref: "",
            })
        }
    }
    return output
}
