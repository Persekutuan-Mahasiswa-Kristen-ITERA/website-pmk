import React from "react"
import { Metadata } from "next"
import { MainLayout } from "@/components/layout/MainLayout"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/seo-utils"
import StructuredData from "@/components/seo/StructuredData"
import EventList from "@/components/event/EventList"

export const metadata: Metadata = generatePageMetadata({
    title: "Event & Kegiatan Rohani",
    description:
        "Ikuti berbagai event dan kegiatan rohani PMK ITERA. Temukan kesempatan untuk bertumbuh dalam iman bersama komunitas mahasiswa Kristen di Institut Teknologi Sumatera.",
    path: "/event",
    keywords: [
        "event PMK ITERA",
        "kegiatan rohani",
        "acara kristen",
        "retreat",
        "seminar rohani",
        "fellowship",
        "kebaktian",
        "komunitas kristen",
        "kegiatan mahasiswa",
        "event kampus",
    ],
})

export default function EventPage() {
    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Beranda", url: "https://www.pmkitera.com" },
        { name: "Event", url: "https://www.pmkitera.com/event" },
    ])

    return (
        <>
            <StructuredData data={breadcrumbSchema} />
            <MainLayout>
                <div className="container mx-auto px-4 py-8">
                    {/* SEO-optimized heading structure */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
                            Event & Kegiatan Rohani
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Bergabunglah dalam berbagai kegiatan rohani dan event yang membangun komunitas iman
                        </p>
                    </div>

                    <EventList />
                </div>
            </MainLayout>
        </>
    )
}
