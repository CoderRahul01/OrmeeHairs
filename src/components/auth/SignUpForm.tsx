import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      // Call the API to register the user
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      
      // Redirect to sign-in page after successful registration
      router.push('/auth/signin?registered=true');
    } catch (error: any) {
      console.error('Registration error:', error);
      setError(error.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-background-secondary rounded-lg border border-accent-gold/10 shadow-sm">
      <h2 className="text-2xl font-heading font-bold text-text-primary mb-6 text-center">Create Account</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-accent-gold/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-gold"
            placeholder="Your Name"
            required
          />
        </div>
        
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
          <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-accent-gold/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-gold"
            placeholder="••••••••"
            required
            minLength={8}
          />
          <p className="text-xs text-text-secondary mt-1">
            Must be at least 8 characters
          </p>
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-1">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border border-accent-gold/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-gold"
            placeholder="••••••••"
            required
          />
        </div>
        
        <Button type="submit" fullWidth isLoading={isLoading}>
          Create Account
        </Button>
      </form>
      
      <div className="mt-6 text-center text-sm">
        <span className="text-text-secondary">Already have an account?</span>{' '}
        <Link href="/auth/signin" className="text-accent-gold hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
} 