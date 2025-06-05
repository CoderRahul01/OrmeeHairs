'use client';

import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { CartProvider } from '@/lib/contexts/CartContext';
import { CartDrawer } from '@/components/cart/CartDrawer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col bg-background text-text-primary">
        <Header />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
} 