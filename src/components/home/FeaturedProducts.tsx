'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Heading, Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { ProductGrid } from '@/components/product/ProductGrid';

interface FeaturedProductsProps {
  products: any[];
  title?: string;
  subtitle?: string;
  viewAllLink?: string;
  columns?: 2 | 3 | 4;
}

export function FeaturedProducts({ 
  products, 
  title = "Featured Products", 
  subtitle,
  viewAllLink = "/products",
  columns = 4
}: FeaturedProductsProps) {
  return (
    <Section>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div className="text-left mb-4 md:mb-0">
          <Heading variant="h2" className="mb-2">{title}</Heading>
          {subtitle && (
            <Text className="max-w-2xl">{subtitle}</Text>
          )}
        </div>
        
        <Button variant="ghost" asChild className="group self-start md:self-auto">
          <Link href={viewAllLink} className="inline-flex items-center">
            View All
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
      
      <ProductGrid products={products} columns={columns} />
    </Section>
  );
} 