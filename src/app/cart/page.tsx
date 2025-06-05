'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, PackageCheck } from 'lucide-react';

import { MainLayout } from '@/components/layout/MainLayout';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Heading, Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { useCart } from '@/lib/contexts/CartContext';

export default function CartPage() {
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    clearCart, 
    subtotal 
  } = useCart();
  
  const [mounted, setMounted] = useState(false);
  
  // This ensures the component only renders client-side to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Calculate shipping (free over ₹999)
  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 149;
  
  // Calculate tax (5% of subtotal)
  const tax = Math.round(subtotal * 0.05);
  
  // Calculate order total
  const total = subtotal + shipping + tax;
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };
  
  if (!mounted) {
    return null;
  }
  
  return (
    <MainLayout>
      <Container>
        <div className="py-6">
          <Heading variant="h2" className="mb-8">Your Shopping Cart</Heading>
          
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="mb-6 flex justify-center">
                <ShoppingBag className="h-16 w-16 text-text-secondary/30" />
              </div>
              <Heading variant="h4" className="mb-4">Your cart is empty</Heading>
              <Text className="mb-8 max-w-md mx-auto">
                Looks like you haven't added any items to your cart yet. Continue shopping to find products you'll love.
              </Text>
              <Button asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items (Left) */}
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-0">
                    <div className="border-b border-accent-gold/10 p-4 flex justify-between items-center">
                      <Text weight="medium">
                        {items.length} {items.length === 1 ? 'Item' : 'Items'}
                      </Text>
                      <button 
                        onClick={clearCart}
                        className="text-sm text-accent-gold hover:underline"
                      >
                        Clear Cart
                      </button>
                    </div>
                    
                    <ul className="divide-y divide-accent-gold/10">
                      {items.map((item) => (
                        <li key={item.id} className="p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-4">
                          <div className="flex gap-4 flex-1">
                            {/* Product Image */}
                            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-background-secondary">
                              <ImageWithFallback
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                                fallbackType="thumbnail"
                              />
                            </div>
                            
                            {/* Product Details */}
                            <div className="flex flex-col flex-1 min-w-0">
                              <Link 
                                href={`/products/${item.id}`}
                                className="font-medium text-text-primary hover:text-accent-gold transition-colors line-clamp-1"
                              >
                                {item.name}
                              </Link>
                              
                              <Text variant="small" className="text-text-secondary mt-1">
                                {formatCurrency(item.price)} each
                              </Text>
                              
                              <div className="flex items-center justify-between mt-4 md:mt-2">
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
                                
                                <div className="md:hidden">
                                  <Text weight="medium">
                                    {formatCurrency(item.price * item.quantity)}
                                  </Text>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Price and Remove (Desktop) */}
                          <div className="hidden md:flex flex-col items-end gap-4">
                            <Text weight="medium">
                              {formatCurrency(item.price * item.quantity)}
                            </Text>
                            
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-text-secondary hover:text-accent-rose transition-colors"
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          
                          {/* Remove Button (Mobile) */}
                          <div className="md:hidden">
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-sm text-accent-rose hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <div className="mt-4">
                  <Button variant="outline" asChild className="flex items-center">
                    <Link href="/products">
                      <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                      Continue Shopping
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* Order Summary (Right) */}
              <div>
                <Card>
                  <CardContent className="p-6">
                    <Heading variant="h5" className="mb-4">Order Summary</Heading>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <Text>Subtotal</Text>
                        <Text weight="medium">{formatCurrency(subtotal)}</Text>
                      </div>
                      
                      <div className="flex justify-between">
                        <Text>Shipping</Text>
                        <Text weight="medium">
                          {shipping === 0 ? 'Free' : formatCurrency(shipping)}
                        </Text>
                      </div>
                      
                      <div className="flex justify-between">
                        <Text>Tax (5%)</Text>
                        <Text weight="medium">{formatCurrency(tax)}</Text>
                      </div>
                      
                      <div className="border-t border-accent-gold/10 pt-3 flex justify-between">
                        <Text weight="medium">Total</Text>
                        <Text weight="bold" className="text-lg">{formatCurrency(total)}</Text>
                      </div>
                    </div>
                    
                    <Button fullWidth asChild>
                      <Link href="/checkout">
                        Proceed to Checkout
                      </Link>
                    </Button>
                    
                    {/* Shipping Information */}
                    <div className="mt-6 bg-background-secondary rounded-md p-4">
                      <div className="flex gap-2 mb-2">
                        <PackageCheck className="h-5 w-5 text-accent-gold flex-shrink-0" />
                        <Text weight="medium">Free shipping on orders over ₹999</Text>
                      </div>
                      <Text variant="small" className="text-text-secondary">
                        Most orders are delivered within 3-5 business days
                      </Text>
                    </div>
                    
                    {/* Payment Methods */}
                    <div className="mt-4">
                      <Text variant="small" className="text-text-secondary text-center">
                        We accept all major credit cards, UPI, and net banking. 
                        Secure payments processed by Razorpay.
                      </Text>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </Container>
    </MainLayout>
  );
} 