import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Persembahan Kasih | Persekutuan Mahasiswa Kristen ITERA",
    description:
        "Mari berkontribusi melalui persembahan Anda untuk mendukung kegiatan kami dan pelayanan kami - Persekutuan Mahasiswa Kristen ITERA",
    keywords: [
        "persembahan",
        "donasi",
        "kontribusi",
        "persembahan kasih",
        "sumbangan",
        "dukungan",
        "PMK ITERA",
        "Persekutuan Mahasiswa Kristen",
        "ITERA",
        "Institut Teknologi Sumatera",
        "mahasiswa kristen",
        "pelayanan",
        "kegiatan rohani",
        "contribution",
        "donation",
        "support",
    ],
    openGraph: {
        title: "Persembahan Kasih - PMK ITERA",
        description:
            "Mari berkontribusi melalui persembahan Anda untuk mendukung kegiatan kami dan pelayanan kami - Persekutuan Mahasiswa Kristen ITERA",
        url: "https://www.pmkitera.com/contribution",
        siteName: "PMK ITERA",
        images: [
            {
                url: "https://www.pmkitera.com/img/bg-article.webp",
                width: 1200,
                height: 630,
                alt: "Persembahan Kasih PMK ITERA",
            },
        ],
        type: "website",
        locale: "id_ID",
    },
    twitter: {
        card: "summary_large_image",
        title: "Persembahan Kasih - PMK ITERA",
        description:
            "Mari berkontribusi melalui persembahan Anda untuk mendukung kegiatan kami dan pelayanan kami - Persekutuan Mahasiswa Kristen ITERA",
        creator: "@pmkitera",
        images: ["https://www.pmkitera.com/img/bg-article.webp"],
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
        canonical: "https://www.pmkitera.com/contribution",
    },
    category: "contribution",
}

export default function ContributionLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
