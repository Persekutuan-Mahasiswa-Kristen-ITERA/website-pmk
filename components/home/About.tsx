import React from "react"
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Check } from "lucide-react"
import Image from "next/image"

export const About = () => {
    return (
        <section className="py-12 sm:py-16 md:py-24 bg-brown-50" id="about">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <div className="order-2 lg:order-1">
                        <SectionHeader title="Tentang PMK ITERA" subtitle="" />

                        <p className="text-brown-700 mt-2 text-justify text-sm sm:text-base">
                            Persekutuan Mahasiswa Kristen ITERA  (PMK ITERA) adalah komunitas yang menjadi wadah pertumbuhan
                            iman bagi mahasiswa Kristen ITERA, dengan menjadikan Alkitab sebagai pedoman hidup dan
                            Kristus sebagai teladan utama. PMK ITERA hadir untuk menolong mahasiswa mengenal Tuhan Yesus
                            Kristus lebih dalam, serta membentuk karakter yang serupa dengan-Nya.
                        </p>

                        <div className="mt-6">
                            <p className="text-sm sm:text-base">PMK ITERA memiliki komitmen untuk:</p>
                            <ul className="space-y-2 mt-2">
                                <li className="flex items-start">
                                    <Check className="h-4 w-4 sm:h-5 sm:w-5 mr-2 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm sm:text-base">
                                        Membangun persekutuan yang hangat dan membangun iman antar mahasiswa Kristen di
                                        ITERA
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="h-4 w-4 sm:h-5 sm:w-5 mr-2 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm sm:text-base">
                                        Mendorong pertumbuhan rohani melalui pendalaman Alkitab dan pembentukan karakter
                                        Kristus
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="h-4 w-4 sm:h-5 sm:w-5 mr-2 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm sm:text-base">
                                        Menumbuhkan integritas rohani yang selaras dengan kehidupan akademik mahasiswa
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="h-4 w-4 sm:h-5 sm:w-5 mr-2 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm sm:text-base">
                                        Menjadi terang dan berkat bagi masyarakat melalui pelayanan yang nyata dan penuh
                                        kasih
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
                            <Button asChild className="bg-brown-700 hover:bg-brown-800 text-white w-full sm:w-auto">
                                <Link href="/profile">Kenali Lebih Dalam</Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="border-brown-300 text-brown-700 hover:bg-brown-100 w-full sm:w-auto"
                            >
                                {/* <Link href="/management">Struktur Kepengurusan</Link> */}
                            </Button>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2">
                        <div className="w-full h-[300px] sm:h-[400px] rounded-lg overflow-hidden shadow-xl">
                            <div className="relative w-full h-full">
                                <Image
                                    src="/img/image1.webp"
                                    alt="Persekutuan Mahasiswa Kristen ITERA | PMK ITERA"
                                    className="w-full h-full object-cover object-center"
                                    width={1200}
                                    height={900}
                                    priority={false}
                                    loading="lazy"
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
