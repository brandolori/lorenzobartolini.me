import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Head from "next/head"
import React, { useContext } from "react"
import ReactMarkdown from "react-markdown"
import PointerContext from "../src/PointerContext"
import { useSpring, animated, config } from 'react-spring'

const folderName = "pages-md"

const Page = ({ htmlString, data }) => {
    const [pointer,] = useContext(PointerContext)
    const props = useSpring({ bottom: pointer.y * 3, left: pointer.x * 3 })
    return <>
        <Head>
            <title>{data.title}</title>
        </Head>

        <header>
            <animated.h1
                style={{
                    position: "relative",
                    display: "block",
                    width: "fit-content",
                    transition: "none",
                    perspective: "500px",
                    ...props
                }}>
                {data.title}
            </animated.h1>
        </header>
        <ReactMarkdown children={htmlString} />

    </>
}


export const getStaticProps = async ({ params: { slug } }) => {

    let filePath = folderName
    slug.forEach(el => filePath = path.join(filePath, el))
    filePath = filePath + ".md"
    const markDownWithMetadata = fs.readFileSync(filePath).toString()
    const parsedMarkdown = matter(markDownWithMetadata)
    const htmlString = parsedMarkdown.content
    return {
        props: {
            htmlString,
            data: parsedMarkdown.data
        }
    }
}


export const getStaticPaths = async () => {

    const files = []
    const recurse = (folderName) => {
        fs.readdirSync(folderName).map(file => path.join(folderName, file)).forEach(file => {
            if (fs.statSync(file).isDirectory()) {
                recurse(file)
            } else {
                files.push(file)
            }
        })
    }

    recurse(folderName)

    const paths = files.map(name => ({
        params: {
            slug: name.replace(".md", "").split(path.sep).slice(1)
        }
    }))
    return {
        paths,
        fallback: false
    }
}

export default Page