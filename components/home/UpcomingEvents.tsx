
import React from 'react';
import { SectionHeader } from '@/components/ui/section-header';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';

// Sample events data
const EVENTS = [
    {
        id: 1,
        title: "Ibadah Persekutuan Mingguan",
        date: "7 Juli 2023",
        time: "18:30 - 20:30",
        location: "RIMA ITERA",
        image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&q=80",
        description: 'Ibadah persekutuan rutin minggu ini dengan tema "Kasih yang Mempersatukan".',
    },
    {
        id: 2,
        title: "Kelompok Studi Alkitab",
        date: "10 Juli 2023",
        time: "19:00 - 21:00",
        location: "Ruang Diskusi Perpustakaan",
        image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&q=80",
        description: "Pendalaman Alkitab bersama mengenai Kitab Kisah Para Rasul.",
    },
    {
        id: 3,
        title: "Retret Mahasiswa Baru",
        date: "15-17 Juli 2023",
        time: "Seharian",
        location: "Villa Asri, Kaliurang",
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=800&q=80",
        description: "Kegiatan pengenalan dan pembekalan rohani untuk mahasiswa Kristen baru.",
    },
]

export const UpcomingEvents = () => {
  return (
      <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
              <SectionHeader
                  title="Kegiatan Mendatang"
                  subtitle="Bergabunglah dalam kegiatan PMK ITERA untuk bertumbuh bersama dalam iman"
                  centered
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {EVENTS.map((event) => (
                      <Card
                          key={event.id}
                          className="overflow-hidden transition-all duration-300 hover:shadow-lg border-brown-100"
                      >
                          <div className="h-48 overflow-hidden">
                              <Image
                                  src={event.image}
                                  alt={event.title}
                                  className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                                  width={1200}
                                  height={700}
                              />
                          </div>
                          <CardContent className="pt-6">
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
                  <Button variant="ghost" className="text-brown-700 hover:text-brown-900">
                      Lihat Semua Kegiatan
                  </Button>
              </div>
          </div>
      </section>
  )
};
