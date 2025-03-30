import { getPayload } from 'payload'
import config from '@/payload.config'
import { headers } from 'next/headers'

import CheckOut from './checkout'
import { redirect } from 'next/navigation'

const CheckoutPage = async () => {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })
  if (!user) {
    return redirect('/login')
  }
  return <CheckOut />
}

export default CheckoutPage
