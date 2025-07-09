import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getArticleBySlug } from "@/data/article"
import { generatePageMetadata, generateArticleSchema } from "@/lib/seo-utils"
import StructuredData from "@/components/seo/StructuredData"

interface Props {
    params: {
        slug: string
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const articles = await getArticleBySlug(params.slug)
    const article = articles && Array.isArray(articles) && articles.length > 0 ? articles[0] : null

    if (!article) {
        return {
            title: "Artikel Tidak Ditemukan",
            description: "Artikel yang Anda cari tidak dapat ditemukan.",
        }
    }

    return generatePageMetadata({
        title: article.title,
        description: article.excerpt,
        path: `/article/${params.slug}`,
        image: article.imageUrl,
        keywords: [
            "artikel kristen",
            "apologetika",
            "kehidupan kristen",
            "PMK ITERA",
            "rohani",
            ...(article.tags ? article.tags.split(",").map((tag) => tag.trim()) : []),
        ],
        type: "article",
        publishedTime: article.createdAt ? new Date(article.createdAt).toISOString() : undefined,
        modifiedTime: article.updatedAt ? new Date(article.updatedAt).toISOString() : undefined,
        author: article.author.name,
    })
}

export default async function ArticlePage({ params }: Props) {
    const articles = await getArticleBySlug(params.slug)
    const article = articles && Array.isArray(articles) && articles.length > 0 ? articles[0] : null

    if (!article) {
        notFound()
    }

    const articleSchema = generateArticleSchema({
        title: article.title,
        description: article.excerpt,
        slug: params.slug,
        author: article.author.name,
        publishedTime: article.createdAt ? new Date(article.createdAt).toISOString() : new Date().toISOString(),
        modifiedTime: article.updatedAt ? new Date(article.updatedAt).toISOString() : undefined,
        image: article.imageUrl,
    })

    return (
        <>
            <StructuredData data={articleSchema} />
            {/* The client component would be imported here if converting */}
        </>
    )
}
