import axios from 'axios';
import { config } from '@/config';
import { Product } from '@/types/product';

export const fetchProducts = async () => {
  const response = await axios.get(`${config.api.baseUrl}${config.api.endpoints.products}`);
  return response.data;
};

export async function fetchProductById(id: string): Promise<Product | null> {
  const res = await fetch(`${config.api.baseUrl}/Products/GetById/${id}`);
  if (!res.ok) {
    return null;
  }
  return res.json();
}