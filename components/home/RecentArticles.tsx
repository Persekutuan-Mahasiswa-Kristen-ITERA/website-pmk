import React from "react"
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { Calendar, CircleUser, Clock, MapPin } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { articles } from "@/data/article"

export const RecentArticles = () => {
    return (
        <section className="py-16 bg-brown-50">
            <div className="container mx-auto px-4">
                <SectionHeader title="Artikel" subtitle="Bahan bacaan untuk menumbuhkan imanmu" centered />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.slice(-3).map((article) => (
                        <Card
                            key={article.id}
                            className="overflow-hidden transition-all duration-300 shadow-brown-700/20 hover:shadow-lg border-brown-200 bg-white"
                        >
                            <div className="h-48 overflow-hidden">
                                <Image
                                    src={article.imageUrl ?? "article-placeholder.webp"}
                                    alt={article.title}
                                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                                    width={1200}
                                    height={500}
                                />
                            </div>
                            <CardContent className="pt-6">
                                <Link
                                    href={`/article/${article.slug}`}
                                    className="text-xl font-serif font-medium text-brown-800 hover:underline"
                                >
                                    <h2>{article.title}</h2>
                                </Link>
                                <p className="text-brown-600 mb-4 mt-2 line-clamp-3 text-sm">{article.excerpt}</p>
                                <div className="space-y-2 text-sm text-brown-500">
                                    <div className="flex items-center ">
                                        <Clock className="h-4 w-4 mr-2 " />
                                        <span>{article.readTime} menit</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-sm text-brown-500 mt-">
                                    <div className="flex items-center justify-center">
                                        <CircleUser className="h-4 w-4 mr-2" />
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
                            </CardContent>
                            <CardFooter className="pt-2 pb-6">
                                <Button
                                    variant="outline"
                                    className="w-full border-brown-300 text-brown-700 hover:bg-brown-50"
                                >
                                    <Link href={`/article/${article.slug}`}>Baca Selengkapnya</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-12">
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
