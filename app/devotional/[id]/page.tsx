"use client"

import React, { useState, useEffect } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ReactMarkdown from "react-markdown"
import { Calendar, Book, Share, ChevronLeft } from "lucide-react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Devotional } from "@/types/devotional"
import { getDevotionalById, getDevotionals, getLatestDevotionals } from "@/data/devotional"
import Head from "next/head"

const DevotionalDetail = () => {
    const { id } = useParams()
    const [devotional, setDevotional] = useState<Devotional | null>(null)
    const [devotionals, setDevotionals] = useState<Devotional[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchDevotional = async () => {
            setIsLoading(true)
            const devotional = await getDevotionalById(id as string)

            if (devotional) {
                setDevotional(devotional) // Assuming you want the first devotional
            }

            console.log(devotional)

            setIsLoading(false)
        }

        const fetch3Devotionals = async () => {
            const devotionals = await getLatestDevotionals(3)
            if (devotionals && Array.isArray(devotionals)) {
                setDevotionals(devotionals)
            }
        }

        fetchDevotional()
        fetch3Devotionals()
    }, [id])

    if (isLoading) {
        return (
            <MainLayout>
                <div className="container mx-auto px-4 py-12">
                    <div className="flex items-center justify-center min-h-[50vh]">
                        <p className="text-brown-600">Memuat renungan...</p>
                    </div>
                </div>
            </MainLayout>
        )
    }

    if (!devotional) {
        return (
            <MainLayout>
                <div className="container mx-auto px-4 py-12">
                    <div className="flex flex-col items-center justify-center min-h-[50vh]">
                        <h2 className="text-2xl font-serif text-brown-800 mb-4">Renungan tidak ditemukan</h2>
                        <p className="text-brown-600 mb-6">Maaf, renungan yang Anda cari tidak dapat ditemukan.</p>
                        <Button asChild variant="default" className="bg-brown-700 hover:bg-brown-800">
                            <Link href={document.referrer}>Kembali</Link>
                        </Button>
                    </div>
                </div>
            </MainLayout>
        )
    }

    return (
        <MainLayout>
            <Head>
                <title>{devotional.title} | Persekutuan Mahasiswa Kristen ITERA</title>
                <meta
                    name="description"
                    content={
                        devotional.preview || "Renungan harian untuk mengenal Tuhan lebih dalam melalui firman-Nya"
                    }
                />
                <meta property="og:title" content={devotional.title} />
                <meta
                    property="og:description"
                    content={
                        devotional.preview || "Renungan harian untuk mengenal Tuhan lebih dalam melalui firman-Nya"
                    }
                />
                <meta property="og:image" content="/img/bg-bible.jpg" />
                <meta property="og:url" content={`https://www.pmkitera.com/devotional/${devotional.id}`} />
                <meta property="og:type" content="article" />
                <meta property="og:site_name" content={`Renungan Harian PMK ITERA`} />
                <meta
                    name="keywords"
                    content="renungan harian, devotional, firman Tuhan, alkitab, PMK ITERA, saat teduh, quiet time, rohani, spiritual"
                />
                <meta name="author" content="PMK ITERA" />
                <meta name="creator" content="PMK ITERA" />
                <meta name="publisher" content="Persekutuan Mahasiswa Kristen ITERA" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${devotional.title} | Persekutuan Mahasiswa Kristen ITERA`} />
                <meta
                    name="twitter:description"
                    content={
                        devotional.preview || "Renungan harian untuk mengenal Tuhan lebih dalam melalui firman-Nya"
                    }
                />
                <meta name="twitter:creator" content="@pmkitera" />
                <meta name="twitter:image" content="/img/bg-bible.jpg" />

                <meta name="robots" content="index, follow" />
                <meta name="googlebot" content="index, follow, max-video-preview:-1, max-snippet:-1" />
                <meta name="googlebot" content="noimageindex:false" />
                <meta name="robots" content="nocache:false" />

                <meta name="category" content="devotional" />
            </Head>

            {/* Hero section with devotional title and image */}
            <div className="mx-auto px-3 py-3 lg:px-4 lg:py-12 relative">
                <div className="absolute z-0 inset-0 bg-gradient-to-t from-brown-950/80 to-brown-950/40">
                    <Image
                        src="/img/bg-bible.jpg"
                        alt={`${devotional.title} | PMK ITERA`}
                        className="w-full h-full object-cover opacity-50 blur-sm"
                        width={1400}
                        height={800}
                    />
                </div>
                <div className="relative z-10 container grid grid-cols-1 max-md:px-0 lg:grid-cols-12 gap-8">
                    {/* Main content */}
                    <div className="lg:col-span-8">
                        <Card className="border-brown-100 bg-white overflow-hidden">
                            <CardContent className="p-8">
                                {/* Devotional header information */}
                                <div className="mb-8 flex max-lg:flex-wrap justify-between">
                                    <div className="flex flex-col gap-2">
                                        <h2 className="capitalize text-brown-700 font-semibold text-2xl">
                                            {devotional.title}
                                        </h2>
                                        <div className="flex space-x-4 text-brown-700">
                                            <div className="flex items-center">
                                                <Calendar className="h-4 w-4 mr-1" />
                                                <span className="text-sm">
                                                    {devotional.createdAt?.toLocaleDateString("id-ID", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    })}
                                                </span>
                                            </div>
                                            <div className="flex items-center">
                                                <Book className="h-4 w-4 mr-1" />
                                                <span className="text-sm">3 menit membaca</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 max-md:mt-2   place-content-center">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex items-center text-brown-600 hover:text-brown-800"
                                        >
                                            <ChevronLeft className="h-3 w-3" />
                                            <Link className="max-md:text-xs" href={document.referrer}>
                                                Kembali
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex items-center text-brown-600 hover:text-brown-800"
                                            onClick={() => alert("Fitur berbagi renungan belum diimplementasikan")}
                                        >
                                            <Share className="h-3 w-3" />
                                            <span className="max-md:text-xs">Bagikan</span>
                                        </Button>
                                    </div>
                                </div>

                                {/* Markdown content */}
                                <div className="prose prose-brown max-w-none">
                                    <p className="whitespace-pre-wrap break-words text-brown-950 text-justify leading-normal">
                                        {devotional.content}
                                    </p>
                                </div>

                                {/* Tags */}
                                <div className="mt-8 flex flex-wrap gap-2">
                                    {devotional.category.split(",").map((tag) => (
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
                            <Card className="border-brown-100 overflow-hidden bg-white">
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-serif text-brown-800 mb-4">Renungan Terkait</h3>
                                    <div className="space-y-4">
                                        {devotionals
                                            .filter((item) => item.id !== devotional.id)
                                            .map((item) => (
                                                <Link
                                                    key={item.id}
                                                    href={`/devotional/${item.id}`}
                                                    className="block group"
                                                >
                                                    <div className="flex items-start space-x-3">
                                                        <div className="w-16 h-16 flex-shrink-0 bg-brown-100 rounded overflow-hidden"></div>
                                                        <div>
                                                            <h4 className="text-sm font-medium text-brown-800 group-hover:text-brown-600 line-clamp-2">
                                                                {item.title}
                                                            </h4>
                                                            <p className="text-xs text-brown-500 mt-1">{item.verse}</p>
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

export default DevotionalDetail
