'use client'
import React, { useState } from 'react'
import QuantitySelector from './quantity_clicks'
import ActionButton from './action_buttons'
import { Artwork } from '@/payload-types'

export default function ActionComponent({ artwork }: { artwork: Artwork }) {
  const isAvailable = Boolean(artwork.quantity)
  const [selectedQuantity, setSelectedQuantity] = useState(1)

  return (
    <>
      {isAvailable && (
        <QuantitySelector
          maxQuantity={artwork.quantity || 0}
          onQuantityChange={(q: number) => setSelectedQuantity(q)}
        />
      )}
      {/* Add to Cart / Request Copy Button */}
      <ActionButton isAvailable={isAvailable} quantity={selectedQuantity} artwork={artwork} />
    </>
  )
}
