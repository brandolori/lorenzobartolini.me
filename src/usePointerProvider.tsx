import { useEffect, useState } from "react"
import DesktopPointerProvider from "../components/DesktopPointerProvider"
import MobilePointerProvider from "../components/MobilePointerProvider"

const DummyPointerProvider = ({ children }) =>
    <div style={{ width: "100%", height: "100%" }}>
        {children}
    </div>

export default () => {
    const [provider, setProvider] = useState<"dummy" | "desktop" | "mobile">("dummy")

    useEffect(() => {
        const isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
            .test(navigator.userAgent))

        setProvider(isMobile ? "mobile" : "desktop")
    }, [])

    return provider == "dummy" ? DummyPointerProvider :
        provider == "desktop" ? DesktopPointerProvider :
            MobilePointerProvider
}
