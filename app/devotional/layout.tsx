import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Renungan Harian",
    description:
        "Mari belajar mengenal Tuhan lebih dalam melalui firman-Nya setiap hari - Persekutuan Mahasiswa Kristen ITERA",
    keywords: [
        "renungan harian",
        "devotional",
        "firman Tuhan",
        "alkitab",
        "renungan kristen",
        "quiet time",
        "saat teduh",
        "PMK ITERA",
        "Persekutuan Mahasiswa Kristen",
        "ITERA",
        "Institut Teknologi Sumatera",
        "mahasiswa kristen",
        "rohani",
        "spiritual",
        "bible study",
        "ayat alkitab",
    ],
    openGraph: {
        title: "Renungan Harian | Persekutuan Mahasiswa Kristen ITERA",
        description:
            "Mari belajar mengenal Tuhan lebih dalam melalui firman-Nya setiap hari - Persekutuan Mahasiswa Kristen ITERA",
        url: "https://pmkitera.com/devotional",
        siteName: "PMK ITERA",
        images: [
            {
                url: "https://pmkitera.com/img/devotional-og.png",
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
        title: "Renungan Harian - PMK ITERA",
        description:
            "Mari belajar mengenal Tuhan lebih dalam melalui firman-Nya setiap hari - Persekutuan Mahasiswa Kristen ITERA",
        creator: "@pmkitera",
        images: ["https://pmkitera.com/img/devotional-twitter.png"],
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
        canonical: "https://pmkitera.com/devotional",
    },
    category: "spirituality",
}

export default function DevotionalLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
