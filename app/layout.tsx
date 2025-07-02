import type { Metadata } from "next"
import { GoogleAnalytics } from "@next/third-parties/google"
import "./index.css"

export const metadata: Metadata = {
    title: {
        template: "%s | Persekutuan Mahasiswa Kristen ITERA",
        default: "Persekutuan Mahasiswa Kristen ITERA",
    },
    description:
        "Persekutuan Mahasiswa Kristen ITERA adalah komunitas mahasiswa Kristen yang berkomitmen untuk membangun persekutuan, pelayanan, dan pertumbuhan rohani di Institut Teknologi Sumatera.",
    metadataBase: new URL("https://www.pmkitera.com"),
    keywords: [
        "Persekutuan Mahasiswa Kristen",
        "Persekutuan Mahasiswa Kristen ITERA",
        "ITERA",
        "PMK ITERA",
        "Christian Student Fellowship",
        "Institut Teknologi Sumatera",
        "PMK",
        "Mahasiswa Kristen",
        "Lampung",
        "Rohani",
    ],
    authors: [{ name: "Persekutuan Mahasiswa Kristen ITERA", url: "https://www.pmkitera.com" }],
    creator: "Persekutuan Mahasiswa Kristen ITERA",
    publisher: "Persekutuan Mahasiswa Kristen ITERA",
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/favicon.ico",
    },
    openGraph: {
        title: "Persekutuan Mahasiswa Kristen ITERA",
        description:
            "Komunitas mahasiswa Kristen yang berkomitmen untuk membangun persekutuan, pelayanan, dan pertumbuhan rohani di Institut Teknologi Sumatera.",
        url: "https://www.pmkitera.com",
        siteName: "PMK ITERA",
        images: [
            {
                url: "https://www.pmkitera.com/opengraph-image.webp",
                width: 600,
                height: 256,
                alt: "Persekutuan Mahasiswa Kristen ITERA",
            },
        ],
        locale: "id_ID",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Persekutuan Mahasiswa Kristen ITERA",
        description:
            "Komunitas mahasiswa Kristen yang berkomitmen untuk membangun persekutuan, pelayanan, dan pertumbuhan rohani di Institut Teknologi Sumatera.",
        creator: "@pmkitera",
        images: ["https://www.pmkitera.com/opengraph-image.webp"],
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            "max-video-preview": -1,
            "max-snippet": -1,
        },
    },
    category: "organization",
}

import { DM_Sans, Inter, Playfair_Display } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/AuthContext"
import { Toaster } from "@/components/ui/toaster"

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
                    <Toaster />
                </ThemeProvider>
            </body>
            <GoogleAnalytics gaId="G-J0RN9KN5YZ" />
        </html>
    )
}
