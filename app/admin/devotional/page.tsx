"use client"

import { Devotional, devotionalColumns, devotionalFields } from "@/types/devotional"
import CrudProvider from "@/components/crud/CrudProvider"
import { Card, CardContent } from "@/components/ui/card"
import { AdminLayout } from "@/components/layout/AdminLayout"

const DevotionalManagement: React.FC = () => {
    const collectionName = "devotionals"
    const title = "Data Renungan Harian"
    const description = "Atur renungan harian yang tampil pada halaman utama website"

    return (
        <AdminLayout>
            <span className="text-2xl font-bold mb-2 mt-12">{title}</span>
            <p className="mb-8">{description}</p>

            <CrudProvider<Devotional>
                config={{
                    collection: collectionName,
                    defaultSort: { field: "createdAt", direction: "desc" },
                    defaultPageSize: 20,
                }}
                fields={devotionalFields}
                columns={devotionalColumns}
                entityName="Renungan"
            />
        </AdminLayout>
    )
}

export default DevotionalManagement
