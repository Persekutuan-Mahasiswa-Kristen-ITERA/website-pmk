import { Navbar } from "./Navbar"
import { Footer } from "./Footer"

interface MainLayoutProps {
    children: React.ReactNode
    fixedNavbar?: boolean | undefined
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, fixedNavbar = false }) => {
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-brown-950">
            <div className="top-0 w-full z-50" style={{ position: fixedNavbar ? "fixed" : "sticky" }}>
                <Navbar />
            </div>
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    )
}
