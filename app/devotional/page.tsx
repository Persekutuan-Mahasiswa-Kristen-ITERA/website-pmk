"use client"

import React, { useState } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, Calendar, User, Search } from "lucide-react"
import Link from "next/link"
import { devotionals } from "@/data/devotional"

const CATEGORIES = ["Semua", "Kasih", "Pertumbuhan", "Iman", "Pengharapan", "Kesaksian", "Sukacita"]

const RenunganPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("Semua")
    const [searchQuery, setSearchQuery] = useState("")

    const filteredRenungan = devotionals.filter((renungan) => {
        const matchesCategory = selectedCategory === "Semua" || renungan.category === selectedCategory
        const matchesSearch =
            searchQuery === "" ||
            renungan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            renungan.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            renungan.author.toLowerCase().includes(searchQuery.toLowerCase())

        return matchesCategory && matchesSearch
    })

    return (
        <MainLayout>
            <div className="bg-brown-100 py-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-brown-800 text-center">Renungan</h1>
                    <p className="text-center text-brown-600 mt-4 max-w-2xl mx-auto">
                        Penguatan iman melalui perenungan firman Tuhan sehari-hari
                    </p>
                </div>
            </div>

            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row gap-6 mb-12">
                        <div className="w-full md:w-2/3">
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
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredRenungan.map((renungan) => (
                            <Card key={renungan.id} className="border-brown-100 hover:shadow-md transition-shadow">
                                <CardContent className="pt-6">
                                    <div className="flex items-center mb-4">
                                        <BookOpen className="h-5 w-5 text-brown-400 mr-2" />
                                        <span className="text-sm text-brown-500">{renungan.verse}</span>
                                    </div>
                                    <h3 className="text-xl font-serif text-brown-800 mb-2">{renungan.title}</h3>
                                    <div className="text-sm text-brown-600 mb-4">&quot;{renungan.preview}&quot;</div>
                                    <div className="flex justify-between items-center text-sm text-brown-500 mt-4">
                                        <div className="flex items-center">
                                            <User className="h-4 w-4 mr-1" />
                                            <span>{renungan.author}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Calendar className="h-4 w-4 mr-1" />
                                            <span>
                                                {renungan.createdAt?.toLocaleDateString("id-ID", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                    <Button
                                        asChild
                                        variant="ghost"
                                        className="w-full justify-between mt-4 text-brown-700 hover:text-brown-900 hover:bg-brown-50 p-0"
                                    >
                                        <Link
                                            href={`/devotional/${renungan.id}`}
                                            className="flex items-center w-full pt-3 pb-1"
                                        >
                                            <span>Baca Selengkapnya</span>
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {filteredRenungan.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-brown-600">Tidak ada renungan yang sesuai dengan kriteria pencarian.</p>
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    )
}

export default RenunganPage
