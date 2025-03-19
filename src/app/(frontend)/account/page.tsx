'use client'

import Link from 'next/link'

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-radial from-gray-500 to-amber-800 text-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">My Account</h1>
        <div className="flex flex-col items-center space-y-4">
          <Link href="/account/orders" className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-lg">
            View Orders
          </Link>
          <Link href="/account/settings" className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-lg">
            Account Settings
          </Link>
        </div>
      </div>
    </div>
  )
}
