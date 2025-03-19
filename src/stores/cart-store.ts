import { Artwork } from '@/payload-types'
import { Item } from '@radix-ui/react-select'
import { createStore } from 'zustand/vanilla'
import { persist, createJSONStorage } from 'zustand/middleware'
export interface CartItem {
  artwork: Artwork
  quantity: number
  price: number
  id: string
}
export type CartState = {
  items: CartItem[]
}
export const initCartStore = (): CartState => {
  return { items: [] }
}
export type CartActions = {
  decreaseQuantity: (id: string) => void
  increaseQuantity: (id: string) => void
  addItem: (id: string, artwork: Artwork, price: number, quantity: number) => void
  removeItem: (id: string) => void
  clearCart: () => void
  getCount: () => number
  getCartTotal: () => number
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
        decreaseQuantity: (id) =>
          set((state) => ({
            items: state.items.map((item) => {
              if (id === item.id && item.quantity! > 1) item.quantity--
              return item
            }),
          })),
        increaseQuantity: (id) =>
          set((state) => {
            debugger
            return {
              items: state.items.map((item) => {
                if (id === item.id && item.artwork.quantity! >= item.quantity + 1) item.quantity++
                return item
              }),
            }
          }),
        addItem: (id, artwork, price, quantity = 1) =>
          set(({ items }) => {
            const foundItem = items.findIndex((item) => item.id === id)
            if (foundItem != -1) {
              const initQuantity = items[foundItem]!.quantity
              if (initQuantity + quantity <= artwork.quantity!)
                items[foundItem]!.quantity += quantity
              else items[foundItem]!.quantity = artwork.quantity!
              return { items }
            }
            return { items: [...items, { id, artwork, price, quantity }] }
          }),
        removeItem: (id) =>
          set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
        clearCart: () => set(() => ({ items: [] })),
        getCount: () => get().items.reduce((count, item) => count + item.quantity, 0),
        getCartTotal: () =>
          get().items.reduce((total, item) => total + item.quantity * item.price, 0),
      }),
      { name: 'cart' },
    ),
  )
}
