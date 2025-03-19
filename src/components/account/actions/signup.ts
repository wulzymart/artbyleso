'use server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Customer } from '@/payload-types'

export default async function signupCustomer(
  customer: Omit<Customer, 'id' | 'createdAt' | 'updatedAt' | 'cart' | 'role'>,
) {
  const payload = await getPayload({ config })
  const user = await payload.create({
    collection: 'customers',
    data: {
      ...customer,
      role: 'customer',
    },
  })
  return user
}
