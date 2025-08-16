import React from 'react';
import { Navbar } from '@/components/layout/Navbar';

export const OrderConfirmationPage: React.FC = () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  return (
    <div className='min-h-screen bg-background text-foreground'>
      <Navbar />
      <main className='container mx-auto px-4 py-16 max-w-xl text-center space-y-4'>
        <h1 className='text-3xl font-semibold'>Order Confirmed</h1>
        <p className='text-muted-foreground'>Your order #{id ?? ''} has been placed successfully.</p>
        <a href='/' className='underline'>Continue shopping</a>
      </main>
    </div>
  );
};

