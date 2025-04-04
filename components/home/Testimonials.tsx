
import React from 'react';
import { SectionHeader } from '@/components/ui/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import Image from 'next/image';

// Sample testimonials data
const TESTIMONIALS = [
  {
    id: 1,
    name: 'David Situmorang',
    role: 'Mahasiswa Teknik Sipil',
    quote: 'PMK ITERA menjadi tempat saya bertumbuh dalam iman. Persekutuan yang hangat membuat saya merasa seperti keluarga meski jauh dari rumah.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80'
  },
  {
    id: 2,
    name: 'Hana Wijaya',
    role: 'Mahasiswa Arsitektur',
    quote: 'Melalui PMK, saya belajar untuk tidak hanya mengejar prestasi akademik tetapi juga bertumbuh secara rohani. Para pembina dan teman-teman sangat mendukung.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80'
  },
  {
    id: 3,
    name: 'Jonathan Purba',
    role: 'Mahasiswa Teknik Informatika',
    quote: 'Saya bersyukur dapat bergabung dengan PMK ITERA. Di sini saya menemukan komunitas yang saling menguatkan dan mendukung dalam perjalanan iman.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80'
  },
  {
    id: 4,
    name: 'Grace Tambunan',
    role: 'Mahasiswa Teknik Lingkungan',
    quote: 'PMK ITERA memberikan saya kesempatan untuk melayani dan bertumbuh dalam kepemimpinan. Pengalaman yang tak terlupakan selama kuliah di ITERA.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80'
  }
];

export const Testimonials = () => {
  return (
      <section className="py-16 bg-brown-50">
          <div className="container mx-auto px-4">
              <SectionHeader
                  title="Testimoni Anggota"
                  subtitle="Mendengar pengalaman dari anggota PMK ITERA"
                  centered
              />

              <div className="max-w-4xl mx-auto">
                  <Carousel
                      opts={{
                          align: "start",
                          loop: true,
                      }}
                      className="w-full"
                  >
                      <CarouselContent>
                          {TESTIMONIALS.map((testimonial) => (
                              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                                  <Card className="border-brown-100 h-full flex flex-col bg-white">
                                      <CardContent className="pt-6 flex flex-col h-full">
                                          <div className="text-brown-700 mb-4 flex-grow">
                                              <div className="text-4xl text-brown-300 font-serif">&quot;</div>
                                              <p className="mt-2">{testimonial.quote}</p>
                                          </div>
                                          <div className="flex items-center mt-4">
                                              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                                                  <Image
                                                      src={testimonial.image}
                                                      alt={testimonial.name}
                                                      className="w-full h-full object-cover"
                                                        width={500}
                                                        height={500}
                                                  />
                                              </div>
                                              <div>
                                                  <h4 className="font-medium text-brown-800">{testimonial.name}</h4>
                                                  <p className="text-sm text-brown-500">{testimonial.role}</p>
                                              </div>
                                          </div>
                                      </CardContent>
                                  </Card>
                              </CarouselItem>
                          ))}
                      </CarouselContent>
                      <div className="flex justify-center mt-8 gap-2">
                          <CarouselPrevious className="static translate-y-0 bg-white border-brown-200 text-brown-700 hover:bg-brown-50 hover:text-brown-900" />
                          <CarouselNext className="static translate-y-0 bg-white border-brown-200 text-brown-700 hover:bg-brown-50 hover:text-brown-900" />
                      </div>
                  </Carousel>
              </div>
          </div>
      </section>
  )
};
