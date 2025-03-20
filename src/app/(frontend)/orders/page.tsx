import React from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { headers } from 'next/headers'
import { Order } from '@/payload-types'
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

export default async function OrdersPage() {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })

  if (!user || user.role !== 'customer') {
    return redirect('/login')
  }

  // Fetch all orders for the current user
  const { docs: orders } = await payload.find({
    collection: 'orders',
    where: {
      customer: {
        equals: user.id,
      },
    },
    depth: 6, // To get related data like shipping and payment info
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <Link href="/account">
          <Button variant="outline">Back to Account</Button>
        </Link>
      </div>

      {orders.length > 0 ? (
        <div className="space-y-8">
          {orders.map((order) => {
            // Get shipping information
            const shipping = typeof order.shipping === 'object' ? order.shipping : null
            const shipmentStatus = shipping?.shippingStatus || 'pending'

            // Get payment information
            const payment = typeof order.paymentInfo === 'object' ? order.paymentInfo : null

            return (
              <div
                key={order.id}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-md"
              >
                {/* Order Header */}
                <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold">Order #{order.id.substring(0, 8)}</h2>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Link href={`/orders/${order.id}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>

                {/* Order Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                  {/* Order Summary Card */}
                  <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md">Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">Total Price:</span>
                          <span className="font-bold">${order.total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Items:</span>
                          <span>{order.items.length}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Payment Information Card */}
                  <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md">Payment Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">Status:</span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                          >
                            {order.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                          </span>
                        </div>
                        {payment && (
                          <div className="flex justify-between">
                            <span className="font-medium">Transaction Id:</span>
                            <span>{payment.transactionId}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Shipment Information Card */}
                  <Card className="shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md">Shipment Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">Status:</span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${shipmentStatus === 'delivered' ? 'bg-green-100 text-green-800' : shipmentStatus === 'shipped' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                          >
                            {shipmentStatus.charAt(0).toUpperCase() + shipmentStatus.slice(1)}
                          </span>
                        </div>
                        {shipping && (
                          <div className="flex justify-between">
                            <span className="font-medium">Tracking:</span>
                            <span className="truncate max-w-[150px]">
                              {shipping.trackingNumber || 'Not available'}
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Order Items Table */}
                <div className="p-4 border-t">
                  <h3 className="font-medium mb-2">Order Items</h3>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>#</TableHead>
                          <TableHead>Artwork</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Subtotal</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {order.items.map((item, index) => {
                          if (typeof item.artwork === 'string')
                            throw new Error('Artwork is not an object')

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
                              <TableCell>${item.price.toFixed(2)}</TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 gap-4">
          <Card className="w-full max-w-md p-8 text-center">
            <CardContent>
              <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
              <div className="space-y-4">
                <Link href="/collections">
                  <Button className="w-full bg-amber-600 hover:bg-amber-800">
                    Browse Collections
                  </Button>
                </Link>
                <Link href="/artworks">
                  <Button className="w-full bg-amber-600 hover:bg-amber-800">
                    Browse Artworks
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
