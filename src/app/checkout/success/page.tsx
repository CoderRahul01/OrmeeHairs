'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Check, ShoppingBag } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/Button';
import { getPlaceholderImage } from '@/lib/utils/placeholders';

export default function CheckoutSuccessPage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const paramOrderId = searchParams.get('orderId');
  
  // Use order ID from URL if available, otherwise generate a random one
  const [orderId, setOrderId] = useState<string>(
    paramOrderId || `ORD-${Math.floor(100000 + Math.random() * 900000)}`
  );
  
  // Get current date for order date
  const orderDate = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Track order completion event
  useEffect(() => {
    // Here you would implement analytics tracking
    console.log('Order completed:', orderId);
  }, [orderId]);

  return (
    <MainLayout>
      <div className="py-12 bg-background">
        <div className="container max-w-3xl">
          <div className="bg-background-secondary p-8 rounded-lg border border-accent-gold/10 text-center">
            <div className="w-16 h-16 bg-accent-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-accent-gold" />
            </div>
            
            <h1 className="font-heading text-3xl font-bold text-text-primary mb-2">
              Thank You for Your Order!
            </h1>
            
            <p className="text-text-secondary mb-8">
              Your order has been placed successfully. We've sent you an email with the order details.
            </p>
            
            <div className="bg-background p-6 rounded-md border border-accent-gold/10 mb-8 text-left">
              <h2 className="text-xl font-medium text-text-primary mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Order ID:</span>
                  <span className="font-medium text-text-primary">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Date:</span>
                  <span className="text-text-primary">{orderDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Payment Method:</span>
                  <span className="text-text-primary">Credit Card</span>
                </div>
                <div className="border-t border-accent-gold/10 pt-3 flex justify-between">
                  <span className="text-text-secondary">Estimated Delivery:</span>
                  <span className="font-medium text-text-primary">
                    {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {session ? (
                <Button asChild variant="outline">
                  <Link href="/account/orders">
                    View Order
                  </Link>
                </Button>
              ) : (
                <Button asChild variant="outline">
                  <Link href="/auth/signin?callbackUrl=/account/orders">
                    Sign in to Track Order
                  </Link>
                </Button>
              )}
              <Button asChild>
                <Link href="/products">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 