"use client"

import React, { useState, useEffect } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ReactMarkdown from "react-markdown"
import { Calendar, Book, Share, ChevronLeft, Copy, Check, Facebook } from "lucide-react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Article } from "@/types/article"
import { getArticleById, getArticleBySlug, getArticles, getLatestArticles } from "@/data/article"
import ShareDropdown from "@/components/share-dropdown"

const ArtikelDetail = () => {
    const { slug } = useParams()
    const [article, setArticle] = useState<Article | null>(null)
    const [articles, setArticles] = useState<Article[]>([])
    const [isLoading, setIsLoading] = useState(true)
    

    const shareUrl = typeof window !== "undefined" ? window.location.href : ""

    

    useEffect(() => {
        const fetchArticle = async () => {
            setIsLoading(true)
            const article = await getArticleBySlug(slug as string)
            if (article && Array.isArray(article) && article.length > 0) {
                setArticle(article[0]) // Assuming you want the first article
            }
            setIsLoading(false)
        }

        const fetch3Articles = async () => {
            const articles = await getLatestArticles(3)
            if (articles && Array.isArray(articles)) {
                setArticles(articles)
            }
        }

        fetchArticle()
        fetch3Articles()
    }, [slug])

    if (isLoading) {
        return (
            <MainLayout>
                <div className="container mx-auto px-4 py-12">
                    <div className="flex items-center justify-center min-h-[50vh]">
                        <p className="text-brown-600">Memuat artikel...</p>
                    </div>
                </div>
            </MainLayout>
        )
    }

    if (!article) {
        return (
            <MainLayout>
                <div className="container mx-auto px-4 py-12">
                    <div className="flex flex-col items-center justify-center min-h-[50vh]">
                        <h2 className="text-2xl font-serif text-brown-800 mb-4">Artikel tidak ditemukan</h2>
                        <p className="text-brown-600 mb-6">Maaf, artikel yang Anda cari tidak dapat ditemukan.</p>
                        <Button asChild variant="default" className="bg-brown-700 hover:bg-brown-800">
                            <Link href="/article">Kembali ke Daftar Artikel</Link>
                        </Button>
                    </div>
                </div>
            </MainLayout>
        )
    }

    return (
        <MainLayout>
            {/* Hero section with article title and image */}
            <div className="relative h-[35vh] md:h-[40vh] w-full bg-brown-950">
                <div className="absolute inset-0 bg-gradient-to-t from-brown-950/80 to-brown-950/40">
                    {article.imageUrl && (
                        <Image
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-full h-full object-cover opacity-30"
                            width={1200}
                            height={700}
                        />
                    )}
                </div>
                <div className="absolute inset-0 bg-black/10 backdrop-blur-xs z-0"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="container px-4 py-12 text-center">
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">{article.title}</h1>
                        <div className="flex justify-center space-x-4 text-white/80">
                            <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span className="text-sm">
                                    {article.createdAt?.toLocaleDateString("id-ID", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <Book className="h-4 w-4 mr-1" />
                                <span className="text-sm">{article.readTime} menit membaca</span>
                            </div>
                        </div>
                        <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="mt-6 bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 text-xs"
                        >
                            <Link href="/article" className="flex items-center">
                                <ChevronLeft className="h-4 w-4 mr-1" />
                                Semua Artikel
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main content */}
                    <div className="lg:col-span-8">
                        <Card className="border-brown-100 overflow-hidden">
                            <CardContent className="p-6 md:p-12 bg-white">
                                {/* Article header information */}
                                <div className="mb-8 md:mb-4 flex gap-4 items-center justify-between">
                                    <div className="flex items-center">
                                        <Avatar className="h-12 w-12 mr-3">
                                            <AvatarImage
                                                className="object-cover"
                                                src={article.author.image}
                                                alt={article.author.name}
                                            />
                                            <AvatarFallback className="bg-brown-200 text-brown-800">
                                                {article.author.name
                                                    .split(" ")
                                                    .map((name) => name[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="max-md:text-sm font-medium text-brown-800">
                                                {article.author.name}
                                            </p>
                                        </div>
                                    </div>{" "}
                                    <ShareDropdown
                                        message={`${article?.title}\n\n${article?.excerpt}\n\n${shareUrl}`}
                                        shareUrl={shareUrl}
                                    />
                                </div>

                                {/* Markdown content */}
                                <div className="prose prose-brown text-justify max-md:leading-normal max-w-none">
                                    <ReactMarkdown>{article.content}</ReactMarkdown>
                                </div>

                                {/* Tags */}
                                <div className="mt-8 flex flex-wrap gap-2">
                                    {article.tags.split(",").map((tag) => (
                                        <Badge key={tag} variant="outline" className="border-brown-200 text-brown-600">
                                            {tag.trim()}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24">
                            <Card className="border-brown-100 overflow-hidden mb-6">
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-serif text-brown-800 mb-4">Tentang Penulis</h3>
                                    <div className="flex items-center mb-4">
                                        <Avatar className="h-16 w-16 mr-4">
                                            <AvatarImage
                                                className="object-cover"
                                                src={article.author.image}
                                                alt={article.author.name}
                                            />
                                            <AvatarFallback className="bg-brown-200 text-brown-800 text-lg">
                                                {article.author.name
                                                    .split(" ")
                                                    .map((name) => name[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium text-brown-800 ">{article.author.name}</p>
                                            <p className="text-brown-600 text-sm">Penulis</p>
                                        </div>
                                    </div>
                                    <p className="text-brown-600">{article.author.bio || ""}</p>
                                </CardContent>
                            </Card>

                            <Card className="border-brown-100 overflow-hidden">
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-serif text-brown-800 mb-4">Lihat Artikel Lainnya</h3>
                                    <div className="space-y-4">
                                        {articles
                                            // .filter((item) => item.id !== article.id)
                                            .map((item) => (
                                                <Link
                                                    key={item.id}
                                                    href={`/article/${item.slug}`}
                                                    className="block group"
                                                >
                                                    <div className="flex items-start space-x-3">
                                                        <div className="w-16 h-16 flex-shrink-0 bg-brown-100 rounded overflow-hidden">
                                                            <Image
                                                                src={item.imageUrl}
                                                                alt={item.title}
                                                                className="w-full h-full object-cover"
                                                                width={64}
                                                                height={64}
                                                            />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-sm font-medium text-brown-800 group-hover:text-brown-600 line-clamp-2">
                                                                {item.title}
                                                            </h4>
                                                            <p className="text-xs text-brown-500 mt-1">
                                                                {item.createdAt?.toLocaleDateString("id-ID", {
                                                                    year: "numeric",
                                                                    month: "long",
                                                                    day: "numeric",
                                                                })}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default ArtikelDetail
