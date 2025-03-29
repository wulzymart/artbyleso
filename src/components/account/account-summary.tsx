'use client'

import { useEffect, useState } from 'react'
import { Customer, Order } from '@/payload-types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '../ui/button'
import { useAuth } from '@/context/authContext'
import { SheetClose } from '../ui/sheet'

const AccountSummary = () => {
  const { logout, user } = useAuth()
  const customer = user
    ? {
        id: user.id,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        address: {
          address: user.address?.address || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          country: user.address?.country || '',
          postalCode: user.address?.postalCode || '',
        },
      }
    : null
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchOrders = async () => {
      if (!customer?.id) return

      try {
        const response = await fetch(`/api/orders?where[customer][equals]=${customer.id}`, {
          credentials: 'include',
        })
        if (response.ok) {
          const data = await response.json()
          setOrders(data.docs || [])
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (customer?.id) {
      fetchOrders()
    }
  }, [customer])

  if (isLoading) {
    return (
      <div className="w-sm mx-auto p-4 flex justify-center items-center">
        <p>Loading account information...</p>
      </div>
    )
  }

  if (!customer) {
    return (
      <div className="w-sm mx-auto p-4 flex justify-center items-center">
        <p>No customer information available.</p>
      </div>
    )
  }

  return (
    <div className="w-sm mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Account Summary</h2>

      <div className="grid grid-cols-1 gap-4">
        {/* Personal Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium">Name:</div>
              <div className="text-sm">{`${customer.firstName} ${customer.lastName}`}</div>

              <div className="text-sm font-medium">Email:</div>
              <div className="text-sm">{customer.email}</div>

              <div className="text-sm font-medium">Phone:</div>
              <div className="text-sm">{customer.phoneNumber || 'Not provided'}</div>
            </div>
          </CardContent>
        </Card>

        {/* Address Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Address Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium">Address:</div>
              <div className="text-sm">{customer.address.address || 'Not provided'}</div>

              <div className="text-sm font-medium">City:</div>
              <div className="text-sm">{customer.address.city || 'Not provided'}</div>

              <div className="text-sm font-medium">State:</div>
              <div className="text-sm">{customer.address.state || 'Not provided'}</div>

              <div className="text-sm font-medium">Country:</div>
              <div className="text-sm">{customer.address.country || 'Not provided'}</div>

              <div className="text-sm font-medium">Postal Code:</div>
              <div className="text-sm">{customer.address.postalCode || 'Not provided'}</div>
            </div>
          </CardContent>
        </Card>

        {/* Order Summary Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium">Total Orders:</div>
              <div className="text-sm">{orders.length}</div>

              <div className="text-sm font-medium">Unpaid Orders:</div>
              <div className="text-sm">
                {orders.filter((order) => order.paymentStatus === 'pending').length}
              </div>

              <div className="text-sm font-medium">Paid Orders:</div>
              <div className="text-sm">
                {orders.filter((order) => order.paymentStatus === 'paid').length}
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="full flex justify-end">
          <SheetClose asChild>
            <Button className="cursor-pointer" onClick={logout} variant="destructive">
              Sign Out
            </Button>
          </SheetClose>
        </div>
      </div>
    </div>
  )
}

export default AccountSummary
