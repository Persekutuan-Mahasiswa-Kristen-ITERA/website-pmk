"use client"

import { Event, eventColumns, eventFields } from "@/types/event"
import CrudProvider from "@/components/crud/CrudProvider"
// Removed unused imports
import { AdminLayout } from "@/components/layout/AdminLayout"

const EventManagement: React.FC = () => {
    const collectionName = "events"
    const title = "Data Acara"
    const description = "Atur acara yang tampil pada halaman utama website"

    return (
        <AdminLayout>
            <span className="text-2xl font-bold mb-2 mt-12">{title}</span>
            <p className="mb-8">{description}</p>

            <CrudProvider<Event>
                config={{
                    collection: collectionName,
                    defaultSort: { field: "createdAt", direction: "desc" },
                    defaultPageSize: 20,
                }}
                fields={eventFields}
                columns={eventColumns}
                entityName="Acara"
            />
        </AdminLayout>
    )
}

export default EventManagement
