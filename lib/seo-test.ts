/**
 * SEO Implementation Test
 *
 * This file helps verify that all SEO improvements are working correctly.
 * Run this in development to check SEO implementation.
 */

import { generatePageMetadata, generateOrganizationSchema, generateWebsiteSchema } from "@/lib/seo-utils"

export function testSEOImplementation() {
    console.log("🔍 Testing SEO Implementation...")

    // Test metadata generation
    const testMetadata = generatePageMetadata({
        title: "Test Page",
        description: "This is a test page description",
        path: "/test",
        keywords: ["test", "seo"],
    })

    console.log("✅ Metadata Generation:", testMetadata.title)

    // Test schema generation
    const orgSchema = generateOrganizationSchema()
    const websiteSchema = generateWebsiteSchema()

    console.log("✅ Organization Schema:", orgSchema["@type"])
    console.log("✅ Website Schema:", websiteSchema["@type"])

    // Test required properties
    const requiredChecks = {
        "Has title template": !!testMetadata.title,
        "Has description": !!testMetadata.description,
        "Has Open Graph": !!testMetadata.openGraph,
        "Has Twitter Card": !!testMetadata.twitter,
        "Has canonical URL": !!testMetadata.alternates?.canonical,
        "Organization has name": !!orgSchema.name,
        "Website has URL": !!websiteSchema.url,
    }

    Object.entries(requiredChecks).forEach(([check, passed]) => {
        console.log(passed ? `✅ ${check}` : `❌ ${check}`)
    })

    console.log("🎉 SEO Implementation Test Complete!")

    return {
        metadata: testMetadata,
        schemas: { organization: orgSchema, website: websiteSchema },
        checks: requiredChecks,
    }
}

// SEO checklist for manual verification
export const SEO_MANUAL_CHECKLIST = [
    "□ Verify Google Search Console integration",
    "□ Test structured data with Google Rich Results Test",
    "□ Check page load speed with PageSpeed Insights",
    "□ Verify social media sharing previews",
    "□ Test mobile responsiveness",
    "□ Check XML sitemap accessibility (/sitemap.xml)",
    "□ Verify robots.txt (/robots.txt)",
    "□ Test 404 error page",
    "□ Check RSS feed (/rss.xml)",
    "□ Verify favicon and app icons display correctly",
]

export default testSEOImplementation
