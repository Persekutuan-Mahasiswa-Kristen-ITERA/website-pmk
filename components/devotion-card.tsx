import { Devotional, devotionalColumns } from "@/types/devotional"
import React from "react"
import { Card, CardContent } from "./ui/card"
import { BookOpen, ChevronRight } from "lucide-react"
import BibleVerse from "./bible-verse"
import { Button } from "./ui/button"
import Link from "next/link"

interface DevotionCardProps {
    className?: string
    devotion: Devotional
}

const DevotionCard: React.FC<DevotionCardProps> = ({ className, devotion }) => {
    return (
        <Card
            key={devotion.id}
            className={`border-brown-100 bg-white transition-all duration-300 hover:shadow-md ${className}`}
        >
            <CardContent className="pt-6 flex flex-col justify-between h-full">
                <div className="flex items-center mb-3">
                    <BookOpen className="h-5 w-5 text-brown-400 mr-2" />
                    <span className="text-sm text-brown-500">{devotion.verse}</span>
                </div>
                <Link href={`/devotional/${devotion.id}`} className=" mb-2">
                    <h3 className="text-xl font-serif text-brown-800 hover:underline hover:text-brown-950 transition">
                        {devotion.title}
                    </h3>
                </Link>
                <div className="italic text-brown-700 border-l-4 border-brown-300 pl-4 py-2 my-4 tracking-[0.02em]">
                    <p className="text-sm line-clamp-3 text-ellipsis">{devotion.preview}</p>
                </div>
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
                <Link
                    href={`/devotional/${devotion.id}`}
                    className="flex items-center pt-2 pb-1 ml-auto text-sm text-brown-600 hover:text-brown-800 hover:underline"
                >
                    <span>Baca Selengkapnya</span>
                    <ChevronRight className="h-4 w-4" />
                </Link>
            </CardContent>
        </Card>
    )
}

export default DevotionCard
