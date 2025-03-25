'use client'

import React, { startTransition, useState } from 'react'
import { Media } from './Media'
import { Button } from './ui/button'
import { ArrowLeft, ArrowRight, CreditCard, Trash2Icon } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import Link from 'next/link'
import { useCartStore } from '@/context/CartProvider'
import { useAuth } from '@/context/authContext'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { addOrder } from '@/context/helper/actions/order'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FlutterWaveButton, closePaymentModal, useFlutterwave } from 'flutterwave-react-v3'
import { FlutterwaveConfig, InitializeFlutterwavePayment } from 'flutterwave-react-v3/dist/types'

export const CheckoutModal = () => {
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
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  if (!isAuthenticated || !user) {
    return null
  }
  console.log(process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY!)

  const config: FlutterwaveConfig = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY!,
    tx_ref: Date.now().toLocaleString(),
    currency: 'NGN',
    amount: cartTotal,
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: user.email,
      phone_number: user.phoneNumber!,
      name: `${user.firstName} ${user.lastName}`,
    },
    customizations: {
      title: 'Leso Originals',
      description: 'Payment for artworks in cart',
      logo: '/logo.png',
    },
  }

  const fwConfig: FlutterwaveConfig & InitializeFlutterwavePayment & { text: string } = {
    ...config,
    text: 'Pay with Flutterwave!',
    callback: (response) => {
      console.log(response)
      closePaymentModal() // this will close the modal programmatically
    },
    onClose: () => {},
  }
  const handleFlutterPayment = useFlutterwave(config)
  const checkOut = () => {
    if (isAuthenticated) {
      setIsProcessing(true)
      handleFlutterPayment({
        callback: (response) => {
          console.log(response)
          closePaymentModal() // this will close the modal programmatically
        },
        onClose: () => {},
      })
      // Implement the checkout logic here
      startTransition(async () => {
        // const order = await addOrder(items)
        // if (!order) {
        //   toast('Something went wrong', {
        //     description: 'Something went wrong',
        //     className: 'bg-red-500',
        //     descriptionClassName: 'text-white',
        //   })
        //   setIsProcessing(false)
        //   return
        // }
        // toast.success('Order created, proceed to payment')
        // clearCart()
        // setIsOpen(false)
        // router.push(`/orders/${order.id}`)
      })
    } else {
      toast('Please login to checkout', {
        description: 'Please login to checkout',
        className: 'bg-red-500',
        descriptionClassName: 'text-white',
      })
      router.push('/account/login')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-amber-500 hover:bg-amber-600 text-white cursor-pointer"
          onClick={() => {
            if (!isAuthenticated) {
              router.push('/account/login')
              return
            }
            setIsOpen(true)
          }}
        >
          {isAuthenticated ? 'Checkout' : 'Sign in to Checkout'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
          <DialogDescription>Review your cart before proceeding to payment.</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <h3 className="text-lg font-semibold mb-4">Cart Summary</h3>
          {count ? (
            <div className="grid gap-4 max-h-[300px] overflow-auto">
              {items.map((item) => (
                <Card key={item.artwork.id} className="pt-2">
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="size-16 relative">
                        <Media resource={item.artwork.images[0]?.image!} fill />
                      </div>

                      <div className="flex-1 flex flex-col md:flex-row items-center max-sm:items-start md:gap-4">
                        <div className="flex-1">
                          <h5 className="text-md font-semibold">{item.artwork.title}</h5>
                          <p className="text-sm">₦{item.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() => decreaseQuantity(item.id)}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <ArrowLeft className="size-3" />
                          </Button>
                          <p className="text-sm">{item.quantity}</p>
                          <Button
                            onClick={() => increaseQuantity(item.id)}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <ArrowRight className="size-3" />
                          </Button>
                        </div>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => removeItem(item.id!)}
                        >
                          <Trash2Icon className="size-3 text-white" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-2 h-40 items-center justify-center">
              <p className="text-lg font-semibold">No item in cart</p>
              <Link href="/artworks" onClick={() => setIsOpen(false)}>
                Get an artwork
              </Link>
              <Link href="/collection" onClick={() => setIsOpen(false)}>
                Browse collections
              </Link>
            </div>
          )}

          {count > 0 && (
            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Subtotal:</span>
                <span>₦{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Shipping:</span>
                <span>₦0.00</span>
              </div>
              <div className="flex justify-between items-center font-bold">
                <span>Total:</span>
                <span>₦{cartTotal.toFixed(2)}</span>
              </div>
            </div>
          )}

          {count > 0 && (
            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
              <div className="p-4 border rounded-md flex items-center gap-2 bg-gray-50">
                <CreditCard className="text-amber-500" />
                <span>Payment integration coming soon</span>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          {count > 0 && (
            <Button
              className="bg-amber-500 hover:bg-amber-600 text-white"
              onClick={checkOut}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Proceed to Payment'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
