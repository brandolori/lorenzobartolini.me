import { MutableRefObject, useEffect, useState } from "react"
import createDebouncer from "./createDebouncer"

export default (ref: MutableRefObject<HTMLElement>) => {
    const [pos, setPos] = useState(0)

    useEffect(() => {
        const debouncer = createDebouncer()
        const callback = () => {
            debouncer(() => {
                setPos(window.scrollY / (ref.current.scrollHeight - ref.current.clientHeight))
            })
        }
        window.addEventListener("scroll", callback)

        return () => window.removeEventListener("scroll", callback)
    }, [ref])
    return pos
}
