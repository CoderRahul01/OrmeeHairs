import React from 'react';
import { Metadata } from 'next';
import { MainLayout } from '@/components/layout/MainLayout';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

export const metadata: Metadata = {
  title: 'Reset Password | Ormee Hair',
  description: 'Reset your Ormee Hair account password to regain access to your account.',
};

export default function ForgotPasswordPage() {
  return (
    <MainLayout>
      <div className="py-16 bg-background">
        <div className="container max-w-md">
          <ForgotPasswordForm />
        </div>
      </div>
    </MainLayout>
  );
} 