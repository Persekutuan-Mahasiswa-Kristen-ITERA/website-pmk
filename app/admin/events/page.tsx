"use client"

import { Article, articleColumns, articleFields } from "@/types/article"
import CrudProvider from "@/components/crud/CrudProvider"
import { Card, CardContent } from "@/components/ui/card"
import { AdminLayout } from "@/components/layout/AdminLayout"

const EventsManagement: React.FC = () => {
    const collectionName = "events" // Changed from "articles" to "events"
    const title = "Data Event" // Optional: Update title if needed
    const description = "Atur event yang tampil pada halaman utama website" // Optional: Update description if needed

    return (
        <AdminLayout>
            <span className="text-2xl font-bold mb-2 mt-12">{title}</span>
            <p className="mb-8">{description}</p>

            <CrudProvider<Article>
                config={{
                    collection: collectionName,
                    defaultSort: { field: "createdAt", direction: "desc" },
                    defaultPageSize: 20,
                }}
                fields={articleFields}
                columns={articleColumns}
                entityName="Event" // Changed from "Artikel" to "Event"
            />
        </AdminLayout>
    )
}

export default EventsManagement
