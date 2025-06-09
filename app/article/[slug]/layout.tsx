import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Artikel | Persekutuan Mahasiswa Kristen ITERA",
    description: "Artikel dan tulisan dari Persekutuan Mahasiswa Kristen ITERA",
    keywords: [
        "artikel",
        "tulisan",
        "PMK ITERA",
        "mahasiswa kristen",
        "persekutuan",
        "iman",
        "rohani",
        "spiritual",
        "kekristenan",
    ],
    authors: [{ name: "PMK ITERA" }],
    creator: "PMK ITERA",
    publisher: "Persekutuan Mahasiswa Kristen ITERA",
    openGraph: {
        title: "Artikel | PMK ITERA",
        description: "Artikel dan tulisan dari Persekutuan Mahasiswa Kristen ITERA",
        url: "https://pmkitera.com/article",
        siteName: "PMK ITERA",
        images: [
            {
                url: "https://pmkitera.com/opengraph-image.png",
                width: 1200,
                height: 630,
                alt: "Artikel PMK ITERA",
            },
        ],
        type: "website",
        locale: "id_ID",
    },
    twitter: {
        card: "summary_large_image",
        title: "Artikel | PMK ITERA",
        description: "Artikel dan tulisan dari Persekutuan Mahasiswa Kristen ITERA",
        creator: "@pmkitera",
        images: ["https://pmkitera.com/twitter-image.png"],
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
    category: "article",
}

export default function ArticleSlugLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
