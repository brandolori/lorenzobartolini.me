export default (ms = 100) => {
    let timeout
    let latestCallback
    return (cb: () => void) => {
        // console.log("DEBOUNCE")
        latestCallback = cb
        if (!timeout)
            timeout = setTimeout(() => {
                // console.log("CALL")
                latestCallback()
                timeout = undefined
            }, ms)
    }
}