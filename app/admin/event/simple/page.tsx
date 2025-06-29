"use client"

import React from "react"
import { AdminLayout } from "@/components/layout/AdminLayout"
import { SimpleAdminTable } from "@/components/admin/SimpleAdminTable"
import { Event } from "@/types/event"

const fields = [
    { key: "title", label: "Title", type: "text" as const, required: true },
    { key: "date", label: "Date", type: "date" as const, required: true },
    { key: "time", label: "Time", type: "text" as const, required: true },
    { key: "location", label: "Location", type: "text" as const, required: true },
    { key: "image", label: "Event Image", type: "image" as const },
    { key: "description", label: "Description", type: "textarea" as const, required: true },
]

const displayFields: (keyof Event)[] = ["title", "image", "date", "time", "location", "description"]
const imageFields: (keyof Event)[] = ["image"]

const formatValue = (key: keyof Event, value: unknown) => {
    if (key === "date" && typeof value === "string") {
        return new Date(value).toLocaleDateString()
    }
    return String(value || "")
}

export default function SimplifiedEventAdmin() {
    return (
        <AdminLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-brown-800">Events Management</h1>
                    <p className="text-gray-600 mt-1">Manage church events with a simple, streamlined interface.</p>
                </div>

                <SimpleAdminTable<Event>
                    title="Event"
                    endpoint="events"
                    fields={fields}
                    displayFields={displayFields}
                    imageFields={imageFields}
                    formatValue={formatValue}
                />
            </div>
        </AdminLayout>
    )
}
