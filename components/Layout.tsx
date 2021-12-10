import Link from "next/link"
import { PointerEventHandler, useContext, useRef, useState } from "react"
import makeStyles from "../src/makeStyles"
import PointerContext from "../src/PointerContext"
import dynamic from 'next/dynamic'
import useInterval from "../src/useInterval"
import useIsMobile from "../src/useIsMobile"

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

let latestPointer = { x: 0, y: 0 }

const Layout = (props) => {
    // should always stay between -1 and 1 in both axes
    const [pointer, setPointer] = useState({ x: 0, y: 0 })
    const mobile = useIsMobile()

    useInterval(() => {
        setPointer(latestPointer)
        if (mobile)
            latestPointer = { x: 0, y: latestPointer.y - Math.sign(latestPointer.y) / 50 }
    }, 100)

    const handlePointerMove: PointerEventHandler<HTMLDivElement> = (e) => {
        if (mobile) {
            const y = Math.min(Math.max(latestPointer.y + e.movementY / 50, -1), 1)
            latestPointer = { x: 0, y }
        } else {
            latestPointer = {
                x: normalize(e.clientX, window.innerWidth),
                y: -normalize(e.clientY, window.innerHeight)
            }
        }
    }

    return (
        <div style={{ width: "100%", height: "100%" }}
            onPointerMove={handlePointerMove}
        >
            <style jsx>{`
            @media (min-width: 768px) {
                .container {
                    width: 57%;
                    max-width: 800px;
                }
            }
            `}</style>
            <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: "100vh" }}>
                <Background pointerPosition={pointer} />
            </div>
            <PointerContext.Provider value={pointer}>
                <div style={styles.container} className="container">
                    <div>
                        <NavBar />
                        {props.children}
                    </div>
                    <footer style={styles.footer}> Copyright 2021 Lorenzo Bartolini</footer>
                </div>
            </PointerContext.Provider>
        </div >
    )
}

export default Layout