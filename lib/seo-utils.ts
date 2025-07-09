import { Metadata } from "next"

const SITE_URL = "https://www.pmkitera.com"
const SITE_NAME = "Persekutuan Mahasiswa Kristen ITERA"

export function generatePageMetadata({
    title,
    description,
    path = "",
    image,
    keywords,
    type = "website",
    publishedTime,
    modifiedTime,
    author,
    noIndex = false,
}: {
    title: string
    description: string
    path?: string
    image?: string
    keywords?: string[]
    type?: "website" | "article"
    publishedTime?: string
    modifiedTime?: string
    author?: string
    noIndex?: boolean
}): Metadata {
    const url = `${SITE_URL}${path}`
    const imageUrl = image ? `${SITE_URL}${image}` : `${SITE_URL}/opengraph-image.webp`

    const metadata: Metadata = {
        title: title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`,
        description,
        keywords: keywords ? [...keywords, "PMK ITERA", "Mahasiswa Kristen", "ITERA"] : undefined,
        authors: author ? [{ name: author }] : [{ name: SITE_NAME }],
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            siteName: SITE_NAME,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: "id_ID",
            type: type === "article" ? "article" : "website",
            ...(publishedTime && { publishedTime }),
            ...(modifiedTime && { modifiedTime }),
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [imageUrl],
            creator: "@pmkitera",
        },
        robots: noIndex
            ? { index: false, follow: false }
            : {
                  index: true,
                  follow: true,
                  googleBot: {
                      index: true,
                      follow: true,
                      "max-snippet": -1,
                      "max-image-preview": "large",
                      "max-video-preview": -1,
                  },
              },
    }

    return metadata
}

export function generateOrganizationSchema() {
    return {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        sameAs: ["https://www.instagram.com/pmkitera", "https://www.youtube.com/@pmkitera"],
        description:
            "PMK ITERA adalah komunitas mahasiswa Kristen yang berkomitmen untuk membangun pertumbuhan rohani di Institut Teknologi Sumatera.",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Lampung Selatan",
            addressRegion: "Lampung",
            addressCountry: "Indonesia",
        },
        contactPoint: {
            "@type": "ContactPoint",
            telephone: "+62-xxx-xxxx-xxxx",
            contactType: "Customer Service",
            availableLanguage: ["Indonesian"],
        },
    }
}

export function generateWebsiteSchema() {
    return {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description:
            "PMK ITERA adalah komunitas mahasiswa Kristen yang berkomitmen untuk membangun pertumbuhan rohani di Institut Teknologi Sumatera.",
        publisher: {
            "@id": `${SITE_URL}/#organization`,
        },
        potentialAction: {
            "@type": "SearchAction",
            target: `${SITE_URL}/search?q={search_term_string}`,
        },
        inLanguage: "id-ID",
    }
}

export function generateArticleSchema({
    title,
    description,
    slug,
    author,
    publishedTime,
    modifiedTime,
    image,
}: {
    title: string
    description: string
    slug: string
    author: string
    publishedTime: string
    modifiedTime?: string
    image?: string
}) {
    const articleUrl = `${SITE_URL}/article/${slug}`
    const imageUrl = image ? `${SITE_URL}${image}` : `${SITE_URL}/opengraph-image.webp`

    return {
        "@type": "Article",
        "@id": `${articleUrl}#article`,
        url: articleUrl,
        headline: title,
        description,
        image: imageUrl,
        author: {
            "@type": "Person",
            name: author,
        },
        publisher: {
            "@id": `${SITE_URL}/#organization`,
        },
        datePublished: publishedTime,
        dateModified: modifiedTime || publishedTime,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": articleUrl,
        },
        articleSection: "Christian Life",
        inLanguage: "id-ID",
    }
}

export function generateEventSchema({
    title,
    description,
    startDate,
    endDate,
    location,
    image,
}: {
    title: string
    description: string
    startDate: string
    endDate?: string
    location?: string
    image?: string
}) {
    const imageUrl = image ? `${SITE_URL}${image}` : `${SITE_URL}/opengraph-image.webp`

    return {
        "@type": "Event",
        name: title,
        description,
        startDate,
        ...(endDate && { endDate }),
        ...(location && {
            location: {
                "@type": "Place",
                name: location,
                address: {
                    "@type": "PostalAddress",
                    addressLocality: "Lampung Selatan",
                    addressRegion: "Lampung",
                    addressCountry: "Indonesia",
                },
            },
        }),
        image: imageUrl,
        organizer: {
            "@id": `${SITE_URL}/#organization`,
        },
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
    return {
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    }
}

export function generateJsonLd(schema: Record<string, unknown>) {
    return {
        __html: JSON.stringify({
            "@context": "https://schema.org",
            ...schema,
        }),
    }
}
