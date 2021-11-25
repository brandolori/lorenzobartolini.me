import Link from "next/link"
import { useContext, useRef, useState } from "react"
import makeStyles from "../src/makeStyles"
import PointerContext from "../src/PointerContext"
import ThemeContext from "../src/ThemeContext"

import dynamic from 'next/dynamic'

const Background = dynamic(() => import("./Background"))

const styles = makeStyles({
    navbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },
    a: {
        display: "block",
        fontFamily: "Rubik, sans-serif",
        textDecoration: "none"
    },
    container: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "100%",
        margin: "0 auto",
        padding: "1rem",
        boxSizing: "border-box"
    }
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
            x: normalize(e.clientX, window.innerWidth),
            y: -normalize(e.clientY, window.innerHeight)
        })
    }

    return (
        <div style={{ width: "100%", height: "100%" }}
            onPointerDown={handlePointerMove}
            onPointerMove={handlePointerMove}
        >
            <div ref={backgroundRef} style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: "100vh", backgroundColor: "#202020" }}>
                <Background pointerPosition={pointerPos} />
            </div>
            <div style={styles.container} className="container">
                <div>
                    <NavBar />
                    {props.children}
                </div>
                <footer style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "2rem", fontSize: ".8rem", fontWeight: 200 }}> Copyright 2021 Lorenzo Bartolini</footer>
            </div>
        </div >
    )
}

export default Layout