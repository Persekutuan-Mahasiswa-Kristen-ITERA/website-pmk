import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Renungan Harian | Persekutuan Mahasiswa Kristen ITERA",
    description: "Renungan harian untuk mengenal Tuhan lebih dalam melalui firman-Nya",
    keywords: [
        "renungan harian",
        "devotional",
        "firman Tuhan",
        "alkitab",
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
        title: "Renungan Harian | PMK ITERA",
        description: "Renungan harian untuk mengenal Tuhan lebih dalam melalui firman-Nya",
        url: "https://www.pmkitera.com/devotional",
        siteName: "PMK ITERA",
        images: [
            {
                url: "https://www.pmkitera.com/img/bg-bible.jpg",
                width: 1200,
                height: 630,
                alt: "Renungan Harian PMK ITERA",
            },
        ],
        type: "website",
        locale: "id_ID",
    },
    twitter: {
        card: "summary_large_image",
        title: "Renungan Harian | PMK ITERA",
        description: "Renungan harian untuk mengenal Tuhan lebih dalam melalui firman-Nya",
        creator: "@pmkitera",
        images: ["https://www.pmkitera.com/img/bg-bible.jpg"],
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
    category: "spirituality",
}

export default function DevotionalIdLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
