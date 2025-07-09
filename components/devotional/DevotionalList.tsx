"use client"

import React, { useEffect, useState } from "react"
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

export default function DevotionalList() {
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

    if (loading) {
        return (
            <div className="text-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Memuat renungan...</p>
            </div>
        )
    }

    return (
        <section className="py-8">
            {/* Search and Filter Section */}
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
                <div className="w-full md:w-1/3">
                    <Tabs defaultValue="Semua" value={selectedCategory} onValueChange={setSelectedCategory}>
                        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
                            {CATEGORIES.map((category) => (
                                <TabsTrigger
                                    key={category}
                                    value={category}
                                    className="text-xs data-[state=active]:bg-brown-600 data-[state=active]:text-white"
                                >
                                    {category}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {currentItems.map((devotional) => (
                    <DevotionCard key={devotional.id} devotion={devotional} />
                ))}
            </div>

            {/* No Results */}
            {filteredRenungan.length === 0 && (
                <div className="text-center py-16">
                    <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada renungan ditemukan</h3>
                    <p className="text-gray-600">Tidak ada renungan yang sesuai dengan kriteria pencarian Anda.</p>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-12">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        if (currentPage > 1) handlePageChange(currentPage - 1)
                                    }}
                                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>

                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                const page = i + 1
                                return (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                handlePageChange(page)
                                            }}
                                            isActive={currentPage === page}
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                )
                            })}

                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        if (currentPage < totalPages) handlePageChange(currentPage + 1)
                                    }}
                                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </section>
    )
}
