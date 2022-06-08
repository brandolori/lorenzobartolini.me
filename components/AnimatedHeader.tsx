import { useContext } from "react"
import { animated, useSpring } from "react-spring"
import PointerContext from "../src/PointerContext"
import useIsMobile from "../src/useIsMobile"

//compute the function y=x/(x+1), mirrored on the y axis.
const absHyperbole = (x: number) => Math.sign(x) * Math.abs(x) / (Math.abs(x) + 1)

export default ({ title }: { title: string }) => {
    const pointer = useContext(PointerContext)
    return <div>
        <style jsx>{`
        // calibrato circa per smettere di stare nello schermo quando la navbar si accavalla
        h1 {
            font-size: calc(3rem + 5vw);
            line-height: 100%;
        }
        @media (min-width: 576px) {
            h1 {
                font-size: 4.4rem;
            }
        }
        `}</style>
        <h1>
            <span
                style={{
                    fontFamily: "inherit",
                    color: "inherit",
                    position: "relative",
                    width: "fit-content",
                    margin: "4rem 0",
                }}>
                {title}
            </span>
        </h1>
    </div>

}