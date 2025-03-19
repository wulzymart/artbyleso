'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Search, User, ShoppingCart } from 'lucide-react'
import { Logo } from '../Logo/Logo'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import AccountAccess from '../account/accout_access'
import { useCartStore } from '@/context/CartProvider'
import { Cart } from '../cart'

const NavigationMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const notHomePage = usePathname() !== '/'
  const [isMobile, setIsMobile] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Check if scroll position is beyond 400px
      setIsScrolled(window.scrollY > 400)
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll)

    // Clean up event listener
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  useEffect(() => {
    const handleResize = () => {
      // Check if screen width is below 768px
      setIsMobile(window.innerWidth < 768)
    }

    // Add resize event listener
    window.addEventListener('resize', handleResize)

    // Call handleResize on mount
    handleResize()

    // Clean up event listener
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Example menu items with left and right positioning
  const leftMenuItems = [
    { label: 'Home', href: '/' },
    { label: 'Collections', href: 'collections' },
    { label: 'Works', href: '/artworks' },
  ]

  const rightMenuItems = [
    { label: 'Meet Leso', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  const { getCount } = useCartStore((state) => state)
  const cartCount = getCount()

  return (
    <nav
      className={`
        ${!notHomePage && 'md:fixed'} z-50 transition-all duration-300 ease-in-out h-fit py-2
        ${isScrolled || isMobile || notHomePage ? 'bg-white shadow-md top-0 inset-x-0 h-32' : 'md:bg-amber-950/40     top-10 inset-x-5 w-[90vw] mx-auto rounded-2xl'}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`
            flex items-center justify-between h-fit 
            ${isScrolled || isMobile || notHomePage ? 'text-gray-800' : 'text-white'}
          `}
        >
          {/* Left Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button
              className={`
                p-2 rounded-full hover:bg-opacity-20
                ${isScrolled || isMobile || notHomePage ? 'text-gray-700 hover:bg-amber-500' : 'text-white hover:bg-amber-500'}
              `}
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* User Icon */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`
                p-2 rounded-full hover:bg-opacity-20
                ${isScrolled || isMobile || notHomePage ? 'text-gray-700 hover:bg-amber-500' : 'text-white hover:bg-amber-500'}
              `}
                >
                  <User size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Account Access</SheetTitle>
                </SheetHeader>
                <div className="min-h-[600px]">
                  <AccountAccess />
                </div>
              </SheetContent>
            </Sheet>

            {/* Cart Icon with Badge */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative p-2 rounded-full hover:bg-opacity-20"
                >
                  <ShoppingCart
                    size={20}
                    className={
                      isScrolled || isMobile || notHomePage
                        ? 'text-gray-700 hover:text-gray-900'
                        : 'text-white'
                    }
                  />
                  {cartCount > 0 && (
                    <span
                      className={`
                    absolute -top-1 -right-1 
                    flex items-center justify-center 
                    h-4 w-4 text-xs font-bold 
                    rounded-full 
                    ${isScrolled || isMobile || notHomePage ? 'bg-red-500 text-white' : 'bg-white text-red-500'}
                  `}
                    >
                      {cartCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="top">
                <SheetHeader>
                  <SheetTitle className="text-2xl font-bold">Cart</SheetTitle>
                </SheetHeader>
                <div className="min-h-[600px]">
                  <Cart />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Centered Logo */}
          <div className="flex-1 flex items-center justify-center">
            <Link
              href="/"
              className={`
                text-2xl font-bold 
                ${isScrolled || isMobile || notHomePage ? 'text-gray-800' : 'text-white'}
              `}
            >
              <Logo
                height={38}
                src={isScrolled || isMobile || notHomePage ? '/logo-dark.png' : '/logo.png'}
              />
            </Link>
          </div>

          {/* Desktop Menu Items */}
          <div className="hidden md:flex space-x-4">
            {[...leftMenuItems, ...rightMenuItems].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`
                  hover:bg-opacity-20 px-3 py-2 rounded-md text font-medium
                  ${isScrolled || isMobile || notHomePage ? 'text-gray-700 hover:bg-amber-500' : 'text-white hover:bg-amber-500'}
                `}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className={`
                inline-flex items-center justify-center p-2 rounded-md 
                ${
                  isScrolled || isMobile || notHomePage
                    ? 'text-gray-400 hover:text-gray-500 hover:bg-gray-100'
                    : 'text-white hover:bg-white hover:bg-opacity-20'
                }
              `}
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div
            className={`
            md:hidden 
            ${isScrolled ? 'bg-white' : 'bg-gray-800 bg-opacity-90'}
          `}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {/* Mobile Icons */}
              <div className="flex justify-start space-x-4 pb-4 border-b mb-2">
                <button aria-label="Search" className="text-gray-700">
                  <Search size={20} />
                </button>
                <Link href="/account" className="text-gray-700">
                  <User size={20} />
                </Link>
                <Link href="/cart" className="relative text-gray-700">
                  <ShoppingCart size={20} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white h-4 w-4 rounded-full flex items-center justify-center text-xs">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>

              {/* Mobile Menu Items */}
              {[...leftMenuItems, ...rightMenuItems].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`
                    block px-3 py-2 rounded-md text-base font-medium
                    ${
                      isScrolled || isMobile
                        ? 'text-gray-700 hover:bg-gray-100'
                        : 'text-white hover:bg-white hover:bg-opacity-20'
                    }
                  `}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default NavigationMenu
