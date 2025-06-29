"use client"

import React from "react"
import { AdminLayout } from "@/components/layout/AdminLayout"
import { SimpleAdminTable } from "@/components/admin/SimpleAdminTable"
import { Devotional } from "@/types/devotional"

const fields = [
    { key: "title", label: "Title", type: "text" as const, required: true },
    { key: "verse", label: "Bible Verse", type: "text" as const, required: true },
    { key: "preview", label: "Preview", type: "textarea" as const, required: true },
    { key: "content", label: "Content", type: "textarea" as const, required: true },
    { key: "author", label: "Author", type: "text" as const, required: true },
    { key: "category", label: "Category", type: "text" as const, required: true },
]

const displayFields: (keyof Devotional)[] = ["title", "verse", "preview", "author", "category"]

const formatValue = (key: keyof Devotional, value: unknown) => {
    if (key === "createdAt" && typeof value === "string") {
        return new Date(value).toLocaleDateString()
    }
    return String(value || "")
}

export default function SimplifiedDevotionalAdmin() {
    return (
        <AdminLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-brown-800">Devotionals Management</h1>
                    <p className="text-gray-600 mt-1">Manage daily devotionals with a simple, streamlined interface.</p>
                </div>

                <SimpleAdminTable<Devotional>
                    title="Devotional"
                    endpoint="devotionals"
                    fields={fields}
                    displayFields={displayFields}
                    formatValue={formatValue}
                />
            </div>
        </AdminLayout>
    )
}
