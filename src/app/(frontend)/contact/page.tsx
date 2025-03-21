'use client'

import Image from 'next/image'
import { ContactForm } from '@/components/contact/contact-form'
import { FaPhone, FaEnvelope, FaInstagram, FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa'
import Link from 'next/link'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-radial/50 from-amber-100 to-gray-100 text-gray-800">
      {/* Hero Section */}
      <div className="relative h-[40vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-20"></div>
        <Image
          src="/leso.jpg"
          alt="Contact banner"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <h1 className="text-6xl md:text-7xl font-bold text-center px-4 tracking-tight drop-shadow-lg">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-500">
              Get In Touch
            </span>
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold mb-6 text-amber-400">Let's Connect</h2>
            <p className="text-xl max-w-3xl mx-auto">
              I'm available for partnerships, workshops, trainings, consultations, and mentorship.
              Whether you're interested in my artwork, need guidance, or want to collaborate, I'd
              love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-black/20 p-8 rounded-lg border-l-4 border-amber-500 flex flex-col animate-pulse hover:animate-none items-center text-center">
              <div className="bg-amber-500/20 p-4 rounded-full mb-4">
                <FaPhone className="text-3xl text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Phone</h3>
              <p className="mb-2">+234 803 123 4567</p>
              <p>+234 905 678 9012</p>
            </div>

            <div className="bg-black/20 p-8 rounded-lg border-l-4 border-amber-500 flex flex-col animate-pulse hover:animate-none items-center text-center">
              <div className="bg-amber-500/20 p-4 rounded-full mb-4">
                <FaEnvelope className="text-3xl text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Email</h3>
              <p className="mb-2">contact@lesooriginals.com</p>
              <p>info@lesooriginals.com</p>
            </div>

            <div className="bg-black/20 p-8 rounded-lg border-l-4 border-amber-500 flex flex-col animate-pulse hover:animate-none items-center text-center">
              <div className="bg-amber-500/20 p-4 rounded-full mb-4">
                <FaInstagram className="text-3xl text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Social Media</h3>
              <div className="flex space-x-4 justify-center">
                <Link
                  href="https://instagram.com/lesooriginals"
                  target="_blank"
                  className="text-2xl text-white hover:text-amber-300 transition-colors"
                >
                  <FaInstagram />
                </Link>
                <Link
                  href="https://twitter.com/lesooriginals"
                  target="_blank"
                  className="text-2xl text-white hover:text-amber-300 transition-colors"
                >
                  <FaTwitter />
                </Link>
                <Link
                  href="https://facebook.com/lesooriginals"
                  target="_blank"
                  className="text-2xl text-white hover:text-amber-300 transition-colors"
                >
                  <FaFacebook />
                </Link>
                <Link
                  href="https://linkedin.com/in/lesooriginals"
                  target="_blank"
                  className="text-2xl text-white hover:text-amber-300 transition-colors"
                >
                  <FaLinkedin />
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-black/30 rounded-lg p-8 border-t-4 border-amber-500 hover:scale-105">
            <h2 className="text-2xl font-bold mb-6 text-white text-center">Send Me a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
