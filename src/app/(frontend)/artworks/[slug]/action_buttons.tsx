'use client'

import { Button } from '@/components/ui/button'
import AddToCartButton from '@/components/works/add-to-cart-button'
import { useCartStore } from '@/context/CartProvider'
import { Artwork } from '@/payload-types'
import React from 'react'

interface AddToCartButtonProps {
  isAvailable: boolean
  artwork: Artwork
  isPrintVersion?: boolean
}

const ActionButton: React.FC<AddToCartButtonProps> = ({
  isAvailable,
  artwork,
  isPrintVersion = false,
}) => {
  // Calculate the correct price based on whether print version is selected
  const getPrice = () => {
    if (isPrintVersion && artwork.printVersion) {
      return artwork.printVersion.discountedPrice || artwork.printVersion.price || 0
    }
    return (artwork.discountedPrice || artwork.originalPrice)!
  }

  return (
    <div className="mt-8">
      {isAvailable ? (
        <AddToCartButton
          className="mt-4 bg-amber-500 hover:bg-amber-600"
          artwork={artwork}
          price={getPrice()}
          isPrintVersion={isPrintVersion}
        />
      ) : artwork.printVersion?.available ? (
        <AddToCartButton
          className="mt-4 bg-amber-500 hover:bg-amber-600"
          artwork={artwork}
          price={getPrice()}
          isPrintVersion={true}
          text="Get Print Version"
        />
      ) : (
        <Button variant="outline" disabled>
          Sold Out
        </Button>
      )}
    </div>
  )
}

export default ActionButton
