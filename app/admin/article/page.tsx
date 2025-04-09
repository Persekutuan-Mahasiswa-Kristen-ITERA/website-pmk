"use client"

import React, { useState } from "react"
import { AdminLayout } from "@/components/layout/AdminLayout"
import { CrudTable } from "@/components/admin/CrudTable"
import { useToast } from "@/hooks/use-toast"
import { Article } from "@/types/article"
import { articles } from "@/data/article"

const ArtikelAdmin = () => {
    const { toast } = useToast()
    const [article, setArticle] = useState<Article[]>(articles)

    const handleAdd = (newArticle: Partial<Article>) => {
        const newArtikel = {
            ...newArticle,
            id: Date.now(), // Change to number
        } as Article

        setArticle([...article, newArtikel])
        toast({
            title: "Berhasil menambahkan artikel",
            description: `Artikel "${newArticle.title}" telah ditambahkan`,
        })
    }

    const handleEdit = (id: number, data: Partial<Article>) => {
        setArticle(article.map((article) => (article.id === id ? { ...article, ...data } : article)))
        toast({
            title: "Berhasil mengubah artikel",
            description: `Artikel "${data.title}" telah diperbarui`,
        })
    }

    const handleDelete = (id: number) => {
        setArticle(article.filter((item) => item.id !== id))
        toast({
            title: "Berhasil menghapus artikel",
            description: "Artikel telah dihapus",
        })
    }

    const fields = [
        { name: "judul", label: "Judul", type: "text" as const },
        { name: "kategori", label: "Kategori", type: "text" as const },
        { name: "isi", label: "Isi", type: "textarea" as const },
        { name: "tanggal", label: "Tanggal", type: "date" as const },
        { name: "penulis", label: "Penulis", type: "text" as const },
        { name: "gambar", label: "Gambar", type: "image" as const },
    ]

    return (
        <div></div>
        // <AdminLayout>
        //     <CrudTable
        //         title="Artikel"
        //         data={article}
        //         fields={fields}
        //         onAdd={handleAdd}
        //         onEdit={handleEdit}
        //         onDelete={handleDelete}
        //         getItemId={(item) => item.id}
        //     />
        // </AdminLayout>
    )
}

export default ArtikelAdmin
