'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function TermsAndConditions() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Terms and Conditions</h1>

        <div className="space-y-6 text-gray-600">
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using this website, you accept and agree to be bound by the terms and
              provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Use License</h2>
            <p className="mb-4">
              Permission is granted to temporarily view the materials on our website for personal,
              non-commercial transitory viewing only.
            </p>
            <p className="mb-4">
              This is the grant of a license, not a transfer of title, and under this license you
              may not:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>
                Attempt to reproduce an artwork displayed on the website except a print version is
                paid for
              </li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Intellectual Property Rights
            </h2>
            <p className="mb-4">
              All content included on this site, such as text, graphics, logos, images, etc, is the
              property of our company or its content suppliers and protected by international
              copyright laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Product Descriptions</h2>
            <p className="mb-4">
              We attempt to be as accurate as possible in describing our products. However, we do
              not warrant that product descriptions or other content of this site is accurate,
              complete, reliable, current, or error-free.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Pricing and Payment</h2>
            <p className="mb-4">
              All prices are subject to change without notice. We reserve the right to modify or
              discontinue any product without notice. We shall not be liable to you or any third
              party for any modification, price change, suspension, or discontinuance of the
              product.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Order Acceptance</h2>
            <p className="mb-4">
              We reserve the right to refuse any order you place with us. We may, in our sole
              discretion, limit or cancel items purchased per person, or per order. These
              restrictions may include orders placed by or under the same customer account, the same
              credit card, and/or orders that use the same billing and/or shipping address.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Limitation of Liability</h2>
            <p className="mb-4">
              In no event shall we be liable for any direct, indirect, incidental, special,
              consequential damages, or any damages whatsoever arising from the use or performance
              of this website or the products purchased through it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Governing Law</h2>
            <p className="mb-4">
              These terms and conditions are governed by and construed in accordance with the laws
              of Nigeria, and you irrevocably submit to the exclusive jurisdiction of the courts in
              that location.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to update or modify these terms and conditions at any time
              without prior notice. Your continued use of the website following any changes
              indicates your acceptance of such changes.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  )
}
