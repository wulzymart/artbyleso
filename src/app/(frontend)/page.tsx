import React from 'react'
import HeroParallax from '@/components/home-components/hero-parallax'
import AboutParallax from '@/components/home-components/about-parallax'
import FeaturesParallax from '@/components/home-components/features-parallax'
import Slider from '@/components/home-components/hero-slider/slider'

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <Slider />
      <AboutParallax />
      <FeaturesParallax />
    </main>
  )
}
