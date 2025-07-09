import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"

export const metadata: Metadata = {
    title: "404 - Halaman Tidak Ditemukan",
    description:
        "Halaman yang Anda cari tidak dapat ditemukan. Kembali ke beranda atau gunakan navigasi untuk menemukan konten yang Anda butuhkan.",
    robots: { index: false, follow: false },
}

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-brown-50 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-20">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="mb-8">
                        <h1 className="text-6xl font-bold text-brown-600 dark:text-brown-400 mb-4">404</h1>
                        <h2 className="text-3xl font-serif font-semibold text-gray-900 dark:text-gray-100 mb-4">
                            Halaman Tidak Ditemukan
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                            Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman tersebut telah
                            dipindahkan atau dihapus.
                        </p>
                    </div>

                    <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                        <Button asChild size="lg" className="w-full sm:w-auto">
                            <Link href="/">
                                <Home className="h-5 w-5 mr-2" />
                                Kembali ke Beranda
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                            <Link href="/article">
                                <Search className="h-5 w-5 mr-2" />
                                Jelajahi Artikel
                            </Link>
                        </Button>
                    </div>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Artikel Terbaru</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Temukan artikel seputar kehidupan dan apologetika Kristen
                            </p>
                            <Link href="/article" className="text-brown-600 hover:text-brown-700 text-sm font-medium">
                                Lihat Artikel →
                            </Link>
                        </div>
                        <div className="text-center">
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Renungan Harian</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Renungan harian untuk memperkuat iman Anda
                            </p>
                            <Link
                                href="/devotional"
                                className="text-brown-600 hover:text-brown-700 text-sm font-medium"
                            >
                                Lihat Renungan →
                            </Link>
                        </div>
                        <div className="text-center">
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Event Terbaru</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Ikuti kegiatan dan acara PMK ITERA
                            </p>
                            <Link href="/event" className="text-brown-600 hover:text-brown-700 text-sm font-medium">
                                Lihat Event →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
