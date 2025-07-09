import { getArticles } from "@/data/article"
import { getDevotionals } from "@/data/devotional"

export async function GET() {
    const baseUrl = "https://www.pmkitera.com"

    try {
        const [articles, devotionals] = await Promise.allSettled([getArticles(), getDevotionals()])

        const articlesData = articles.status === "fulfilled" ? articles.value : []
        const devotionalsData = devotionals.status === "fulfilled" ? devotionals.value : []

        // Combine and sort by date
        const allContent = [
            ...articlesData.map((article) => ({
                title: article.title,
                description: article.excerpt,
                url: `${baseUrl}/article/${article.slug}`,
                pubDate: new Date(article.createdAt || Date.now()).toUTCString(),
                category: "Article",
            })),
            ...devotionalsData.map((devotional) => ({
                title: devotional.title,
                description: devotional.content.substring(0, 150) + "...",
                url: `${baseUrl}/devotional/${devotional.id}`,
                pubDate: new Date(devotional.createdAt || Date.now()).toUTCString(),
                category: "Devotional",
            })),
        ]
            .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
            .slice(0, 20) // Latest 20 items

        const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>PMK ITERA - Persekutuan Mahasiswa Kristen ITERA</title>
    <description>Artikel dan renungan harian dari komunitas Persekutuan Mahasiswa Kristen ITERA</description>
    <link>${baseUrl}</link>
    <language>id-ID</language>
    <managingEditor>info@pmkitera.com (PMK ITERA)</managingEditor>
    <webMaster>info@pmkitera.com (PMK ITERA)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${allContent
        .map(
            (item) => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <description><![CDATA[${item.description}]]></description>
      <link>${item.url}</link>
      <guid isPermaLink="true">${item.url}</guid>
      <pubDate>${item.pubDate}</pubDate>
      <category>${item.category}</category>
    </item>
    `
        )
        .join("")}
  </channel>
</rss>`

        return new Response(rss, {
            headers: {
                "Content-Type": "application/xml",
                "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=600",
            },
        })
    } catch (error) {
        console.error("Error generating RSS feed:", error)
        return new Response("Error generating RSS feed", { status: 500 })
    }
}
