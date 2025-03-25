'use client'
import React, { startTransition } from 'react'
import { Media } from './Media'
import { Button } from './ui/button'
import { ArrowLeft, ArrowRight, Delete, DeleteIcon, Trash2Icon } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import Link from 'next/link'
import { useCartStore } from '@/context/CartProvider'
import { useAuth } from '@/context/authContext'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { addOrder } from '@/context/helper/actions/order'
import { CheckoutModal } from './checkout-modal'
export const Cart = () => {
  const {
    items,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    getCount,
    clearCart,
    getCartTotal,
  } = useCartStore((state) => state)
  const count = getCount()
  const cartTotal = getCartTotal()
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const checkOut = () => {
    if (isAuthenticated) {
      // Implement the checkout logic here
      startTransition(async () => {
        const order = await addOrder(items)
        if (!order) {
          toast('Something went wrong', {
            description: 'Something went wrong',
            className: 'bg-red-500',
            descriptionClassName: 'text-white',
          })
          return
        }
        toast.success('Order created, proceed to payment')
        clearCart()
        router.push(`/orders/${order.id}`)
      })
    } else {
      toast('Please login to checkout', {
        description: 'Please login to checkout',
        className: 'bg-red-500',
        descriptionClassName: 'text-white',
      })
      router.push('/login')
    }
  }
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
          <CheckoutModal />
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
