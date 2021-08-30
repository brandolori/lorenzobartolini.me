import Link from "next/link"
import { Navbar, Nav, Container } from "react-bootstrap"

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
    <Container as="footer" fluid className="text-center bg-light py-3">
        Copyright Lorenzo Bartolini 2021
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