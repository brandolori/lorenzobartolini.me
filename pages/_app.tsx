// import "bootstrap/dist/css/bootstrap.min.css"
import Head from "next/head"
import React, { createContext, useEffect, useState } from "react"
import Layout from "../components/Layout"
import PointerContext from "../src/PointerContext"
import ThemeContext from "../src/ThemeContext"
import "../styles/global.scss"

function MyApp({ Component, pageProps }) {

    const [theme, setTheme] = useState("orange")
    const [pointer, setPointer] = useState({ x: 0, y: 0 })

    useEffect(() => {
        document.documentElement.style.setProperty('--theme', theme);
    }, [theme])

    return <>
        <Head>
            <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@700&display=swap" rel="stylesheet" />
        </Head>
        <ThemeContext.Provider value={[theme, setTheme]}>
            <PointerContext.Provider value={[pointer, setPointer]}>

                <Layout>

                    <Component {...pageProps} />
                </Layout>
            </PointerContext.Provider>
        </ThemeContext.Provider>
    </>
}

export default MyApp
