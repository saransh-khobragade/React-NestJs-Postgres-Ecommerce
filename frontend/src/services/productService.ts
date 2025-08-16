import { api } from './api';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number; // cents
  imageUrl: string;
  createdAt: string;
}

export const productService = {
  list: async (): Promise<Product[]> => {
    const res = await api.get<{ success: boolean; data: Product[] }>('/api/products');
    return res.data;
  },
  get: async (id: number): Promise<Product> => {
    const res = await api.get<{ success: boolean; data: Product }>(`/api/products/${id}`);
    return res.data;
  },
};

