'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ParallaxSection } from '../ui/parallax-section'

interface FeatureCardProps {
  title: string
  bgUrl: string
  link: string
  index: number
}

const FeatureCard = ({ title, bgUrl, link, index }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: '-100px' }}
      className="relative group overflow-hidden rounded-xl h-[600px] w-sm shadow-xl"
    >
      <div className="absolute inset-0 w-full h-full bg-black/20 group-hover:bg-black/40 transition-all duration-500 z-10" />

      <motion.div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.6 }}
        style={{ backgroundImage: `url(${bgUrl})` }}
      />

      <div className="absolute inset-0 flex items-center justify-center z-20">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">{title}</h3>
          <Link
            href={link}
            className="inline-block px-6 py-3 bg-amber-600/80 hover:bg-amber-600 text-white rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Explore
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function FeaturesParallax() {
  const features = [
    {
      title: 'Become a Collector',
      bgUrl: '/art1.jpg',
      link: '/collections',
    },
    {
      title: 'Buy Artworks',
      bgUrl: '/art2.jpg',
      link: '/artworks',
    },
    {
      title: 'View Portfolio',
      bgUrl: '/art3.png',
      link: '/portfolio',
    },
    {
      title: 'Events',
      bgUrl: '/event.jpg',
      link: '/events',
    },
    {
      title: 'Partner with me',
      bgUrl: '/leso1.jpg',
      link: '/contact',
    },
  ]

  return (
    <ParallaxSection bgColor="#f5f5f5" className="py-20" contentClassName="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          <span className="text-amber-600">Explore</span> My World
        </h2>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Discover the various aspects of my artistic journey and find ways to engage with my work
        </p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            index={index}
            title={feature.title}
            bgUrl={feature.bgUrl}
            link={feature.link}
          />
        ))}
      </div>
    </ParallaxSection>
  )
}
