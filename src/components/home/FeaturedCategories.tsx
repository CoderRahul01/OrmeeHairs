'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Heading, Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

interface Category {
  name: string;
  slug: string;
  description: string;
  image: string;
}

interface FeaturedCategoriesProps {
  categories: Category[];
  title?: string;
  subtitle?: string;
}

export function FeaturedCategories({ 
  categories, 
  title = "Shop by Category", 
  subtitle 
}: FeaturedCategoriesProps) {
  return (
    <Section variant="secondary">
      <div className="text-center mb-10">
        <Heading variant="h2" className="mb-3">{title}</Heading>
        {subtitle && (
          <Text className="max-w-2xl mx-auto">{subtitle}</Text>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div key={category.slug} className="group relative overflow-hidden rounded-lg">
            <div className="aspect-[4/5] relative bg-background-secondary">
              <ImageWithFallback
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                fallbackType="cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col items-center justify-end p-6 text-white text-center">
                <Heading variant="h3" className="text-white mb-2">{category.name}</Heading>
                <Text className="text-white/80 mb-4 max-w-xs">{category.description}</Text>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white/20">
                  <Link href={`/products?category=${category.slug}`}>
                    Shop Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Button variant="ghost" asChild className="group">
          <Link href="/products" className="inline-flex items-center">
            View All Categories
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </Section>
  );
} 