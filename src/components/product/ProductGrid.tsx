'use client';

import React from 'react';
import { ProductCard } from './ProductCard';
import { getPlaceholderImage } from '@/lib/utils/placeholders';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category?: {
    name: string;
  };
  featured: boolean;
}

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
}

export function ProductGrid({ products, columns = 4 }: ProductGridProps) {
  const gridClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${gridClasses[columns]} gap-4 md:gap-6 lg:gap-8`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          slug={product.slug}
          price={product.price}
          compareAtPrice={product.compareAtPrice}
          image={product.images[0] || getPlaceholderImage('product')}
          category={product.category?.name}
          isFeatured={product.featured}
        />
      ))}
    </div>
  );
} 