import React from "react"
import { Metadata } from "next"
import { MainLayout } from "@/components/layout/MainLayout"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/seo-utils"
import StructuredData from "@/components/seo/StructuredData"
import ArticleList from "@/components/article/ArticleList"

export const metadata: Metadata = generatePageMetadata({
    title: "Artikel Rohani Kristen",
    description:
        "Kumpulan artikel rohani Kristen untuk memperkuat iman dan kehidupan spiritual. Temukan inspirasi dan wawasan dalam perjalanan iman bersama PMK ITERA.",
    path: "/article",
    keywords: [
        "artikel kristen",
        "artikel rohani",
        "wawasan kristen",
        "inspirasi iman",
        "kehidupan spiritual",
        "renungan kristen",
        "PMK ITERA artikel",
        "tulisan rohani",
        "refleksi iman",
        "pertumbuhan spiritual",
    ],
})

export default function ArtikelPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Beranda", url: "https://www.pmkitera.com" },
        { name: "Artikel", url: "https://www.pmkitera.com/article" },
    ])

    return (
        <>
            <StructuredData data={breadcrumbSchema} />
            <MainLayout>
                <div className="container mx-auto px-4 py-8">
                    {/* SEO-optimized heading structure */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
                            Artikel Rohani Kristen
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Temukan inspirasi dan wawasan dalam perjalanan iman melalui artikel-artikel rohani yang
                            membangun
                        </p>
                    </div>

                    <ArticleList />
                </div>
            </MainLayout>
        </>
    )
}
