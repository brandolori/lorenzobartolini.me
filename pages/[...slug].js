import React from "react"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Head from "next/head"
import marked from "marked"
import { Layout } from "../components/shared"
import { Jumbotron, Container } from "react-bootstrap"

const folderName = "pages-md"

const Post = ({ htmlString, data }) => (
    <Layout>
        <Head>
            <title>{data.title}</title>
        </Head>
        <Container>
            <main dangerouslySetInnerHTML={{ __html: htmlString }} />
        </Container>

    </Layout>
)


export const getStaticProps = async ({ params: { slug } }) => {

    let filePath = folderName
    slug.forEach(el => filePath = path.join(filePath, el))
    filePath = filePath + ".md"
    const markDownWithMetadata = fs.readFileSync(filePath).toString()
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

export default Post