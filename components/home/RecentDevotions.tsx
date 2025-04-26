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
import DevotionCard from "../devotion-card"

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
                    subtitle="Mari belajar mengenal Tuhan lebih dalam melalui firman-Nya"
                    centered
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {devotionals.slice(-3).map((devotion) => (
                        <DevotionCard key={devotion.id} devotion={devotion} className="transition-all duration-300" />
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
