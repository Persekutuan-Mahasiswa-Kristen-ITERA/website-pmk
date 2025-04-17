"use client"

import { Article, articleColumns, articleFields } from "@/types/article"
import CrudProvider from "@/components/crud/CrudProvider"
import { Card, CardContent } from "@/components/ui/card"
import { AdminLayout } from "@/components/layout/AdminLayout"

const ArticleManagement: React.FC = () => {
    const collectionName = "articles"
    const title = "Data Artikel"
    const description = "Atur artikel yang tampil pada halaman utama website"

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
                entityName="Artikel"
            />
        </AdminLayout>
    )
}

export default ArticleManagement
