/**
 * H1 SEO Enhancement Utility
 *
 * This helps ensure H1 tags are properly detected by SEO tools
 * by enhancing visibility and structure
 */

export function enhanceH1ForSEO() {
    if (typeof window === "undefined") return

    // Find all H1 elements
    const h1Elements = document.querySelectorAll("h1")

    h1Elements.forEach((h1, index) => {
        // Add structured data attributes for better SEO
        h1.setAttribute("itemProp", "headline")
        if (index === 0) {
            // Only the first H1 gets organization schema
            h1.setAttribute("itemScope", "")
            h1.setAttribute("itemType", "https://schema.org/Organization")
        }

        // Add role for better accessibility
        h1.setAttribute("role", "heading")
        h1.setAttribute("aria-level", "1")

        // Ensure the H1 is visible to screen readers and SEO tools
        const styles = window.getComputedStyle(h1)
        if (styles.display === "none" || styles.visibility === "hidden") {
            console.warn("H1 element is hidden, this may affect SEO detection:", h1)
        }

        // Add data attributes for testing and identification
        h1.setAttribute("data-seo-h1", `h1-${index + 1}`)
        h1.setAttribute("data-seo-enhanced", "true")

        // Ensure text content is not empty
        const textContent = h1.textContent?.trim()
        if (!textContent) {
            console.warn("H1 element has no text content:", h1)
        } else {
            // Add invisible text that ensures SEO tools can read the full heading
            const hiddenSpan = document.createElement("span")
            hiddenSpan.style.position = "absolute"
            hiddenSpan.style.left = "-9999px"
            hiddenSpan.style.width = "1px"
            hiddenSpan.style.height = "1px"
            hiddenSpan.style.overflow = "hidden"
            hiddenSpan.textContent = textContent
            hiddenSpan.setAttribute("aria-hidden", "true")
            h1.appendChild(hiddenSpan)
        }

        // Ensure font-size is reasonable for SEO tools
        const fontSize = parseFloat(styles.fontSize)
        if (fontSize < 16) {
            console.warn("H1 font size may be too small for SEO tools:", fontSize + "px")
        }
    })

    // Log H1 status for debugging
    console.log(`SEO Enhancement: Found ${h1Elements.length} H1 element(s)`)
    h1Elements.forEach((h1, index) => {
        console.log(`H1 ${index + 1}:`, h1.textContent?.trim())
    })

    // Ensure only one H1 per page for best SEO
    if (h1Elements.length > 1) {
        console.warn(`Found ${h1Elements.length} H1 tags. For best SEO, use only one H1 per page.`)
    }

    return h1Elements.length
}

// Auto-run in development
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    window.addEventListener("load", () => {
        setTimeout(enhanceH1ForSEO, 1000)
    })
}

export default enhanceH1ForSEO
