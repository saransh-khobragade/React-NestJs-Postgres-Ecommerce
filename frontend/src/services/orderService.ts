import { api } from './api';

export interface Order {
  id: number;
  userId: number;
  totalPrice: number; // cents
  createdAt: string;
}

export const orderService = {
  checkout: async (): Promise<Order> => {
    const res = await api.post<{ success: boolean; data: Order }>(`/api/orders`, {});
    return res.data;
  },
  list: async (): Promise<Order[]> => {
    const res = await api.get<{ success: boolean; data: Order[] }>(`/api/orders`);
    return res.data;
  },
};

