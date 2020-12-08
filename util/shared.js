import Link from "next/link"

const Header = () => (
    <header>
        <h1>Blog di Lorenzo Bartolini</h1>
        <nav>
            <Link href={"/"}>
                <a>Home</a>
            </Link>
        </nav>
    </header>
)

const Footer = () => (
    <footer>
        Footerino
    </footer>
)


export { Header, Footer }