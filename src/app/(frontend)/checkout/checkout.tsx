'use client'

import React, { startTransition, useState } from 'react'
import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, CreditCard, Trash2Icon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { useCartStore } from '@/context/CartProvider'
import { useAuth } from '@/context/authContext'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { closePaymentModal, useFlutterwave } from 'flutterwave-react-v3'
import { FlutterwaveConfig, InitializeFlutterwavePayment } from 'flutterwave-react-v3/dist/types'
import { PaystackButton } from 'react-paystack'
import { usePaystackPayment } from 'react-paystack'
import { useSales } from '@/context/sales_checker'
import { getCurrentPrice } from '@/utilities/calc-price'
import { c } from 'node_modules/framer-motion/dist/types.d-6pKw1mTI'
import { addOrUpdatePaymentInfo, checkItemsAvailability, createOrder } from './actions'
import { Order, Payment } from '@/payload-types'
import { get } from 'http'

const CheckOut = () => {
  const { items, removeItem, getCount, clearCart, getCartTotal } = useCartStore((state) => state)
  const count = getCount()
  const { salesPercentage } = useSales()
  const cartTotal = getCartTotal(salesPercentage)
  const { isAuthenticated, user } = useAuth()

  const router = useRouter()
  if (!isAuthenticated) {
    router.push('/account/login')
  }
  const [isProcessing, setIsProcessing] = useState(false)
  if (!isAuthenticated || !user) {
    return null
  }
  const handlePaystackSuccessAction = (reference: any) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference)
  }
  const handleCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    setIsProcessing(false)
    toast('Payment process cancelled')
  }

  const initializePayment = usePaystackPayment({
    currency: 'NGN',
    reference: new Date().getTime().toString() + user.id,
    firstname: user.firstName,
    lastname: user.lastName,
    label: 'Leso Originals',
    phone: user.phoneNumber!,
    email: user.email,
    onBankTransferConfirmationPending: (reference: any) => {
      console.log(reference)
    },
    channels: ['card', 'mobile_money', 'ussd', 'bank', 'bank_transfer'],
    amount: cartTotal * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
  })

  const flutterWaveConfig: FlutterwaveConfig = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY!,
    tx_ref: new Date().getTime().toString() + user.id,
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

  const handleFlutterPayment = useFlutterwave(flutterWaveConfig)
  const generatePaymentInfo = (gateway: 'paystack' | 'flutterwave', info: any) => {
    const paymentInfo: Omit<Payment, 'id' | 'createdAt' | 'updatedAt' | 'order' | 'customer'> = {
      amount: cartTotal,
      gateway,
      paystackInfo: gateway === 'paystack' ? info : undefined,
    }
    return paymentInfo
  }
  const checkOut = async (gateway: 'paystack' | 'flutterwave') => {
    if (isAuthenticated) {
      const { unavailableItemIds } = await checkItemsAvailability(items)
      if (unavailableItemIds.length > 0) {
        items.forEach((item) => {
          if (unavailableItemIds.includes(item.id)) {
            removeItem(item.id)
          }
        })
        toast.error('Some items are no longer available and we have removed them from your cart.')
        return
      }

      setIsProcessing(true)

      const order = await createOrder({
        customer: user.id,
        items: items.map((item) => {
          const { discountedPrice, originalPrice } = getCurrentPrice(
            item.artwork,
            item.isPrintVersion,
            salesPercentage,
          )
          return {
            artwork: item.artwork.id,
            version: item.isPrintVersion ? 'Print' : 'Canvas',
            price: discountedPrice || originalPrice,
          }
        }),
        total: cartTotal,
        paymentStatus: 'pending',
        shippingAddress: user.address,
      })
      if (gateway === 'paystack') {
        initializePayment({
          onSuccess: async (reference: any) => {
            const paymentInfo = generatePaymentInfo('paystack', reference)
            const newPayment = await addOrUpdatePaymentInfo(
              order.id,
              paymentInfo,
              reference.status === 'success',
            )
            if (newPayment) {
              setIsProcessing(false)
              toast.success('Payment successful')
              clearCart()
              router.push(`/orders/${order.id}`)
            }
          },
          onClose: handleCloseAction,
        })
      } else if (gateway === 'flutterwave') {
        handleFlutterPayment({
          callback: (response) => {
            console.log(response)
            closePaymentModal()
          },
          onClose: () => {
            setIsProcessing(false)
            toast('Payment process cancelled')
          },
        })
      }
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
    <div className="container mx-auto my-8">
      <div className="py-4">
        <h3 className="text-lg font-semibold mb-4">Cart Summary</h3>
        {count ? (
          <div className="grid gap-4 max-h-[300px] overflow-auto">
            {items.map((item) => {
              const { originalPrice, discountedPrice } = getCurrentPrice(
                item.artwork,
                item.isPrintVersion,
                salesPercentage,
              )
              return (
                <Card key={item.id} className="pt-2">
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="size-16 relative">
                        <Media resource={item.artwork.mainImage} fill />
                      </div>

                      <div className="flex-1 flex flex-col md:flex-row items-center max-sm:items-start md:gap-4">
                        <div className="flex-1">
                          <h5 className="text-md font-semibold">{item.artwork.title}</h5>
                          {discountedPrice ? (
                            <>
                              <p className="line-through text-gray-400">₦{originalPrice}</p>
                              <p>{discountedPrice}</p>
                            </>
                          ) : (
                            <p>{originalPrice}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm">{item.isPrintVersion ? 'Print' : 'Canvas'}</p>
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
              )
            })}
          </div>
        ) : (
          <div className="flex flex-col gap-2 h-40 items-center justify-center">
            <p className="text-lg font-semibold">No item in cart</p>
            <Link href="/artworks">Get an artwork</Link>
            <Link href="/collection">Browse collections</Link>
          </div>
        )}

        {count > 0 && (
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">Subtotal:</span>
              <span>₦{cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">
                Shipping{' '}
                <Link
                  href="/shipping-policy"
                  className="text-primary/70 hover:text-primary transition-colors"
                >
                  Not included
                </Link>
                :{' '}
              </span>
              <span>₦0.00</span>
            </div>
            <div className="flex justify-between items-center font-bold">
              <span>Total:</span>
              <span>₦{cartTotal.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-8">
        <Button variant="destructive" onClick={() => router.back()}>
          Cancel
        </Button>
        {count > 0 && (
          <>
            <Button
              className="bg-primary hover:bg-amber-600 text-white"
              onClick={() => checkOut('paystack')}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Pay with Paystack'}
            </Button>
            {/* <Button
              className="bg-amber-500 hover:bg-amber-600 text-white"
              onClick={() => checkOut('flutterwave')}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Pay with Flutterwave'}
            </Button> */}
          </>
        )}
      </div>
    </div>
  )
}

export default CheckOut
