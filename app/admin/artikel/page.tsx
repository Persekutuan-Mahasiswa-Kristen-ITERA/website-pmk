"use client"

import React, { useState } from "react"
import { AdminLayout } from "@/components/layout/AdminLayout"
import { CrudTable } from "@/components/admin/CrudTable"
import { useToast } from "@/hooks/use-toast"

interface Artikel {
    id: string
    judul: string
    kategori: string
    isi: string
    tanggal: string
    penulis: string
    gambar: string
}

const ArtikelAdmin = () => {
    const { toast } = useToast()
    const [artikel, setArtikel] = useState<Artikel[]>([
        {
            id: "1",
            judul: "Menjalani Kehidupan Beriman di Kampus",
            kategori: "Kehidupan Kampus",
            isi: "Sebagai mahasiswa Kristen, kita sering menghadapi berbagai tantangan dalam menjalani kehidupan beriman di lingkungan kampus...",
            tanggal: "2023-06-10",
            penulis: "Michael Johnson",
            gambar: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        },
        {
            id: "2",
            judul: "Pentingnya Persekutuan dalam Kehidupan Mahasiswa",
            kategori: "Persekutuan",
            isi: "Persekutuan merupakan bagian penting dalam kehidupan seorang mahasiswa Kristen. Melalui persekutuan, kita dapat saling menguatkan...",
            tanggal: "2023-07-22",
            penulis: "Sarah Williams",
            gambar: "https://images.unsplash.com/photo-1609234657308-7da0c3cff089?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        },
    ])

    const handleAdd = (data: Partial<Artikel>) => {
        const newArtikel = {
            ...data,
            id: Date.now().toString(),
        } as Artikel

        setArtikel([...artikel, newArtikel])
        toast({
            title: "Berhasil menambahkan artikel",
            description: `Artikel "${data.judul}" telah ditambahkan`,
        })
    }

    const handleEdit = (id: string, data: Partial<Artikel>) => {
        setArtikel(artikel.map((item) => (item.id === id ? { ...item, ...data } : item)))
        toast({
            title: "Berhasil mengubah artikel",
            description: `Artikel "${data.judul}" telah diperbarui`,
        })
    }

    const handleDelete = (id: string) => {
        setArtikel(artikel.filter((item) => item.id !== id))
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
        <AdminLayout>
            <CrudTable
                title="Artikel"
                data={artikel}
                fields={fields}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
                getItemId={(item) => item.id}
            />
        </AdminLayout>
    )
}

export default ArtikelAdmin
