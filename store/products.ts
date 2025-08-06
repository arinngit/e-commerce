import { create } from 'zustand';
import { config } from '@/config';
import { Product } from "@/types/product";

interface ProductsState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  searchProducts: (query: string) => Product[];
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  isLoading: false,
  error: null,
  
  fetchProducts: async () => {
    if (get().products.length > 0) return;
    
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${config.api.baseUrl}${config.api.endpoints.products}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      set({ products: data, isLoading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unknown error', isLoading: false });
    }
  },
  
  searchProducts: (query: string) => {
    if (!query.trim()) return [];
    return get().products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  }
}));