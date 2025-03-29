'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function ShippingPolicy() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shipping Policy</h1>

        <div className="space-y-6 text-gray-600">
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Delivery Process</h2>
            <p className="mb-4">
              To ensure the best shipping experience for our valued customers, we follow a
              personalized delivery process:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                After placing your order, our team will contact you directly to discuss available
                delivery options.
              </li>
              <li>
                We will provide you with different shipping methods and their associated costs.
              </li>
              <li>
                You can choose the delivery option that best suits your needs and preferences.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Shipping Costs</h2>
            <p className="mb-4">Please note the following regarding shipping costs:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Shipping costs are not included in the product price.</li>
              <li>The cost will vary depending on your location and chosen delivery method.</li>
              <li>
                Payment for shipping can be made either before delivery or upon delivery, based on
                your preference and the selected shipping method.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Delivery Time</h2>
            <p className="mb-4">Delivery times will vary depending on:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Your location</li>
              <li>The shipping method selected</li>
              <li>Product availability</li>
            </ul>
            <p className="mb-4">
              Specific delivery timeframes will be discussed when we contact you about your shipping
              options.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Returns Policy</h2>
            <p className="mb-4">
              Please note that we currently do not accept returns on any purchases. All sales are
              final.
            </p>
            <p className="mb-4">
              We encourage you to carefully review product details and specifications before making
              a purchase. If you have any questions about a product, please contact us before
              placing your order.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Contact Information</h2>
            <p className="mb-4">
              If you have any questions about shipping or delivery, please don't hesitate to contact
              us through our contact page. We're here to help ensure a smooth delivery process for
              your purchase.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  )
}
