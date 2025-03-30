import { Artwork } from '@/payload-types'
import { createStore } from 'zustand/vanilla'
import { persist } from 'zustand/middleware'
import { toast } from 'sonner'
import { getCurrentPrice } from '@/utilities/calc-price'
export interface CartItem {
  artwork: Artwork
  id: string
  isPrintVersion?: boolean
}
export type CartState = {
  items: CartItem[]
}
export const initCartStore = (): CartState => {
  return { items: [] }
}
export type CartActions = {
  addItem: (id: string, artwork: Artwork, isPrintVersion?: boolean) => void
  removeItem: (id: string) => void
  clearCart: () => void
  getCount: () => number
  getCartTotal: (sales?: number) => number
}

export type CartStore = CartState & CartActions

export const defaultInitState: CartState = {
  items: [],
}

export const createCartStore = (initState: CartState = defaultInitState) => {
  return createStore<CartStore>()(
    persist(
      (set, get) => ({
        ...initState,
        addItem: (id, artwork, isPrintVersion = false) =>
          set(({ items }) => {
            // Create a unique ID that includes whether it's a print version
            const itemId = isPrintVersion ? `${id}-print` : id

            const foundItem = items.findIndex((item) => item.id === itemId)
            if (foundItem != -1) {
              toast.error('Artwork already in cart')
              return { items }
            }
            return { items: [...items, { id: itemId, artwork, isPrintVersion }] }
          }),
        removeItem: (id) =>
          set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
        clearCart: () => set(() => ({ items: [] })),
        getCount: () => get().items.length,
        getCartTotal: (sales?: number) =>
          get().items.reduce((total, { artwork, isPrintVersion }) => {
            const { originalPrice, discountedPrice } = getCurrentPrice(
              artwork,
              isPrintVersion,
              sales,
            )
            return total + (discountedPrice || originalPrice)
          }, 0),
      }),
      { name: 'cart' },
    ),
  )
}
