"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, Clock, MapPin, Search, X, Users } from "lucide-react"
import Image from "next/image"
import { Event } from "@/types/event"
import { getEvents } from "@/data/event"

export default function EventList() {
    const [events, setEvents] = useState<Event[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getEvents()
                setEvents(data.items || [])
            } catch (error) {
                console.error("Error fetching events:", error)
                setEvents([])
            } finally {
                setLoading(false)
            }
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

    if (loading) {
        return (
            <div className="text-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Memuat event...</p>
            </div>
        )
    }

    return (
        <section className="py-8">
            {/* Search Section */}
            <div className="mb-8">
                <div className="relative max-w-md mx-auto">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder="Cari event..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 py-3 border-gray-300 focus:border-brown-500 focus:ring-brown-500"
                    />
                </div>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                    <Card
                        key={event.id}
                        className="group hover:shadow-lg transition-shadow duration-300 h-full cursor-pointer"
                        onClick={() => handleEventClick(event)}
                    >
                        <div className="relative h-48 overflow-hidden rounded-t-lg">
                            <Image
                                src={event.image || "/placeholder.svg"}
                                alt={`${event.title} | PMK ITERA`}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-3 left-3">
                                <span className="bg-brown-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                                    Event
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col h-full">
                            <CardContent className="p-4 flex-grow">
                                <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-brown-600 transition-colors">
                                    {event.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{event.description}</p>

                                <div className="space-y-2 text-sm text-gray-500">
                                    <div className="flex items-center">
                                        <Calendar className="h-4 w-4 mr-2" />
                                        {new Date(event.date).toLocaleDateString("id-ID", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="h-4 w-4 mr-2" />
                                        {event.time}
                                    </div>
                                    <div className="flex items-center">
                                        <MapPin className="h-4 w-4 mr-2" />
                                        {event.location}
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="p-4 pt-0">
                                <Button
                                    className="w-full bg-brown-600 hover:bg-brown-700 text-white"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleEventClick(event)
                                    }}
                                >
                                    Lihat Detail
                                </Button>
                            </CardFooter>
                        </div>
                    </Card>
                ))}
            </div>

            {/* No Results */}
            {filteredEvents.length === 0 && !loading && (
                <div className="text-center py-16">
                    <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada event ditemukan</h3>
                    <p className="text-gray-600">Tidak ada event yang sesuai dengan kriteria pencarian Anda.</p>
                </div>
            )}

            {/* Event Detail Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-serif text-brown-800 pr-8">
                            {selectedEvent?.title}
                        </DialogTitle>
                    </DialogHeader>

                    {selectedEvent && (
                        <div className="space-y-4">
                            <div className="relative h-64 w-full rounded-lg overflow-hidden">
                                <Image
                                    src={selectedEvent.image || "/placeholder.svg"}
                                    alt={`${selectedEvent.title} | PMK ITERA`}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center text-gray-600">
                                    <Calendar className="h-4 w-4 mr-2 text-brown-500" />
                                    <span>
                                        {new Date(selectedEvent.date).toLocaleDateString("id-ID", {
                                            weekday: "long",
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <Clock className="h-4 w-4 mr-2 text-brown-500" />
                                    <span>{selectedEvent.time}</span>
                                </div>
                                <div className="flex items-center text-gray-600 md:col-span-2">
                                    <MapPin className="h-4 w-4 mr-2 text-brown-500" />
                                    <span>{selectedEvent.location}</span>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold text-brown-800 mb-2">Deskripsi Event</h4>
                                <p className="text-gray-700 leading-relaxed">{selectedEvent.description}</p>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button
                                    className="flex-1 bg-brown-600 hover:bg-brown-700 text-white"
                                    onClick={() => {
                                        // Handle registration or more info
                                        console.log("Register for event:", selectedEvent.id)
                                    }}
                                >
                                    <Users className="h-4 w-4 mr-2" />
                                    Daftar Sekarang
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-brown-600 text-brown-600 hover:bg-brown-50"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Tutup
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    )
}
