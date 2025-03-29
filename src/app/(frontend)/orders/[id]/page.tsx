import React from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { headers } from 'next/headers'
import { Order, Shipment, Payment } from '@/payload-types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
type Args = {
  params: Promise<{
    id: string
  }>
}

export default async function OrderPage({ params }: Args) {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })

  if (!user || user.role !== 'customer') {
    return redirect('/login')
  }

  // Fetch the specific order
  const order = (await payload.findByID({
    collection: 'orders',
    id: (await params).id,
  })) as Order

  // Check if the order belongs to the current user
  if (!order || (typeof order.customer === 'object' && order.customer.id !== user.id)) {
    return redirect('/account')
  }

  // Get shipping information
  const shipping = typeof order.shipping === 'object' ? order.shipping : null
  const shipmentStatus = shipping?.shippingStatus || 'pending'

  // Get payment information
  const payment = typeof order.paymentInfo === 'object' ? order.paymentInfo : null

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Order #{order.id.substring(0, 8)}</h1>
        <Link href="/account">
          <Button variant="outline">Back to Account</Button>
        </Link>
      </div>

      {/* Order Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Order Summary Card */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Order Date:</span>
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Total Price:</span>
                <span className="font-bold">₦{order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Payment Status:</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                >
                  {order.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Items:</span>
                <span>{order.items.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Information Card */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Payment Information</CardTitle>
          </CardHeader>
          <CardContent>
            {payment ? (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Transaction ID:</span>
                  <span className="truncate max-w-[200px]">{payment.id || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Payment Date:</span>
                  <span>
                    {payment.createdAt
                      ? new Date(payment.createdAt).toLocaleDateString()
                      : 'Not processed'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500">No payment information available</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Shipment Information Card */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Shipment Information</CardTitle>
          </CardHeader>
          <CardContent>
            {shipping ? (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Status:</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${shipmentStatus === 'delivered' ? 'bg-green-100 text-green-800' : shipmentStatus === 'shipped' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                  >
                    {shipmentStatus.charAt(0).toUpperCase() + shipmentStatus.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Tracking Number:</span>
                  <span>{shipping.trackingNumber || 'Not available'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Shipping Provider:</span>
                  <span>{shipping.shippingProvider || 'Not specified'}</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500">
                  {order.paymentStatus === 'paid'
                    ? 'Payment Acknowledged, Order will be shipped soon'
                    : 'No shipment information available'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Order Items Table */}
      <Card className="shadow-md mt-8">
        <CardHeader>
          <CardTitle className="text-xl">Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Artwork</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Version</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item, index) => {
                  if (typeof item === 'string') {
                    return null
                  }
                  const artwork = item.artwork
                  return (
                    <TableRow key={item.id || index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        {typeof artwork === 'object' && artwork.title ? (
                          <Link
                            href={`/artworks/${artwork.slug}`}
                            className="text-amber-600 hover:underline"
                          >
                            {artwork.title}
                          </Link>
                        ) : (
                          'Unknown Artwork'
                        )}
                      </TableCell>
                      <TableCell>₦{item.price.toFixed(2)}</TableCell>
                      <TableCell>{item.version}</TableCell>
                    </TableRow>
                  )
                })}
                <TableRow>
                  <TableCell colSpan={4} className="text-right font-bold">
                    Total:
                  </TableCell>
                  <TableCell className="font-bold">₦{order.total.toFixed(2)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Address Card */}
      {shipping && shipping.shippingAddress && (
        <Card className="shadow-md mt-8">
          <CardHeader>
            <CardTitle className="text-xl">Shipping Address</CardTitle>
          </CardHeader>
          <CardContent>
            <address className="not-italic">
              {shipping.shippingAddress.street}
              <br />
              {shipping.shippingAddress.city}, {shipping.shippingAddress.state}{' '}
              {shipping.shippingAddress.zipCode}
              <br />
              {shipping.shippingAddress.country}
            </address>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
