import React, { useEffect, useState } from "react"
import { SectionHeader } from "@/components/ui/section-header"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"
import test from "node:test"
import { Testimonial } from "@/types/testimonial"

export const Testimonials = () => {
    return (
        <section className="py-16 bg-brown-50">
            <div className="container mx-auto px-4">
                <SectionHeader
                    title="Testimoni Anggota"
                    subtitle="Mendengar pengalaman dari anggota PMK ITERA"
                    centered
                />

                <div className="max-w-7xl mx-auto">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent>
                            {/* {testimonials.slice(0, 10).map((testimonial) => (
                                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                                    <Card className="border-brown-100 h-full flex flex-col bg-white">
                                        <CardContent className="pt-6 flex flex-col h-full">
                                            <div className="text-brown-700 mb-4 flex-grow">
                                                <p className="mt-2">&quot;{testimonial.quote}&quot;</p>
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
                            ))} */}
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
}
