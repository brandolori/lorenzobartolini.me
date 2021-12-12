import { MutableRefObject, useEffect, useState } from "react";

export default (ref: MutableRefObject<HTMLElement>) => {
    const [pos, setPos] = useState(0)
    useEffect(() => {
        const el = ref.current
        const callback = () => {
            setPos(window.scrollY / (el.scrollHeight - el.clientHeight));
        }
        // console.table({
        //     scroll: el.scrollHeight,
        //     client: el.clientHeight,
        //     scrollY,
        //     pos
        // })
        window.addEventListener("scroll", callback)
        return () => window.removeEventListener("scroll", callback)
    })
    return pos
}
