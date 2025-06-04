import React from 'react';
import { Metadata } from 'next';
import { MainLayout } from '@/components/layout/MainLayout';
import SignUpForm from '@/components/auth/SignUpForm';

export const metadata: Metadata = {
  title: 'Create Account | Ormee Hair',
  description: 'Create an Ormee Hair account to enjoy a personalized shopping experience, track orders, and more.',
};

export default function SignUpPage() {
  return (
    <MainLayout>
      <div className="py-16 bg-background">
        <div className="container max-w-md">
          <SignUpForm />
        </div>
      </div>
    </MainLayout>
  );
} 