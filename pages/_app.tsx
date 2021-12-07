import Head from "next/head"
import React, { useState } from "react"
import Layout from "../components/Layout"
import PointerContext from "../src/PointerContext"
import { GoogleFonts } from "nextjs-google-fonts/GoogleFonts";
import { theme } from "../src/common"
import "../styles/global.scss"

function MyApp({ Component, pageProps }) {

    const [pointer, setPointer] = useState({ x: 0, y: 0 })

    return <>
        <Head>
            <link rel="manifest" href="/manifest.json" />
            <link rel="apple-touch-icon" href="/icons/192.png" />
            <meta name="theme-color" content={theme.mainColor} />
            {GoogleFonts()}
            <style>
                {`
                    :root {
                        --theme: ${theme.mainColor} !important;
                    }
                `}
            </style>
        </Head>
        <PointerContext.Provider value={[pointer, setPointer]}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </PointerContext.Provider>
    </>
}

export default MyApp
