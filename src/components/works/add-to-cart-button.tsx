'use client'
import { Button } from '../ui/button'
import React from 'react'
import { Artwork } from '@/payload-types'
import { useCartStore } from '@/context/CartProvider'

const AddToCartButton = ({
  className,
  artwork,
  quantity = 1,
  price,
}: {
  className: string
  artwork: Artwork
  quantity?: number
  price: number
}) => {
  const { addItem } = useCartStore((state) => state)
  return (
    <Button className={className} onClick={() => addItem(artwork.id, artwork, price, quantity)}>
      Add to Cart
    </Button>
  )
}

export default AddToCartButton
