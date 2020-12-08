import React from "react"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Head from "next/head"
import marked from "marked"
import { Header, Footer } from "../util/shared"

const folderName = "posts"

const Post = ({ htmlString, data }) => {
    return (<>
        <Head>
            <title>{data.title}</title>
        </Head>
        {Header()}
        <main dangerouslySetInnerHTML={{ __html: htmlString }} />
        {Footer()}
    </>)
}

export const getStaticProps = async ({ params: { slug } }) => {

    const markDownWithMetadata = fs.readFileSync(path.join(folderName, slug + ".md")).toString()
    const parsedMarkdown = matter(markDownWithMetadata)
    const htmlString = marked(parsedMarkdown.content)
    return {
        props: {
            htmlString,
            data: parsedMarkdown.data
        }
    }
}

export const getStaticPaths = async () => {
    const files = fs.readdirSync(folderName)
    const paths = files.map(name => ({
        params: {
            slug: name.replace(".md", "")
        }
    }))
    return {
        paths,
        fallback: false
    }
}

export default Post