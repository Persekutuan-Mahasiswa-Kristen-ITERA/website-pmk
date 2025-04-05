import React from "react"
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Check } from "lucide-react"
import Image from "next/image"

export const About = () => {
    return (
        <section className="py-24 bg-brown-50" id="about">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <SectionHeader
                            title="Tentang PMK ITERA"
                            subtitle="Persekutuan Mahasiswa Kristen (PMK) ITERA adalah komunitas yang menjadi wadah pertumbuhan iman bagi mahasiswa Kristen ITERA, dengan menjadikan Alkitab sebagai pedoman hidup dan Kristus sebagai teladan utama. PMK ITERA hadir untuk menolong mahasiswa mengenal Tuhan Yesus Kristus lebih dalam, serta membentuk karakter yang serupa dengan-Nya."
                        />

                        <div className="space-y-2 mb-8">
                            <p className="text-brown-700">PMK ITERA memiliki komitmen untuk:</p>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <Check className="h-5 w-5 text-brown-600 mr-2 mt-0.5" />
                                    <span className="text-brown-700">
                                        Membangun persekutuan yang hangat dan membangun iman antar mahasiswa Kristen di
                                        ITERA
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="h-5 w-5 text-brown-600 mr-2 mt-0.5" />
                                    <span className="text-brown-700">
                                        Mendorong pertumbuhan rohani melalui pendalaman Alkitab dan pembentukan karakter
                                        Kristus
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="h-5 w-5 text-brown-600 mr-2 mt-0.5" />
                                    <span className="text-brown-700">
                                        Menumbuhkan integritas rohani yang selaras dengan kehidupan akademik mahasiswa
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="h-5 w-5 text-brown-600 mr-2 mt-0.5" />
                                    <span className="text-brown-700">
                                        Menjadi terang dan berkat bagi masyarakat melalui pelayanan yang nyata dan penuh
                                        kasih
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Button asChild className="bg-brown-700 hover:bg-brown-800 text-white">
                                <Link href="/profile">Kenali Lebih Dalam</Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="border-brown-300 text-brown-700 hover:bg-brown-100"
                            >
                                <Link href="/management">Struktur Kepengurusan</Link>
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
