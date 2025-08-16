import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  return (
    <header className='border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50'>
      <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
        <a href='/' className='text-xl font-semibold'>Mini Amazon</a>
        <div className='space-x-2'>
          {user ? (
            <>
              <a href='/' className='text-sm underline'>Store</a>
              <a href='/cart' className='text-sm underline'>Cart</a>
              <Button variant='ghost' onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <a href='/' className='text-sm underline'>Store</a>
              <a href='/cart' className='text-sm underline'>Cart</a>
              <a href='/auth' className='text-sm underline'>Login</a>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

