import Document, { Head, Main, NextScript, Html } from 'next/document'

export default class MyDocument extends Document {
    render() {
        const isDev = process.env.NODE_ENV === "development";
        return (
            <Html lang="en">
                <Head />
                <body>
                    <Main />
                    {isDev && <NextScript />}
                </body>
            </Html>
        );
    }
}