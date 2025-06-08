import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Dokumentasi Kegiatan | Persekutuan Mahasiswa Kristen ITERA",
    description:
        "Kumpulan dokumentasi dari berbagai kegiatan PMK ITERA yang telah dilaksanakan - Persekutuan Mahasiswa Kristen ITERA",
    keywords: [
        "dokumentasi",
        "documentation",
        "kegiatan",
        "galeri",
        "foto kegiatan",
        "video",
        "gallery",
        "PMK ITERA",
        "Persekutuan Mahasiswa Kristen",
        "ITERA",
        "Institut Teknologi Sumatera",
        "mahasiswa kristen",
        "aktivitas",
        "event documentation",
        "church activities",
        "fellowship activities",
        "christian events",
        "rohani",
        "pelayanan",
    ],
    openGraph: {
        title: "Dokumentasi - PMK ITERA",
        description:
            "Kumpulan dokumentasi dari berbagai kegiatan PMK ITERA yang telah dilaksanakan - Persekutuan Mahasiswa Kristen ITERA",
        url: "https://pmkitera.com/documentation",
        siteName: "PMK ITERA",
        images: [
            {
                url: "https://pmkitera.com/img/bg-documentation.jpg",
                width: 1200,
                height: 630,
                alt: "Dokumentasi Kegiatan PMK ITERA",
            },
        ],
        type: "website",
        locale: "id_ID",
    },
    twitter: {
        card: "summary_large_image",
        title: "Dokumentasi - PMK ITERA",
        description:
            "Kumpulan dokumentasi dari berbagai kegiatan PMK ITERA yang telah dilaksanakan - Persekutuan Mahasiswa Kristen ITERA",
        creator: "@pmkitera",
        images: ["https://pmkitera.com/img/bg-documentation.jpg"],
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
        canonical: "https://pmkitera.com/documentation",
    },
    category: "documentation",
}

export default function DocumentationLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
