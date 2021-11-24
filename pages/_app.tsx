import "bootstrap/dist/css/bootstrap.min.css"
import Head from "next/head"
import React, { createContext, useEffect, useState } from "react"
import Layout from "../components/Layout"
import PointerContext from "../src/PointerContext"
import ThemeContext from "../src/ThemeContext"

function MyApp({ Component, pageProps }) {

  const [theme, setTheme] = useState("orange")
  const [pointer, setPointer] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const colors = ["orange", "yellow", "green", "fuchsia"]
    let i = 0
    setInterval(() => {
      setTheme(colors[i % colors.length])
      i += 1
    }, 2000)
  }, [])

  return <>
    <Head>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
        rel="stylesheet"
      />
      <style>
        {`
         html,
         body,
         #__next {
             height: 100%;
         }

         html {
           font-size: 1.25rem
         }
         
         * {
             color: white;
             transition: all 1s;
         }
         
         h1,
         h2,
         h3 {
             font-family: Georgia;
             color: ${theme}
         }
         
         p{
             font-family: -apple-system, system-ui, BlinkMacSystemFont, "segoe ui", Helvetica, Arial, sans-serif, "apple color emoji", "segoe ui emoji", "segoe ui symbol";
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
