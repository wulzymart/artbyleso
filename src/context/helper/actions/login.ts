'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { cookies, headers } from 'next/headers'

export async function loginCustomer({ email, password }: { email: string; password: string }) {
  const payload = await getPayload({ config })
  const login = await payload.login({
    collection: 'customers',
    data: {
      email,
      password,
    },
  })
  const cookieStore = await cookies()
  if (!login.token) {
    throw new Error('Failed to login')
  }
  cookieStore.set('payload-token', login.token, { httpOnly: true, sameSite: 'lax' })
  return login.user
}

export async function logoutCustomer() {
  const cookieStore = await cookies()
  cookieStore.delete('payload-token')
}

export async function getCurrentCustomer() {
  const payload = await getPayload({ config })
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value
  if (!token) {
    return null
  }
  const {user} = await payload.auth({
    headers: await headers(),
  })
  if (!user || user.role !== 'customer') {
    return null
  }
  return user
}
