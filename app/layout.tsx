import type { Metadata } from "next"
import { GoogleAnalytics } from "@next/third-parties/google"
import { generateOrganizationSchema, generateWebsiteSchema } from "@/lib/seo-utils"
import StructuredData from "@/components/seo/StructuredData"
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
        "Komunitas Kristen",
        "Persekutuan",
        "Pelayanan",
        "Renungan Harian",
        "Artikel Kristen",
        "Event Rohani",
    ],
    authors: [{ name: "Persekutuan Mahasiswa Kristen ITERA", url: "https://www.pmkitera.com" }],
    creator: "Persekutuan Mahasiswa Kristen ITERA",
    publisher: "Persekutuan Mahasiswa Kristen ITERA",

    alternates: {
        canonical: "https://www.pmkitera.com",
    },
    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "any" },
            { url: "/logo-32.png", sizes: "32x32", type: "image/png" },
            { url: "/logo-128.png", sizes: "128x128", type: "image/png" },
            { url: "/logo-256.png", sizes: "256x256", type: "image/png" },
        ],
        shortcut: "/favicon.ico",
        apple: [
            { url: "/logo-128.png", sizes: "128x128", type: "image/png" },
            { url: "/logo-256.png", sizes: "256x256", type: "image/png" },
        ],
    },
    manifest: "/manifest.json",
    openGraph: {
        title: "Persekutuan Mahasiswa Kristen ITERA",
        description:
            "Komunitas mahasiswa Kristen yang berkomitmen untuk membangun pertumbuhan rohani di Institut Teknologi Sumatera.",
        url: "https://www.pmkitera.com",
        siteName: "PMK ITERA",
        images: [
            {
                url: "https://www.pmkitera.com/opengraph-image.webp",
                width: 1200,
                height: 630,
                alt: "Persekutuan Mahasiswa Kristen ITERA",
            },
        ],
        locale: "id_ID",
        type: "website",
        countryName: "Indonesia",
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
            "max-image-preview": "large",
        },
    },
    verification: {
        google: "your-search-console-verification-code", // Replace with actual verification code from Google Search Console
    },
    category: "organization",
    classification: "Community Organization",
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
    const organizationSchema = generateOrganizationSchema()
    const websiteSchema = generateWebsiteSchema()

    return (
        <html lang="id" suppressHydrationWarning style={{ scrollBehavior: "smooth" }} className="scroll-smooth">
            <head>
                <StructuredData data={organizationSchema} />
                <StructuredData data={websiteSchema} />
                <meta name="theme-color" content="#8B4513" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content="PMK ITERA" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="msapplication-TileColor" content="#8B4513" />
                <meta name="msapplication-config" content="/browserconfig.xml" />
                <link rel="alternate" type="application/rss+xml" title="PMK ITERA RSS Feed" href="/rss.xml" />
            </head>
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
