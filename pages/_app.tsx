import Head from "next/head"
import React, { useState } from "react"
import Layout from "../components/Layout"
import { theme } from "../src/common"

const MyApp = ({ Component, pageProps }) => <>
    <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/192.png" />
        <meta name="theme-color" content={theme.mainColor} />
    </Head>

    <Layout>
        <style jsx global>{`
            :root {
                --maincolor: ${theme.mainColor};
                --backgroundcolor: ${theme.backgroundColor};
            }

            #__next {
                position: absolute;
                top: 0px;
                bottom: 0px;
                left: 0px;
                right: 0px;
            }
            
            a {
                text-decoration-color: var(--maincolor);
            }
            
            html {
                font-size: 1.25rem;
                background-color: var(--backgroundcolor);
            }
            
            * {
                color: white;
                font-family: ${theme.contentFont};
                overscroll-behavior: none;
            }

            pre {
                overscroll-behavior: auto;
            }
            
            h1,
            h2,
            h3,
            h4 {
                font-family: ${theme.headingFont};
                color: var(--maincolor);
            }

            h1 {
                letter-spacing: -2px;
            }
            
            *::selection {
                color: #1A1A1A;
                background: var(--maincolor);
                text-shadow: none;
            }
            
            p {
                line-height: 1.5rem;
            }
           
            pre {
                overflow-x: scroll;
                background-color: #1a1a1ace;
                padding: 2rem;
                border-radius: 8px;
            }
            
            code {
                font-family: "Courier New", monospace;
            }
        `}</style>
        <Component {...pageProps} />
    </Layout>
</>


export default MyApp
