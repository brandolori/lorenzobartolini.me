import Head from "next/head"
import React, { useState } from "react"
import Layout from "../components/Layout"
import { GoogleFonts } from "nextjs-google-fonts/GoogleFonts";
import { theme } from "../src/common"
import "../styles/global.scss"

function MyApp({ Component, pageProps }) {


    return <>
        <Head>
            <link rel="manifest" href="/manifest.json" />
            <link rel="apple-touch-icon" href="/icons/192.png" />
            <meta name="theme-color" content={theme.mainColor} />
            {GoogleFonts()}
            <style>
                {`
                    :root {
                        --maincolor: ${theme.mainColor} !important;
                        --backgroundcolor: ${theme.backgroundColor} !important;
                    }
                `}
            </style>
        </Head>

        <Layout>
            <Component {...pageProps} />
        </Layout>
    </>
}

export default MyApp
