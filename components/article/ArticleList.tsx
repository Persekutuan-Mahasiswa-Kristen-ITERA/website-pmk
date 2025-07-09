"use client"

import React, { useEffect, useState } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { FileText, Search, Calendar, ChevronRight } from "lucide-react"
import Image from "next/image"
import { Article } from "@/types/article"
import { getArticles } from "@/data/article"
import StructuredData from "@/components/seo/StructuredData"
import { generateBreadcrumbSchema } from "@/lib/seo-utils"

export default function ArticleList() {
    const [articles, setArticles] = useState<Article[]>([])
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        const fetchArticles = async () => {
            setArticles(await getArticles())
        }

        fetchArticles()
    }, [])

    const filteredArticles = articles
        .filter((article) => {
            const matchesSearch =
                searchQuery === "" ||
                article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.author.name.toLowerCase().includes(searchQuery.toLowerCase())

            return matchesSearch
        })
        .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())

    return (
        <section className="py-8">
            {/* Search Section */}
            <div className="mb-8">
                <div className="relative max-w-md mx-auto">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder="Cari artikel..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 py-3 border-gray-300 focus:border-brown-500 focus:ring-brown-500"
                    />
                </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                    <Card key={article.id} className="group hover:shadow-lg transition-shadow duration-300 h-full">
                        <div className="relative h-48 overflow-hidden rounded-t-lg">
                            <Image
                                src={article.imageUrl || "/placeholder.svg"}
                                alt={article.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-3 left-3">
                                <span className="bg-brown-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                                    Artikel
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col h-full">
                            <CardContent className="p-4 flex-grow">
                                <div className="mb-2 flex items-center text-sm text-gray-500">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    {new Date(article.date).toLocaleDateString("id-ID", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </div>
                                <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-brown-600 transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{article.excerpt}</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={article.author.image} alt={article.author.name} />
                                            <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-xs text-gray-600">{article.author.name}</span>
                                    </div>
                                    <Button
                                        asChild
                                        variant="ghost"
                                        size="sm"
                                        className="text-brown-600 hover:text-brown-700 p-0"
                                    >
                                        <Link href={`/article/${article.slug}`} className="flex items-center gap-1">
                                            Baca
                                            <ChevronRight className="h-3 w-3" />
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </div>
                    </Card>
                ))}
            </div>

            {filteredArticles.length === 0 && (
                <div className="text-center py-16">
                    <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada artikel ditemukan</h3>
                    <p className="text-gray-600">Tidak ada artikel yang sesuai dengan kriteria pencarian Anda.</p>
                </div>
            )}
        </section>
    )
}
