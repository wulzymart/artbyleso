'use client'

import { Media as MediaComponent } from '@/components/Media'
import { Media } from '@/payload-types'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface ImageGalleryProps {
  images: Media[]
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState<number>(0)

  const nextImage = (): void => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length)
  }

  const prevImage = (): void => {
    setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length)
  }

  return (
    <div>
      <div className="relative w-full h-[600px] rounded-lg shadow-xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MediaComponent resource={images[currentImage]} fill className="object-contain" />
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <motion.button
          onClick={prevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 text-gray-800"
          aria-label="Previous image"
        >
          ←
        </motion.button>
        <motion.button
          onClick={nextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 text-gray-800"
          aria-label="Next image"
        >
          →
        </motion.button>
      </div>

      {/* Thumbnail Gallery */}
      <div className="flex mt-4 gap-2 overflow-x-auto">
        {images.map((img, index) => (
          <div
            key={index}
            className={`w-20 h-20 relative rounded cursor-pointer ${index === currentImage ? 'ring-2 ring-indigo-500' : ''}`}
          >
            <Image
              key={index}
              src={img.thumbnailURL!}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => setCurrentImage(index)}
              fill
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageGallery
