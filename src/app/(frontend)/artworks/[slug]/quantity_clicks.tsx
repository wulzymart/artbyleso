// QuantitySelector.tsx - Client Component
'use client'

import React, { useState } from 'react'

interface QuantitySelectorProps {
  maxQuantity: number
  onQuantityChange: (quantity: number) => void
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ maxQuantity, onQuantityChange }) => {
  const [quantity, setQuantity] = useState<number>(1)

  const handleIncreaseQuantity = (): void => {
    if (quantity < maxQuantity) {
      const newQuantity = quantity + 1
      setQuantity(newQuantity)
      onQuantityChange(newQuantity)
    }
  }

  const handleDecreaseQuantity = (): void => {
    if (quantity > 1) {
      const newQuantity = quantity - 1
      setQuantity(newQuantity)
      onQuantityChange(newQuantity)
    }
  }

  return (
    <div className="mt-6">
      <h2 className="text-lg font-medium text-gray-900">Quantity</h2>
      <div className="flex items-center mt-2">
        <button
          onClick={handleDecreaseQuantity}
          className="border border-gray-300 rounded-l px-3 py-1 text-gray-600 hover:bg-gray-100"
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
        >
          -
        </button>
        <span className="border-t border-b border-gray-300 px-4 py-1 text-center min-w-[40px]">
          {quantity}
        </span>
        <button
          onClick={handleIncreaseQuantity}
          className="border border-gray-300 rounded-r px-3 py-1 text-gray-600 hover:bg-gray-100"
          disabled={quantity >= maxQuantity}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </div>
  )
}

export default QuantitySelector
