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
                        <SectionHeader title="Tentang PMK ITERA" subtitle="" />

                        <p className="text-brown-700 mt-2 text-justify">
                            Persekutuan Mahasiswa Kristen (PMK) ITERA adalah komunitas yang menjadi wadah pertumbuhan
                            iman bagi mahasiswa Kristen ITERA, dengan menjadikan Alkitab sebagai pedoman hidup dan
                            Kristus sebagai teladan utama. PMK ITERA hadir untuk menolong mahasiswa mengenal Tuhan Yesus
                            Kristus lebih dalam, serta membentuk karakter yang serupa dengan-Nya.
                        </p>

                        <div className="space-y-2 mb-8 text-brown-700 mt-4">
                            <p className="">PMK ITERA memiliki komitmen untuk:</p>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <Check className="h-5 w-5 mr-2 mt-0.5" />
                                    <span className="">
                                        Membangun persekutuan yang hangat dan membangun iman antar mahasiswa Kristen di
                                        ITERA
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="h-5 w-5 mr-2 mt-0.5" />
                                    <span className="">
                                        Mendorong pertumbuhan rohani melalui pendalaman Alkitab dan pembentukan karakter
                                        Kristus
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="h-5 w-5 mr-2 mt-0.5" />
                                    <span className="">
                                        Menumbuhkan integritas rohani yang selaras dengan kehidupan akademik mahasiswa
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="h-5 w-5 mr-2 mt-0.5" />
                                    <span className="">
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
                            <div className="relative w-full h-full">
                                <Image
                                    src="/img/image1.webp"
                                    alt="PMK ITERA"
                                    className="w-full h-full object-cover object-center"
                                    width={1200}
                                    height={900}
                                />
                                <div className="absolute inset-0 bg-brown-300 opacity-20" />
                            </div>
                        </div>
                        <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-brown-100 rounded-lg shadow-lg hidden md:block">
                            <div className="relative w-full h-full">
                                <Image
                                    src="/img/image2.webp"
                                    alt="PMK ITERA"
                                    className="w-full h-full object-cover object-center"
                                    width={400}
                                    height={400}
                                />
                                <div className="absolute inset-0 bg-brown-300 opacity-20" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
