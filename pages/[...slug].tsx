import fs from "fs"
import path from "path"
import matter from "gray-matter"
import Head from "next/head"
import React, { createContext, useContext } from "react"
import ReactMarkdown from "react-markdown"
import AnimatedHeader from "../components/AnimatedHeader"
import { SpecialComponents } from "react-markdown/lib/ast-to-react"
import { NormalComponents } from "react-markdown/lib/complex-types"
import remarkUnwrapImages from "remark-unwrap-images"

const folderName = "pages-md"

const SlugContext = createContext("")

const headingWithId = (Comp) => ({ children }) => {
    const id = (children as string[])[0].toLowerCase().split(" ").join("-")
    return <Comp id={id}>{children}</Comp>
}

const components: Partial<Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents> = {
    h2: headingWithId("h2"),
    h3: headingWithId("h3"),
    h4: headingWithId("h4"),
    a: ({ href, children }) => <a href={href} rel="noopener" target="_blank">{children}</a>,
    img: ({ src, alt, title }) => {
        const slug = useContext(SlugContext)
        return <figure style={{
            display: "flex", flexDirection: "column", justifyContent: "center",
            alignItems: "center"
        }
        } >
            <style jsx>{`
            figure {
                margin: 2rem 1rem;
            }
            @media (min-width: 768px) {
                figure {
                    margin: 3rem;
                }
            }
            `}</style>
            {
                alt == "video" &&
                <video style={{ maxHeight: 500, margin: "1rem auto", display: "block", borderRadius: "8px" }} controls>
                    <source src={`/${slug}/${src}`} type="video/webm" />
                    Your browser does not support the video tag.
                </video>
            }
            {
                alt != "video" &&
                <img draggable="false" style={{ borderRadius: "8px", maxWidth: "100%", maxHeight: 400 }} src={`/${slug}/${src}`} alt={alt} />
            }
            <figcaption style={{ marginTop: "1rem", fontSize: ".9rem" }}>{title}</figcaption>
        </figure >
    },
}

const Page = ({ htmlString, data, slug }: { htmlString: string, data: any, slug: string[] }) => <>
    <Head>
        <title>{`${data.title} - Lorenzo Bartolini`}</title>
        <meta name="description" content={data.summary} />
    </Head>

    <header>
        <AnimatedHeader title={data.title} />
    </header>
    <small>{new Date(data.date).toDateString()}</small>
    <SlugContext.Provider value={slug.join("/")}>
        <div>
            <style jsx>{`
                h2 {
                    margin-top: 3rem;
                }
                `}</style>
            <ReactMarkdown
                components={components}
                skipHtml={false}
                children={htmlString}
                remarkPlugins={[remarkUnwrapImages]} />
        </div>
    </SlugContext.Provider>

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
            data: parsedMarkdown.data,
            // pass the slug so the post can access its media in the public folder
            slug
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