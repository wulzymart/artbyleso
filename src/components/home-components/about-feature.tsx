import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

const AboutFeature = () => {
  return (
    <section className="bg-radial from-gray-500 to-amber-700 py-20">
      <div className="container mx-auto md:flex md:justify-center md:space-x-8 space-y-8">
        <div className="md:w-2/3 flex items-center justify-center">
          <div className="space-y-8 text-white/90 w-[90%] mx-auto">
            <p className="text-2xl leading-relaxed">
              I am Oluwatosin Ayeleso, a multilateral contemporary artist from Nigeria.
            </p>
            <p className="text-2xl leading-relaxed">
              I am known for my vibrant & bold styles. My art is inspired by the economy effect and
              influence on people, my everyday life & African culture.
            </p>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="bg-gray-800 border-amber-500/50 border-2"
              >
                Meet Leso
              </Button>
            </Link>
          </div>
        </div>
        <div className="md:w-1/3 h-[650px] sm:h-[800px] md:h-[500px] lg:h-[650px] xl:h-[700px] p-10 rounded-3xl relative hover:scale-110 md:rotate-6 transition-all duration-300">
          <Image
            fill
            alt="leso arts Tosin Leso"
            className="rounded-3xl shadow-lg border-4 border-solid border-amber-500/50"
            src="/leso.jpg"
          />
        </div>
      </div>
    </section>
  )
}

export default AboutFeature
