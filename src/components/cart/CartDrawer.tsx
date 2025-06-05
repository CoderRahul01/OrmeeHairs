'use client';

import React from 'react';
import Link from 'next/link';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/lib/contexts/CartContext';
import { Button } from '@/components/ui/Button';
import { Heading, Text } from '@/components/ui/Typography';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

export function CartDrawer() {
  const { 
    isOpen, 
    toggleCart, 
    items, 
    removeItem, 
    updateQuantity, 
    clearCart, 
    subtotal, 
    totalItems 
  } = useCart();

  return (
    <div 
      className={`fixed inset-0 z-50 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={() => toggleCart(false)}
        aria-hidden="true"
      />
      
      {/* Cart Panel */}
      <div 
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-background shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-accent-gold/10 px-4 py-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-accent-gold" />
              <Heading variant="h5">
                Your Cart ({totalItems})
              </Heading>
            </div>
            <button
              onClick={() => toggleCart(false)}
              className="rounded-full p-1 text-text-primary hover:bg-background-secondary"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center py-12">
                <ShoppingBag className="h-12 w-12 text-text-secondary/50 mb-4" />
                <Heading variant="h5" className="mb-2">Your cart is empty</Heading>
                <Text className="mb-6">Looks like you haven't added any items to your cart yet.</Text>
                <Button onClick={() => toggleCart(false)} asChild>
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </div>
            ) : (
              <ul className="divide-y divide-accent-gold/10">
                {items.map((item) => (
                  <li key={item.id} className="py-4 flex gap-4">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-background-secondary">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        fallbackType="thumbnail"
                      />
                    </div>
                    
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between text-base">
                        <Text as="h3" weight="medium" className="line-clamp-1">
                          {item.name}
                        </Text>
                        <Text weight="medium" className="ml-4">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </Text>
                      </div>
                      
                      <Text variant="small" className="mt-1 text-text-secondary line-clamp-1">
                        ₹{item.price.toLocaleString()} each
                      </Text>
                      
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center border border-accent-gold/20 rounded-md">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="w-8 h-8 flex items-center justify-center text-text-primary hover:bg-background-secondary"
                            aria-label="Decrease quantity"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 h-8 flex items-center justify-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-text-primary hover:bg-background-secondary"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-text-secondary hover:text-accent-rose transition-colors"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {items.length > 0 && (
            <>
              {/* Summary */}
              <div className="border-t border-accent-gold/10 px-4 py-4">
                <div className="flex justify-between mb-2">
                  <Text>Subtotal</Text>
                  <Text weight="medium">₹{subtotal.toLocaleString()}</Text>
                </div>
                <Text variant="small" className="text-text-secondary mb-4">
                  Shipping and taxes calculated at checkout
                </Text>
                
                <div className="space-y-2">
                  <Button fullWidth asChild>
                    <Link href="/checkout">
                      Proceed to Checkout
                    </Link>
                  </Button>
                  <Button variant="outline" fullWidth onClick={() => toggleCart(false)} asChild>
                    <Link href="/cart">
                      View Cart
                    </Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 