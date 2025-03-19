'use-client'
'use client'

import { Media as MediaComponent } from '@/components/Media'
import { Media } from '@/payload-types'
import React, { useState } from 'react'

interface ImageGalleryProps {
  images: Media[]
  title: string
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, title }) => {
  const [currentImage, setCurrentImage] = useState<number>(0)

  const nextImage = (): void => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length)
  }

  const prevImage = (): void => {
    setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length)
  }

  return (
    <div>
      <div className="relative w-full h-[600px] object-cover rounded-lg shadow-md">
        <MediaComponent resource={images[currentImage]} fill />

        {/* Navigation arrows */}
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 text-gray-800"
          aria-label="Previous image"
        >
          ←
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 text-gray-800"
          aria-label="Next image"
        >
          →
        </button>
      </div>

      {/* Thumbnail Gallery */}
      <div className="flex mt-4 gap-2 overflow-x-auto">
        {images.map((img, index) => (
          <img
            key={index}
            src={img.thumbnailURL!}
            alt={`Thumbnail ${index + 1}`}
            className={`w-20 h-20 object-cover rounded cursor-pointer ${index === currentImage ? 'ring-2 ring-indigo-500' : ''}`}
            onClick={() => setCurrentImage(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageGallery
