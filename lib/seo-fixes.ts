/**
 * Comprehensive SEO Fixes
 * Addresses common SEO issues that tools detect
 */

export function fixCommonSEOIssues() {
    if (typeof window === "undefined") return

    const fixes = {
        h1Issues: 0,
        imageIssues: 0,
        linkIssues: 0,
        metaIssues: 0,
    }

    // Fix H1 issues
    const h1Elements = document.querySelectorAll("h1")
    h1Elements.forEach((h1, index) => {
        // Ensure H1 is properly structured
        if (!h1.textContent?.trim()) {
            fixes.h1Issues++
            console.warn("Empty H1 found:", h1)
        }

        // Add SEO attributes
        h1.setAttribute("data-seo-main-heading", index === 0 ? "true" : "false")

        // Ensure proper heading hierarchy
        if (index === 0) {
            h1.style.fontSize = h1.style.fontSize || "2rem"
            h1.style.fontWeight = h1.style.fontWeight || "bold"
        }
    })

    // Fix image alt text issues
    const images = document.querySelectorAll("img")
    images.forEach((img) => {
        if (!img.alt || img.alt.trim() === "") {
            fixes.imageIssues++
            // Generate alt text from src or nearby text
            const filename = img.src.split("/").pop()?.split(".")[0] || "image"
            img.alt = `${filename.replace(/[-_]/g, " ")}`
            console.warn("Fixed missing alt text for image:", img.src)
        }
    })

    // Fix link issues
    const links = document.querySelectorAll("a")
    links.forEach((link) => {
        // Add rel="noopener" for external links
        if (link.href && !link.href.startsWith(window.location.origin)) {
            if (!link.rel.includes("noopener")) {
                link.rel = link.rel ? `${link.rel} noopener` : "noopener"
                fixes.linkIssues++
            }
        }

        // Ensure links have descriptive text
        if (!link.textContent?.trim() && !link.querySelector("img[alt]")) {
            console.warn("Link without descriptive text:", link)
            fixes.linkIssues++
        }
    })

    // Check meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription || !metaDescription.getAttribute("content")?.trim()) {
        fixes.metaIssues++
        console.warn("Missing or empty meta description")
    }

    // Add structured data if missing
    if (!document.querySelector('script[type="application/ld+json"]')) {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Persekutuan Mahasiswa Kristen ITERA",
            url: window.location.origin,
            description: metaDescription?.getAttribute("content") || "Persekutuan Mahasiswa Kristen ITERA",
        }

        const script = document.createElement("script")
        script.type = "application/ld+json"
        script.textContent = JSON.stringify(structuredData)
        document.head.appendChild(script)
    }

    console.log("SEO fixes applied:", fixes)
    return fixes
}

// Auto-run in development
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    window.addEventListener("load", () => {
        setTimeout(fixCommonSEOIssues, 1500)
    })
}

export default fixCommonSEOIssues
