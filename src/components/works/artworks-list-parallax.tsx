'use client'

import { Artwork } from '@/payload-types'
import React from 'react'
import ArtworkCardParallax from './artwork-card-parallax'
import { motion } from 'framer-motion'

export default function ArtworksListParallax({ artworks }: { artworks: Artwork[] }) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {artworks.map((artwork, index) => (
        <motion.div
          key={artwork.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true, margin: '-50px' }}
        >
          <ArtworkCardParallax artwork={artwork} />
        </motion.div>
      ))}
    </motion.div>
  )
}
