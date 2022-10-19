import { PointerEventHandler, useCallback, useEffect, useRef, useState } from "react"
import { normalize } from "../src/common"
import createDebouncer from "../src/createDebouncer"
import PointerContext from "../src/PointerContext"

const debouncer = createDebouncer()

export default ({ children }) => {
    const [pointer, setPointer] = useState({ x: 0, y: 0 })

    const handlePointerMove: PointerEventHandler<HTMLDivElement> = useCallback((e) => {
        debouncer(() => {
            setPointer({
                x: normalize(e.clientX, window.innerWidth),
                y: -normalize(e.clientY, window.innerHeight)
            })
        })
    }, [debouncer])

    return <div style={{ width: "100%", height: "100%" }}
        onPointerMove={handlePointerMove}>
        <PointerContext.Provider value={pointer}>
            {children}
        </PointerContext.Provider>
    </div >
}