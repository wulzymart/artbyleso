import AboutFeature from '@/components/home-components/about-feature'
import { Features } from '@/components/home-components/features'
import Slider from '@/components/home-components/hero-slider/slider'
import Image from 'next/image'

export default function HomePage() {
  return (
    <main className="">
      <Slider />
      <AboutFeature />
      <Features />
    </main>
  )
}
