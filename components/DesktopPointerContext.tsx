import { PointerEventHandler, useEffect, useRef, useState } from "react"
import { normalize } from "../src/common"
import createDebouncer from "../src/createDebouncer"
import PointerContext from "../src/PointerContext"

export default ({ children }) => {
    const [pointer, setPointer] = useState({ x: 0, y: 0 })
    const debouncer = createDebouncer()
    const handlePointerMove: PointerEventHandler<HTMLDivElement> = (e) => {
        debouncer(() => {
            setPointer({
                x: normalize(e.clientX, window.innerWidth),
                y: -normalize(e.clientY, window.innerHeight)
            })
        })
    }

    return <div style={{ width: "100%", height: "100%" }}
        onPointerMove={handlePointerMove}>
        <PointerContext.Provider value={pointer}>
            {children}
        </PointerContext.Provider>
    </div >
}