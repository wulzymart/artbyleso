'use client'
import React, { useState } from 'react'

import { Artwork } from '@/payload-types'
import ImageGallery from './product_gallery'

import ActionButton from './action_buttons'
import { useSales } from '@/context/sales_checker'
import { getCurrentPrice } from '@/utilities/calc-price'
import Link from 'next/link'

const ArtworkProduct = ({ artwork }: { artwork: Artwork }) => {
  const { mainImage, additionalImages, inStock } = artwork
  const imgs = [mainImage, ...(additionalImages || [])].map((img) => {
    if (!img || !(typeof img === 'object')) throw new Error('Invalid image')
    return img
  })

  const [isPrintVersion, setIsPrintVersion] = useState(false)
  const { salesPercentage } = useSales()

  const { originalPrice, discountedPrice, discount } = getCurrentPrice(
    artwork,
    isPrintVersion,
    salesPercentage,
  )

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8">
      {/* Image Gallery */}
      <ImageGallery images={imgs} />

      {/* Product Details */}
      <div>
        <h1 className="text-3xl font-bold mb-4">{artwork.title}</h1>

        {artwork.collection && (
          <Link
            href={`/collections/${typeof artwork.collection === 'string' ? '' : artwork.collection.title}}`}
            className="text-gray-600 mb-4"
          >
            Collection: {typeof artwork.collection === 'string' ? '' : artwork.collection.title}
          </Link>
        )}

        {artwork.year && <p className="text-gray-600 mb-2">Year: {artwork.year}</p>}

        {artwork.medium && <p className="text-gray-600 mb-2">Medium: {artwork.medium}</p>}

        <p className="text-gray-700 mb-4">{artwork.description}</p>

        {/* Print Version Toggle */}
        {artwork.printVersion?.available && artwork.inStock && (
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="print-version"
              checked={isPrintVersion}
              onChange={() => setIsPrintVersion(!isPrintVersion)}
              className="mr-2 h-4 w-4 text-accent  border-gray-300 rounded"
            />
            <label htmlFor="print-version" className="text-gray-700">
              Get Print Version
            </label>
          </div>
        )}

        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {discountedPrice ? (
              <>
                <span className="text-2xl font-bold text-primary mr-4">
                  ₦{discountedPrice.toFixed(2)}
                </span>
                <span className="line-through text-gray-500 mr-2">₦{originalPrice.toFixed(2)}</span>
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
                  {discount}% OFF
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-primary">₦{originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>

        {artwork.dimensions && (
          <p className="text-gray-600 mb-2">
            Dimensions: {artwork.dimensions.height} x {artwork.dimensions.width}{' '}
            {artwork.dimensions.unit}
            {isPrintVersion && ' (Print Version)'}
          </p>
        )}

        <div className="flex space-x-4">
          <ActionButton isAvailable={inStock!} artwork={artwork} isPrintVersion={isPrintVersion} />
        </div>
      </div>
    </div>
  )
}

export default ArtworkProduct
