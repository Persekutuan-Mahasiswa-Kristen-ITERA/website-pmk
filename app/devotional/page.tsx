"use client"

import React, { useEffect, useState } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis,
} from "@/components/ui/pagination"
import { BookOpen, Calendar, User, Search, ChevronRight } from "lucide-react"
import Link from "next/link"
import { getDevotionals } from "@/data/devotional"
import { Devotional } from "@/types/devotional"
import DevotionCard from "@/components/devotion-card"

const CATEGORIES = ["Semua", "Kasih", "Pertumbuhan", "Iman", "Pengharapan", "Kesaksian", "Sukacita"]
const ITEMS_PER_PAGE = 9 // 3 columns × 3 rows for optimal display

const RenunganPage = () => {
    const [devotionals, setDevotionals] = useState<Devotional[]>([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)

    const [selectedCategory, setSelectedCategory] = useState("Semua")
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        const fetchDevotionals = async () => {
            setDevotionals(await getDevotionals())
            setLoading(false)
        }

        fetchDevotionals()
    }, [])

    const filteredRenungan = devotionals.filter((renungan) => {
        const matchesCategory = selectedCategory === "Semua" || renungan.category === selectedCategory
        const matchesSearch =
            searchQuery === "" ||
            renungan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            renungan.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            renungan.author.toLowerCase().includes(searchQuery.toLowerCase())

        return matchesCategory && matchesSearch
    })

    // Reset to first page when search or category changes
    useEffect(() => {
        setCurrentPage(1)
    }, [searchQuery, selectedCategory])

    // Calculate pagination
    const totalItems = filteredRenungan.length
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const currentItems = filteredRenungan.slice(startIndex, endIndex)

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    return (
        <MainLayout>
            <div className="bg-[url('/img/bg-bible.jpg')] bg-cover bg-center py-20 relative">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0"></div>
                <div className="container relative mx-auto px-4 z-10">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white text-center">
                        Renungan Harian
                    </h1>
                    <p className="text-center text-brown-100 mt-4 max-w-2xl mx-auto">
                        Mari belajar mengenal Tuhan lebih dalam melalui firman-Nya
                    </p>
                </div>
            </div>

            <section className="py-16">
                <div className="container mx-auto px-4 w-full">
                    <div className="flex flex-col md:flex-row gap-6 mb-12">
                        <div className="w-full">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brown-400" />
                                <Input
                                    placeholder="Cari renungan..."
                                    className="pl-10 border-brown-200 focus:border-brown-400"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                        {/* <div className="w-full md:w-1/3">
                            <Tabs defaultValue="Semua" value={selectedCategory} onValueChange={setSelectedCategory}>
                                <TabsList className="w-full h-auto flex flex-wrap bg-brown-50 p-1">
                                    {CATEGORIES.map((category) => (
                                        <TabsTrigger
                                            key={category}
                                            value={category}
                                            className="flex-grow data-[state=active]:bg-white data-[state=active]:text-brown-800"
                                        >
                                            {category}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </Tabs>
                        </div> */}
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-16">
                            <p className="text-brown-600">Memuat Renungan...</p>
                        </div>
                    ) : (
                        <div>
                            {/* Results count */}
                            <div className="mb-6 text-sm text-brown-600">
                                Menampilkan {startIndex + 1}-{Math.min(endIndex, totalItems)} dari {totalItems} renungan
                                {searchQuery && ` untuk "${searchQuery}"`}
                                {selectedCategory !== "Semua" && ` dalam kategori "${selectedCategory}"`}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {currentItems.map((renungan) => (
                                    <DevotionCard
                                        key={renungan.id}
                                        devotion={renungan}
                                        className="transition-all duration-300"
                                    />
                                ))}
                            </div>

                            {filteredRenungan.length === 0 && (
                                <div className="text-center py-16">
                                    <p className="text-brown-600">
                                        Tidak ada renungan yang sesuai dengan kriteria pencarian.
                                    </p>
                                </div>
                            )}

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="mt-12 flex justify-center">
                                    <Pagination>
                                        <PaginationContent>
                                            <PaginationItem>
                                                <PaginationPrevious
                                                    className={
                                                        currentPage === 1
                                                            ? "pointer-events-none opacity-50"
                                                            : "cursor-pointer"
                                                    }
                                                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                                                />
                                            </PaginationItem>

                                            {/* First page */}
                                            {currentPage > 2 && (
                                                <>
                                                    <PaginationItem>
                                                        <PaginationLink
                                                            onClick={() => handlePageChange(1)}
                                                            className="cursor-pointer"
                                                        >
                                                            1
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                    {currentPage > 3 && (
                                                        <PaginationItem>
                                                            <PaginationEllipsis />
                                                        </PaginationItem>
                                                    )}
                                                </>
                                            )}

                                            {/* Current page and neighbors */}
                                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                                                .filter(
                                                    (page) =>
                                                        page === currentPage ||
                                                        page === currentPage - 1 ||
                                                        page === currentPage + 1 ||
                                                        (currentPage <= 2 && page <= 3) ||
                                                        (currentPage >= totalPages - 1 && page >= totalPages - 2)
                                                )
                                                .map((page) => (
                                                    <PaginationItem key={page}>
                                                        <PaginationLink
                                                            onClick={() => handlePageChange(page)}
                                                            isActive={currentPage === page}
                                                            className="cursor-pointer"
                                                        >
                                                            {page}
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                ))}

                                            {/* Last page */}
                                            {currentPage < totalPages - 1 && (
                                                <>
                                                    {currentPage < totalPages - 2 && (
                                                        <PaginationItem>
                                                            <PaginationEllipsis />
                                                        </PaginationItem>
                                                    )}
                                                    <PaginationItem>
                                                        <PaginationLink
                                                            onClick={() => handlePageChange(totalPages)}
                                                            className="cursor-pointer"
                                                        >
                                                            {totalPages}
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                </>
                                            )}

                                            <PaginationItem>
                                                <PaginationNext
                                                    className={
                                                        currentPage === totalPages
                                                            ? "pointer-events-none opacity-50"
                                                            : "cursor-pointer"
                                                    }
                                                    onClick={() =>
                                                        currentPage < totalPages && handlePageChange(currentPage + 1)
                                                    }
                                                />
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    )
}

export default RenunganPage
