'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, User, Menu, Search, LogOut } from 'lucide-react';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

import { useCart } from '@/lib/contexts/CartContext';
import { useAuth } from '@/lib/hooks/useAuth';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, isAuthenticated } = useAuth();

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
    setIsUserMenuOpen(false);
  };

  return (
    <header className="bg-background sticky top-0 z-40 border-b border-b-accent-gold/10">
      <div className="container flex h-16 items-center justify-between">
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center justify-center p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6 text-text-primary" />
        </button>
        
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="font-heading text-2xl font-bold tracking-tight text-text-primary">
              Ormee Hair
            </span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            href="/products/hair-extensions" 
            className="text-text-primary hover:text-accent-gold transition-colors"
          >
            Hair Extensions
          </Link>
          <Link 
            href="/products/wigs" 
            className="text-text-primary hover:text-accent-gold transition-colors"
          >
            Wigs
          </Link>
          <Link 
            href="/products/hair-care" 
            className="text-text-primary hover:text-accent-gold transition-colors"
          >
            Hair Care
          </Link>
          <Link 
            href="/blog" 
            className="text-text-primary hover:text-accent-gold transition-colors"
          >
            Blog
          </Link>
          <Link 
            href="/about" 
            className="text-text-primary hover:text-accent-gold transition-colors"
          >
            Our Story
          </Link>
        </nav>
        
        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          <button className="p-2" aria-label="Search">
            <Search className="h-5 w-5 text-text-primary" />
          </button>
          
          {/* User Account */}
          <div className="relative">
            <button 
              className="p-2 flex items-center" 
              aria-label="Account" 
              onClick={toggleUserMenu}
            >
              {user?.image ? (
                <Image 
                  src={user.image} 
                  alt={user.name || 'User'} 
                  width={20} 
                  height={20} 
                  className="rounded-full"
                />
              ) : (
                <User className="h-5 w-5 text-text-primary" />
              )}
            </button>
            
            {/* User Menu Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-background-secondary rounded-md shadow-lg border border-accent-gold/10 z-50">
                {isAuthenticated ? (
                  <div>
                    <div className="px-4 py-2 border-b border-accent-gold/10">
                      <p className="text-sm font-medium text-text-primary">{user?.name || 'User'}</p>
                      <p className="text-xs text-text-secondary truncate">{user?.email}</p>
                    </div>
                    <ul>
                      <li>
                        <Link 
                          href="/account" 
                          className="block px-4 py-2 text-sm text-text-primary hover:bg-background hover:text-accent-gold"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          My Account
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href="/account/orders" 
                          className="block px-4 py-2 text-sm text-text-primary hover:bg-background hover:text-accent-gold"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          My Orders
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href="/account/wishlist" 
                          className="block px-4 py-2 text-sm text-text-primary hover:bg-background hover:text-accent-gold"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Wishlist
                        </Link>
                      </li>
                      <li>
                        <button 
                          onClick={handleSignOut}
                          className="w-full text-left flex items-center px-4 py-2 text-sm text-text-primary hover:bg-background hover:text-accent-gold"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <ul>
                    <li>
                      <Link 
                        href="/auth/signin" 
                        className="block px-4 py-2 text-sm text-text-primary hover:bg-background hover:text-accent-gold"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/auth/signup" 
                        className="block px-4 py-2 text-sm text-text-primary hover:bg-background hover:text-accent-gold"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Create Account
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
          
          {/* Cart */}
          <Link href="/cart" className="p-2 relative" aria-label="Cart">
            <ShoppingBag className="h-5 w-5 text-text-primary" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent-gold text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-accent-gold/10">
          <nav className="flex flex-col py-4">
            <Link 
              href="/products/hair-extensions" 
              className="px-4 py-2 text-text-primary hover:text-accent-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Hair Extensions
            </Link>
            <Link 
              href="/products/wigs" 
              className="px-4 py-2 text-text-primary hover:text-accent-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Wigs
            </Link>
            <Link 
              href="/products/hair-care" 
              className="px-4 py-2 text-text-primary hover:text-accent-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Hair Care
            </Link>
            <Link 
              href="/blog" 
              className="px-4 py-2 text-text-primary hover:text-accent-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              href="/about" 
              className="px-4 py-2 text-text-primary hover:text-accent-gold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Our Story
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
} 