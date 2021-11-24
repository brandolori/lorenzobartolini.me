import Link from "next/link"
import { useContext, useRef, useState } from "react"
import makeStyles from "../src/makeStyles"
import PointerContext from "../src/PointerContext"
import ThemeContext from "../src/ThemeContext"
import Background from "./Background"

const styles = makeStyles({
    navbar: { display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" },
    centeringFlex: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%"
    },
    mainFlex: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
        justifyContent: "space-between"
    },
    a: { display: "block", fontFamily: "Rubik, sans-serif", textDecoration: "none" }
})

const normalize = (value: number, range: number) => ((value - (range / 2)) / (range / 2))

const NavBar = () => {
    const [theme,] = useContext(ThemeContext)

    return <nav style={styles.navbar}>
        <Link href="/"><a style={styles.a}>&lt;LorenzoBartolini /&gt;</a></Link>
        <Link href="/about"><a style={styles.a}>about</a></Link>
    </nav>
}

const Layout = (props) => {
    const [pointerPos, setPointerPos] = useContext(PointerContext)

    const backgroundRef = useRef<HTMLDivElement>()

    const handlePointerMove = (e) => {
        setPointerPos({
            x: 2 * normalize(e.clientX, window.innerWidth),
            y: -2 * normalize(e.clientY, window.innerHeight)
        })
    }

    return (
        <div style={{ width: "100%", height: "100%" }}
            onPointerMove={handlePointerMove}>
            <div ref={backgroundRef} style={{ position: "fixed", top: 0, bottom: 0, left: 0, right: 0 }}>
                <Background pointerPosition={pointerPos} />
            </div>
            <div style={styles.centeringFlex}>
                <div style={styles.mainFlex} className="container">
                    <div>
                        <NavBar />
                        <div style={{ padding: "2rem 0" }}>
                            {props.children}
                        </div>
                    </div>
                    <footer style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", padding: "2rem", fontSize: ".8rem", fontWeight: 200 }}> Copyright 2021 Lorenzo Bartolini</footer>
                </div>
            </div>
        </div >
    )
}

export default Layout