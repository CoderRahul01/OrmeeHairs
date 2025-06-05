'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, ChevronRight } from 'lucide-react';
import Image from 'next/image';

import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/lib/contexts/CartContext';
import { getPlaceholderImage } from '@/lib/utils/placeholders';

// Checkout steps
const STEPS = {
  SHIPPING: 0,
  PAYMENT: 1,
  REVIEW: 2,
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(STEPS.SHIPPING);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  // If cart is empty, redirect to cart page
  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

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

  // Handle form input changes
  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(STEPS.PAYMENT);
  };

  // Handle payment method selection
  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  // Handle payment submission
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(STEPS.REVIEW);
  };

  // Handle order submission
  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    setError('');

    try {
      // Prepare order data
      const orderData = {
        items: items.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        shippingInfo,
        paymentMethod,
        subtotal,
        shippingCost,
        taxAmount,
        total
      };

      // Send order to API
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to create order');
      }
      
      // Clear cart
      clearCart();
      
      // Redirect to success page with order ID
      router.push(`/checkout/success?orderId=${result.orderId}`);
    } catch (error) {
      console.error('Error placing order:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      setIsProcessing(false);
    }
  };

  return (
    <MainLayout>
      <div className="py-12 bg-background">
        <div className="container">
          <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-8">
            Checkout
          </h1>

          {/* Checkout Progress */}
          <div className="mb-10">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= STEPS.SHIPPING ? 'bg-accent-gold text-white' : 'bg-background-secondary text-text-secondary'
                }`}>
                  {currentStep > STEPS.SHIPPING ? <Check className="h-4 w-4" /> : '1'}
                </div>
                <span className="mt-2 text-sm text-text-secondary">Shipping</span>
              </div>
              <div className="flex-1 h-px bg-accent-gold/20 mx-2"></div>
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= STEPS.PAYMENT ? 'bg-accent-gold text-white' : 'bg-background-secondary text-text-secondary'
                }`}>
                  {currentStep > STEPS.PAYMENT ? <Check className="h-4 w-4" /> : '2'}
                </div>
                <span className="mt-2 text-sm text-text-secondary">Payment</span>
              </div>
              <div className="flex-1 h-px bg-accent-gold/20 mx-2"></div>
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= STEPS.REVIEW ? 'bg-accent-gold text-white' : 'bg-background-secondary text-text-secondary'
                }`}>
                  {currentStep > STEPS.REVIEW ? <Check className="h-4 w-4" /> : '3'}
                </div>
                <span className="mt-2 text-sm text-text-secondary">Review</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-background-secondary p-6 rounded-lg border border-accent-gold/10">
                {/* Shipping Information Form */}
                {currentStep === STEPS.SHIPPING && (
                  <div>
                    <h2 className="font-heading text-xl font-medium text-text-primary mb-6">
                      Shipping Information
                    </h2>
                    <form onSubmit={handleShippingSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-text-secondary mb-1">
                            First Name
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            required
                            value={shippingInfo.firstName}
                            onChange={handleShippingInfoChange}
                            className="w-full px-3 py-2 bg-background border border-accent-gold/20 rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-gold/30"
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-text-secondary mb-1">
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            required
                            value={shippingInfo.lastName}
                            onChange={handleShippingInfoChange}
                            className="w-full px-3 py-2 bg-background border border-accent-gold/20 rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-gold/30"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={shippingInfo.email}
                            onChange={handleShippingInfoChange}
                            className="w-full px-3 py-2 bg-background border border-accent-gold/20 rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-gold/30"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-text-secondary mb-1">
                            Phone
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            value={shippingInfo.phone}
                            onChange={handleShippingInfoChange}
                            className="w-full px-3 py-2 bg-background border border-accent-gold/20 rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-gold/30"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label htmlFor="address" className="block text-sm font-medium text-text-secondary mb-1">
                            Address
                          </label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            required
                            value={shippingInfo.address}
                            onChange={handleShippingInfoChange}
                            className="w-full px-3 py-2 bg-background border border-accent-gold/20 rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-gold/30"
                          />
                        </div>
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-text-secondary mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            required
                            value={shippingInfo.city}
                            onChange={handleShippingInfoChange}
                            className="w-full px-3 py-2 bg-background border border-accent-gold/20 rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-gold/30"
                          />
                        </div>
                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-text-secondary mb-1">
                            State
                          </label>
                          <input
                            type="text"
                            id="state"
                            name="state"
                            required
                            value={shippingInfo.state}
                            onChange={handleShippingInfoChange}
                            className="w-full px-3 py-2 bg-background border border-accent-gold/20 rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-gold/30"
                          />
                        </div>
                        <div>
                          <label htmlFor="pincode" className="block text-sm font-medium text-text-secondary mb-1">
                            Pincode
                          </label>
                          <input
                            type="text"
                            id="pincode"
                            name="pincode"
                            required
                            value={shippingInfo.pincode}
                            onChange={handleShippingInfoChange}
                            className="w-full px-3 py-2 bg-background border border-accent-gold/20 rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-gold/30"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button type="submit">
                          Continue to Payment
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Payment Method Form */}
                {currentStep === STEPS.PAYMENT && (
                  <div>
                    <h2 className="font-heading text-xl font-medium text-text-primary mb-6">
                      Payment Method
                    </h2>
                    <form onSubmit={handlePaymentSubmit}>
                      <div className="space-y-4 mb-6">
                        <div>
                          <label className="flex items-center p-4 border border-accent-gold/20 rounded-md cursor-pointer hover:bg-background">
                            <input
                              type="radio"
                              name="paymentMethod"
                              checked={paymentMethod === 'card'}
                              onChange={() => handlePaymentMethodChange('card')}
                              className="h-4 w-4 text-accent-gold"
                            />
                            <span className="ml-2 text-text-primary">Credit / Debit Card</span>
                          </label>
                        </div>
                        <div>
                          <label className="flex items-center p-4 border border-accent-gold/20 rounded-md cursor-pointer hover:bg-background">
                            <input
                              type="radio"
                              name="paymentMethod"
                              checked={paymentMethod === 'upi'}
                              onChange={() => handlePaymentMethodChange('upi')}
                              className="h-4 w-4 text-accent-gold"
                            />
                            <span className="ml-2 text-text-primary">UPI</span>
                          </label>
                        </div>
                        <div>
                          <label className="flex items-center p-4 border border-accent-gold/20 rounded-md cursor-pointer hover:bg-background">
                            <input
                              type="radio"
                              name="paymentMethod"
                              checked={paymentMethod === 'cod'}
                              onChange={() => handlePaymentMethodChange('cod')}
                              className="h-4 w-4 text-accent-gold"
                            />
                            <span className="ml-2 text-text-primary">Cash on Delivery</span>
                          </label>
                        </div>
                      </div>

                      {/* Payment details would be shown based on selected method */}
                      {paymentMethod === 'card' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="md:col-span-2">
                            <label htmlFor="cardNumber" className="block text-sm font-medium text-text-secondary mb-1">
                              Card Number
                            </label>
                            <input
                              type="text"
                              id="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              className="w-full px-3 py-2 bg-background border border-accent-gold/20 rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-gold/30"
                            />
                          </div>
                          <div>
                            <label htmlFor="expiry" className="block text-sm font-medium text-text-secondary mb-1">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              id="expiry"
                              placeholder="MM/YY"
                              className="w-full px-3 py-2 bg-background border border-accent-gold/20 rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-gold/30"
                            />
                          </div>
                          <div>
                            <label htmlFor="cvv" className="block text-sm font-medium text-text-secondary mb-1">
                              CVV
                            </label>
                            <input
                              type="text"
                              id="cvv"
                              placeholder="123"
                              className="w-full px-3 py-2 bg-background border border-accent-gold/20 rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-gold/30"
                            />
                          </div>
                        </div>
                      )}
                      
                      {paymentMethod === 'upi' && (
                        <div className="mb-6">
                          <label htmlFor="upiId" className="block text-sm font-medium text-text-secondary mb-1">
                            UPI ID
                          </label>
                          <input
                            type="text"
                            id="upiId"
                            placeholder="username@upi"
                            className="w-full px-3 py-2 bg-background border border-accent-gold/20 rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-gold/30"
                          />
                        </div>
                      )}

                      <div className="flex justify-between">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setCurrentStep(STEPS.SHIPPING)}
                        >
                          Back
                        </Button>
                        <Button type="submit">
                          Review Order
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Order Review */}
                {currentStep === STEPS.REVIEW && (
                  <div>
                    <h2 className="font-heading text-xl font-medium text-text-primary mb-6">
                      Review Your Order
                    </h2>
                    
                    <div className="space-y-6">
                      {/* Shipping Information */}
                      <div>
                        <h3 className="text-md font-medium text-text-primary mb-2">Shipping Address</h3>
                        <div className="p-4 bg-background rounded-md border border-accent-gold/10">
                          <p className="text-text-primary">
                            {shippingInfo.firstName} {shippingInfo.lastName}
                          </p>
                          <p className="text-text-secondary">{shippingInfo.address}</p>
                          <p className="text-text-secondary">
                            {shippingInfo.city}, {shippingInfo.state} {shippingInfo.pincode}
                          </p>
                          <p className="text-text-secondary mt-1">
                            {shippingInfo.email} | {shippingInfo.phone}
                          </p>
                        </div>
                      </div>
                      
                      {/* Payment Method */}
                      <div>
                        <h3 className="text-md font-medium text-text-primary mb-2">Payment Method</h3>
                        <div className="p-4 bg-background rounded-md border border-accent-gold/10">
                          <p className="text-text-primary">
                            {paymentMethod === 'card' && 'Credit / Debit Card'}
                            {paymentMethod === 'upi' && 'UPI'}
                            {paymentMethod === 'cod' && 'Cash on Delivery'}
                          </p>
                        </div>
                      </div>
                      
                      {/* Order Items */}
                      <div>
                        <h3 className="text-md font-medium text-text-primary mb-2">Order Items</h3>
                        <div className="space-y-3">
                          {items.map((item) => (
                            <div key={item.id} className="flex justify-between p-3 bg-background rounded-md border border-accent-gold/10">
                              <div className="flex items-center">
                                <div className="font-medium text-text-primary">{item.name}</div>
                                <div className="ml-2 text-sm text-text-secondary">x{item.quantity}</div>
                              </div>
                              <div className="text-text-primary">{formatPrice(item.price * item.quantity)}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Error message */}
                    {error && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
                        {error}
                      </div>
                    )}
                    
                    <div className="mt-6 flex justify-between">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setCurrentStep(STEPS.PAYMENT)}
                      >
                        Back
                      </Button>
                      <Button 
                        onClick={handlePlaceOrder}
                        isLoading={isProcessing}
                        disabled={isProcessing}
                      >
                        Place Order
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-background-secondary p-6 rounded-lg border border-accent-gold/10 sticky top-24">
                <h2 className="font-heading text-xl font-bold text-text-primary mb-4">
                  Order Summary
                </h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-text-secondary">
                    <span>Subtotal ({items.length} items)</span>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 