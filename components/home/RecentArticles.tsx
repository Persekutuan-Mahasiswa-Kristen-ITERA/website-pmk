"use client"

import React, { useEffect, useState } from "react"
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { Calendar, CircleUser, Clock, MapPin } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { getArticles } from "@/data/article"
import { Article } from "@/types/article"
import useAOS from "@/hooks/use-aos"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"

export const RecentArticles = () => {
    const [articles, setArticles] = useState<Article[]>([])

    useAOS()

    useEffect(() => {
        const fetchArticles = async () => {
            const data = await getArticles(3)
            setArticles(data)
        }
        fetchArticles()
    }, [])

    return (
        <section className="py-12 sm:py-16 bg-brown-50">
            <div className="container mx-auto px-4">
                <SectionHeader title="Artikel" subtitle="Bahan bacaan untuk menumbuhkan iman kita" centered />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {articles.slice(-3).map((article) => (
                        <Card
                            data-aos="fade-up"
                            data-aos-offset="50"
                            key={article.id}
                            className="flex flex-col h-[480px] max-h-[480px] overflow-hidden transition-all duration-300 group shadow-brown-700/20 hover:shadow-lg border-brown-200 bg-white"
                        >
                            <div className="h-36 sm:h-80 overflow-hidden">
                                <Image
                                    src={article.imageUrl ?? "article-placeholder.webp"}
                                    alt={article.title}
                                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                    width={1200}
                                    height={500}
                                />
                            </div>
                            <CardContent className="p-4 sm:p-6 flex flex-col h-full">
                                <Link
                                    href={`/article/${article.slug}`}
                                    className="text-lg sm:text-xl font-serif font-medium text-brown-800 hover:underline"
                                >
                                    <h2 className="line-clamp-1 overflow-ellipsis">{article.title}</h2>
                                </Link>
                                <p className="text-sm sm:text-base text-brown-600 mt-2 line-clamp-3">
                                    {article.excerpt}
                                </p>
                                <div className="grow"></div>
                                <div className="text-xs sm:text-sm text-brown-500">
                                    <div className="flex items-center">
                                        <Clock className="h-3 w-3 sm:h-[18px] sm:w-[18px] mr-2" />
                                        <span>{article.readTime} menit</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-xs sm:text-sm text-brown-500 py-2">
                                    <div className="flex items-center justify-center">
                                        {/* <CircleUser className="h-3 w-3 sm:h-4 sm:w-4 mr-2" /> */}
                                        <Avatar className="h-5 w-5 mr-1 rounded-full overflow-clip">
                                            <AvatarImage src={article.author.image} alt={article.author.name} />
                                            <AvatarFallback className="bg-brown-200 text-brown-700 text-xs">
                                                {article.author.name
                                                    .split(" ")
                                                    .map((name) => name[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span>{article.author.name}</span>
                                    </div>
                                    <span>
                                        {article.createdAt?.toLocaleDateString("id-ID", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </span>
                                </div>
                                <Button
                                    variant="outline"
                                    className="w-full border-brown-300 text-brown-700 hover:bg-brown-50 text-sm sm:text-base"
                                >
                                    <Link href={`/article/${article.slug}`}>Baca Selengkapnya</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-8 sm:mt-12">
                    <Button
                        asChild
                        variant="outline"
                        className="border-brown-300 text-brown-700 hover:bg-brown-50 bg-white"
                    >
                        <Link href="/article">Lihat artikel lainnya</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
