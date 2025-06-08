"use client"

import React, { useEffect, useState } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, Clock, MapPin, Search, X } from "lucide-react"
import Image from "next/image"
import { Event } from "@/types/event"
import { getEvents } from "@/data/event"


const EventPage = () => {
    const [events, setEvents] = useState<Event[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const fetchEvents = async () => {
            const data = await getEvents()
            setEvents(data.items)
        }

        fetchEvents()
    }, [])

    const filteredEvents = events.filter((event) => {
        const matchesSearch =
            searchQuery === "" ||
            event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.location.toLowerCase().includes(searchQuery.toLowerCase())

        return matchesSearch
    })

    const handleEventClick = (event: Event) => {
        setSelectedEvent(event)
        setIsModalOpen(true)
    }

    return (
        <MainLayout>
            <div className="bg-[url('/img/bg-event.webp')] bg-cover bg-center py-20 relative">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0"></div>
                <div className="container relative mx-auto px-4 z-10">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white text-center">
                        Kegiatan PMK ITERA
                    </h1>
                    <p className="text-center text-brown-100 mt-4 max-w-2xl mx-auto">
                        Bergabunglah dalam berbagai kegiatan rohani dan persekutuan untuk bertumbuh bersama dalam iman
                    </p>
                </div>
            </div>

            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="mb-12">
                        <div className="relative max-w-xl mx-auto">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brown-400" />
                            <Input
                                placeholder="Cari kegiatan..."
                                className="pl-10 border-brown-200 focus:border-brown-400"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredEvents.map((event) => (
                            <Card
                                key={event.id}
                                className="overflow-hidden transition-all duration-300 hover:shadow-lg border-brown-100 group"
                            >
                                <div className="h-48 overflow-hidden bg-brown-200">
                                    <Image
                                        src={event.image ?? "https://picsum.photos/seed/picsum/400/300"}
                                        alt={event.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                        width={400}
                                        height={300}
                                    />
                                </div>
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-serif font-medium text-brown-800 mb-2">
                                        {event.title}
                                    </h3>
                                    <p className="text-brown-600 text-sm mb-4 line-clamp-3">{event.description}</p>
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
                                <CardFooter className="p-6 pt-0">
                                    <Button
                                        variant="outline"
                                        className="w-full border-brown-300 text-brown-700 hover:bg-brown-50"
                                        onClick={() => handleEventClick(event)}
                                    >
                                        Lihat Detail
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    {filteredEvents.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-brown-600">Tidak ada kegiatan yang sesuai dengan kriteria pencarian.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Event Detail Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-serif text-brown-800 mb-4">Detail Kegiatan</DialogTitle>
                    </DialogHeader>

                    {selectedEvent && (
                        <div className="space-y-6">
                            {/* Event Image */}
                            <div className="w-full h-64 rounded-lg overflow-hidden">
                                <Image
                                    src={selectedEvent.image ?? "https://picsum.photos/seed/picsum/600/400"}
                                    alt={selectedEvent.title}
                                    className="w-full h-full object-cover"
                                    width={600}
                                    height={400}
                                />
                            </div>

                            {/* Event Title */}
                            <h2 className="text-2xl font-serif font-bold text-brown-800">{selectedEvent.title}</h2>

                            {/* Event Info */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-center space-x-3 p-3 bg-brown-50 rounded-lg">
                                    <Calendar className="h-5 w-5 text-brown-600" />
                                    <div>
                                        <p className="text-sm text-brown-500">Tanggal</p>
                                        <p className="text-brown-800 font-medium">{selectedEvent.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3 p-3 bg-brown-50 rounded-lg">
                                    <Clock className="h-5 w-5 text-brown-600" />
                                    <div>
                                        <p className="text-sm text-brown-500">Waktu</p>
                                        <p className="text-brown-800 font-medium">{selectedEvent.time}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3 p-3 bg-brown-50 rounded-lg">
                                    <MapPin className="h-5 w-5 text-brown-600" />
                                    <div>
                                        <p className="text-sm text-brown-500">Lokasi</p>
                                        <p className="text-brown-800 font-medium">{selectedEvent.location}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Event Description */}
                            <div>
                                <h3 className="text-lg font-semibold text-brown-800 mb-3">Deskripsi Kegiatan</h3>
                                <p className="text-brown-700 leading-relaxed whitespace-pre-wrap">
                                    {selectedEvent.description}
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4">
                                <Button
                                    className="flex-1 bg-brown-700 hover:bg-brown-800 text-white"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Tutup
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex-1 border-brown-300 text-brown-700 hover:bg-brown-50"
                                >
                                    Daftar Kegiatan
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </MainLayout>
    )
}

export default EventPage
