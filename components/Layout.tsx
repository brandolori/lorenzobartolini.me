import Link from "next/link"
import { PointerEventHandler, TouchEventHandler, useContext, useEffect, useRef, useState } from "react"
import makeStyles from "../src/makeStyles"
import PointerContext from "../src/PointerContext"
import dynamic from 'next/dynamic'
import useInterval from "../src/useInterval"
import useIsMobile from "../src/useIsMobile"
import useScrollPosition from "../src/useScrollPosition"
import { normalize } from "../src/common"
import MobilePointerContext from "./MobilePointerContext"
import DesktopPointerContext from "./DesktopPointerContext"

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

const NavBar = () => <>
    <nav style={styles.navbar}>
        <Link href="/"><a style={styles.a}>&lt;LorenzoBartolini /&gt;</a></Link>
        <div style={{ display: "flex", flexDirection: "row" }}>
            <a href="/rss.xml" target="_blank" style={{ ...styles.a, ...styles.aRight }}>rss</a>
            <Link href="/about"><a style={styles.a}>about</a></Link>
        </div>
    </nav>
</>

let latestPointer = { x: 0, y: 0 }

const Layout = (props) => {
    const PointerProvider = true ? MobilePointerContext : DesktopPointerContext
    return (
        <PointerProvider>
            <style jsx>{`
                    @media (min-width: 768px) {
                        .container {
                            width: 57%;
                            max-width: 800px;
                        }
                    }
                    `}</style>
            <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: "100vh" }}>
                <Background />
            </div>
            <div style={styles.container} className="container">
                <div>
                    <NavBar />
                    {props.children}
                </div>
                <footer style={styles.footer}> Copyright 2021 Lorenzo Bartolini</footer>
            </div>
        </PointerProvider>
    )
}

export default Layout