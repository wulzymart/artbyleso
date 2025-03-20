'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '../ui/button'
import { ParallaxSection } from '../ui/parallax-section'

interface HeroParallaxProps {
  title: string
  subtitle: string
  buttonText: string
  buttonLink: string
  bgImage: string
}

export default function HeroParallax({
  title = 'Discover Unique African Art',
  subtitle = 'Vibrant contemporary artworks inspired by African culture and everyday life',
  buttonText = 'Explore Collection',
  buttonLink = '/collections',
  bgImage = '/hero1.jpg',
}: Partial<HeroParallaxProps>) {
  return (
    <ParallaxSection
      bgImage={bgImage}
      speed={0.3}
      overlay={true}
      overlayColor="#000"
      overlayOpacity={0.6}
      className="min-h-screen flex items-center"
      contentClassName="container mx-auto px-4 py-20 md:py-32"
    >
      <div className="max-w-4xl">
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {title}
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link href={buttonLink}>
            <Button
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white border-none px-8 py-6 text-lg"
            >
              {buttonText}
            </Button>
          </Link>
        </motion.div>
      </div>
    </ParallaxSection>
  )
}
