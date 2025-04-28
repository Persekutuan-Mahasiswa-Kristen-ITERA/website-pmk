"use client"

import { Documentation, documentationColumns, documentationFields } from "@/types/documentation"
import CrudProvider from "@/components/crud/CrudProvider"
import { Card, CardContent } from "@/components/ui/card"
import { AdminLayout } from "@/components/layout/AdminLayout"

const DocumentationManagement: React.FC = () => {
    const collectionName = "documentations"
    const title = "Data Dokumentasi"
    const description = "Atur dokumentasi yang tampil pada halaman utama website"

    return (
        <AdminLayout>
            <span className="text-2xl font-bold mb-2 mt-12">{title}</span>
            <p className="mb-8">{description}</p>

            <CrudProvider<Documentation>
                config={{
                    collection: collectionName,
                    defaultSort: { field: "createdAt", direction: "desc" },
                    defaultPageSize: 20,
                }}
                fields={documentationFields}
                columns={documentationColumns}
                entityName="Dokumentasi"
            />
        </AdminLayout>
    )
}

export default DocumentationManagement
