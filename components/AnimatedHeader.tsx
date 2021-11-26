import { useContext } from "react"
import { animated, useSpring } from "react-spring"
import PointerContext from "../src/PointerContext"

//compute the function y=x/(x+1), mirrored on the y axis.
const absHyperbole = (x: number) => Math.sign(x) * Math.abs(x) / (Math.abs(x) + 1)

export default ({ title }: { title: string }) => {
    const [pointer,] = useContext(PointerContext)
    const props = useSpring({
        bottom: absHyperbole(pointer.y) * 10,
        left: absHyperbole(pointer.x) * 10
    })
    return <animated.h1
        style={{
            position: "relative",
            display: "block",
            width: "fit-content",
            transition: "none",
            perspective: "500px",
            margin:"4rem 0",
            ...props
        }}>
        {title}
    </animated.h1>

}