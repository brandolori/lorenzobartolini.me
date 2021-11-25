import Head from 'next/head'
import fs from "fs"
import Link from "next/link"
import path from "path"
import React from 'react'
import AnimatedHeader from '../components/AnimatedHeader'


const Home = ({ slugs }) => <>
    <Head>
        <title>Lorenzo Bartolini</title>
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <main style={{ width: "100%" }}>
        <AnimatedHeader title="Welcome to my site!" />
        <p>It is currently under construction. Still, here's a test page:</p>
        {
            slugs.map(slug => (
                <div key={slug}>
                    <Link href={slug.path}>
                        <a>{slug.name}</a>
                    </Link>
                </div>
            ))
        }
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