"use client"

import React from "react"
import { AdminLayout } from "@/components/layout/AdminLayout"
import { SimpleAdminTable } from "@/components/admin/SimpleAdminTable"
import { Article } from "@/types/article"

const fields = [
    { key: "title", label: "Title", type: "text" as const, required: true },
    { key: "slug", label: "Slug", type: "text" as const, required: true },
    { key: "excerpt", label: "Excerpt", type: "textarea" as const, required: true },
    { key: "content", label: "Content", type: "textarea" as const, required: true },
    { key: "date", label: "Date", type: "date" as const, required: true },
    { key: "author.name", label: "Author Name", type: "text" as const, required: true },
    { key: "author.image", label: "Author Image URL", type: "image" as const, required: true },
    { key: "tags", label: "Tags", type: "text" as const },
    { key: "readTime", label: "Read Time (minutes)", type: "number" as const, required: true },
    { key: "imageUrl", label: "Article Image", type: "image" as const, required: true },
]

const displayFields: (keyof Article)[] = ["title", "excerpt", "imageUrl", "date", "tags", "readTime"]
const imageFields: (keyof Article)[] = ["imageUrl"]

const formatValue = (key: keyof Article, value: unknown) => {
    if (key === "date") {
        if (!value) return ""
        let d: Date
        if (typeof value === "number") {
            d = new Date(value > 100000000000 ? value : value * 1000)
        } else if (typeof value === "string" && !isNaN(Number(value))) {
            d = new Date(Number(value) > 100000000000 ? Number(value) : Number(value) * 1000)
        } else {
            d = new Date(value as string)
        }
        return !isNaN(d.getTime()) ? d.toLocaleDateString() : String(value)
    }
    if (key === "readTime" && typeof value === "number") {
        return `${value} min`
    }
    return String(value || "")
}

export default function SimplifiedArticleAdmin() {
    return (
        <AdminLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-brown-800">Articles Management</h1>
                    <p className="text-gray-600 mt-1">Manage articles with a simple, streamlined interface.</p>
                </div>

                <SimpleAdminTable<Article>
                    title="Article"
                    endpoint="articles"
                    fields={fields}
                    displayFields={displayFields}
                    imageFields={imageFields}
                    formatValue={formatValue}
                />
            </div>
        </AdminLayout>
    )
}
