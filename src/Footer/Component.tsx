import Link from 'next/link'
import { Instagram, Twitter, Linkedin, Mail, X } from 'lucide-react'
import { Logo } from '@/components/Logo/Logo'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export const Footer = () => {
  return (
    <footer className="w-full mt-auto bg-gradient-to-b from-black via-black/90 to-black/80">
      <div className="mx-auto w-[90%] text-white">
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link className="flex items-center" href="/">
              <Logo height={38} src="/logo.png" />
            </Link>
            <p className="text-sm text-gray-400">
              Discover my unique art collections and connect with the me.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/collections"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/artworks" className="text-gray-400 hover:text-white transition-colors">
                  Artworks
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          {/* Policy */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Policy</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping-policy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Email: lesovilla26@gmail.com </li>
              <li className="text-gray-400">Phone: +234 (911) 261-2216</li>
              <li className="text-gray-400">34 Kings avenue, ojodu Lagos, Nigeria</li>
            </ul>
          </div>
        </div>

        {/* Social Media and Copyright */}
        <div className="border-t border-white/10 py-6">
          <div className="container flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="https://instagram.com" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </Link>
              <Link href="https://twitter.com" className="text-gray-400 hover:text-white">
                <X size={20} />
              </Link>
              <Link href="https://linkedin.com" className="text-gray-400 hover:text-white">
                <Linkedin size={20} />
              </Link>
            </div>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Leso Originals. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
