'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Heading, Text } from '@/components/ui/Typography';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedCategories } from '@/components/home/FeaturedCategories';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';

// Mock featured products
const featuredProducts = [
  {
    id: '1',
    name: 'Classic Clip-in Hair Extensions - 20"',
    slug: 'classic-clip-in-extensions-20-inch',
    price: 249.99,
    compareAtPrice: 299.99,
    images: ['https://images.unsplash.com/photo-1595301820311-0fae1728232e?q=80&w=800&auto=format&fit=crop'],
    category: { name: 'Hair Extensions', slug: 'hair-extensions' },
    featured: true,
  },
  {
    id: '2',
    name: 'Natural Lace Front Wig - Medium Length',
    slug: 'natural-lace-front-wig-medium',
    price: 399.99,
    compareAtPrice: 499.99,
    images: ['https://images.unsplash.com/photo-1562766479-eedba5ec8353?q=80&w=800&auto=format&fit=crop'],
    category: { name: 'Wigs', slug: 'wigs' },
    featured: true,
  },
  {
    id: '3',
    name: 'Extension Care Shampoo',
    slug: 'extension-care-shampoo',
    price: 24.99,
    compareAtPrice: 29.99,
    images: ['https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?q=80&w=800&auto=format&fit=crop'],
    category: { name: 'Hair Care', slug: 'hair-care' },
    featured: false,
  },
  {
    id: '4',
    name: 'Premium Tape-in Hair Extensions - 18"',
    slug: 'premium-tape-in-extensions-18-inch',
    price: 189.99,
    compareAtPrice: 239.99,
    images: ['https://images.unsplash.com/photo-1618938225888-61c05e1d2734?q=80&w=800&auto=format&fit=crop'],
    category: { name: 'Hair Extensions', slug: 'hair-extensions' },
    featured: true,
  },
];

// Categories data
const categories = [
  {
    name: 'Hair Extensions',
    slug: 'hair-extensions',
    description: 'Premium quality extensions that blend seamlessly with your natural hair',
    image: 'https://images.unsplash.com/photo-1601497211164-8e89df0e8b9c?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Wigs',
    slug: 'wigs',
    description: 'Natural-looking wigs for a complete transformation',
    image: 'https://images.unsplash.com/photo-1563539858-f9516e1e4dc4?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Hair Care',
    slug: 'hair-care',
    description: 'Specialized products to keep your hair extensions and wigs looking their best',
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=800&auto=format&fit=crop',
  },
];

// New arrivals products
const newArrivals = [
  {
    id: '5',
    name: 'Ombre Clip-in Hair Extensions - 22"',
    slug: 'ombre-clip-in-extensions-22-inch',
    price: 279.99,
    compareAtPrice: null,
    images: ['https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=800&auto=format&fit=crop'],
    category: { name: 'Hair Extensions', slug: 'hair-extensions' },
    featured: false,
  },
  {
    id: '6',
    name: 'Curly Full Lace Wig - Natural Black',
    slug: 'curly-full-lace-wig-natural-black',
    price: 459.99,
    compareAtPrice: 499.99,
    images: ['https://images.unsplash.com/photo-1626954079979-ec4f7b05e032?q=80&w=800&auto=format&fit=crop'],
    category: { name: 'Wigs', slug: 'wigs' },
    featured: false,
  },
  {
    id: '7',
    name: 'Deep Conditioning Treatment',
    slug: 'deep-conditioning-treatment',
    price: 34.99,
    compareAtPrice: null,
    images: ['https://images.unsplash.com/photo-1599751449628-8e4d4b237f6b?q=80&w=800&auto=format&fit=crop'],
    category: { name: 'Hair Care', slug: 'hair-care' },
    featured: false,
  },
  {
    id: '8',
    name: 'Balayage Halo Hair Extensions - 20"',
    slug: 'balayage-halo-extensions-20-inch',
    price: 199.99,
    compareAtPrice: 249.99,
    images: ['https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=800&auto=format&fit=crop'],
    category: { name: 'Hair Extensions', slug: 'hair-extensions' },
    featured: false,
  },
];

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <HeroSection 
        title="Transform Your Look with Premium Hair"
        subtitle="Discover our collection of luxury hair extensions and wigs, designed to enhance your natural beauty and give you the confidence to shine."
        image="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1200&auto=format&fit=crop"
        primaryButtonText="Shop Extensions"
        primaryButtonLink="/products/hair-extensions"
        secondaryButtonText="Explore Wigs"
        secondaryButtonLink="/products/wigs"
        badge="100% Human Hair\nPremium quality, ethically sourced"
      />

      {/* Featured Categories Section */}
      <FeaturedCategories 
        categories={categories} 
        subtitle="Browse our premium collections crafted for quality and beauty"
      />

      {/* Featured Products Section */}
      <FeaturedProducts 
        products={featuredProducts} 
        subtitle="Handpicked selections from our premium collection"
      />

      {/* Benefits Section */}
      <Section variant="accent">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-gold/10 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-gold">
                <path d="M8 20h8m-4-5v5m-7-5a5 5 0 1 1 10 0" />
                <path d="M17.8 12a7 7 0 0 0-11.4-8" />
              </svg>
            </div>
            <Heading variant="h5" className="mb-2">Premium Quality</Heading>
            <Text>We source only the finest 100% human hair for all our products.</Text>
          </div>
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-gold/10 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-gold">
                <path d="M12 15 8.7 10.3a2 2 0 1 1 3.98-4 2 2 0 0 1 3.32.6"/>
                <circle cx="12" cy="12" r="10"/>
              </svg>
            </div>
            <Heading variant="h5" className="mb-2">Ethical Sourcing</Heading>
            <Text>We ensure our hair is ethically sourced with fair compensation to donors.</Text>
          </div>
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-gold/10 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-gold">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
            </div>
            <Heading variant="h5" className="mb-2">Customer Satisfaction</Heading>
            <Text>30-day satisfaction guarantee with responsive customer support.</Text>
          </div>
        </div>
      </Section>

      {/* New Arrivals Section */}
      <FeaturedProducts 
        products={newArrivals} 
        title="New Arrivals"
        subtitle="The latest additions to our premium collection"
        viewAllLink="/products/new-arrivals"
      />

      {/* About Section */}
      <Section variant="secondary">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square md:aspect-auto md:h-full">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=800&auto=format&fit=crop"
              alt="About Ormee Hair"
              fill
              className="object-cover rounded-lg"
              fallbackType="cover"
            />
          </div>
          <div>
            <Heading variant="h2" className="mb-4">
              The Ormee Hair Story
            </Heading>
            <Text className="mb-6">
              Founded with a passion for quality and beauty, Ormee Hair brings the Emilio Beaufort heritage to the world of premium hair extensions and wigs. Our mission is to provide accessible luxury that empowers women to express themselves.
            </Text>
            <Text className="mb-6">
              Every Ormee Hair product is crafted with care, using only the finest quality materials to ensure our customers receive nothing but the best.
            </Text>
            <Button variant="outline" asChild>
              <Link href="/about">
                Read Our Story
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section>
        <Heading variant="h2" className="mb-8 text-center">
          What Our Customers Say
        </Heading>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-background-secondary p-6 rounded-lg border border-accent-gold/10">
            <div className="flex items-center space-x-1 mb-4 text-accent-gold">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <Text className="italic mb-4">
              "The quality of Ormee Hair extensions is incredible. They blend perfectly with my natural hair, and the customer service was outstanding."
            </Text>
            <Text weight="medium">— Priya S.</Text>
          </div>
          
          {/* Testimonial 2 */}
          <div className="bg-background-secondary p-6 rounded-lg border border-accent-gold/10">
            <div className="flex items-center space-x-1 mb-4 text-accent-gold">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <Text className="italic mb-4">
              "I was hesitant to try wigs, but Ormee Hair's natural lace front wig changed my perspective completely. It looks so natural and feels comfortable all day."
            </Text>
            <Text weight="medium">— Aisha M.</Text>
          </div>
          
          {/* Testimonial 3 */}
          <div className="bg-background-secondary p-6 rounded-lg border border-accent-gold/10">
            <div className="flex items-center space-x-1 mb-4 text-accent-gold">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <Text className="italic mb-4">
              "The extension care products are a game-changer. My extensions stay beautiful much longer since I started using them."
            </Text>
            <Text weight="medium">— Neha R.</Text>
          </div>
        </div>
      </Section>
      
      {/* CTA Section */}
      <Section variant="accent" spacing="xl" className="text-center">
        <Heading variant="h2" className="mb-4">Ready to Transform Your Look?</Heading>
        <Text variant="lead" className="max-w-2xl mx-auto mb-8">
          Join thousands of satisfied customers who have discovered the Ormee Hair difference. Premium quality, ethically sourced hair products delivered to your door.
        </Text>
        <Button size="lg" asChild>
          <Link href="/products">
            Shop Now
          </Link>
        </Button>
      </Section>
    </MainLayout>
  );
}
