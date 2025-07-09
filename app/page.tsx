import React from "react"
import { Metadata } from "next"
import { MainLayout } from "@/components/layout/MainLayout"
import { Hero } from "@/components/home/Hero"
import { UpcomingEvents } from "@/components/home/UpcomingEvents"
import { About } from "@/components/home/About"
import { RecentDevotions } from "@/components/home/RecentDevotions"
import { Testimonials } from "@/components/home/Testimonials"
import { CallToAction } from "@/components/home/CallToAction"
import { RecentArticles } from "@/components/home/RecentArticles"
import { generatePageMetadata } from "@/lib/seo-utils"
import enhanceH1ForSEO from "@/lib/h1-seo-helper"

export const metadata: Metadata = {
    title: {
        template: "%s | Persekutuan Mahasiswa Kristen ITERA",
        default: "Persekutuan Mahasiswa Kristen ITERA",
    },
    description:
        "Persekutuan Mahasiswa Kristen ITERA (PMK ITERA) adalah komunitas mahasiswa Kristen untuk membangun pertumbuhan rohani di Institut Teknologi Sumatera.",
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
            "Persekutuan Mahasiswa Kristen ITERA (PMK ITERA) adalah komunitas mahasiswa Kristen untuk membangun pertumbuhan rohani di Institut Teknologi Sumatera.",
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
            "Persekutuan Mahasiswa Kristen ITERA (PMK ITERA) adalah komunitas mahasiswa Kristen untuk membangun pertumbuhan rohani di Institut Teknologi Sumatera.",
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
    other: {
        "format-detection": "telephone=no",
        "mobile-web-app-capable": "yes",
        "apple-mobile-web-app-capable": "yes",
        "apple-mobile-web-app-status-bar-style": "default",
    },
    verification: {
        google: "your-search-console-verification-code", // Replace with actual verification code from Google Search Console
    },
    category: "organization",
    classification: "Community Organization",
}

const Index = () => {
    return (
        <MainLayout fixedNavbar={true}>
            <Hero />
            <About />
            <UpcomingEvents />
            <RecentArticles />
            <RecentDevotions />
            {/* <Testimonials /> */}
            <CallToAction />
        </MainLayout>
    )
}

export default Index
