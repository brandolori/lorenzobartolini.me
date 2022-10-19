export default (ms = 100) => {
    console.log("CREATE")
    let timeout;
    let latestCallback: () => void
    return (cb: () => void) => {
        latestCallback = cb
        if (!timeout)
            timeout = setTimeout(() => {
                latestCallback()
                timeout = undefined
            }, ms)
    }
}