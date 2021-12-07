import { Feed } from "feed"
import fs from "fs"
import matter from "gray-matter"
import path from "path"

const baseUrl = "https://lorenzobartolini.me"

const lorib = {
    name: "Lorenzo Bartolini",
    email: "lori.barto@live.it",
    link: baseUrl
}

const feed = new Feed({
    title: "lorenzobartolini.me",
    description: "Lorenzo Bartolini personal blog",
    id: baseUrl,
    link: baseUrl,
    language: "en",
    favicon: `${baseUrl}/favicon.ico`,
    copyright: "2021 Lorenzo Bartolini",
    author: lorib
});

const folderPath = path.join("pages-md", "posts")
const posts = fs.readdirSync(folderPath)
    .map(filePath => {
        const string = fs.readFileSync(path.join(folderPath, filePath)).toString()
        const { content, data } = matter(string)
        return ({
            data,
            url: filePath.replace(".md", "")
        });
    })

posts.forEach(({ data, url }) => {
    feed.addItem({
        title: data.title,
        link: `https://lorenzobartolini.me/posts/${url}`,
        description: data.summary,
        author: [lorib],
        date: new Date(data.date)
    });
});

feed.addCategory("Tech");

fs.writeFile(path.join('public', 'rss.xml'), feed.rss2(), (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('RSS feed written successfully');
    }
});