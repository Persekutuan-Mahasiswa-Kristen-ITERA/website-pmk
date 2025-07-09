import { MetadataRoute } from "next"
import { getArticles } from "@/data/article"
import { getDevotionals } from "@/data/devotional"
import { getEvents } from "@/data/event"
import { getDocumentations } from "@/data/documentation"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://www.pmkitera.com"
    const currentDate = new Date()

    // Static pages with enhanced SEO priorities
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: "daily",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/profile`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/management`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/devotional`,
            lastModified: currentDate,
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/article`,
            lastModified: currentDate,
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/event`,
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/documentation`,
            lastModified: currentDate,
            changeFrequency: "weekly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/contribution`,
            lastModified: currentDate,
            changeFrequency: "monthly",
            priority: 0.6,
        },
    ]

    try {
        // Fetch dynamic content with error handling
        const [articles, devotionals, events, documentations] = await Promise.allSettled([
            getArticles(),
            getDevotionals(),
            getEvents(),
            getDocumentations(),
        ])

        // Generate article pages
        const articlePages: MetadataRoute.Sitemap =
            articles.status === "fulfilled" && articles.value
                ? articles.value.map((article) => ({
                      url: `${baseUrl}/article/${article.slug}`,
                      lastModified: article.updatedAt || article.createdAt || currentDate,
                      changeFrequency: "monthly" as const,
                      priority: 0.8,
                  }))
                : []

        // Generate devotional pages
        const devotionalPages: MetadataRoute.Sitemap =
            devotionals.status === "fulfilled" && devotionals.value
                ? devotionals.value.map((devotional) => ({
                      url: `${baseUrl}/devotional/${devotional.id}`,
                      lastModified: devotional.updatedAt || devotional.createdAt || currentDate,
                      changeFrequency: "yearly" as const,
                      priority: 0.7,
                  }))
                : []

        // Generate event pages (if they have individual pages)
        const eventPages: MetadataRoute.Sitemap =
            events.status === "fulfilled" && events.value?.items
                ? events.value.items.map((event) => ({
                      url: `${baseUrl}/event/${event.id}`,
                      lastModified: event.updatedAt || event.createdAt || new Date(),
                      changeFrequency: "monthly" as const,
                      priority: 0.6,
                  }))
                : []

        // Generate documentation pages (if they have individual pages)
        const documentationPages: MetadataRoute.Sitemap =
            documentations.status === "fulfilled" && documentations.value
                ? documentations.value.map((doc) => ({
                      url: `${baseUrl}/documentation/${doc.id}`,
                      lastModified: doc.updatedAt || doc.createdAt || currentDate,
                      changeFrequency: "monthly" as const,
                      priority: 0.6,
                  }))
                : []

        // Combine all pages
        return [...staticPages, ...articlePages, ...devotionalPages, ...eventPages, ...documentationPages]
    } catch (error) {
        console.error("Error generating sitemap:", error)

        // Return static pages only if there's an error fetching dynamic content
        return staticPages
    }
}
