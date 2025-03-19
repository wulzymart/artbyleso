'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { cookies } from 'next/headers'

async function loginCustomer({ email, password }: { email: string; password: string }) {
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

export default loginCustomer
