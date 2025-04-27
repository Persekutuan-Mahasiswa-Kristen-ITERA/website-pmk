import { Button } from "@/components/ui/button"
import Link from "next/link"
import BibleVerse from "../bible-verse"
import DailyVerse from "../daily-verse"
import { Devotional } from "@/types/devotional"
import { useState } from "react"
import LatestDevotional from "../hero/latest-devotional"

export const Hero = () => {
    return (
        <div className="relative bg-brown-100 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/img/cross.webp')",
                        filter: "brightness(0.4)",
                        transform: "scaleX(-1)",
                    }}
                ></div>
            </div>

            <div className="container mx-auto px-4 py-20 md:py-40 relative z-10">
                <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
                        Persekutuan Mahasiswa Kristen ITERA
                    </h1>
                    <p className="mt-6 text-lg text-gray-200">
                        Menjadi generasi mahasiswa Kristen yang menjadi garam dan terang dunia, meneladani Kristus dalam
                        hikmat, pengetahuan, dan persekutuan
                    </p>
                    <LatestDevotional />
                    <div className="mt-8 flex flex-wrap gap-4">
                        <Button asChild className="bg-brown-700 hover:bg-brown-800 text-white shadow-lg" size="lg">
                            <Link href="#about">Tentang Kami</Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 shadow-lg"
                            size="lg"
                        >
                            <Link href="/devotinals">Renungan Harian</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
