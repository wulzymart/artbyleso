'use client'
import React from 'react'
import { Media } from './Media'
import { Button } from './ui/button'
import { Trash2Icon } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import Link from 'next/link'
import { useCartStore } from '@/context/CartProvider'
import { useRouter } from 'next/navigation'
import { SheetClose } from './ui/sheet'
import { useSales } from '@/context/sales_checker'
import { getCurrentPrice } from '@/utilities/calc-price'
export const Cart = () => {
  const { items, removeItem, getCount, getCartTotal } = useCartStore((state) => state)
  const { salesPercentage } = useSales()
  const count = getCount()
  const cartTotal = getCartTotal(salesPercentage)
  const router = useRouter()

  return (
    <div className="w-[80vw] mx-auto">
      {count ? (
        <div className="grid gap-6 max-h-96 overflow-auto">
          {items.map((item) => {
            const { originalPrice, discountedPrice } = getCurrentPrice(
              item.artwork,
              item.isPrintVersion,
              salesPercentage,
            )
            return (
              <Card key={item.id} className="pt-4">
                <CardContent>
                  <div className="flex items-center gap-20 mx-auto">
                    <div className="size-20 relative">
                      <Media resource={item.artwork.mainImage} fill />
                    </div>

                    <div className="flex-2 flex flex-col md:flex-row items-center max-sm:items-start md:gap-20">
                      <div className="flex-1">
                        <h5 className="text-lg font-semibold">{item.artwork.title}</h5>
                        {discountedPrice ? (
                          <>
                            <p className="line-through text-gray-400">₦{originalPrice}</p>
                            <p>{discountedPrice}</p>
                          </>
                        ) : (
                          <p>{originalPrice}</p>
                        )}
                      </div>
                      <div className="flex flex-1 items-center gap-2">
                        <p>{item.isPrintVersion ? 'Print' : 'Canvas'}</p>
                      </div>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeItem(item.id!)}
                      >
                        <Trash2Icon className="size-4 text-white" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
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
          <SheetClose asChild>
            <Button onClick={() => router.push('/checkout')}>Checkout</Button>
          </SheetClose>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
