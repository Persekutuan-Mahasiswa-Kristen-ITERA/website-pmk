"use client"

import { Devotional } from "@/types/devotional"
import React, { useEffect, useState } from "react"
import DailyVerse from "../daily-verse"
import { getLatestDevotionals } from "@/data/devotional"
import styles from "./latest-devotional.module.css"

const LatestDevotional: React.FC = () => {
    const [latestDevotional, setLatestDevotional] = useState<Devotional | null>(null)
    const [loading, setLoading] = useState(true)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const fetchLatestDevotional = async () => {
            try {
                const latestDevotional = await getLatestDevotionals(1)
                setLatestDevotional(latestDevotional[0] ?? null)
            } catch (error) {
                console.error("Error fetching latest devotional:", error)
            } finally {
                setLoading(false)
                setIsVisible(true)
            }
        }

        fetchLatestDevotional()
    }, [])

    return (
        <div className={`${styles.fadeElement} ${isVisible ? styles.visible : ""}`}>
            {loading ? (
                <DailyVerse
                    text="Memuat..."
                    verse="Memuat..."
                    id=""
                    className="mt-8 border-white/30 text-brown-500 bg-black/50 backdrop-blur"
                />
            ) : latestDevotional ? (
                <DailyVerse
                    text={latestDevotional.title}
                    verse={latestDevotional.verse}
                    id={latestDevotional.id}
                    className="mt-8 border-white/30 text-brown-500 bg-black/50 backdrop-blur"
                />
            ) : (
                <p>Kami belum dapat memuat renungan harian</p>
            )}
        </div>
    )
}

export default LatestDevotional
