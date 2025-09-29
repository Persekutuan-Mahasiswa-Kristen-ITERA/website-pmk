'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import Autoplay from "embla-carousel-autoplay"

interface NewsItem {
  image: string
  url: string | null
}

interface NewsCarouselProps {
  news: NewsItem[]
  className?: string
}

export function NewsCarousel({ news, className }: NewsCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const scrollTo = (index: number) => {
    api?.scrollTo(index)
  }

  return (
    <div className={cn('w-full', className)}>
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
        className="w-full"
      >
        <CarouselContent>
          {news.map((item, index) => (
            <CarouselItem key={index}>
              {item.url ? (
                <a href={item.url}>
                  <div className="relative w-full h-64 md:h-80 lg:h-96">
                    <Image
                      src={item.image}
                      alt="News image"
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </a>
              ) : (
                <div className="relative w-full h-64 md:h-80 lg:h-96">
                  <Image
                    src={item.image}
                    alt="News image"
                    fill
                    className="object-cover rounded-lg shadow"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-4 space-x-2">
        {news.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-200',
              current === index
                ? 'bg-primary w-6'
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Dots Counter */}
      <div className="flex justify-center mt-2 space-x-2    ">
        {news.map((_, index) => (
          <div
            key={index}
            className={cn(
              'w-1.5 h-1.5 rounded-full transition-all duration-200',
              current === index
                ? 'bg-white'
                : 'bg-white/50'
            )}
          />
        ))}
      </div>
    </div>
  )
}
