import { useEffect } from "react"
import { usePathname } from "next/navigation"

interface SEOData {
    title?: string
    description?: string
    keywords?: string[]
    image?: string
    canonical?: string
}

export function useSEO({ title, description, keywords, image, canonical }: SEOData = {}) {
    const pathname = usePathname()

    useEffect(() => {
        // Update document title if provided
        if (title) {
            document.title = title.includes("PMK ITERA") ? title : `${title} | Persekutuan Mahasiswa Kristen ITERA`
        }

        // Update meta description
        if (description) {
            let metaDescription = document.querySelector('meta[name="description"]')
            if (!metaDescription) {
                metaDescription = document.createElement("meta")
                metaDescription.setAttribute("name", "description")
                document.head.appendChild(metaDescription)
            }
            metaDescription.setAttribute("content", description)
        }

        // Update meta keywords
        if (keywords && keywords.length > 0) {
            let metaKeywords = document.querySelector('meta[name="keywords"]')
            if (!metaKeywords) {
                metaKeywords = document.createElement("meta")
                metaKeywords.setAttribute("name", "keywords")
                document.head.appendChild(metaKeywords)
            }
            metaKeywords.setAttribute("content", keywords.join(", "))
        }

        // Update canonical URL
        const canonicalUrl = canonical || `https://www.pmkitera.com${pathname}`
        let canonicalLink = document.querySelector('link[rel="canonical"]')
        if (!canonicalLink) {
            canonicalLink = document.createElement("link")
            canonicalLink.setAttribute("rel", "canonical")
            document.head.appendChild(canonicalLink)
        }
        canonicalLink.setAttribute("href", canonicalUrl)

        // Update Open Graph image
        if (image) {
            let ogImage = document.querySelector('meta[property="og:image"]')
            if (!ogImage) {
                ogImage = document.createElement("meta")
                ogImage.setAttribute("property", "og:image")
                document.head.appendChild(ogImage)
            }
            ogImage.setAttribute("content", image.startsWith("http") ? image : `https://www.pmkitera.com${image}`)
        }
    }, [title, description, keywords, image, canonical, pathname])

    return {
        currentPath: pathname,
        setTitle: (newTitle: string) => {
            document.title = newTitle.includes("PMK ITERA")
                ? newTitle
                : `${newTitle} | Persekutuan Mahasiswa Kristen ITERA`
        },
        setDescription: (newDescription: string) => {
            const metaDescription = document.querySelector('meta[name="description"]')
            if (metaDescription) {
                metaDescription.setAttribute("content", newDescription)
            }
        },
    }
}

export default useSEO
