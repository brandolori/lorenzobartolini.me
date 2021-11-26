import Head from "next/head"
import React, { useEffect, useState } from "react"
import Layout from "../components/Layout"
import PointerContext from "../src/PointerContext"
import ThemeContext from "../src/ThemeContext"
import "../styles/global.scss"
import { GoogleFonts } from "nextjs-google-fonts/GoogleFonts";

function MyApp({ Component, pageProps }) {

    const [theme, setTheme] = useState("#FFA500")
    const [pointer, setPointer] = useState({ x: 5, y: 0 })

    return <>
        <Head>
            <link rel="manifest" href="/manifest.json" />
            <link rel="apple-touch-icon" href="/icons/192.png" />
            <meta name="theme-color" content={theme} />
            {GoogleFonts()}
            <style>
                {`
:root {
    --theme: ${theme} !important;
}
                `}
            </style>
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
