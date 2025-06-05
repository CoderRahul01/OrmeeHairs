'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Youtube, Twitter } from 'lucide-react';
import { Button } from '../ui/Button';

export function Footer() {
  return (
    <footer className="bg-background border-t border-accent-gold/10 pt-12 pb-8">
      <div className="container">
        {/* Newsletter Section */}
        <div className="mb-12 text-center">
          <h3 className="font-heading text-2xl mb-4 text-text-primary">Join Our Community</h3>
          <p className="text-text-secondary mb-6 max-w-md mx-auto">
            Subscribe to receive exclusive offers, styling tips, and updates on new products.
          </p>
          <form 
            className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              // Newsletter signup logic would go here
            }}
          >
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 h-10 px-4 rounded-md border border-accent-gold/20 focus:outline-none focus:ring-2 focus:ring-accent-gold"
              required
            />
            <Button type="submit" size="default">
              Subscribe
            </Button>
          </form>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h4 className="font-heading text-lg mb-4 text-text-primary">Ormee Hair</h4>
            <p className="text-text-secondary mb-4">
              Premium quality hair extensions and wigs. Transform your look with our luxury hair solutions.
            </p>
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
            <h4 className="font-heading text-lg mb-4 text-text-primary">Shop</h4>
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
            <h4 className="font-heading text-lg mb-4 text-text-primary">About</h4>
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
            <h4 className="font-heading text-lg mb-4 text-text-primary">Help</h4>
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
        <div className="border-t border-accent-gold/10 pt-8 text-center text-text-secondary text-sm">
          <p>&copy; {new Date().getFullYear()} Ormee Hair. All rights reserved.</p>
          <p className="mt-2">
            Designed and developed with ♥ for the Emilio Beaufort heritage.
          </p>
        </div>
      </div>
    </footer>
  );
} 