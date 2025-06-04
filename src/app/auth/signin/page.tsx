import React from 'react';
import { Metadata } from 'next';
import { MainLayout } from '@/components/layout/MainLayout';
import SignInForm from '@/components/auth/SignInForm';

export const metadata: Metadata = {
  title: 'Sign In | Ormee Hair',
  description: 'Sign in to your Ormee Hair account to access your orders, wishlist, and more.',
};

export default function SignInPage() {
  return (
    <MainLayout>
      <div className="py-16 bg-background">
        <div className="container max-w-md">
          <SignInForm />
        </div>
      </div>
    </MainLayout>
  );
} 