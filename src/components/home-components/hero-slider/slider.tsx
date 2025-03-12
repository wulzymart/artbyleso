'use client'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { sliderData } from './slider-data'
import { Slide } from './slide'
const Slider = () => {
  return (
    <div className="">
      <Carousel
        className="relativr"
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent>
          {sliderData.map((item, index) => (
            <CarouselItem key={index}>
              <Slide {...item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="p-6 bg-accent-foreground/50 text-white border-none absolute left-5" />
        <CarouselNext className="p-6 bg-accent-foreground/50 text-white border-none absolute right-5" />
      </Carousel>
    </div>
  )
}

export default Slider
