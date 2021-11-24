import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Head from "next/head"
import Container from "react-bootstrap/Container"
import { Row, Image, Col } from "react-bootstrap"
import React, { useContext } from "react"
import ReactMarkdown from "react-markdown"
import MarkdownRenderers from "../src/MarkdownRenderers"
import PointerContext from "../src/PointerContext"
import { useSpring, animated, config } from 'react-spring'




const folderName = "pages-md"

const MdContent = ({ htmlString, data }) => {
    const [pointer,] = useContext(PointerContext)
    const props = useSpring({ bottom: pointer.y * 3, left: pointer.x * 3 })
    return (
        <>
            <header>
                <animated.h1 style={{ position: "relative", transition: "none", ...props }}>ammmama</animated.h1>
            </header>
            <ReactMarkdown children={htmlString} />
        </>
    )
}

const Content = ({ htmlString, data }) => {
    if (data.image) {
        return (
            <Row>
                <Col xs="12" md="6">
                    <Image alt="" src={data.image} rounded></Image>
                </Col>
                <Col as="article" xs="12" md="6" className="mt-3">
                    <MdContent htmlString={htmlString} data={data}></MdContent>
                </Col>
            </Row>
        )
    }
    else {
        return (
            <Row>
                <Col as="article">
                    <MdContent htmlString={htmlString} data={data}></MdContent>
                </Col>
            </Row>
        )
    }
}

const Page = ({ htmlString, data }) =>
    <>
        <Head>
            <title>{data.title}</title>
        </Head>
        <Container as="main" className="my-5">
            <Content htmlString={htmlString} data={data}></Content>
        </Container>
    </>


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