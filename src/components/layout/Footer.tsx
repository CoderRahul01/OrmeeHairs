'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Youtube, Twitter } from 'lucide-react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { Heading, Text } from '../ui/Typography';
import { Input } from '../ui/Input';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail('');
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 800);
  };
  
  return (
    <footer className="bg-background border-t border-accent-gold/10 pt-12 pb-8">
      <Container>
        {/* Newsletter Section */}
        <div className="mb-12 text-center">
          <Heading variant="h3" className="mb-4">Join Our Community</Heading>
          <Text className="mb-6 max-w-md mx-auto">
            Subscribe to receive exclusive offers, styling tips, and updates on new products.
          </Text>
          
          {isSubmitted ? (
            <div className="bg-green-50 text-green-700 py-3 px-4 rounded-md max-w-md mx-auto">
              Thank you for subscribing! You'll receive updates soon.
            </div>
          ) : (
            <form 
              className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
              onSubmit={handleNewsletterSubmit}
            >
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" isLoading={isSubmitting}>
                Subscribe
              </Button>
            </form>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <Heading variant="h5" className="mb-4">Ormee Hair</Heading>
            <Text className="mb-4">
              Premium quality hair extensions and wigs. Transform your look with our luxury hair solutions.
            </Text>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-text-primary hover:text-accent-gold transition-colors" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-text-primary hover:text-accent-gold transition-colors" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="Youtube">
                <Youtube className="h-5 w-5 text-text-primary hover:text-accent-gold transition-colors" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-text-primary hover:text-accent-gold transition-colors" />
              </a>
            </div>
          </div>
          
          {/* Shop */}
          <div>
            <Heading variant="h5" className="mb-4">Shop</Heading>
            <ul className="space-y-2">
              <li>
                <Link href="/products/hair-extensions" className="text-text-secondary hover:text-accent-gold transition-colors">
                  Hair Extensions
                </Link>
              </li>
              <li>
                <Link href="/products/wigs" className="text-text-secondary hover:text-accent-gold transition-colors">
                  Wigs
                </Link>
              </li>
              <li>
                <Link href="/products/hair-care" className="text-text-secondary hover:text-accent-gold transition-colors">
                  Hair Care
                </Link>
              </li>
              <li>
                <Link href="/products/new-arrivals" className="text-text-secondary hover:text-accent-gold transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/products/best-sellers" className="text-text-secondary hover:text-accent-gold transition-colors">
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>
          
          {/* About */}
          <div>
            <Heading variant="h5" className="mb-4">About</Heading>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-text-secondary hover:text-accent-gold transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-text-secondary hover:text-accent-gold transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-text-secondary hover:text-accent-gold transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-text-secondary hover:text-accent-gold transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Help */}
          <div>
            <Heading variant="h5" className="mb-4">Help</Heading>
            <ul className="space-y-2">
              <li>
                <Link href="/shipping" className="text-text-secondary hover:text-accent-gold transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-text-secondary hover:text-accent-gold transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-text-secondary hover:text-accent-gold transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-text-secondary hover:text-accent-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-text-secondary hover:text-accent-gold transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-accent-gold/10 pt-8 text-center">
          <Text variant="small" className="text-text-secondary">
            &copy; {new Date().getFullYear()} Ormee Hair. All rights reserved.
          </Text>
          <Text variant="small" className="mt-2 text-text-secondary">
            Designed and developed with ♥ for the Emilio Beaufort heritage.
          </Text>
        </div>
      </Container>
    </footer>
  );
} 