import { MainLayout } from "@/components/layout/MainLayout"
import { SectionHeader } from "@/components/ui/section-header"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import { useEffect, useState } from "react"
import { management } from "@/data/management"

const Pengurus = () => {
    return (
        <MainLayout>
            <div className="bg-brown-100 py-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-brown-800 text-center">
                        Pengurus PMK ITERA
                    </h1>
                    <p className="text-center text-brown-600 mt-4 max-w-2xl mx-auto">
                        Mengenal lebih dekat para pengurus yang melayani di Persekutuan Mahasiswa Kristen ITERA periode
                        2023-2024
                    </p>
                </div>
            </div>

            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="mb-16">
                        <SectionHeader title="YESAKA" subtitle={`Kesekjenan PMK ITERA`} centered={true} />

                        <div className="flex flex-wrap gap-8 place-content-center place-items-center">
                            {management.core.map((person) => (
                                <Card
                                    key={person.role}
                                    className="border-brown-100 w-56 h-64 hover:shadow-md transition-shadow overflow-hidden rounded-sm"
                                >
                                    <CardContent className="pt-6 p-0">
                                        <div className="flex flex-col items-center text-center">
                                            <Image
                                                src={person.photoUrl}
                                                alt={person.name}
                                                width={300}
                                                height={256}
                                                className="w-full h-36 object-center"
                                            />
                                            <div className="p-4">
                                                <h3 className="text-lg font-serif text-brown-800">{person.name}</h3>
                                                <p className="text-brown-700 text-sm font-medium">{person.role}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}

export default Pengurus
