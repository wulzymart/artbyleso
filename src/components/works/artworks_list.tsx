import { Artwork } from '@/payload-types'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { Media } from '../Media'
import AddToCartButton from './add-to-cart-button'

export default function Artworks({ artworks }: { artworks: Artwork[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {artworks.map((artwork) => {
        const { title, images, quantity, price } = artwork
        const image = images[0]?.image!
        if (typeof image === 'string') throw new Error('Image is not available')
        return (
          <div
            key={artwork.id}
            className="bg-black/20 p-6 rounded-lg shadow-lg hover:animate-pulse"
          >
            <Link href={`/artworks/${artwork.slug}`}>
              <div className="relative w-full h-98 mb-4 hover:scale-110 transition-all duration-300">
                <Media resource={image} fill />
              </div>
              <h2 className="text-2xl font-semibold mb-2">{title}</h2>
              <p className="text-lg font-medium">Price: ₦{price}</p>
              <p className={`text-sm ${quantity ? 'text-green-500' : 'text-red-500'}`}>
                {quantity ? 'Available' : 'Sold Out'}
              </p>
            </Link>
            {quantity && (
              <AddToCartButton
                className="mt-4 bg-amber-500 hover:bg-amber-600"
                artwork={artwork}
                price={price!}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
