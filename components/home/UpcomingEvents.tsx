"use client"

import React, { useEffect, useState } from "react"
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { getEvents } from "@/data/event"
import { Event } from "@/types/event"

export const UpcomingEvents = () => {
    const [events, setEvents] = useState<Event[]>([])

    useEffect(() => {
        const fetchEvents = async () => {
            const data = await getEvents(3)
            setEvents(data.items)
        }
        fetchEvents()
    }, [])

    return (
        <section className="py-12 sm:py-16 bg-white">
            <div className="container mx-auto px-4">
                <SectionHeader
                    title="Kegiatan Mendatang"
                    subtitle="Mari bergabung dalam kegiatan PMK ITERA untuk bertumbuh bersama dalam iman"
                    centered
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {events.map((event) => (
                        <Card
                            key={event.id}
                            className="overflow-hidden transition-all duration-300 hover:shadow-lg border-brown-100"
                        >
                            <div className="h-40 sm:h-44 overflow-hidden">
                                <Image
                                    src={event.image ?? "https://picsum.photos/seed/picsum/400/300"}
                                    alt={event.title}
                                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                                    width={1200}
                                    height={700}
                                />
                            </div>
                            <CardContent className="p-4 sm:p-6">
                                <h3 className="text-lg sm:text-xl font-serif font-medium text-brown-800 mb-2">
                                    {event.title}
                                </h3>
                                <p className="text-sm sm:text-base text-brown-600 mb-4 line-clamp-2">
                                    {event.description}
                                </p>
                                <div className="space-y-2 text-xs sm:text-sm text-brown-700">
                                    <div className="flex items-center">
                                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-brown-500" />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-brown-500" />
                                        <span>{event.time}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-brown-500" />
                                        <span>{event.location}</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="p-4 sm:p-6 pt-2 pb-4 sm:pb-6">
                                <Button
                                    variant="outline"
                                    className="w-full border-brown-300 text-brown-700 hover:bg-brown-50 text-sm sm:text-base"
                                >
                                    Lihat Detail
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-8 sm:mt-12">
                    <Button asChild variant="outline" className="border-brown-300 text-brown-700 hover:bg-brown-50">
                        <Link href="/events">Lihat semua kegiatan</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
