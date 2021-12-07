import Head from 'next/head'
import fs from "fs"
import Link from "next/link"
import path from "path"
import React from 'react'
import AnimatedHeader from '../components/AnimatedHeader'
import matter from 'gray-matter'

type PostPreviewData = {
    date: string,
    title: string,
    summary: string,
    href: string
}

const Home = ({ posts }: { posts: PostPreviewData[] }) => <>
    <Head>
        <title>Lorenzo Bartolini</title>
        <meta name="description" content="Lorenzo Bartolini's tech blog, home of what I learn and want to share with the web, or just of what I found cool." />
    </Head>
    <main style={{ width: "100%" }}>
        <style jsx>{`
            a {
                font-size: calc(1rem + 5vw);
                font-family: 'Rubik', sans-serif;
                color: var(--theme);
                margin: 1rem 0;
                display: block;
            }

            @media (min-width: 576px) {
                a {
                    font-size: 2.5rem;
                }
            }
            `}</style>
        <AnimatedHeader title="Welcome to my site!" />
        {posts.map((el, i) =>
            <div
                style={{ margin: "5rem 0" }}
                key={i}>
                <small>{new Date(el.date).toDateString()}</small>
                <Link href={el.href}>
                    <a>
                        {el.title}
                    </a>
                </Link>
                <p >{el.summary}</p>
            </div>

        )}
    </main>
</>

export const getStaticProps = async () => {

    const folderPath = path.join("pages-md", "posts")
    const posts = fs.readdirSync(folderPath)
        .map(filePath => ({ string: fs.readFileSync(path.join(folderPath, filePath)).toString(), path: filePath }))
        .map(data => ({ ...matter(data.string).data, href: `/posts/${data.path.replace(".md", "")}` }))
    return {
        props: {
            posts
        }
    }
}


export default Home