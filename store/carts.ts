import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const existingItem = get().items.find(
          (i) => 
            i.name === item.name && 
            i.size === item.size && 
            i.color === item.color
        );

        if (existingItem) {
          get().updateQuantity(existingItem.id, 1);
        } else {
          set((state) => ({
            items: [
              ...state.items,
              {
                ...item,
                id: Date.now(),
                quantity: 1,
              },
            ],
          }));
        }
      },
      updateQuantity: (id, change) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { 
                  ...item, 
                  quantity: Math.max(1, item.quantity + change) 
                }
              : item
          ),
        }));
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);