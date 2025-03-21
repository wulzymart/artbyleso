'use client'

import { Artwork } from '@/payload-types'
import React from 'react'
import { Media as MediaComponent } from '../Media'
import { Button } from '../ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'
import AddToCartButton from './add-to-cart-button'

const ArtworkCardParallax = ({ artwork }: { artwork: Artwork }) => {
  const { title, images, quantity, price } = artwork
  const image = images[0]?.image

  if (typeof image === 'string') throw new Error('Image is not available')

  return (
    <motion.div
      className="  backdrop-blur-sm rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <Link href={`/artworks/${artwork.slug}`} className="block">
        <div className="relative w-full h-[550px] overflow-hidden group">
          <MediaComponent
            resource={image}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>

          {/* Price tag */}
          <motion.div
            className="absolute top-4 right-4 bg-amber-600/50 text-white px-3 py-1 rounded-full font-semibold z-10"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true }}
          >
            ₦{price}
          </motion.div>

          {/* Availability badge */}
          <div
            className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium z-10 ${quantity ? 'bg-yellow-100/40 text-white' : 'bg-red-500/40 text-white'}`}
          >
            {quantity ? 'Available' : 'Sold Out'}
          </div>
        </div>

        <div className="p-6 ">
          <motion.h2
            className="text-xl font-semibold text-gray-600  text-center  mb-2 line-clamp-1"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h2>

          <motion.div
            className="flex justify-center items-center mt-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-gray-400 text-sm">
              {quantity ? `${quantity} in stock` : 'Out of stock'}
            </span>
          </motion.div>
        </div>
      </Link>

      {quantity ? (
        <div className="px-6 pb-6">
          <AddToCartButton
            className="w-full bg-amber-600 hover:bg-amber-700 text-white transition-all duration-300 transform hover:scale-105"
            artwork={artwork}
            price={price!}
          />
        </div>
      ) : null}
    </motion.div>
  )
}

export default ArtworkCardParallax
