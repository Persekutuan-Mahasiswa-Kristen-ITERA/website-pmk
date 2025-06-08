import type { Metadata } from "next"
import { getDevotionalById } from "@/data/devotional"

// Dynamic metadata generation
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const devotional = await getDevotionalById(params.id)

    if (!devotional) {
        return {
            title: "Renungan Tidak Ditemukan",
            description: "Renungan yang Anda cari tidak dapat ditemukan.",
        }
    }

    const baseUrl = "https://pmkitera.com"

    return {
        title: `${devotional.title} | PMK ITERA`,
        description:
            devotional.content.slice(0, 160) + "..." ||
            "Renungan harian untuk mengenal Tuhan lebih dalam melalui firman-Nya",
        keywords: [
            "renungan harian",
            "devotional",
            "firman Tuhan",
            "alkitab",
            devotional.verse,
            ...devotional.category.split(",").map((cat) => cat.trim()),
            "PMK ITERA",
            "saat teduh",
            "quiet time",
            "rohani",
            "spiritual",
        ],
        authors: [{ name: "PMK ITERA" }],
        creator: "PMK ITERA",
        publisher: "Persekutuan Mahasiswa Kristen ITERA",
        openGraph: {
            title: devotional.title,
            description:
                devotional.content.slice(0, 160) + "..." ||
                "Renungan harian untuk mengenal Tuhan lebih dalam melalui firman-Nya",
            url: `${baseUrl}/devotional/${params.id}`,
            siteName: "PMK ITERA",
            images: [
                {
                    url: `${baseUrl}/img/bg-bible.jpg`,
                    width: 1200,
                    height: 630,
                    alt: `Renungan: ${devotional.title}`,
                },
            ],
            type: "article",
            publishedTime: devotional.createdAt?.toISOString(),
            section: "Devotional",
            locale: "id_ID",
        },
        twitter: {
            card: "summary_large_image",
            title: devotional.title,
            description:
                devotional.content.slice(0, 160) + "..." ||
                "Renungan harian untuk mengenal Tuhan lebih dalam melalui firman-Nya",
            creator: "@pmkitera",
            images: [`${baseUrl}/img/bg-bible.jpg`],
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
        alternates: {
            canonical: `${baseUrl}/devotional/${params.id}`,
        },
        category: "spirituality",
        other: {
            "article:section": "Devotional",
            "article:tag": devotional.category,
            "scripture:verse": devotional.verse,
        },
    }
}

export default function DevotionalIdLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
