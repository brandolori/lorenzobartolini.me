import Link from "next/link"
import { useContext, useRef, useState } from "react"
import { Navbar, Nav, Container } from "react-bootstrap"
import makeStyles from "../src/makeStyles"
import PointerContext from "../src/PointerContext"
import Background from "./Background"

const styles = makeStyles({
    wrapper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%"
    }
})

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

const normalize = (value: number, range: number) => ((value - (range / 2)) / (range / 2))


const Layout = (props) => {
    const [pointerPos, setPointerPos] = useContext(PointerContext)

    const backgroundRef = useRef<HTMLDivElement>()
    return (
        <>
            <div style={{ width: "100%", height: "100%" }}
                onPointerMove={(e) => {
                    setPointerPos({
                        x: 2 * normalize(e.clientX, window.innerWidth),
                        y: -2 * normalize(e.clientY, window.innerHeight)
                    })
                }}>
                <div ref={backgroundRef} style={{ position: "fixed", top: 0, bottom: 0, left: 0, right: 0 }}>
                    <Background pointerPosition={pointerPos} />
                </div>
                <div style={{ position: "relative" }}>

                    {props.children}

                </div>
            </div >
        </>
    )
}

export default Layout