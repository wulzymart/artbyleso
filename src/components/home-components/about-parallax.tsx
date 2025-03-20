'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '../ui/button'
import { ParallaxSection } from '../ui/parallax-section'

export default function AboutParallax() {
  return (
    <ParallaxSection bgColor="#2a2a2a" className="py-24" contentClassName="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            <span className="text-amber-500">Oluwatosin Ayeleso</span>
            <br />
            <span className="text-3xl md:text-4xl font-light">Contemporary African Artist</span>
          </h2>

          <p className="text-xl text-gray-200 leading-relaxed">
            I am a multilateral contemporary artist from Nigeria, known for my vibrant & bold
            styles.
          </p>

          <p className="text-xl text-gray-200 leading-relaxed">
            My art is inspired by the economy effect and influence on people, my everyday life &
            African culture.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white transition-all duration-300 mt-4"
              >
                Meet Leso
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative h-[500px] md:h-[600px] w-full"
        >
          <div className="absolute inset-0 bg-amber-500 rounded-lg transform rotate-3"></div>
          <div className="absolute inset-0 transform -translate-x-4 -translate-y-4">
            <div className="relative h-full w-full overflow-hidden rounded-lg">
              <Image
                src="/leso.jpg"
                alt="Oluwatosin Ayeleso - Artist"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </ParallaxSection>
  )
}
