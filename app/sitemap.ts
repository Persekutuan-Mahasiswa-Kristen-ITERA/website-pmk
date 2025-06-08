import { MetadataRoute } from "next"
import { getArticles } from "@/data/article"
import { getDevotionals } from "@/data/devotional"
import { getEvents } from "@/data/event"
import { getDocumentations } from "@/data/documentation"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://pmkitera.com"

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${baseUrl}/profile`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/management`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/devotional`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/article`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/event`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/documentation`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/contribution`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
        },
    ]

    try {
        // Fetch dynamic content
        const [articles, devotionals, events, documentations] = await Promise.all([
            getArticles(),
            getDevotionals(),
            getEvents(),
            getDocumentations(),
        ])

        // Generate article pages
        const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
            url: `${baseUrl}/article/${article.slug}`,
            lastModified: article.updatedAt || article.createdAt || new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.8,
        }))

        // Generate devotional pages
        const devotionalPages: MetadataRoute.Sitemap = devotionals.map((devotional) => ({
            url: `${baseUrl}/devotional/${devotional.id}`,
            lastModified: devotional.updatedAt || devotional.createdAt || new Date(),
            changeFrequency: "yearly" as const,
            priority: 0.7,
        }))

        // Generate event pages (if they have individual pages)
        const eventPages: MetadataRoute.Sitemap = events.items
            ? events.items.map((event) => ({
                  url: `${baseUrl}/event/${event.id}`,
                  lastModified: event.updatedAt || event.createdAt || new Date(),
                  changeFrequency: "monthly" as const,
                  priority: 0.6,
              }))
            : []

        // Generate documentation pages (if they have individual pages)
        const documentationPages: MetadataRoute.Sitemap = documentations.map((doc) => ({
            url: `${baseUrl}/documentation/${doc.id}`,
            lastModified: doc.updatedAt || doc.createdAt || new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.6,
        }))

        // Combine all pages
        return [...staticPages, ...articlePages, ...devotionalPages, ...eventPages, ...documentationPages]
    } catch (error) {
        console.error("Error generating sitemap:", error)

        // Return static pages only if there's an error fetching dynamic content
        return staticPages
    }
}
