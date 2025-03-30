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
import HeroParallax from '../hero-parallax'
const Slider = () => {
  return (
    <div className="bg-radial from-gray-900 to-amber-800">
      <Carousel
        className="relative"
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent>
          {sliderData.map((item, index) => (
            <CarouselItem key={index}>
              <HeroParallax {...item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="p-6 bg-amber-500/50 text-white border-none absolute left-5 hover:bg-amber-500/70 transition-colors" />
        <CarouselNext className="p-6 bg-amber-500/50 text-white border-none absolute right-5 hover:bg-amber-500/70 transition-colors" />
      </Carousel>
    </div>
  )
}

export default Slider
