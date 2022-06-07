import Head from "next/head"
import React, { useState } from "react"
import Layout from "../components/Layout"
import { GoogleFonts } from "nextjs-google-fonts/GoogleFonts";
import { theme } from "../src/common"

const MyApp = ({ Component, pageProps }) => <>
    <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/192.png" />
        <meta name="theme-color" content={theme.mainColor} />
        {GoogleFonts()}
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
            }
            
            h1,
            h2,
            h3,
            h4 {
                font-family: ${theme.headingFont};
                color: var(--maincolor);
                text-shadow: 0px 0px 8px var(--backgroundcolor);
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
                        
            p,
            ol * {
                text-shadow:
                    0px 0px 8px var(--backgroundcolor),
                    0px 0px 8px var(--backgroundcolor);
            }
            
            pre {
                overflow-x: scroll;
                background-color: #1a1a1ace;
                padding: 2rem;
                border-radius: 8px;
            }
            
            code {
                font-family: monospace;
            }
        `}</style>
        <Component {...pageProps} />
    </Layout>
</>


export default MyApp
