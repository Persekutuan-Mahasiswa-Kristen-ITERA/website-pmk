"use client"

import { SectionHeader } from "@/components/ui/section-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen, ChevronRight } from "lucide-react"
import BibleVerse from "../bible-verse"
import { FirebaseService } from "@/services/firebase-service"
import { useEffect, useState } from "react"
import { Devotional } from "@/types/devotional"
import { getDevotionals } from "@/data/devotional"

export const RecentDevotions = () => {
    const [devotionals, setDevotionals] = useState<Devotional[]>([])

    useEffect(() => {
        const fetchDevotionals = async () => {
            const data = await getDevotionals()
            setDevotionals(data)
        }
        fetchDevotionals()
    }, [])

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <SectionHeader
                    title="Renungan Terbaru"
                    subtitle="Mari belajar mengenal Tuhan lebih dalam lewat firman-Nya"
                    centered
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {devotionals.slice(-3).map((devotion) => (
                        <Card
                            key={devotion.id}
                            className="border-brown-100 bg-white transition-all duration-300 hover:shadow-md"
                        >
                            <CardContent className="pt-6 flex flex-col justify-between h-full">
                                <div className="flex items-center mb-4">
                                    <BookOpen className="h-5 w-5 text-brown-400 mr-2" />
                                    <span className="text-sm text-brown-500">{devotion.verse}</span>
                                </div>
                                <h3 className="text-xl font-serif text-brown-800 mb-2">{devotion.title}</h3>
                                <BibleVerse className="text-sm" text={devotion.preview} verse={devotion.verse} />
                                <div className="flex justify-between items-center text-sm text-brown-500 mt-2">
                                    <span>{devotion.author}</span>
                                    <span>
                                        {devotion.createdAt?.toLocaleDateString("id-ID", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </span>
                                </div>
                                <Button
                                    asChild
                                    variant="ghost"
                                    className="w-full justify-between text-brown-700 hover:text-brown-900 hover:bg-brown-50 p-0"
                                >
                                    <Link
                                        href={`/devotional/${devotion.id}`}
                                        className="flex items-center w-full pt-2 pb-1"
                                    >
                                        <span>Baca Selengkapnya</span>
                                        <ChevronRight className="h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Button
                        asChild
                        variant="outline"
                        className="border-brown-300 text-brown-700 hover:bg-brown-50 bg-white"
                    >
                        <Link href="/devotional">Lihat Semua Renungan</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
