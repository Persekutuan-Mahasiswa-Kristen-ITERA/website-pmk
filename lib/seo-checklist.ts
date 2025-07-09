/**
 * SEO Checklist for PMK ITERA Website
 *
 * ✅ Basic SEO Setup:
 * - [x] Title tags with proper template
 * - [x] Meta descriptions for all pages
 * - [x] Open Graph tags
 * - [x] Twitter Card tags
 * - [x] Canonical URLs
 * - [x] Language declaration (lang="id")
 * - [x] Favicon and app icons
 * - [x] Robots.txt
 * - [x] XML Sitemap
 * - [x] Web App Manifest
 *
 * ✅ Structured Data (Schema.org):
 * - [x] Organization schema
 * - [x] Website schema
 * - [x] Article schema
 * - [x] Event schema
 * - [x] Breadcrumb schema
 *
 * ✅ Performance Optimizations:
 * - [x] Image optimization settings
 * - [x] Compression enabled
 * - [x] Bundle optimization
 * - [x] Security headers
 * - [x] Cache control headers
 *
 * 🔄 Dynamic SEO (In Progress):
 * - [x] Article pages metadata
 * - [ ] Devotional pages metadata (to be implemented)
 * - [ ] Event pages metadata (to be implemented)
 * - [ ] Documentation pages metadata (to be implemented)
 *
 * 📋 Additional Recommendations:
 * - [ ] Add Google Analytics tracking
 * - [ ] Add Google Search Console verification
 * - [ ] Implement lazy loading for images
 * - [ ] Add breadcrumb navigation
 * - [ ] Create RSS feed
 * - [ ] Add social media share buttons
 * - [ ] Implement AMP pages (optional)
 * - [ ] Add rich snippets for events
 * - [ ] Create FAQ schema for common questions
 * - [ ] Add local business schema (if applicable)
 *
 * 📊 SEO Tools to Use:
 * - Google Search Console
 * - Google PageSpeed Insights
 * - Google Rich Results Test
 * - Lighthouse SEO Audit
 * - Schema.org Validator
 * - Open Graph Debugger
 */

export const SEO_CHECKLIST = {
    basicSEO: [
        "Title tags with proper template",
        "Meta descriptions for all pages",
        "Open Graph tags",
        "Twitter Card tags",
        "Canonical URLs",
        "Language declaration",
        "Favicon and app icons",
        "Robots.txt",
        "XML Sitemap",
        "Web App Manifest",
    ],
    structuredData: ["Organization schema", "Website schema", "Article schema", "Event schema", "Breadcrumb schema"],
    performance: [
        "Image optimization settings",
        "Compression enabled",
        "Bundle optimization",
        "Security headers",
        "Cache control headers",
    ],
    recommendations: [
        "Google Analytics tracking",
        "Google Search Console verification",
        "Lazy loading for images",
        "Breadcrumb navigation",
        "RSS feed",
        "Social media share buttons",
        "Rich snippets for events",
        "FAQ schema",
        "Local business schema",
    ],
} as const

export default SEO_CHECKLIST
