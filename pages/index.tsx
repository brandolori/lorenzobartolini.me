import Head from 'next/head'
import fs from "fs"
import Link from "next/link"
import path from "path"
import React from 'react'
import AnimatedHeader from '../components/AnimatedHeader'


type PostPreviewData = {
    date: string,
    title: string,
    summary: string
}

const lorem = "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur."

const posts: PostPreviewData[] = [
    { date: "10 September 2021", title: "Building this site", summary: lorem },
    { date: "4 November 2021", title: "The new developments of the open source community", summary: lorem },
    { date: "10 September 2021", title: "Building this site", summary: lorem },
    { date: "4 November 2021", title: "The new developments of the open source community", summary: lorem },
    { date: "10 September 2021", title: "Building this site", summary: lorem },
]

const Home = ({ slugs }) => <>
    <Head>
        <title>Lorenzo Bartolini</title>
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <main style={{ width: "100%" }}>
        <AnimatedHeader title="Welcome to my site!" />
        {posts.map((el, i) => <>
            <div
                style={{ margin: "5rem 0" }}
                key={i}>
                <small>{el.date}</small>
                <Link href={"/"}>
                    <a className="post-title"
                        style={{
                            fontFamily: "'Rubik', sans-serif",
                            color: "var(--theme)",
                            margin: "1rem 0",
                            display: "block"
                        }}>
                        {el.title}
                    </a>
                </Link>
                <p >{el.summary}</p>
            </div>
        </>
        )}
    </main>
</>

export const getStaticProps = async () => {
    const files = fs.readdirSync(path.join("pages-md", "posts"))
    return {
        props: {
            slugs: files.map(name => name.replace(".md", "")).map(el => ({
                "name": el,
                "path": "posts/" + el
            }))
        }
    }
}

export default Home