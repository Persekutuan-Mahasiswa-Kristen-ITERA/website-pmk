/**
 * Quick SEO Validation Script
 * Run this in browser console to check SEO elements
 */

interface H1Info {
    index: number
    text: string
    hasStructuredData: boolean
    isVisible: boolean
}

interface H2Info {
    index: number
    text: string
}

interface MetaInfo {
    content: string
    length: number
    optimal: boolean
}

interface ImageInfo {
    index: number
    src: string
    element: HTMLImageElement
}

interface LinkInfo {
    index: number
    href: string
    text: string
    element: HTMLAnchorElement
}

interface StructuredDataInfo {
    index: number
    type: string
    valid: boolean
    data?: Record<string, unknown>
    error?: string
}

interface SEOResults {
    h1: H1Info[]
    h2: H2Info[]
    metaDescription: MetaInfo | null
    title: string
    imagesWithoutAlt: ImageInfo[]
    externalLinksWithoutNoopener: LinkInfo[]
    structuredData: StructuredDataInfo[]
}

function quickSEOCheck(): SEOResults {
    const results: SEOResults = {
        h1: [],
        h2: [],
        metaDescription: null,
        title: document.title,
        imagesWithoutAlt: [],
        externalLinksWithoutNoopener: [],
        structuredData: [],
    }

    // Check H1 tags
    const h1Elements = document.querySelectorAll("h1")
    h1Elements.forEach((h1, index) => {
        results.h1.push({
            index: index + 1,
            text: h1.textContent?.trim() || "",
            hasStructuredData: h1.hasAttribute("itemProp"),
            isVisible: window.getComputedStyle(h1).display !== "none",
        })
    })

    // Check H2 tags
    const h2Elements = document.querySelectorAll("h2")
    h2Elements.forEach((h2, index) => {
        results.h2.push({
            index: index + 1,
            text: h2.textContent?.trim() || "",
        })
    })

    // Check meta description
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
        const content = metaDesc.getAttribute("content") || ""
        results.metaDescription = {
            content,
            length: content.length,
            optimal: content.length >= 120 && content.length <= 160,
        }
    }

    // Check images without alt text
    const images = document.querySelectorAll("img")
    images.forEach((img, index) => {
        if (!img.alt || img.alt.trim() === "") {
            results.imagesWithoutAlt.push({
                index: index + 1,
                src: img.src,
                element: img,
            })
        }
    })

    // Check external links without noopener
    const links = document.querySelectorAll("a[href]")
    links.forEach((link, index) => {
        const anchorLink = link as HTMLAnchorElement
        const href = anchorLink.getAttribute("href")
        if (href && (href.startsWith("http") || href.startsWith("//")) && !href.startsWith(window.location.origin)) {
            if (!anchorLink.rel.includes("noopener")) {
                results.externalLinksWithoutNoopener.push({
                    index: index + 1,
                    href,
                    text: anchorLink.textContent?.trim() || "",
                    element: anchorLink,
                })
            }
        }
    })

    // Check structured data
    const structuredDataScripts = document.querySelectorAll('script[type="application/ld+json"]')
    structuredDataScripts.forEach((script, index) => {
        try {
            const data = JSON.parse(script.textContent || "{}")
            results.structuredData.push({
                index: index + 1,
                type: data["@type"] || "Unknown",
                valid: true,
                data,
            })
        } catch (e: unknown) {
            results.structuredData.push({
                index: index + 1,
                type: "Invalid JSON",
                valid: false,
                error: e instanceof Error ? e.message : "Unknown error",
            })
        }
    })

    return results
}

function displaySEOReport() {
    const results = quickSEOCheck()

    console.group("🔍 SEO Quick Check Report")

    // H1 Analysis
    console.group("📝 H1 Tags")
    if (results.h1.length === 0) {
        console.error("❌ No H1 tags found!")
    } else if (results.h1.length > 1) {
        console.warn(`⚠️ Multiple H1 tags found (${results.h1.length}). Best practice is 1 per page.`)
    } else {
        console.log("✅ Single H1 tag found")
    }

    results.h1.forEach((h1) => {
        console.log(`H1 ${h1.index}:`, {
            text: h1.text,
            structuredData: h1.hasStructuredData ? "✅" : "❌",
            visible: h1.isVisible ? "✅" : "❌",
        })
    })
    console.groupEnd()

    // Meta Description
    console.group("📄 Meta Description")
    if (!results.metaDescription) {
        console.error("❌ No meta description found!")
    } else {
        const { content, length, optimal } = results.metaDescription
        console.log(`${optimal ? "✅" : "⚠️"} Meta description: ${length} characters`)
        console.log("Content:", content)
        if (!optimal) {
            console.warn("Optimal length is 120-160 characters")
        }
    }
    console.groupEnd()

    // Images
    console.group("🖼️ Images")
    if (results.imagesWithoutAlt.length === 0) {
        console.log("✅ All images have alt text")
    } else {
        console.warn(`⚠️ ${results.imagesWithoutAlt.length} images without alt text:`)
        results.imagesWithoutAlt.forEach((img) => {
            console.log(`Image ${img.index}:`, img.src)
        })
    }
    console.groupEnd()

    // External Links
    console.group("🔗 External Links")
    if (results.externalLinksWithoutNoopener.length === 0) {
        console.log("✅ All external links have proper rel attributes")
    } else {
        console.warn(`⚠️ ${results.externalLinksWithoutNoopener.length} external links without noopener:`)
        results.externalLinksWithoutNoopener.forEach((link) => {
            console.log(`Link ${link.index}:`, link.href, link.text)
        })
    }
    console.groupEnd()

    // Structured Data
    console.group("📊 Structured Data")
    if (results.structuredData.length === 0) {
        console.warn("⚠️ No structured data found")
    } else {
        console.log(`✅ ${results.structuredData.length} structured data blocks found`)
        results.structuredData.forEach((data) => {
            console.log(`Block ${data.index}:`, data.type, data.valid ? "✅" : "❌")
        })
    }
    console.groupEnd()

    console.groupEnd()

    return results
}

// Make available globally for browser console
declare global {
    interface Window {
        seoCheck: () => SEOResults
        quickSEOCheck: () => SEOResults
    }
}

// Auto-run in development
if (typeof window !== "undefined") {
    window.seoCheck = displaySEOReport
    window.quickSEOCheck = quickSEOCheck

    if (process.env.NODE_ENV === "development") {
        console.log("💡 SEO Check available! Run seoCheck() in console for detailed report")
    }
}

export { quickSEOCheck, displaySEOReport }
