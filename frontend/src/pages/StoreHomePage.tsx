import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { productService, type Product } from '@/services/productService';
import { cartService } from '@/services/cartService';
import { Button } from '@/components/ui/button';

const formatPrice = (cents: number): string => `$${(cents / 100).toFixed(2)}`;

export const StoreHomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState<number | null>(null);

  useEffect(() => {
    productService.list().then(setProducts).finally(() => setLoading(false));
  }, []);

  const addToCart = async (id: number): Promise<void> => {
    setAdding(id);
    try {
      await cartService.add(id, 1);
      alert('Added to cart');
    } finally {
      setAdding(null);
    }
  };

  return (
    <div className='min-h-screen bg-background text-foreground'>
      <Navbar />
      <main className='container mx-auto px-4 py-8'>
        <div className='flex items-center justify-between mb-6'>
          <h1 className='text-3xl font-semibold'>Store</h1>
          <a href='/cart' className='underline text-sm'>Cart</a>
        </div>
        {loading ? (
          <div>Loading…</div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {products.map((p) => (
              <div key={p.id} className='border rounded-lg overflow-hidden bg-card'>
                <a href={`/products/${p.id}`}>
                  <img src={p.imageUrl} alt={p.name} className='w-full h-48 object-cover' />
                </a>
                <div className='p-4 space-y-2'>
                  <a href={`/products/${p.id}`} className='block'>
                    <div className='font-semibold'>{p.name}</div>
                  </a>
                  <div className='text-muted-foreground text-sm line-clamp-2'>{p.description}</div>
                  <div className='flex items-center justify-between pt-2'>
                    <div className='text-lg font-semibold'>{formatPrice(p.price)}</div>
                    <Button size='sm' onClick={() => { void addToCart(p.id); }} disabled={adding === p.id}>Add to Cart</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

