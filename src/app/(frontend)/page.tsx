import React from 'react'
import { Metadata } from 'next'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import HeroParallax from '@/components/home-components/hero-parallax'
import AboutParallax from '@/components/home-components/about-parallax'
import FeaturesParallax from '@/components/home-components/features-parallax'
import Slider from '@/components/home-components/hero-slider/slider'

export const metadata: Metadata = {
  title: 'Leso Originals | Contemporary African Art',
  description:
    'Discover vibrant contemporary artworks by Oluwatosin Ayeleso inspired by African culture and everyday life. Browse our collection of unique paintings and mixed media art.',
  openGraph: mergeOpenGraph({
    title: 'Leso Originals | Contemporary African Art',
    description:
      'Discover vibrant contemporary artworks inspired by African culture and everyday life.',
    images: [
      {
        url: '/hero1.jpg',
        width: 1200,
        height: 630,
        alt: 'Leso Originals - Contemporary African Art',
      },
    ],
  }),
}

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <Slider />
      <AboutParallax />
      <FeaturesParallax />
    </main>
  )
}
