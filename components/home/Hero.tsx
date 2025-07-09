import { Button } from "@/components/ui/button"
import Link from "next/link"
import LatestDevotional from "../hero/latest-devotional"

export const Hero = () => {
    return (
        <section className="relative bg-brown-100 overflow-hidden" aria-label="Hero section">
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/img/cross.webp')",
                        filter: "brightness(0.4)",
                        transform: "scaleX(-1)",
                    }}
                    role="img"
                    aria-label="Cross background image"
                ></div>
            </div>

            <div className="container mx-auto px-4 py-28 md:py-40 relative z-10">
                <div className="max-w-2xl">
                    {/* Primary H1 - simplified for better SEO detection */}
                    <h1
                        className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-tight"
                        itemProp="headline"
                        itemScope
                        itemType="https://schema.org/Organization"
                    >
                        Persekutuan Mahasiswa Kristen ITERA
                    </h1>
                    <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-200">
                        Menjadi generasi mahasiswa Kristen yang menjadi garam dan terang dunia, meneladani Kristus dalam
                        hikmat, pengetahuan, dan persekutuan
                    </p>
                    <LatestDevotional />
                    <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <Button
                            asChild
                            className="bg-brown-700 hover:bg-brown-800 text-white shadow-lg w-full sm:w-auto"
                            size="lg"
                        >
                            <Link href="#about">Tentang Kami</Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 shadow-lg w-full sm:w-auto"
                            size="lg"
                        >
                            <Link href="/devotional">Renungan Harian</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
