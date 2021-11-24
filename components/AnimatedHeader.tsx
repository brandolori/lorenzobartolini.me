import { useContext } from "react"
import { animated, useSpring } from "react-spring"
import PointerContext from "../src/PointerContext"

export default ({ title }: { title: string }) => {
    const [pointer,] = useContext(PointerContext)
    const props = useSpring({ bottom: pointer.y * 3, left: pointer.x * 3 })
    return <animated.h1
        style={{
            position: "relative",
            display: "block",
            width: "fit-content",
            transition: "none",
            perspective: "500px",
            ...props
        }}>
        {title}
    </animated.h1>

}