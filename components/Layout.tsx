import Link from "next/link"
import makeStyles from "../src/makeStyles"
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from "react"
import { theme } from "../src/common"
import usePointerProvider from "../src/usePointerProvider"

const Background = dynamic(() => import("./Background"), { ssr: false })

const styles = makeStyles({
    navbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },
    a: {
        display: "block",
        fontFamily: theme.headingFont,
        textDecoration: "none",
        fontWeight: "bold",
        fontSize: "1.15rem"
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
    },
    backgroundWrapper: {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "100vh"
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

const Layout = ({ children }) => {
    const PointerProvider = usePointerProvider()

    // defer the loading of the background by three seconds, allowing the page to become interactive faster
    const [renderBackground, setRenderBackground] = useState(false)

    useEffect(() => {
        setTimeout(() => setRenderBackground(true), 3000)
    }, [])
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
            <div style={styles.backgroundWrapper}>
                {renderBackground && <Background />}
            </div>
            <div style={styles.container} className="container">
                <div>
                    <NavBar />
                    {children}
                </div>
                <footer style={styles.footer}>
                    Copyright 2022 Lorenzo Bartolini
                </footer>
            </div>
        </PointerProvider>
    )
}

export default Layout