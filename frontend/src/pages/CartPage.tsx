import React, { useEffect, useMemo, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { cartService, type CartItem } from '@/services/cartService';
import { Button } from '@/components/ui/button';
import { orderService } from '@/services/orderService';

const formatPrice = (cents: number): string => `$${(cents / 100).toFixed(2)}`;

export const CartPage: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingOut, setCheckingOut] = useState(false);

  const refresh = async (): Promise<void> => {
    setLoading(true);
    try {
      const data = await cartService.get();
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void refresh(); }, []);

  const total = useMemo(() => items.reduce((sum, i) => sum + i.quantity * i.product.price, 0), [items]);

  const remove = async (productId: number): Promise<void> => {
    await cartService.remove(productId);
    void refresh();
  };

  const checkout = async (): Promise<void> => {
    setCheckingOut(true);
    try {
      const order = await orderService.checkout();
      window.location.href = `/order-confirmation?id=${order.id}`;
    } finally {
      setCheckingOut(false);
    }
  };

  return (
    <div className='min-h-screen bg-background text-foreground'>
      <Navbar />
      <main className='container mx-auto px-4 py-8 max-w-3xl'>
        <h1 className='text-3xl font-semibold mb-6'>Your Cart</h1>
        {loading ? (
          <div>Loading…</div>
        ) : items.length === 0 ? (
          <div>Your cart is empty.</div>
        ) : (
          <div className='space-y-4'>
            {items.map((i) => (
              <div key={i.productId} className='flex items-center gap-4 border rounded p-3'>
                <img src={i.product.imageUrl} alt={i.product.name} className='w-20 h-20 object-cover rounded' />
                <div className='flex-1'>
                  <div className='font-medium'>{i.product.name}</div>
                  <div className='text-sm text-muted-foreground'>Qty: {i.quantity}</div>
                </div>
                <div className='w-24 text-right'>{formatPrice(i.product.price * i.quantity)}</div>
                <Button variant='ghost' onClick={() => { void remove(i.productId); }}>Remove</Button>
              </div>
            ))}
            <div className='flex items-center justify-between pt-4 border-t'>
              <div className='text-xl font-semibold'>Total</div>
              <div className='text-xl font-semibold'>{formatPrice(total)}</div>
            </div>
            <div className='flex justify-end'>
              <Button onClick={() => { void checkout(); }} disabled={checkingOut}>Checkout</Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

