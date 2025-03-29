'use client'

import { Collection, Media } from '@/payload-types'
import { cn } from '@/utilities/ui'
import React from 'react'
import { Media as MediaComponent } from '../Media'
import { Button } from '../ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'

const CollectionImageParallax = ({ bgImage }: { bgImage: Media }) => {
  return (
    <div className="max-w-sm w-full group/card overflow-hidden">
      <motion.div
        className={cn(
          'h-[500px] overflow-hidden relative card rounded-lg shadow-xl max-w-sm mx-auto flex flex-col justify-between p-4',
          'bg-cover transform transition-all duration-500',
        )}
        whileHover={{ scale: 1.03 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
      >
        <MediaComponent resource={bgImage} fill className="transition-transform duration-700 " />
        <div className="absolute w-full h-full top-0 left-0 transition duration-500 bg-black opacity-40 group-hover/card:opacity-10 z-10"></div>

        {/* Content that appears on hover */}
        <motion.div
          className="absolute bottom-0 left-0 w-full p-6 z-20 transform transition-all duration-500"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg transform transition-all duration-500 group-hover/card:translate-y-0">
            <div className="overflow-hidden">
              <motion.div initial={{ y: 10 }} whileHover={{ y: 0 }} transition={{ duration: 0.3 }}>
                <p className="text-white/80 text-sm mb-2 line-clamp-2 group-hover/card:line-clamp-none transition-all duration-300">
                  Explore this unique collection of artworks
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

const CollectionCardParallax = ({ collection }: { collection: Collection }) => {
  const { featuredImage, description, title } = collection
  if (typeof featuredImage === 'string') throw new Error('Invalid image type')

  return (
    <motion.div
      className="w-full sm:w-[350px] flex flex-col items-center justify-center gap-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <CollectionImageParallax bgImage={featuredImage} />
      <motion.div
        className="text-center w-full"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h4 className="text-2xl font-bold text-gray-600 mb-2">{title}</h4>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {description ? description : 'Explore this unique collection of artworks'}
        </p>
        <Link href={`/collections/${collection.slug}`}>
          <Button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-md transition-all duration-300 transform hover:scale-105">
            Explore Collection
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  )
}

export default CollectionCardParallax
