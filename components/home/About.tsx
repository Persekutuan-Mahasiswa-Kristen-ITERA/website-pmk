import React from "react"
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Check } from "lucide-react"
import Image from "next/image"

export const About = () => {
    return (
        <section className="py-16 bg-brown-50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <SectionHeader
                            title="Tentang PMK ITERA"
                            subtitle="Persekutuan Mahasiswa Kristen (PMK) ITERA adalah wadah bagi mahasiswa Kristen untuk bertumbuh dalam iman dan pengenalan akan Kristus."
                        />

                        <div className="space-y-4 mb-8">
                            <p className="text-brown-700">PMK ITERA memiliki komitmen untuk:</p>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <Check className="h-5 w-5 text-brown-600 mr-2 mt-0.5" />
                                    <span className="text-brown-700">
                                        Membangun persekutuan yang sehat dan berkelanjutan bagi mahasiswa Kristen di
                                        ITERA
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="h-5 w-5 text-brown-600 mr-2 mt-0.5" />
                                    <span className="text-brown-700">
                                        Mendorong pertumbuhan kerohanian melalui pemahaman Alkitab dan penerapannya
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="h-5 w-5 text-brown-600 mr-2 mt-0.5" />
                                    <span className="text-brown-700">
                                        Menjadi sarana pelayanan dan kesaksian di lingkungan kampus
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="h-5 w-5 text-brown-600 mr-2 mt-0.5" />
                                    <span className="text-brown-700">
                                        Mempersiapkan mahasiswa Kristen untuk menjadi pemimpin yang melayani
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Button asChild className="bg-brown-700 hover:bg-brown-800 text-white">
                                <Link href="/profil">Pelajari Lebih Lanjut</Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="border-brown-300 text-brown-700 hover:bg-brown-100"
                            >
                                <Link href="/pengurus">Lihat Pengurus</Link>
                            </Button>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-xl">
                            <Image
                                src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=900&q=80"
                                alt="PMK ITERA"
                                className="w-full h-full object-cover object-center"
                                width={1200}
                                height={900}
                            />
                        </div>
                        <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-brown-100 rounded-lg shadow-lg hidden md:block">
                            <div className="w-full h-full overflow-hidden rounded-lg">
                                <Image
                                    src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=800&q=80"
                                    alt="PMK ITERA Activities"
                                    className="w-full h-full object-cover"
                                    width={800}
                                    height={800}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
