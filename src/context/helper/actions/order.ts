'use server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { cookies, headers } from 'next/headers'
import { Order } from '@/payload-types'
import { CartItem } from '@/stores/cart-store'
import { redirect } from 'next/navigation'

export const addOrder = async (cartItems: CartItem[]) => {
  const payload = await getPayload({ config })
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })
  if (!user || user.role !== 'customer') return redirect('/account/login')
  const order = await payload.create({
    collection: 'orders',
    data: {
      customer: user.id,
      total: cartItems.reduce((total, item) => total + item.quantity * item.price, 0),
      items: cartItems.map((item) => ({
        artwork: item.artwork.id,
        price: item.price,
        quantity: item.quantity,
      })),
      paymentStatus: 'pending',
    },
  })
  return order
}
