import Head from 'next/head'
import fs from "fs"
import Link from "next/link"
import Layout from "../components/Layout"
import path from "path"


const Home = ({ slugs }) => <>
    <Head>
        <title>Lorenzo Bartolini</title>
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <main style={{ width: "100%"}}>
        <h1>Welcome to my site!</h1>
        <p>It is currently under construction. Still, here are some contents:</p>
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