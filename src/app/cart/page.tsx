'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { MainLayout } from '@/components/layout/MainLayout';
import { useCart } from '@/lib/contexts/CartContext';
import { getPlaceholderImage } from '@/lib/utils/placeholders';

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();
  
  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };
  
  // Calculate shipping (free for orders over ₹1000)
  const shippingCost = subtotal > 1000 ? 0 : 150;
  
  // Calculate tax (18% GST)
  const taxRate = 0.18;
  const taxAmount = subtotal * taxRate;
  
  // Calculate total
  const total = subtotal + shippingCost + taxAmount;
  
  return (
    <MainLayout>
      <div className="py-12 bg-background">
        <div className="container">
          <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-8">
            Your Cart
          </h1>
          
          {items.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {/* Headers - Desktop only */}
                <div className="hidden md:grid grid-cols-12 gap-4 pb-2 border-b border-accent-gold/10 text-sm font-medium text-text-secondary">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>
                
                {/* Cart Items */}
                {items.map((item) => (
                  <div 
                    key={item.id}
                    className="grid md:grid-cols-12 gap-4 p-4 bg-background-secondary rounded-lg border border-accent-gold/10"
                  >
                    {/* Product Info */}
                    <div className="md:col-span-6 flex gap-4">
                      <div className="relative w-20 h-20 flex-shrink-0 bg-white rounded-md overflow-hidden">
                        <Image
                          src={item.image || getPlaceholderImage('thumbnail')}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <Link href={`/products/${item.id}`} className="font-medium text-text-primary hover:text-accent-gold">
                          {item.name}
                        </Link>
                        <div className="mt-auto flex md:hidden">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-text-secondary hover:text-accent-rose transition-colors"
                            aria-label="Remove from cart"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="md:col-span-2 flex md:justify-center items-center">
                      <div className="text-sm md:hidden font-medium text-text-secondary">Price:</div>
                      <div className="ml-auto md:ml-0 text-text-primary">{formatPrice(item.price)}</div>
                    </div>
                    
                    {/* Quantity */}
                    <div className="md:col-span-2 flex md:justify-center items-center">
                      <div className="text-sm md:hidden font-medium text-text-secondary">Quantity:</div>
                      <div className="ml-auto md:ml-0 flex items-center border border-accent-gold/20 rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-7 h-7 flex items-center justify-center text-text-primary hover:bg-background"
                          aria-label="Decrease quantity"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-10 h-7 text-center border-x border-accent-gold/20 bg-transparent text-text-primary"
                          min="1"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-text-primary hover:bg-background"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    {/* Total */}
                    <div className="md:col-span-2 flex md:justify-end items-center">
                      <div className="text-sm md:hidden font-medium text-text-secondary">Total:</div>
                      <div className="ml-auto font-medium text-text-primary">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="hidden md:flex ml-4 text-text-secondary hover:text-accent-rose transition-colors"
                        aria-label="Remove from cart"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
                
                {/* Continue Shopping Button */}
                <div className="pt-4">
                  <Link 
                    href="/products" 
                    className="inline-flex items-center text-sm text-accent-gold hover:underline"
                  >
                    <ShoppingBag className="mr-1 h-4 w-4" />
                    Continue Shopping
                  </Link>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-background-secondary p-6 rounded-lg border border-accent-gold/10">
                  <h2 className="font-heading text-xl font-bold text-text-primary mb-4">
                    Order Summary
                  </h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-text-secondary">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-text-secondary">
                      <span>Shipping</span>
                      <span>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
                    </div>
                    <div className="flex justify-between text-text-secondary">
                      <span>Tax (18% GST)</span>
                      <span>{formatPrice(taxAmount)}</span>
                    </div>
                    <div className="border-t border-accent-gold/10 pt-3 flex justify-between font-medium text-text-primary">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                  
                  <Button asChild fullWidth>
                    <Link href="/checkout">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 space-y-4">
              <ShoppingBag className="mx-auto h-16 w-16 text-accent-gold/20" />
              <h2 className="text-2xl font-medium text-text-primary">Your cart is empty</h2>
              <p className="text-text-secondary max-w-md mx-auto">
                Looks like you haven't added any products to your cart yet.
                Browse our collection to find something you'll love.
              </p>
              <div className="pt-4">
                <Button asChild>
                  <Link href="/products">
                    Browse Products
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
} 