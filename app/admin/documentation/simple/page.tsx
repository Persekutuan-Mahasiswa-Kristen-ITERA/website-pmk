"use client"

import React from "react"
import { AdminLayout } from "@/components/layout/AdminLayout"
import { SimpleAdminTable } from "@/components/admin/SimpleAdminTable"
import { Documentation } from "@/types/documentation"

const fields = [
    { key: "title", label: "Title", type: "text" as const, required: true },
    { key: "description", label: "Description", type: "textarea" as const, required: true },
    { key: "link", label: "Document Link", type: "text" as const, required: true },
    { key: "imageUrl", label: "Preview Image", type: "image" as const, required: true },
]

const displayFields: (keyof Documentation)[] = ["title", "imageUrl", "description", "link"]
const imageFields: (keyof Documentation)[] = ["imageUrl"]

const formatValue = (key: keyof Documentation, value: unknown) => {
    if (key === "link" && typeof value === "string") {
        return (
            <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
            >
                Open Document
            </a>
        )
    }
    if (key === "createdAt" && typeof value === "string") {
        return new Date(value).toLocaleDateString()
    }
    return String(value || "")
}

export default function SimplifiedDocumentationAdmin() {
    return (
        <AdminLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-brown-800">Documentation Management</h1>
                    <p className="text-gray-600 mt-1">Manage church documentation with image previews and links.</p>
                </div>

                <SimpleAdminTable<Documentation>
                    title="Documentation"
                    endpoint="documentation"
                    fields={fields}
                    displayFields={displayFields}
                    imageFields={imageFields}
                    formatValue={formatValue}
                />
            </div>
        </AdminLayout>
    )
}
