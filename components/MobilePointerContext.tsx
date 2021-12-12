import { useEffect, useRef, useState } from "react"
import { normalize } from "../src/common"
import PointerContext from "../src/PointerContext"
import useScrollPosition from "../src/useScrollPosition"

export default ({ children }) => {
    const [pointer, setPointer] = useState({ x: 0, y: 0 })
    const scrollref = useRef()
    const scrollPosition = useScrollPosition(scrollref)

    useEffect(() => {
        setPointer({ x: 0, y: normalize(scrollPosition, 1) })
    }, [scrollPosition])

    return <div ref={scrollref} style={{ width: "100%", height: "100%" }}
    >
        <PointerContext.Provider value={pointer}>
            {children}
        </PointerContext.Provider>
    </div >
}