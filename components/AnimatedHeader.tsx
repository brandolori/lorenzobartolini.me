import { useContext } from "react"
import { animated, useSpring } from "react-spring"
import PointerContext from "../src/PointerContext"
import useIsMobile from "../src/useIsMobile"

//compute the function y=x/(x+1), mirrored on the y axis.
const absHyperbole = (x: number) => Math.sign(x) * Math.abs(x) / (Math.abs(x) + 1)

export default ({ title }: { title: string }) => {
    const pointer = useContext(PointerContext)
    const h1Spring = useSpring({
        bottom: absHyperbole(pointer.y) * 10,
        left: absHyperbole(pointer.x) * 10
    })
    const animatedProps = useIsMobile() ? {} : h1Spring
    return <div>
        <style jsx>{`
        // calibrato circa per smettere di stare nello schermo quando la navbar si accavalla
        h1 {
            font-size: calc(2.3rem + 5vw);
        }
        @media (min-width: 576px) {
            h1 {
                font-size: 4rem;
            }
        }
        `}</style>
        <h1>
            <animated.span
                style={{
                    fontFamily: "inherit",
                    color: "inherit",
                    position: "relative",
                    width: "fit-content",
                    margin: "4rem 0",
                    ...animatedProps
                }}>
                {title}
            </animated.span>
        </h1>
    </div>

}