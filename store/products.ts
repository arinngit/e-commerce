import { create } from 'zustand';
import { config } from '@/config';

interface Product {
  id: string;
  productName: string;
  productPrice: number;
  productSize: string;
  quantity: number;
  imageUrl: string;
}

interface ProductsState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  isLoading: false,
  error: null,
  
  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${config.api.baseUrl}${config.api.endpoints.products}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      set({ products: data, isLoading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unknown error', isLoading: false });
    }
  }
}));