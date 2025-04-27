"use client"

import { Devotional } from "@/types/devotional"
import React, { useEffect, useState } from "react"
import DailyVerse from "../daily-verse"
import { getLatestDevotionals } from "@/data/devotional"

const LatestDevotional: React.FC = () => {
    const [latestDevotional, setLatestDevotional] = useState<Devotional | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchLatestDevotional = async () => {
            try {
                const latestDevotional = await getLatestDevotionals(1)
                setLatestDevotional(latestDevotional[0] ?? null)
            } catch (error) {
                console.error("Error fetching latest devotional:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchLatestDevotional()
    }, [])

    return (
        <div>
            {latestDevotional ? (
                <DailyVerse
                    text={loading ? "Loading..." : latestDevotional.title}
                    verse={loading ? "Loading..." : latestDevotional.verse}
                    id={loading ? "" : latestDevotional.id}
                    className="mt-8 border-white/30 text-brown-500 bg-black/50 backdrop-blur"
                />
            ) : (
                <p>Kami belum dapat memuat renungan harian</p>
            )}
        </div>
    )
}

export default LatestDevotional
