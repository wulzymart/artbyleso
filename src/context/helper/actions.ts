'use server'
import { cookies, headers } from 'next/headers'

import { Artwork, Cart, CartsSelect } from '@/payload-types'

import { getPayload } from 'payload'
import config from '@/payload.config'

export async function checkOutCart(id: number | string) {
  const payload = await getPayload({ config })
  const cart = await payload.findByID({
    collection: 'carts',
    id,
    overrideAccess: false,
  })
  return cart
}
