import Link from "next/link"
import Head from "next/head"
import { Button, Row, Navbar, Nav, Container } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

const Header = () => (
    <Navbar>
        <Navbar.Brand>Lorenzo Bartolini</Navbar.Brand>
        <Nav.Link>
            <Link href="/">Home</Link>
        </Nav.Link>
        <Nav.Link>
            <Link href="/about">About</Link>
        </Nav.Link>
        <Nav.Link>
            <Link href="/contacts">Contatti</Link>
        </Nav.Link>
    </Navbar>
)

const Footer = () => (
    <Container fluid>
        Copyright Lorenzo Bartolini 2020
    </Container>
)

const Layout = (props) => (<>
    <Header />
    {props.children}
    <Footer />
</>
)

export { Layout }