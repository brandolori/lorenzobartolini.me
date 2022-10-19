export default ({ title }: { title: string }) => {
    return <div>
        <style jsx>{`
        // calibrato circa per smettere di stare nello schermo quando la navbar si accavalla
        h1 {
            font-size: calc(3rem + 5vw);
        }
        @media (min-width: 576px) {
            h1 {
                font-size: 4.4rem;
            }
        }
        `}</style>
        <h1 style={{
            position: "relative",
            width: "fit-content",
            margin: "4rem 0",
            lineHeight: "100%"
        }}>
            {title}
        </h1>
    </div>

}