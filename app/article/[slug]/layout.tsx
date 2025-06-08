import type { Metadata } from "next"
import { getArticleBySlug } from "@/data/article"

// Dynamic metadata generation
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const article = await getArticleBySlug(params.slug)

    if (!article || !Array.isArray(article) || article.length === 0) {
        return {
            title: "Artikel Tidak Ditemukan",
            description: "Artikel yang Anda cari tidak dapat ditemukan.",
        }
    }

    const articleData = article[0]
    const baseUrl = "https://pmkitera.com"

    return {
        title: `${articleData.title} | Persekutuan Mahasiswa Kristen ITERA`,
        description: articleData.excerpt || articleData.content.slice(0, 160) + "...",
        keywords: articleData.tags ? articleData.tags.split(",").map((tag) => tag.trim()) : [],
        authors: [{ name: articleData.author.name }],
        creator: articleData.author.name,
        publisher: "PMK ITERA",
        openGraph: {
            title: articleData.title,
            description: articleData.excerpt || articleData.content.slice(0, 160) + "...",
            url: `${baseUrl}/article/${params.slug}`,
            siteName: "PMK ITERA",
            images: [
                {
                    url: articleData.imageUrl ? `${baseUrl}${articleData.imageUrl}` : `${baseUrl}/opengraph-image.png`,
                    width: 1200,
                    height: 630,
                    alt: articleData.title,
                },
            ],
            type: "article",
            publishedTime: articleData.createdAt?.toISOString(),
            authors: [articleData.author.name],
            section: "Article",
            locale: "id_ID",
        },
        twitter: {
            card: "summary_large_image",
            title: articleData.title,
            description: articleData.excerpt || articleData.content.slice(0, 160) + "...",
            creator: "@pmkitera",
            images: [articleData.imageUrl ? `${baseUrl}${articleData.imageUrl}` : `${baseUrl}/twitter-image.png`],
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
            canonical: `${baseUrl}/article/${params.slug}`,
        },
        category: "article",
    }
}

export default function ArticleSlugLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
