import Link from "next/link"
import { useContext, useRef, useState } from "react"
import makeStyles from "../src/makeStyles"
import PointerContext from "../src/PointerContext"

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
        textDecoration: "none",
    },
    aRight: {
        margin: "0px 1rem"
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
    },
    footer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1.5rem",
        fontSize: ".8rem",
        fontWeight: 200
    }
})

const normalize = (value: number, range: number) => ((value - (range / 2)) / (range / 2))

const NavBar = () => <>
    <nav style={styles.navbar}>
        <Link href="/"><a style={styles.a}>&lt;LorenzoBartolini /&gt;</a></Link>
        <div style={{ display: "flex", flexDirection: "row" }}>
            <a href="/rss.xml" target="_blank" style={{ ...styles.a, ...styles.aRight }}>rss</a>
            <Link href="/about"><a style={styles.a}>about</a></Link>
        </div>
    </nav>
</>

const Layout = (props) => {
    const [pointerPos, setPointerPos] = useContext(PointerContext)

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
            <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: "100vh", backgroundColor: "#202020" }}>
                <Background pointerPosition={pointerPos} />
            </div>
            <div style={styles.container} className="container">
                <div>
                    <NavBar />
                    {props.children}
                </div>
                <footer style={styles.footer}> Copyright 2021 Lorenzo Bartolini</footer>
            </div>
        </div >
    )
}

export default Layout