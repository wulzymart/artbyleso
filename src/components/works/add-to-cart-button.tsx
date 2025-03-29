'use client'
import { Button } from '../ui/button'
import React from 'react'
import { Artwork } from '@/payload-types'
import { useCartStore } from '@/context/CartProvider'

const AddToCartButton = ({
  className,
  artwork,
  isPrintVersion = false,
  text = 'Add to Cart',
}: {
  className: string
  artwork: Artwork
  isPrintVersion?: boolean
  text?: string
}) => {
  const { addItem } = useCartStore((state) => state)
  return (
    <Button className={className} onClick={() => addItem(artwork.id, artwork, isPrintVersion)}>
      {text}
    </Button>
  )
}

export default AddToCartButton
