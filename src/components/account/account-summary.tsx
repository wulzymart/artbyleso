'use client'

import { useEffect, useState } from 'react'
import { Customer, Order } from '@/payload-types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface AccountSummaryProps {
  customer?: Customer
}

const AccountSummary: React.FC<AccountSummaryProps> = ({ customer }) => {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchOrders = async () => {
      if (!customer?.id) return

      try {
        const response = await fetch(`/api/orders?where[customer][equals]=${customer.id}`)
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
              <div className="text-sm">{customer.address || 'Not provided'}</div>

              <div className="text-sm font-medium">City:</div>
              <div className="text-sm">{customer.city || 'Not provided'}</div>

              <div className="text-sm font-medium">State:</div>
              <div className="text-sm">{customer.state || 'Not provided'}</div>
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
      </div>
    </div>
  )
}

export default AccountSummary
