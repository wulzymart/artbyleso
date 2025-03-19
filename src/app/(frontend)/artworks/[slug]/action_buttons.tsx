'use client'

import AddToCartButton from '@/components/works/add-to-cart-button'
import { useCartStore } from '@/context/CartProvider'
import { Artwork } from '@/payload-types'
import React from 'react'

interface AddToCartButtonProps {
  isAvailable: boolean
  quantity: number
  artwork: Artwork
}

const ActionButton: React.FC<AddToCartButtonProps> = ({ isAvailable, quantity, artwork }) => {
  const { addItem } = useCartStore((state) => state)
  const handleAddToCart = (): void => {
    console.log(`Added ${quantity} item(s) to cart`)
    // Add cart functionality here
  }

  const handleRequestCopy = (): void => {
    console.log('Requested a copy')
    // Add request functionality here
  }

  return (
    <div className="mt-8">
      {isAvailable ? (
        <AddToCartButton
          className="mt-4 bg-amber-500 hover:bg-amber-600"
          artwork={artwork}
          quantity={quantity}
          price={artwork.price!}
        />
      ) : (
        <button
          onClick={handleRequestCopy}
          className="bg-amber-400 text-white py-3 px-6 rounded-md font-medium hover:bg-amber-900 w-full"
        >
          Request a Copy
        </button>
      )}
    </div>
  )
}

export default ActionButton
