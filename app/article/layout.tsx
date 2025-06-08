import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Artikel",
    description: "Tulisan seputar kehidupan dan apologetika Kristen - Persekutuan Mahasiswa Kristen ITERA",
    keywords: [
        "artikel",
        "artikel kristen",
        "kehidupan kristen",
        "apologetika kristen",
        "tulisan rohani",
        "PMK ITERA",
        "Persekutuan Mahasiswa Kristen",
        "ITERA",
        "Institut Teknologi Sumatera",
        "mahasiswa kristen",
        "refleksi rohani",
    ],
    openGraph: {
        title: "Artikel - PMK ITERA",
        description: "Tulisan seputar kehidupan dan apologetika Kristen - Persekutuan Mahasiswa Kristen ITERA",
        url: "https://pmkitera.com/article",
        siteName: "PMK ITERA",
        images: [
            {
                url: "https://pmkitera.com/img/bg-article.webp",
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
        title: "Artikel | Persekutuan Mahasiswa Kristen ITERA",
        description: "Tulisan seputar kehidupan dan apologetika Kristen - Persekutuan Mahasiswa Kristen ITERA",
        creator: "@pmkitera",
        images: ["https://pmkitera.com/img/bg-article.webp"],
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://pmkitera.com/article",
    },
}

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
