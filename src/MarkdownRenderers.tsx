import { useContext } from "react";
import React from "react";
import PointerContext from "./PointerContext";

function flatten(text, child): string {
    return typeof child === 'string'
        ? text + child
        : React.Children.toArray(child.props.children).reduce(flatten, text)
}

const MarkdownRenderers = {
    h1: ({ children }) => {
        const [pointer,] = useContext(PointerContext)
        return <>
            <h1>poccolo cuore</h1>
        </>
    },
    // p: () => <p>sono una marionetta ia ia o</p>
}

export default MarkdownRenderers