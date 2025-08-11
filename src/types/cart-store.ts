interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id' | 'quantity'>) => void;
  updateQuantity: (id: number, change: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}