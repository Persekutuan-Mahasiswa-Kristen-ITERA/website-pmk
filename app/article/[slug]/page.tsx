import React from "react"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { MainLayout } from "@/components/layout/MainLayout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ReactMarkdown from "react-markdown"
import { Calendar, Book, ChevronLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getArticleBySlug, getLatestArticles } from "@/data/article"
import ShareDropdown from "@/components/share-dropdown"
import { generatePageMetadata, generateArticleSchema } from "@/lib/seo-utils"
import StructuredData from "@/components/seo/StructuredData"

interface Props {
    params: {
        slug: string
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const articles = await getArticleBySlug(params.slug)
    const article = articles && Array.isArray(articles) && articles.length > 0 ? articles[0] : null

    if (!article) {
        return {
            title: "Artikel Tidak Ditemukan",
            description: "Artikel yang Anda cari tidak dapat ditemukan.",
        }
    }

    const url = `https://www.pmkitera.com/article/${params.slug}`

    return generatePageMetadata({
        title: article.title,
        description: article.excerpt || "Artikel dari PMK ITERA",
        path: `/article/${params.slug}`,
        image: article.imageUrl,
        keywords: [
            "artikel",
            "tulisan",
            "PMK ITERA",
            "mahasiswa kristen",
            "persekutuan",
            "iman",
            "rohani",
            "spiritual",
            "kekristenan",
            ...(article.tags ? article.tags.split(",").map((tag) => tag.trim()) : []),
        ],
        type: "article",
        publishedTime: article.createdAt ? new Date(article.createdAt).toISOString() : undefined,
        modifiedTime: article.updatedAt ? new Date(article.updatedAt).toISOString() : undefined,
        author: article.author.name,
    })
}

const ArtikelDetail = async ({ params }: Props) => {
    const articles = await getArticleBySlug(params.slug)
    const article = articles && Array.isArray(articles) && articles.length > 0 ? articles[0] : null
    
    if (!article) {
        notFound()
    }

    const latestArticles = await getLatestArticles(3)
    const shareUrl = `https://www.pmkitera.com/article/${params.slug}`

    const articleSchema = generateArticleSchema({
        title: article.title,
        description: article.excerpt || "Artikel dari PMK ITERA",
        slug: params.slug,
        author: article.author.name,
        publishedTime: article.createdAt ? new Date(article.createdAt).toISOString() : new Date().toISOString(),
        modifiedTime: article.updatedAt ? new Date(article.updatedAt).toISOString() : undefined,
        image: article.imageUrl,
    })

    return (
        <MainLayout>
            <StructuredData data={articleSchema} />
            
            {/* Hero section with article title and image */}
            <div className="relative h-[35vh] md:h-[40vh] w-full bg-brown-950">
                <div className="absolute inset-0 bg-gradient-to-t from-brown-950/80 to-brown-950/40">
                    {article.imageUrl && (
                        <Image
                            src={article.imageUrl}
                            alt={`${article.title} | PMK ITERA`}
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
                                <div className="prose prose-brown text-justify max-md:leading-normal max-w-none [&_h1]:text-2xl [&_h1]:md:text-3xl [&_h1]:font-bold">
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
                                        {latestArticles
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
                                                                alt={`${article.title} | PMK ITERA`}
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
