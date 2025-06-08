import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Kegiatan",
    description:
        "Bergabunglah dalam berbagai kegiatan rohani dan persekutuan untuk bertumbuh bersama dalam iman - Persekutuan Mahasiswa Kristen ITERA",
    keywords: [
        "kegiatan",
        "event",
        "kegiatan rohani",
        "persekutuan",
        "worship",
        "bible study",
        "retreat",
        "seminar",
        "conference",
        "PMK ITERA",
        "Persekutuan Mahasiswa Kristen",
        "ITERA",
        "Institut Teknologi Sumatera",
        "mahasiswa kristen",
        "rohani",
        "spiritual",
        "fellowship",
        "community",
        "ibadah",
        "pelayanan",
    ],
    openGraph: {
        title: "Kegiatan | Persekutuan Mahasiswa Kristen ITERA",
        description:
            "Bergabunglah dalam berbagai kegiatan rohani dan persekutuan untuk bertumbuh bersama dalam iman - Persekutuan Mahasiswa Kristen ITERA",
        url: "https://pmkitera.com/event",
        siteName: "PMK ITERA",
        images: [
            {
                url: "https://pmkitera.com/img/event-og.png",
                width: 1200,
                height: 630,
                alt: "Kegiatan PMK ITERA",
            },
        ],
        type: "website",
        locale: "id_ID",
    },
    twitter: {
        card: "summary_large_image",
        title: "Kegiatan - PMK ITERA",
        description:
            "Bergabunglah dalam berbagai kegiatan rohani dan persekutuan untuk bertumbuh bersama dalam iman - Persekutuan Mahasiswa Kristen ITERA",
        creator: "@pmkitera",
        images: ["https://pmkitera.com/img/event-twitter.png"],
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
        canonical: "https://pmkitera.com/event",
    },
    category: "events",
}

export default function EventLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
