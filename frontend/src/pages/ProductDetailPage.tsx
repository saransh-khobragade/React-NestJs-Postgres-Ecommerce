import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { productService, type Product } from '@/services/productService';
import { cartService } from '@/services/cartService';
import { Button } from '@/components/ui/button';

const formatPrice = (cents: number): string => `$${(cents / 100).toFixed(2)}`;

export const ProductDetailPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const id = Number(window.location.pathname.split('/').pop());
    productService.get(id).then(setProduct).finally(() => setLoading(false));
  }, []);

  const addToCart = async (): Promise<void> => {
    if (!product) return;
    setAdding(true);
    try {
      await cartService.add(product.id, 1);
      alert('Added to cart');
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className='min-h-screen bg-background text-foreground'>
      <Navbar />
      <main className='container mx-auto px-4 py-8'>
        {loading ? (
          <div>Loading…</div>
        ) : product ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <img src={product.imageUrl} alt={product.name} className='w-full h-80 object-cover rounded' />
            <div className='space-y-4'>
              <h1 className='text-3xl font-semibold'>{product.name}</h1>
              <div className='text-muted-foreground'>{product.description}</div>
              <div className='text-2xl font-bold'>{formatPrice(product.price)}</div>
              <Button onClick={() => { void addToCart(); }} disabled={adding}>Add to Cart</Button>
            </div>
          </div>
        ) : (
          <div>Product not found</div>
        )}
      </main>
    </div>
  );
};

