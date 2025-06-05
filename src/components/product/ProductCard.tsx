'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart } from 'lucide-react';

import { Button } from '../ui/Button';
import { ImageWithFallback } from '../ui/ImageWithFallback';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Text } from '../ui/Typography';
import { useCart } from '../../lib/contexts/CartContext';

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  category?: string;
  isFeatured?: boolean;
}

export function ProductCard({ 
  id, 
  name, 
  slug, 
  price, 
  compareAtPrice, 
  image, 
  category,
  isFeatured,
}: ProductCardProps) {
  const { addItem } = useCart();
  
  const discount = compareAtPrice ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100) : 0;
  
  const handleAddToCart = () => {
    addItem({
      id,
      name,
      price,
      quantity: 1,
      image,
    });
  };
  
  return (
    <div className="group relative">
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
        {/* Discount badge */}
        {discount > 0 && (
          <Badge variant="secondary">
            {discount}% OFF
          </Badge>
        )}
        
        {/* Featured badge */}
        {isFeatured && (
          <Badge variant="default">
            Featured
          </Badge>
        )}
      </div>
      
      {/* Wishlist button */}
      <button 
        className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white p-1.5 rounded-full shadow-sm transition-colors"
        aria-label="Add to wishlist"
      >
        <Heart className="h-4 w-4 text-text-primary" />
      </button>
      
      {/* Product image with link */}
      <Link href={`/products/${slug}`} className="block overflow-hidden rounded-md">
        <div className="aspect-[4/5] relative bg-background-secondary overflow-hidden">
          <ImageWithFallback
            src={image}
            alt={name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            fallbackType="thumbnail"
          />
        </div>
      </Link>
      
      {/* Product details */}
      <div className="mt-3 space-y-1">
        {category && (
          <Text variant="small" className="text-text-secondary/70">
            {category}
          </Text>
        )}
        
        <Link href={`/products/${slug}`} className="block">
          <h3 className="text-sm font-medium text-text-primary line-clamp-2 group-hover:text-accent-gold transition-colors">
            {name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-2">
          <Text weight="medium" className="text-text-primary">
            ₹{price.toLocaleString()}
          </Text>
          {compareAtPrice && compareAtPrice > price && (
            <Text variant="small" className="text-text-secondary line-through">
              ₹{compareAtPrice.toLocaleString()}
            </Text>
          )}
        </div>
      </div>
      
      {/* Quick add to cart button - appears on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-opacity group-hover:opacity-100">
        <Button 
          variant="default"
          fullWidth
          size="sm"
          onClick={handleAddToCart}
          className="gap-1.5"
        >
          <ShoppingBag className="h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
} 