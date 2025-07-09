import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { generateBreadcrumbSchema } from "@/lib/seo-utils"
import StructuredData from "@/components/seo/StructuredData"

interface BreadcrumbItem {
    name: string
    url: string
}

interface SEOBreadcrumbProps {
    items: BreadcrumbItem[]
    className?: string
}

export function SEOBreadcrumb({ items, className = "" }: SEOBreadcrumbProps) {
    const breadcrumbSchema = generateBreadcrumbSchema(items)

    return (
        <>
            <StructuredData data={breadcrumbSchema} />
            <nav
                aria-label="Breadcrumb"
                className={`flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 ${className}`}
            >
                {items.map((item, index) => (
                    <div key={item.url} className="flex items-center">
                        {index > 0 && <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />}
                        {index === items.length - 1 ? (
                            <span aria-current="page" className="text-gray-900 dark:text-gray-100 font-medium">
                                {item.name}
                            </span>
                        ) : (
                            <Link
                                href={item.url}
                                className="hover:text-brown-600 dark:hover:text-brown-400 transition-colors"
                            >
                                {item.name}
                            </Link>
                        )}
                    </div>
                ))}
            </nav>
        </>
    )
}

export default SEOBreadcrumb
