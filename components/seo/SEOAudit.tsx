"use client"

import { useEffect, useState } from "react"

interface SEOAuditResult {
    hasH1: boolean
    h1Text: string | null
    hasH2: boolean
    h2Count: number
    hasMetaDescription: boolean
    metaDescriptionLength: number
    hasImages: boolean
    imagesWithoutAlt: number
    hasMainElement: boolean
    hasSkipLink: boolean
    title: string
    titleLength: number
}

export function useSEOAudit() {
    const [auditResult, setAuditResult] = useState<SEOAuditResult | null>(null)

    useEffect(() => {
        if (typeof window === "undefined") return

        const audit = () => {
            // Check H1 tags
            const h1Elements = document.querySelectorAll("h1")
            const hasH1 = h1Elements.length > 0
            const h1Text = hasH1 ? h1Elements[0].textContent : null

            // Check H2 tags
            const h2Elements = document.querySelectorAll("h2")
            const hasH2 = h2Elements.length > 0
            const h2Count = h2Elements.length

            // Check meta description
            const metaDescription = document.querySelector('meta[name="description"]')
            const hasMetaDescription = !!metaDescription
            const metaDescriptionLength = metaDescription ? (metaDescription.getAttribute("content") || "").length : 0

            // Check images without alt text
            const images = document.querySelectorAll("img")
            const hasImages = images.length > 0
            const imagesWithoutAlt = Array.from(images).filter((img) => !img.alt || img.alt.trim() === "").length

            // Check for main element
            const hasMainElement = !!document.querySelector("main")

            // Check for skip link
            const hasSkipLink = !!document.querySelector('a[href="#main-content"], a[href="#main"]')

            // Check title
            const title = document.title
            const titleLength = title.length

            setAuditResult({
                hasH1,
                h1Text,
                hasH2,
                h2Count,
                hasMetaDescription,
                metaDescriptionLength,
                hasImages,
                imagesWithoutAlt,
                hasMainElement,
                hasSkipLink,
                title,
                titleLength,
            })
        }

        // Run audit after DOM is loaded
        const timeout = setTimeout(audit, 1000)
        return () => clearTimeout(timeout)
    }, [])

    return auditResult
}

export function SEOAuditDisplay() {
    const audit = useSEOAudit()

    if (!audit) return null

    const issues = []
    const successes = []

    // Check H1
    if (audit.hasH1) {
        successes.push(`✅ H1 tag found: "${audit.h1Text}"`)
    } else {
        issues.push("❌ No H1 tag found")
    }

    // Check H2
    if (audit.hasH2) {
        successes.push(`✅ ${audit.h2Count} H2 tag(s) found`)
    } else {
        issues.push("❌ No H2 tags found")
    }

    // Check meta description
    if (audit.hasMetaDescription) {
        if (audit.metaDescriptionLength >= 120 && audit.metaDescriptionLength <= 160) {
            successes.push(`✅ Meta description length optimal (${audit.metaDescriptionLength} chars)`)
        } else {
            issues.push(`⚠️ Meta description length: ${audit.metaDescriptionLength} chars (optimal: 120-160)`)
        }
    } else {
        issues.push("❌ No meta description found")
    }

    // Check title
    if (audit.titleLength >= 30 && audit.titleLength <= 60) {
        successes.push(`✅ Title length optimal (${audit.titleLength} chars)`)
    } else {
        issues.push(`⚠️ Title length: ${audit.titleLength} chars (optimal: 30-60)`)
    }

    // Check images
    if (audit.imagesWithoutAlt > 0) {
        issues.push(`❌ ${audit.imagesWithoutAlt} image(s) without alt text`)
    } else if (audit.hasImages) {
        successes.push("✅ All images have alt text")
    }

    // Check main element
    if (audit.hasMainElement) {
        successes.push("✅ Main element found")
    } else {
        issues.push("❌ No main element found")
    }

    // Check skip link
    if (audit.hasSkipLink) {
        successes.push("✅ Skip navigation link found")
    } else {
        issues.push("❌ No skip navigation link found")
    }

    // Only show in development
    if (process.env.NODE_ENV !== "development") return null

    return (
        <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-lg max-w-md z-50">
            <h3 className="font-bold text-sm mb-2">SEO Audit Results</h3>

            <div className="text-xs space-y-1">
                <div className="font-semibold text-green-600">Successes:</div>
                {successes.map((success, index) => (
                    <div key={index} className="text-green-600">
                        {success}
                    </div>
                ))}

                {issues.length > 0 && (
                    <>
                        <div className="font-semibold text-red-600 mt-2">Issues:</div>
                        {issues.map((issue, index) => (
                            <div key={index} className="text-red-600">
                                {issue}
                            </div>
                        ))}
                    </>
                )}
            </div>

            <button
                onClick={() => console.log("Full SEO Audit:", audit)}
                className="mt-2 text-xs bg-blue-500 text-white px-2 py-1 rounded"
            >
                Log Full Audit
            </button>
        </div>
    )
}

export default SEOAuditDisplay
