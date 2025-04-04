import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
    title: "Persekutuan Mahasiswa Kristen ITERA",
    description: "Persekutuan Mahasiswa Kristen ITERA",
}

import { Inter, Playfair_Display } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/AuthContext"

const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
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
        <html lang="id" suppressHydrationWarning>
            <body
                className={`${inter.className} ${playfairDisplay.className} bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100`}
            >
                <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
                    <AuthProvider>{children}</AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
