"use client"

import React, { useEffect, useState } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { getDocumentations } from "@/data/documentation"
import { Documentation } from "@/types/documentation"
import DocumentationCard from "@/components/documentation-card"

const DocumentationPage = () => {
    const [documentations, setDocumentations] = useState<Documentation[]>([])
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        const fetchDocumentations = async () => {
            setDocumentations(await getDocumentations())
        }

        fetchDocumentations()
    }, [])

    const filteredDocumentations = documentations.filter((doc) => {
        const matchesSearch =
            searchQuery === "" ||
            doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.description.toLowerCase().includes(searchQuery.toLowerCase())

        return matchesSearch
    })

    return (
        <MainLayout>
            <div className="bg-[url('/img/bg-documentation.jpg')] bg-cover bg-center py-20 relative">
                <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
                <div className="container relative mx-auto px-4 z-10">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white text-center">
                        Dokumentasi Kegiatan
                    </h1>
                    <p className="text-center text-brown-100 mt-4 max-w-2xl mx-auto">
                        Kumpulan dokumentasi dari berbagai kegiatan PMK ITERA
                    </p>
                </div>
            </div>

            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="mb-12">
                        <div className="relative max-w-xl mx-auto">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brown-400" />
                            <Input
                                placeholder="Cari dokumentasi..."
                                className="pl-10 border-brown-200 focus:border-brown-400"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredDocumentations.map((doc) => (
                            <DocumentationCard
                                key={doc.id}
                                documentation={doc}
                                className="transition-all duration-300"
                            />
                        ))}
                    </div>

                    {filteredDocumentations.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-brown-600">
                                Tidak ada dokumentasi yang sesuai dengan kriteria pencarian.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    )
}

export default DocumentationPage
