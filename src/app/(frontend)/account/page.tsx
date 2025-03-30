import React from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
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
import { getPayload } from 'payload'
import config from '@/payload.config'
import { headers } from 'next/headers'

export default async function AccountPage() {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })

  if (!user || user.role !== 'customer') {
    return redirect('/login')
  }
  const { docs: orders } = await payload.find({
    collection: 'orders',
    where: {
      customer: {
        equals: user.id,
      },
    },
  })

  const customer = user

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      {/* Customer Information Section - Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Personal Information Card */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Name:</span>
                <span>{`${customer.firstName} ${customer.lastName}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Email:</span>
                <span className="truncate max-w-[200px]">{customer.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Phone:</span>
                <span>{customer.phoneNumber || 'Not provided'}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address Information Card */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Address Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Address:</span>
                <span className="truncate max-w-[200px]">
                  {customer.address.address || 'Not provided'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Postal code:</span>
                <span className="truncate max-w-[200px]">
                  {customer.address.postalCode || 'Not provided'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">City:</span>
                <span>{customer.address.city || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">State:</span>
                <span>{customer.address.state || 'Not provided'}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Summary Card */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Total Orders:</span>
                <span>{orders.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Pending Payment:</span>
                <span>{orders.filter((order) => order.paymentStatus === 'pending').length}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Paid Orders:</span>
                <span>{orders.filter((order) => order.paymentStatus === 'paid').length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table Section - Scrollable Card */}
      <Card className="shadow-md mt-8">
        <CardHeader>
          <CardTitle className="text-xl">My Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[500px] overflow-auto">
            {orders.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total Price</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead>Shipment Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order, index) => {
                    // Get the shipping status from the order's shipping relationship
                    const shipmentStatus =
                      typeof order.shipping === 'object'
                        ? order.shipping?.shippingStatus
                        : 'pending'

                    return (
                      <TableRow key={order.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>${order.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                          >
                            {order.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              shipmentStatus === 'delivered'
                                ? 'bg-green-100 text-green-800'
                                : shipmentStatus === 'shipped'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {typeof shipmentStatus === 'string'
                              ? shipmentStatus.charAt(0).toUpperCase() + shipmentStatus.slice(1)
                              : 'Pending'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Link href={`/orders/${order.id}`}>
                            <Button variant="outline" size="sm">
                              View Order
                            </Button>
                          </Link>
                          <Button variant="outline" size="sm">
                            Cancel
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <p className="text-gray-500 mb-4">You haven&lsquo;t placed any orders yet.</p>
                <Link href="/collections">
                  <Button className="bg-amber-600 hover:bg-amber-800">Browse Collections</Button>
                </Link>
                <Link href="/artworks">
                  <Button className="bg-amber-600 hover:bg-amber-800">Browse Artworks</Button>
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
