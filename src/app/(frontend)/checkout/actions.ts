'use server'
import { Order, Payment } from '@/payload-types'
import config from '@/payload.config'
import { CartItem } from '@/stores/cart-store'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { version } from 'os'
import { getPayload } from 'payload'

export async function checkItemsAvailability(items: CartItem[]) {
  const payload = await getPayload({ config })
  const unavailableItemIds: string[] = []
  const itemsAvailability = await Promise.all(
    items.map(async (item) => {
      const artwork = await payload.findByID({
        collection: 'artworks',
        id: item.artwork.id,
        depth: 0,
      })
      if (!artwork) {
        unavailableItemIds.push(item.id)
        return false
      }
      if (item.isPrintVersion) {
        !Boolean(artwork.printVersion?.available) && unavailableItemIds.push(item.id)
        return Boolean(artwork.printVersion?.available)
      }
      !Boolean(artwork.inStock) && unavailableItemIds.push(item.id)
      return Boolean(artwork.inStock)
    }),
  )
  return {
    itemsAvailability,
    unavailableItemIds,
  }
}

export async function createOrder(order: Omit<Order, 'id' | 'updatedAt' | 'createdAt'>) {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })

  if (!user || user.role !== 'customer') return redirect('/login')
  try {
    const newOrder = await payload.create({
      collection: 'orders',
      data: order,
    })
    return newOrder
  } catch (error) {
    throw error
  }
}

export async function addOrUpdatePaymentInfo(
  orderId: string,
  paymentInfo: Omit<Payment, 'id' | 'createdAt' | 'updatedAt' | 'order' | 'customer'>,
  success: boolean,
) {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })
  async function updateOrderArtworks(order: Order) {
    await Promise.all(
      order.items.map(async (item) => {
        item.version === 'Canvas' &&
          (await payload.update({
            collection: 'artworks',
            id: typeof item.artwork === 'string' ? item.artwork : item.artwork.id,
            data: {
              inStock: false,
            },
          }))
      }),
    )
  }
  if (!user || user.role !== 'customer') return redirect('/login')
  try {
    const order = await payload.findByID({
      collection: 'orders',
      id: orderId,
      depth: 0,
    })
    if (!order) throw new Error('Order not found')
    if (order.paymentInfo) {
      const paymentId =
        typeof order.paymentInfo === 'string' ? order.paymentInfo : order.paymentInfo.id
      const updatedPayment = await payload.update({
        collection: 'payments',
        id: paymentId,
        data: paymentInfo,
      })
      if (success) {
        await payload.update({
          collection: 'orders',
          id: orderId,
          data: {
            paymentInfo: updatedPayment.id,
            paymentStatus: success ? 'paid' : 'pending',
          },
        })
        await updateOrderArtworks(order)
      }
      return updatedPayment
    } else {
      const newPayment = await payload.create({
        collection: 'payments',
        data: { ...paymentInfo, customer: user.id, order: orderId },
      })

      await payload.update({
        collection: 'orders',
        id: orderId,
        data: {
          paymentInfo: newPayment.id,
          paymentStatus: success ? 'paid' : 'pending',
        },
      })
      success && (await updateOrderArtworks(order))
      return newPayment
    }
  } catch (error) {
    throw error
  }
}
