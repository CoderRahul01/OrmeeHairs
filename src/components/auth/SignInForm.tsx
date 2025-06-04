import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
        setIsLoading(false);
        return;
      }

      // Redirect to the home page after successful login
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-background-secondary rounded-lg border border-accent-gold/10 shadow-sm">
      <h2 className="text-2xl font-heading font-bold text-text-primary mb-6 text-center">Sign In</h2>
      
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
        
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-text-primary">
              Password
            </label>
            <Link href="/auth/forgot-password" className="text-xs text-accent-gold hover:underline">
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-accent-gold/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-gold"
            placeholder="••••••••"
            required
          />
        </div>
        
        <Button type="submit" fullWidth isLoading={isLoading}>
          Sign In
        </Button>
      </form>
      
      <div className="mt-6 text-center text-sm">
        <span className="text-text-secondary">Don't have an account?</span>{' '}
        <Link href="/auth/signup" className="text-accent-gold hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
} 