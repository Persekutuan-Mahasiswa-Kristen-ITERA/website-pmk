import { Facebook, Instagram, Youtube, Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"

export const Footer = () => {
    return (
        <footer className="bg-brown-900 text-white">
            <div className="container mx-auto py-12 px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div>
                        <h3 className="text-2xl font-serif mb-4">PMK ITERA</h3>
                        <p className="text-gray-300 mb-4">
                            Persekutuan Mahasiswa Kristen Institut Teknologi Sumatera, komunitas rohani untuk mahasiswa
                            Kristen di ITERA.
                        </p>
                        <div className="flex space-x-4 mt-6">
                            {/* <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-brown-800 hover:bg-brown-700 p-2 rounded-full transition-colors"
                            >
                                <Facebook size={20} />
                            </a> */}
                            <a
                                href="https://instagram.com/pmk_itera"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-brown-800 hover:bg-brown-700 p-2 rounded-full transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                                </svg>
                            </a>
                            <a
                                href="https://www.tiktok.com/@pmk_itera"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-brown-800 hover:bg-brown-700 p-2 rounded-full transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48"
                                    />
                                </svg>
                            </a>
                            <a
                                href="https://www.youtube.com/@pmkitera6371"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-brown-800 hover:bg-brown-700 p-2 rounded-full transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                                    <path d="m10 15 5-3-5-3z" />
                                </svg>
                            </a>
                            <a
                                href="https://open.spotify.com/show/5WrunB1fSvuB8V9PEfgOEF?si=6a1db460f42b4495"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-brown-800 hover:bg-brown-700 p-2 rounded-full transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M17.9 10.9C14.7 9 9.35 8.8 6.3 9.75c-.5.15-1-.15-1.15-.6c-.15-.5.15-1 .6-1.15c3.55-1.05 9.4-.85 13.1 1.35c.45.25.6.85.35 1.3c-.25.35-.85.5-1.3.25m-.1 2.8c-.25.35-.7.5-1.05.25c-2.7-1.65-6.8-2.15-9.95-1.15c-.4.1-.85-.1-.95-.5s.1-.85.5-.95c3.65-1.1 8.15-.55 11.25 1.35c.3.15.45.65.2 1m-1.2 2.75c-.2.3-.55.4-.85.2c-2.35-1.45-5.3-1.75-8.8-.95c-.35.1-.65-.15-.75-.45c-.1-.35.15-.65.45-.75c3.8-.85 7.1-.5 9.7 1.1c.35.15.4.55.25.85M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"
                                    />
                                </svg>
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
                                <Link href="/profile" className="text-gray-300 hover:text-white transition-colors">
                                    Profil
                                </Link>
                            </li>
                            <li>
                                <Link href="/management" className="text-gray-300 hover:text-white transition-colors">
                                    Pengurus
                                </Link>
                            </li>
                            <li>
                                <Link href="/devotional" className="text-gray-300 hover:text-white transition-colors">
                                    Renungan
                                </Link>
                            </li>
                            <li>
                                <Link href="/article" className="text-gray-300 hover:text-white transition-colors">
                                    Artikel
                                </Link>
                            </li>
                            <li>
                                <Link href="/contribution" className="text-gray-300 hover:text-white transition-colors">
                                    Persembahan
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/documentation"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
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
                                    href="mailto:pmkiteralmpng@gmail.com"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    pmkiteralmpng@gmail.com
                                </a>
                            </li>
                            <li className="flex items-center">
                                <Phone className="h-5 w-5 mr-3 text-brown-300" />
                                <a
                                    href="tel:+6282277123860"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    +62 822 7712 3860 (Natanael Situmorang)
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-brown-800 mt-12 pt-6 text-center text-gray-400">
                    <p>© 2025 Persekutuan Mahasiswa Kristen (PMK) ITERA. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
