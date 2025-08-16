import { api } from './api';
import type { Product } from './productService';

export interface CartItem {
  productId: number;
  quantity: number;
  product: Product;
}

export const cartService = {
  get: async (): Promise<CartItem[]> => {
    const res = await api.get<{ success: boolean; data: CartItem[] }>(`/api/cart`);
    return res.data;
  },
  add: async (productId: number, quantity = 1): Promise<void> => {
    await api.post<{ success: boolean }>(`/api/cart`, { productId, quantity });
  },
  remove: async (productId: number): Promise<void> => {
    await api.delete<{ success: boolean }>(`/api/cart/${productId}`);
  },
};

