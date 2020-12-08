import Head from 'next/head'
import fs from "fs"
import Link from "next/link"
import { Layout } from "../components/shared"
import { Jumbotron } from 'react-bootstrap'
import path from "path"


const Home = ({ slugs }) => (
    <Layout>
        <Head>
            <title>Lorenzo Bartolini</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Jumbotron className="mb-0">
            <h2>Benvenuto sul mio blog!</h2>
            <p>Lista delle pagine:</p>
            {
                slugs.map(slug => (
                    <div key={slug}>
                        <Link href={slug.path}>
                            <a>{slug.name}</a>
                        </Link>
                    </div>
                ))
            }
        </Jumbotron>
    </Layout>)

export const getStaticProps = async () => {
    const files = fs.readdirSync(path.join("pages-md","posts"))
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