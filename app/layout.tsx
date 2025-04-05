import type { Metadata } from "next"
import "./index.css"

export const metadata: Metadata = {
    title: "Persekutuan Mahasiswa Kristen ITERA",
    description: "Persekutuan Mahasiswa Kristen ITERA",
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/favicon.ico",
    },
    keywords: "Persekutuan Mahasiswa Kristen, ITERA, Christian Student Fellowship",
    authors: [{ name: "Persekutuan Mahasiswa Kristen ITERA", url: "https://pmkitera.com" }],
    robots: "index, follow",
}

import { DM_Sans, Inter, Playfair_Display } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/AuthContext"

const defaultFont = DM_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
})

const playfairDisplay = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    style: ["normal", "italic"],
})

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="id" suppressHydrationWarning style={{ scrollBehavior: "smooth" }} className="scroll-smooth">
            <body
                className={`${defaultFont.className} ${playfairDisplay.className} bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100`}
            >
                <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
                    <AuthProvider>{children}</AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
