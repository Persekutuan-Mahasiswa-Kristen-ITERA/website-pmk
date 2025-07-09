import React from "react"
import { Metadata } from "next"
import { MainLayout } from "@/components/layout/MainLayout"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/seo-utils"
import StructuredData from "@/components/seo/StructuredData"
import DevotionalList from "@/components/devotional/DevotionalList"

export const metadata: Metadata = generatePageMetadata({
    title: "Renungan Harian Kristen",
    description:
        "Renungan harian Kristen untuk memperdalam hubungan dengan Tuhan. Dapatkan inspirasi spiritual setiap hari melalui renungan yang membangun iman dan karakter Kristiani.",
    path: "/devotional",
    keywords: [
        "renungan harian",
        "renungan kristen",
        "devotional",
        "quiet time",
        "saat teduh",
        "inspirasi rohani",
        "pemahaman alkitab",
        "pertumbuhan iman",
        "kehidupan spiritual",
        "PMK ITERA",
    ],
})

export default function RenunganPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Beranda", url: "https://www.pmkitera.com" },
        { name: "Renungan", url: "https://www.pmkitera.com/devotional" },
    ])

    return (
        <>
            <StructuredData data={breadcrumbSchema} />
            <MainLayout>
                <div className="container mx-auto px-4 py-8">
                    {/* SEO-optimized heading structure */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
                            Renungan Harian Kristen
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Perkuat hubungan dengan Tuhan melalui renungan harian yang menginspirasikan pertumbuhan spiritual
                        </p>
                    </div>
                    
                    <DevotionalList />
                </div>
            </MainLayout>
        </>
    )
}
