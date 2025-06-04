import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/Button';
import { ProductGrid } from '@/components/product/ProductGrid';

// Mock featured products
const featuredProducts = [
  {
    id: '1',
    name: 'Classic Clip-in Hair Extensions - 20"',
    slug: 'classic-clip-in-extensions-20-inch',
    price: 249.99,
    compareAtPrice: 299.99,
    images: ['https://placeholder.com/800x1000'],
    category: { name: 'Hair Extensions' },
    featured: true,
  },
  {
    id: '2',
    name: 'Natural Lace Front Wig - Medium Length',
    slug: 'natural-lace-front-wig-medium',
    price: 399.99,
    compareAtPrice: 499.99,
    images: ['https://placeholder.com/800x1000'],
    category: { name: 'Wigs' },
    featured: true,
  },
  {
    id: '3',
    name: 'Extension Care Shampoo',
    slug: 'extension-care-shampoo',
    price: 24.99,
    compareAtPrice: 29.99,
    images: ['https://placeholder.com/800x1000'],
    category: { name: 'Hair Care' },
    featured: false,
  },
  {
    id: '4',
    name: 'Premium Tape-in Hair Extensions - 18"',
    slug: 'premium-tape-in-extensions-18-inch',
    price: 189.99,
    compareAtPrice: 239.99,
    images: ['https://placeholder.com/800x1000'],
    category: { name: 'Hair Extensions' },
    featured: true,
  },
];

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-background">
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/30" />
        <div className="container relative flex flex-col items-center py-20 md:py-32 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tight text-text-primary mb-6">
            Transform Your Look<br />with Premium Hair
          </h1>
          <p className="text-text-secondary max-w-2xl mb-8 text-lg">
            Discover our collection of luxury hair extensions and wigs, designed to enhance your natural beauty and give you the confidence to shine.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="/products/hair-extensions">
                Shop Extensions
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/products/wigs">
                Explore Wigs
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-background-secondary">
        <div className="container">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary mb-8 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Hair Extensions */}
            <div className="relative overflow-hidden rounded-lg group">
              <div className="aspect-[4/5] bg-accent-gold/10">
                <Image
                  src="https://placeholder.com/800x1000"
                  alt="Hair Extensions"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/40 p-6 text-center">
                <h3 className="font-heading text-2xl font-bold text-white mb-4">Hair Extensions</h3>
                <Button variant="outline" className="bg-white/80 border-white">
                  <Link href="/products/hair-extensions">Shop Now</Link>
                </Button>
              </div>
            </div>
            
            {/* Wigs */}
            <div className="relative overflow-hidden rounded-lg group">
              <div className="aspect-[4/5] bg-accent-gold/10">
                <Image
                  src="https://placeholder.com/800x1000"
                  alt="Wigs"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/40 p-6 text-center">
                <h3 className="font-heading text-2xl font-bold text-white mb-4">Wigs</h3>
                <Button variant="outline" className="bg-white/80 border-white">
                  <Link href="/products/wigs">Shop Now</Link>
                </Button>
              </div>
            </div>
            
            {/* Hair Care */}
            <div className="relative overflow-hidden rounded-lg group">
              <div className="aspect-[4/5] bg-accent-gold/10">
                <Image
                  src="https://placeholder.com/800x1000"
                  alt="Hair Care"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/40 p-6 text-center">
                <h3 className="font-heading text-2xl font-bold text-white mb-4">Hair Care</h3>
                <Button variant="outline" className="bg-white/80 border-white">
                  <Link href="/products/hair-care">Shop Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary">
              Featured Products
            </h2>
            <Link 
              href="/products" 
              className="flex items-center text-accent-gold hover:text-accent-gold/80 transition-colors"
            >
              View All 
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <ProductGrid products={featuredProducts} columns={4} />
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-background-secondary">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-square md:aspect-auto md:h-full">
              <Image
                src="https://placeholder.com/800x800"
                alt="About Ormee Hair"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary mb-4">
                The Ormee Hair Story
              </h2>
              <p className="text-text-secondary mb-6">
                Founded with a passion for quality and beauty, Ormee Hair brings the Emilio Beaufort heritage to the world of premium hair extensions and wigs. Our mission is to provide accessible luxury that empowers women to express themselves.
              </p>
              <p className="text-text-secondary mb-6">
                Every Ormee Hair product is crafted with care, using only the finest quality materials to ensure our customers receive nothing but the best.
              </p>
              <Button variant="outline" asChild>
                <Link href="/about">
                  Read Our Story
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary mb-8 text-center">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-background-secondary p-6 rounded-lg border border-accent-gold/10">
              <div className="flex items-center space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-accent-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-text-secondary italic mb-4">
                "The quality of Ormee Hair extensions is incredible. They blend perfectly with my natural hair, and the customer service was outstanding."
              </p>
              <p className="font-medium text-text-primary">— Priya S.</p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-background-secondary p-6 rounded-lg border border-accent-gold/10">
              <div className="flex items-center space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-accent-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-text-secondary italic mb-4">
                "I was hesitant to try wigs, but Ormee Hair's natural lace front wig changed my perspective completely. It looks so natural and feels comfortable all day."
              </p>
              <p className="font-medium text-text-primary">— Aisha M.</p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-background-secondary p-6 rounded-lg border border-accent-gold/10">
              <div className="flex items-center space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-accent-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-text-secondary italic mb-4">
                "The extension care products are a game-changer. My extensions stay beautiful much longer since I started using them."
              </p>
              <p className="font-medium text-text-primary">— Neha R.</p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
