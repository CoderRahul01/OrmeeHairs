'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      
      setSuccess(true);
    } catch (error: any) {
      console.error('Password reset error:', error);
      setError(error.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-md w-full mx-auto p-6 bg-background-secondary rounded-lg border border-accent-gold/10 shadow-sm">
        <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 text-center">Check Your Email</h2>
        <p className="text-text-secondary mb-6 text-center">
          If an account exists with the email you provided, we've sent instructions to reset your password.
        </p>
        <p className="text-text-secondary mb-6 text-center">
          Please check your inbox and follow the link to reset your password.
        </p>
        <Link href="/auth/signin" className="block text-center text-accent-gold hover:underline">
          Return to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-background-secondary rounded-lg border border-accent-gold/10 shadow-sm">
      <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 text-center">Reset Password</h2>
      <p className="text-text-secondary mb-6 text-center">
        Enter your email address and we'll send you instructions to reset your password.
      </p>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-accent-gold/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-gold"
            placeholder="your@email.com"
            required
          />
        </div>
        
        <Button type="submit" fullWidth isLoading={isLoading}>
          Send Reset Instructions
        </Button>
      </form>
      
      <div className="mt-6 text-center text-sm">
        <Link href="/auth/signin" className="text-accent-gold hover:underline">
          Back to Sign In
        </Link>
      </div>
    </div>
  );
} 