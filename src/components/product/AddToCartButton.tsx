'use client';

import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/lib/contexts/CartContext';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCart();

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Add the product to the cart
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
    });
    
    // Reset and show success indicator
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      {/* Quantity Selector */}
      <div className="flex items-center border border-accent-gold/20 rounded-md">
        <button
          onClick={handleDecrement}
          className="w-10 h-10 flex items-center justify-center text-text-primary hover:bg-background-secondary"
          aria-label="Decrease quantity"
          disabled={quantity <= 1}
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
          className="w-12 h-10 text-center border-x border-accent-gold/20 bg-transparent text-text-primary"
          min="1"
        />
        <button
          onClick={handleIncrement}
          className="w-10 h-10 flex items-center justify-center text-text-primary hover:bg-background-secondary"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      
      {/* Add to Cart Button */}
      <Button 
        onClick={handleAddToCart}
        isLoading={isAdding}
        className="flex-1 py-3"
      >
        <ShoppingBag className="mr-2 h-4 w-4" />
        Add to Cart
      </Button>
    </div>
  );
} 