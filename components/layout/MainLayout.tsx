import { Navbar } from "./Navbar"
import { Footer } from "./Footer"

interface MainLayoutProps {
    children: React.ReactNode
    fixedNavbar?: boolean | undefined
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, fixedNavbar = false }) => {
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-brown-950">
            {/* Skip navigation for accessibility */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-brown-600 text-white p-2 z-50"
            >
                Skip to main content
            </a>

            <header className="top-0 w-full z-50" style={{ position: fixedNavbar ? "fixed" : "sticky" }}>
                <Navbar />
            </header>

            <main id="main-content" className="flex-grow" role="main">
                {children}
            </main>

            <Footer />
        </div>
    )
}
