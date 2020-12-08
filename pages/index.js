import Head from 'next/head'
import fs from "fs"
import Link from "next/link"
import { Header, Footer } from "../util/shared"
//var Header = require("../util/utils")

const Home = ({ slugs }) => (<>
    <Head>
        <title>Lorenzo Bartolini</title>
        <link rel="icon" href="/favicon.ico" />
    </Head>
    {Header()}
    <main>
        <h2>Benvenuto sul mio blog!</h2>
        <p>Lista delle pagine:</p>
        {
            slugs.map(slug => (
                <div key={slug}>
                    <Link href={slug}>
                        <a>{slug}</a>
                    </Link>
                </div>
            ))
        }
    </main>
    {Footer()}
</>)

export const getStaticProps = async () => {
    const files = fs.readdirSync("posts")
    return {
        props: {
            slugs: files.map(name => name.replace(".md", ""))
        }
    }
}

export default Home