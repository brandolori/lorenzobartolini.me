import { useEffect, useRef, useState } from "react"
import { normalize } from "../src/common"
import PointerContext from "../src/PointerContext"
import useScrollPosition from "../src/useScrollPosition"

export default ({ children }) => {
    const scrollref = useRef()
    const scrollPosition = useScrollPosition(scrollref)
    const pointer = { x: 0, y: normalize(scrollPosition, 1) }

    return <div ref={scrollref} style={{ width: "100%", height: "100%" }}
    >
        <PointerContext.Provider value={pointer}>
            {children}
        </PointerContext.Provider>
    </div >
}