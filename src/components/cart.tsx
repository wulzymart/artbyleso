'use client'
import React from 'react'
import { Media } from './Media'
import { Button } from './ui/button'
import { ArrowLeft, ArrowRight, Delete, DeleteIcon, Trash2Icon } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import Link from 'next/link'
import { useCartStore } from '@/context/CartProvider'

export const Cart = () => {
  const {
    items,
    addItem,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    getCount,
    clearCart,
    getCartTotal,
  } = useCartStore((state) => state)
  const count = getCount()
  const cartTotal = getCartTotal()
  return (
    <div className="w-[80vw] mx-auto">
      {count ? (
        <div className="grid gap-6 max-h-96 overflow-auto">
          {items.map((item) => (
            <Card key={item.artwork.id} className="pt-4">
              <CardContent>
                <div className="flex items-center gap-20 mx-auto">
                  <div className="size-20 relative">
                    <Media resource={item.artwork.images[0]?.image!} fill />
                  </div>

                  <div className="flex-1 flex flex-col md:flex-row items-center max-sm:items-start md:gap-20">
                    <div className="flex-1">
                      <h5 className="text-lg font-semibold">{item.artwork.title}</h5>
                      <p>₦{item.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button onClick={() => decreaseQuantity(item.id)} variant="ghost" size="icon">
                        <ArrowLeft className="size-4" />
                      </Button>
                      <p>{item.quantity}</p>
                      <Button onClick={() => increaseQuantity(item.id)} variant="ghost" size="icon">
                        <ArrowRight className="size-4" />
                      </Button>
                    </div>
                    <Button variant="destructive" size="icon" onClick={() => removeItem(item.id!)}>
                      <Trash2Icon className="size-4 text-white" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2 h-60 items-center justify-center">
          <p className="text-lg font-semibold">No item in cart</p>
          <Link href="/artworks">Get an artwork</Link>
          <Link href="/collection">Browse collections</Link>
        </div>
      )}
      {count ? (
        <div className="flex flex-col items-end mt-8 gap-6">
          <p className="text-lg font-semibold">Total: ₦{cartTotal}</p>
          <Button
            className=" bg-amber-500 hover:bg-amber-600 text-white cursor-pointer"
            onClick={() => clearCart()}
          >
            Checkout
          </Button>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
