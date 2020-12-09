import Link from "next/link"
import Head from "next/head"
import { Button, Row, Navbar, Nav, Container, NavDropdown, Form, FormControl } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

const Header = () => (
    <Navbar bg="light" expand="lg" sticky="top">
        <Link href="/" passHref><Navbar.Brand>Lorenzo Bartolini</Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Link href="/" passHref><Nav.Link>Home</Nav.Link></Link>
                <Link href="/projects" passHref><Nav.Link>Projects</Nav.Link></Link>
                <Link href="/about" passHref><Nav.Link>About</Nav.Link></Link>
                <Link href="/contacts" passHref><Nav.Link>Contacts</Nav.Link></Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar >
)

const Footer = () => (
    <Container fluid className="text-center bg-light py-3">
        Copyright Lorenzo Bartolini 2020
    </Container>
)

const Layout = (props) => (
    <>
        <Header />
        {props.children}
        <Footer />
    </>
)

export default Layout