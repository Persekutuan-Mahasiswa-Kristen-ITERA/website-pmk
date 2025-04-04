import { Facebook, Instagram, Youtube, Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"

export const Footer = () => {
    return (
        <footer className="bg-brown-900 text-white mt-16">
            <div className="container mx-auto py-12 px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div>
                        <h3 className="text-2xl font-serif mb-4">PMK ITERA</h3>
                        <p className="text-gray-300 mb-4">
                            Persekutuan Mahasiswa Kristen Institut Teknologi Sumatera, menyediakan komunitas rohani
                            untuk mahasiswa Kristen di ITERA.
                        </p>
                        <div className="flex space-x-4 mt-6">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-brown-800 hover:bg-brown-700 p-2 rounded-full transition-colors"
                            >
                                <Facebook size={20} />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-brown-800 hover:bg-brown-700 p-2 rounded-full transition-colors"
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-brown-800 hover:bg-brown-700 p-2 rounded-full transition-colors"
                            >
                                <Youtube size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-serif mb-4">Menu</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                                    Beranda
                                </Link>
                            </li>
                            <li>
                                <Link href="/profil" className="text-gray-300 hover:text-white transition-colors">
                                    Profil
                                </Link>
                            </li>
                            <li>
                                <Link href="/pengurus" className="text-gray-300 hover:text-white transition-colors">
                                    Pengurus
                                </Link>
                            </li>
                            <li>
                                <Link href="/renungan" className="text-gray-300 hover:text-white transition-colors">
                                    Renungan
                                </Link>
                            </li>
                            <li>
                                <Link href="/artikel" className="text-gray-300 hover:text-white transition-colors">
                                    Artikel
                                </Link>
                            </li>
                            <li>
                                <Link href="/persembahan" className="text-gray-300 hover:text-white transition-colors">
                                    Persembahan
                                </Link>
                            </li>
                            <li>
                                <Link href="/dokumentasi" className="text-gray-300 hover:text-white transition-colors">
                                    Dokumentasi
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-serif mb-4">Kontak</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <MapPin className="h-5 w-5 mr-3 text-brown-300 mt-0.5" />
                                <span className="text-gray-300">
                                    Institut Teknologi Sumatera, Jalan Terusan Ryacudu, Way Hui, Kecamatan Jati Agung,
                                    Lampung Selatan 35365
                                </span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="h-5 w-5 mr-3 text-brown-300" />
                                <a
                                    href="mailto:pmk@itera.ac.id"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    pmk@itera.ac.id
                                </a>
                            </li>
                            <li className="flex items-center">
                                <Phone className="h-5 w-5 mr-3 text-brown-300" />
                                <a
                                    href="tel:+6281234567890"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    +62 812 3456 7890
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-brown-800 mt-10 pt-6 text-center text-gray-400">
                    <p>© {new Date().getFullYear()} Persekutuan Mahasiswa Kristen (PMK) ITERA. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
