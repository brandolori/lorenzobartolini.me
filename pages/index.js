import Head from 'next/head'
import styles from '../styles/Home.module.css'
import fs from "fs"
import Link from "next/link"

const Home = ({ slugs }) => (
    <div className={styles.container}>
        <Head>
            <title>Lorenzo Bartolini</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
            <h1 className={styles.title}>
                Benvenuto sul mio blog!
            </h1>

            <p className={styles.description}>
                Lista delle pagine:
            </p>
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

        <footer className={styles.footer}>

        </footer>
    </div>)

export const getStaticProps = async () => {
    const files = fs.readdirSync("posts")
    return {
        props: {
            slugs: files.map(name => name.replace(".md", ""))
        }
    }
}

export default Home