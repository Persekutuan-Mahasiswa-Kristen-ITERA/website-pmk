import React from "react"
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import { events } from "@/data/event"
import Link from "next/link"

export const UpcomingEvents = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <SectionHeader
                    title="Kegiatan Mendatang"
                    subtitle="Mari bergabung dalam kegiatan PMK ITERA untuk bertumbuh bersama dalam iman"
                    centered
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event) => (
                        <Card
                            key={event.id}
                            className="overflow-hidden transition-all duration-300 hover:shadow-lg border-brown-100"
                        >
                            <div className="h-44 overflow-hidden">
                                <Image
                                    src={event.image ?? "img/event-placeholder.webp"}
                                    alt={event.title}
                                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                                    width={1200}
                                    height={700}
                                />
                            </div>
                            <CardContent className="pt-6 p-4">
                                <h3 className="text-xl font-serif font-medium text-brown-800 mb-2">{event.title}</h3>
                                <p className="text-brown-600 mb-4 line-clamp-2">{event.description}</p>
                                <div className="space-y-2 text-sm text-brown-700">
                                    <div className="flex items-center">
                                        <Calendar className="h-4 w-4 mr-2 text-brown-500" />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="h-4 w-4 mr-2 text-brown-500" />
                                        <span>{event.time}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <MapPin className="h-4 w-4 mr-2 text-brown-500" />
                                        <span>{event.location}</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="pt-2 pb-6">
                                <Button
                                    variant="outline"
                                    className="w-full border-brown-300 text-brown-700 hover:bg-brown-50"
                                >
                                    Lihat Detail
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Button asChild variant="outline" className="border-brown-300 text-brown-700 hover:bg-brown-50">
                        <Link href="/events">Lihat semua kegiatan</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
