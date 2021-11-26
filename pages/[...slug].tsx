import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Head from "next/head"
import React from "react"
import ReactMarkdown from "react-markdown"
import AnimatedHeader from "../components/AnimatedHeader"
import { SpecialComponents } from "react-markdown/lib/ast-to-react"
import { NormalComponents } from "react-markdown/lib/complex-types"

const folderName = "pages-md"

const components: Partial<Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents> = { a: ({ href, children }) => <a href={href} target="_blank">{children}</a> }

const Page = ({ htmlString, data }) => {
    return <>
        <Head>
            <title>{data.title}</title>
        </Head>

        <header>
            <AnimatedHeader title={data.title} />
        </header>
        <ReactMarkdown components={components} children={htmlString} />

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