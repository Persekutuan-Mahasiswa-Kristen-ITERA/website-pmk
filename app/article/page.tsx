"use client"

import React, { useEffect, useState } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { FileText, Search, Calendar, ChevronRight } from "lucide-react"
import Image from "next/image"
import { Article } from "@/types/article"
import { getArticles } from "@/data/article"

const ArtikelPage = () => {
    const [articles, setArticles] = useState<Article[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedTag, setSelectedTag] = useState<string | null>(null)

    useEffect(() => {
        const fetchArticles = async () => {
            setArticles(await getArticles())
        }

        fetchArticles()
    }, [])

    const filteredArticles = articles.filter((article) => {
        const matchesSearch =
            searchQuery === "" ||
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.author.name.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesTag = selectedTag === null || article.tags.includes(selectedTag)

        return matchesSearch && matchesTag
    })

    const toggleTag = (tag: string) => {
        if (selectedTag === tag) {
            setSelectedTag(null)
        } else {
            setSelectedTag(tag)
        }
    }

    return (
        <MainLayout>
            {/* Hero section with gradient background */}
            <div className="bg-gradient-to-b from-brown-100 to-white">
                <div className="bg-[url('/img/bg-article.webp')] bg-cover bg-center py-20 relative">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0"></div>
                    <div className="container relative mx-auto px-4 z-10">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white text-center">
                            Artikel
                        </h1>
                        <p className="text-center text-white/90 mt-4 max-w-2xl mx-auto text-base md:text-lg">
                            Tulisan seputar kehidupan dan apologetika Kristen
                        </p>
                    </div>
                </div>
            </div>

            <section className="py-12 md:py-16 lg:py-20">
                <div className="container mx-auto px-4">
                    {/* Search section */}
                    <div className="max-w-3xl mx-auto mb-12">
                        <div className="relative bg-white shadow-sm rounded-lg overflow-hidden">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brown-400 h-5 w-5" />
                            <Input
                                placeholder="Cari artikel..."
                                className="pl-12 py-6 border-brown-200 focus:border-brown-400 text-lg rounded-lg"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {filteredArticles.map((article) => (
                            <Card
                                key={article.id}
                                className="border-brown-100 overflow-hidden hover:shadow-md transition-shadow group"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-3 h-full">
                                    <div className="h-48 md:h-full bg-brown-200 overflow-hidden">
                                        <Image
                                            src={article.imageUrl}
                                            alt={article.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                            width={500}
                                            height={300}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <CardContent className="p-6 flex flex-col">
                                            <div className="flex items-center mb-3">
                                                <FileText className="h-4 w-4 text-brown-400 mr-2" />
                                                <span className="text-xs text-brown-500">
                                                    {article.readTime} menit membaca
                                                </span>
                                            </div>
                                            <Link href={`/article/${article.slug}`} className="block mb-2">
                                                <h3 className="text-xl font-serif text-brown-800 mb-2 hover:underline">
                                                    {article.title}
                                                </h3>
                                            </Link>
                                            <p className="text-brown-600 text-sm mb-4 line-clamp-2">
                                                {article.excerpt}
                                            </p>

                                            {/* <div className="flex flex-wrap gap-2 mb-4">
                                                {article.tags.map((tag) => (
                                                    <Badge
                                                        key={tag}
                                                        variant="outline"
                                                        className="border-brown-200 text-brown-600 text-xs"
                                                    >
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div> */}

                                            <div className="flex justify-between items-center mt-6">
                                                <div className="flex items-center">
                                                    <Avatar className="h-8 w-8 mr-2">
                                                        <AvatarImage
                                                            src={article.author.image}
                                                            alt={article.author.name}
                                                        />
                                                        <AvatarFallback className="bg-brown-200 text-brown-700 text-xs">
                                                            {article.author.name
                                                                .split(" ")
                                                                .map((name) => name[0])
                                                                .join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="text-sm text-brown-700">{article.author.name}</p>
                                                        <div className="flex items-center">
                                                            <Calendar className="h-3 w-3 text-brown-400 mr-1" />
                                                            <span className="text-xs text-brown-500">
                                                                {article.createdAt?.toLocaleDateString("id-ID", {
                                                                    year: "numeric",
                                                                    month: "long",
                                                                    day: "numeric",
                                                                })}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <Button
                                                    asChild
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-brown-700 hover:text-brown-900 hover:bg-brown-50 p-0 px-2"
                                                >
                                                    <Link
                                                        href={`/article/${article.slug}`}
                                                        className="flex items-center"
                                                    >
                                                        <span>Baca</span>
                                                        <ChevronRight className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {filteredArticles.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-brown-600">Tidak ada artikel yang sesuai dengan kriteria pencarian.</p>
                        </div>
                    )}
                </div>

                <div className="mb-24"></div>
            </section>
        </MainLayout>
    )
}

export default ArtikelPage
