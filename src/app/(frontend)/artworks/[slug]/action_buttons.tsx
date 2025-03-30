'use client'

import { Button } from '@/components/ui/button'
import AddToCartButton from '@/components/works/add-to-cart-button'
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
  // Price calculation is handled by the cart system

  return (
    <div className="mt-8">
      {isAvailable ? (
        <AddToCartButton
          className="mt-4 bg-amber-500 hover:bg-amber-600"
          artwork={artwork}
          isPrintVersion={isPrintVersion}
        />
      ) : artwork.printVersion?.available ? (
        <AddToCartButton
          className="mt-4 bg-amber-500 hover:bg-amber-600"
          artwork={artwork}
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
