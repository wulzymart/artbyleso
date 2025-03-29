'use server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function getOngoingSales() {
  const payload = await getPayload({ config })
  const sale = await payload.findGlobal({
    slug: 'sales',
  })
  return sale.percentage || undefined
}
